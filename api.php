<?php
/**
 * SurvivalIQ API — Thin REST layer over SQLite for player data persistence.
 * Falls back gracefully: if this file isn't reachable, the app uses localStorage.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Database setup ---
$dbPath = __DIR__ . '/data/survivaliq.db';
$dbDir = dirname($dbPath);

if (!is_dir($dbDir)) {
    mkdir($dbDir, 0755, true);
}

try {
    $db = new SQLite3($dbPath);
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
    http_response_code(500);
    echo json_encode(['error' => 'Database initialization failed']);
    exit;
}

// --- Routing ---
$action = $_GET['action'] ?? '';

switch ($action) {

    case 'health':
        echo json_encode(['ok' => true]);
        break;

    case 'players':
        $result = $db->query('SELECT name FROM players ORDER BY name');
        $players = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $players[] = $row['name'];
        }
        echo json_encode(['players' => $players]);
        break;

    case 'load':
        $name = $_GET['name'] ?? '';
        if ($name === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Missing name parameter']);
            break;
        }
        $stmt = $db->prepare('SELECT data FROM players WHERE name = :name');
        $stmt->bindValue(':name', $name, SQLITE3_TEXT);
        $result = $stmt->execute();
        $row = $result->fetchArray(SQLITE3_ASSOC);
        if ($row) {
            echo json_encode(['name' => $name, 'data' => json_decode($row['data'], true)]);
        } else {
            echo json_encode(['name' => $name, 'data' => null]);
        }
        break;

    case 'save':
        $input = json_decode(file_get_contents('php://input'), true);
        $name = $input['name'] ?? '';
        $data = $input['data'] ?? null;
        if ($name === '' || $data === null) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing name or data']);
            break;
        }
        $stmt = $db->prepare('INSERT OR REPLACE INTO players (name, data, updated_at) VALUES (:name, :data, datetime(\'now\'))');
        $stmt->bindValue(':name', $name, SQLITE3_TEXT);
        $stmt->bindValue(':data', json_encode($data), SQLITE3_TEXT);
        $stmt->execute();
        echo json_encode(['ok' => true]);
        break;

    case 'create':
        $input = json_decode(file_get_contents('php://input'), true);
        $name = $input['name'] ?? '';
        if ($name === '') {
            http_response_code(400);
            echo json_encode(['error' => 'Missing name']);
            break;
        }
        // Only create if doesn't exist
        $stmt = $db->prepare('SELECT name FROM players WHERE name = :name');
        $stmt->bindValue(':name', $name, SQLITE3_TEXT);
        $result = $stmt->execute();
        if (!$result->fetchArray()) {
            $defaultData = json_encode([
                'mastered' => [],
                'failed' => [],
                'xp' => 0,
                'streak' => 0,
                'bestStreak' => 0,
                'lastDate' => null,
                'scenarioGrades' => new \stdClass(),
            ]);
            $stmt = $db->prepare('INSERT INTO players (name, data, updated_at) VALUES (:name, :data, datetime(\'now\'))');
            $stmt->bindValue(':name', $name, SQLITE3_TEXT);
            $stmt->bindValue(':data', $defaultData, SQLITE3_TEXT);
            $stmt->execute();
        }
        echo json_encode(['ok' => true]);
        break;

    default:
        http_response_code(404);
        echo json_encode(['error' => 'Unknown action: ' . $action]);
        break;
}

$db->close();
