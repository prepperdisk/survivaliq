<?php
/**
 * SurvivalIQ API — Thin REST layer over SQLite for player data persistence.
 * Falls back gracefully: if this file isn't reachable, the app uses localStorage.
 */

ini_set('display_errors', '0');
ini_set('log_errors', '1');
error_reporting(E_ALL);

// --- Global error/exception handlers: always return JSON ---
set_exception_handler(function ($e) {
    if (!headers_sent()) {
        header('Content-Type: application/json');
        http_response_code(500);
    }
    error_log('[SurvivalIQ API] ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    echo json_encode([
        'error'   => 'Server error',
        'detail'  => $e->getMessage(),
        'file'    => basename($e->getFile()),
        'line'    => $e->getLine(),
    ]);
    exit;
});

set_error_handler(function ($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) return false;
    throw new ErrorException($message, 0, $severity, $file, $line);
});

register_shutdown_function(function () {
    $err = error_get_last();
    if ($err && in_array($err['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        if (!headers_sent()) {
            header('Content-Type: application/json');
            http_response_code(500);
        }
        error_log('[SurvivalIQ API] FATAL: ' . $err['message'] . ' in ' . $err['file'] . ':' . $err['line']);
        echo json_encode([
            'error'  => 'Fatal server error',
            'detail' => $err['message'],
            'file'   => basename($err['file']),
            'line'   => $err['line'],
        ]);
    }
});

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Helpers ---
function json_response($payload, $status = 200) {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function json_error($message, $status = 500, $extra = []) {
    json_response(array_merge(['error' => $message], $extra), $status);
}

function require_sqlite_ok($db, $context) {
    if (!$db) {
        json_error('SQLite handle unavailable', 500, ['context' => $context]);
    }
    $code = $db->lastErrorCode();
    if ($code !== 0) {
        json_error('SQLite error', 500, [
            'context' => $context,
            'code'    => $code,
            'detail'  => $db->lastErrorMsg(),
        ]);
    }
}

function read_json_body() {
    $raw = file_get_contents('php://input');
    if ($raw === false || $raw === '') {
        json_error('Empty request body', 400);
    }
    $decoded = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        json_error('Invalid JSON body', 400, ['detail' => json_last_error_msg()]);
    }
    return $decoded;
}

// --- Environment checks ---
if (!class_exists('SQLite3')) {
    json_error('PHP SQLite3 extension is not installed', 500);
}

// --- Database setup ---
$dbPath = __DIR__ . '/data/survivaliq.db';
$dbDir  = dirname($dbPath);

if (!is_dir($dbDir)) {
    if (!@mkdir($dbDir, 0755, true) && !is_dir($dbDir)) {
        json_error('Unable to create data directory', 500, ['path' => $dbDir]);
    }
}

if (!is_writable($dbDir)) {
    json_error('Data directory is not writable by web server user', 500, [
        'path' => $dbDir,
        'hint' => 'chown/chmod so the web server user (e.g. www-data) can write here',
    ]);
}

if (file_exists($dbPath) && !is_writable($dbPath)) {
    json_error('Database file is not writable', 500, ['path' => $dbPath]);
}

$db = null;
try {
    $db = new SQLite3($dbPath);
    $db->enableExceptions(true);
    $db->exec('PRAGMA journal_mode=WAL');
    $db->exec('PRAGMA busy_timeout=5000');
    $db->exec('
        CREATE TABLE IF NOT EXISTS players (
            name TEXT PRIMARY KEY,
            data TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ');
} catch (Exception $e) {
    json_error('Database initialization failed', 500, [
        'detail' => $e->getMessage(),
        'path'   => $dbPath,
    ]);
}

// --- Routing ---
$action = $_GET['action'] ?? '';

try {
    switch ($action) {

        case 'health': {
            json_response([
                'ok'        => true,
                'sqlite'    => SQLite3::version()['versionString'] ?? null,
                'php'       => PHP_VERSION,
                'db_exists' => file_exists($dbPath),
                'db_writable' => is_writable($dbPath),
            ]);
        }

        case 'players': {
            $result = $db->query('SELECT name FROM players ORDER BY name');
            if ($result === false) {
                json_error('Query failed', 500, [
                    'context' => 'players',
                    'detail'  => $db->lastErrorMsg(),
                ]);
            }
            $players = [];
            while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                $players[] = $row['name'];
            }
            json_response(['players' => $players]);
        }

        case 'load': {
            $name = trim($_GET['name'] ?? '');
            if ($name === '') {
                json_error('Missing name parameter', 400);
            }
            $stmt = $db->prepare('SELECT data FROM players WHERE name = :name');
            if ($stmt === false) {
                json_error('Prepare failed', 500, ['context' => 'load', 'detail' => $db->lastErrorMsg()]);
            }
            $stmt->bindValue(':name', $name, SQLITE3_TEXT);
            $result = $stmt->execute();
            if ($result === false) {
                json_error('Execute failed', 500, ['context' => 'load', 'detail' => $db->lastErrorMsg()]);
            }
            $row = $result->fetchArray(SQLITE3_ASSOC);
            if ($row) {
                $decoded = json_decode($row['data'], true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    json_error('Stored player data is corrupt', 500, [
                        'name'   => $name,
                        'detail' => json_last_error_msg(),
                    ]);
                }
                json_response(['name' => $name, 'data' => $decoded]);
            }
            json_response(['name' => $name, 'data' => null]);
        }

        case 'save': {
            $input = read_json_body();
            $name  = trim($input['name'] ?? '');
            $data  = $input['data'] ?? null;
            if ($name === '') {
                json_error('Missing name', 400);
            }
            if ($data === null || !is_array($data)) {
                json_error('Missing or invalid data payload', 400);
            }
            $encoded = json_encode($data);
            if ($encoded === false) {
                json_error('Failed to encode player data', 500, ['detail' => json_last_error_msg()]);
            }
            $stmt = $db->prepare('INSERT OR REPLACE INTO players (name, data, updated_at) VALUES (:name, :data, datetime(\'now\'))');
            if ($stmt === false) {
                json_error('Prepare failed', 500, ['context' => 'save', 'detail' => $db->lastErrorMsg()]);
            }
            $stmt->bindValue(':name', $name, SQLITE3_TEXT);
            $stmt->bindValue(':data', $encoded, SQLITE3_TEXT);
            if ($stmt->execute() === false) {
                json_error('Execute failed', 500, ['context' => 'save', 'detail' => $db->lastErrorMsg()]);
            }
            json_response(['ok' => true, 'name' => $name]);
        }

        case 'create': {
            $input = read_json_body();
            $name  = trim($input['name'] ?? '');
            if ($name === '') {
                json_error('Missing name', 400);
            }
            $check = $db->prepare('SELECT name FROM players WHERE name = :name');
            if ($check === false) {
                json_error('Prepare failed', 500, ['context' => 'create.check', 'detail' => $db->lastErrorMsg()]);
            }
            $check->bindValue(':name', $name, SQLITE3_TEXT);
            $checkResult = $check->execute();
            if ($checkResult === false) {
                json_error('Execute failed', 500, ['context' => 'create.check', 'detail' => $db->lastErrorMsg()]);
            }
            if ($checkResult->fetchArray()) {
                json_response(['ok' => true, 'name' => $name, 'created' => false]);
            }
            $defaultData = json_encode([
                'mastered'       => [],
                'failed'         => [],
                'xp'             => 0,
                'streak'         => 0,
                'bestStreak'     => 0,
                'lastDate'       => null,
                'scenarioGrades' => new \stdClass(),
            ]);
            $insert = $db->prepare('INSERT INTO players (name, data, updated_at) VALUES (:name, :data, datetime(\'now\'))');
            if ($insert === false) {
                json_error('Prepare failed', 500, ['context' => 'create.insert', 'detail' => $db->lastErrorMsg()]);
            }
            $insert->bindValue(':name', $name, SQLITE3_TEXT);
            $insert->bindValue(':data', $defaultData, SQLITE3_TEXT);
            if ($insert->execute() === false) {
                json_error('Execute failed', 500, ['context' => 'create.insert', 'detail' => $db->lastErrorMsg()]);
            }
            json_response(['ok' => true, 'name' => $name, 'created' => true]);
        }

        default:
            json_error('Unknown action: ' . $action, 404);
    }
} finally {
    if ($db instanceof SQLite3) {
        @$db->close();
    }
}
