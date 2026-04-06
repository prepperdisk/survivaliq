const SCENARIOS = [
  {
    "id": "scenario_001",
    "meta": {
      "title": "The Day Hike That Wasn't",
      "category": "wilderness_survival",
      "tags": ["cold_weather", "navigation", "shelter", "signaling", "fire"],
      "difficulty": "intermediate",
      "setting": "New England forest, late October",
      "estimated_minutes": 10,
      "season": "fall",
      "environment": "woodland"
    },
    "intro": {
      "narrative": "It's late October in central New England. You drove alone to a trailhead for what was supposed to be a 4-hour out-and-back. You told no one where you were going.\n\nIt's now 4:30 PM. You've been hiking since 10 AM and took a wrong fork somewhere. You don't recognize anything around you. The temperature was 52\u00b0F when you started \u2014 it's dropping fast and the sky is going gray. Sunset is around 5:15 PM.",
      "gear": [
        "Day pack",
        "Half-eaten granola bar and an apple",
        "1/3 full 32oz water bottle",
        "Light fleece jacket",
        "Phone at 47% battery, no signal",
        "Car keys",
        "Lighter (forgotten in pocket)"
      ],
      "threat_summary": "Cold exposure, darkness, no one knows your location"
    },
    "decision_points": [
      {
        "id": "dp_001",
        "sequence": 1,
        "situation": "You realize you're lost. It's 4:30 PM, you have less than an hour of daylight, and you're not sure which direction leads back to the trailhead. What's your first move?",
        "options": [
          {
            "id": "A",
            "text": "Keep moving \u2014 try to find a trail, road, or high ground before dark",
            "grade": "C",
            "correct": false,
            "consequence": "Moving without a plan in unfamiliar terrain burns energy and daylight. You could deepen your lostness.",
            "teaching_point": "Random movement is one of the most dangerous things a lost person can do. Stop, breathe, assess."
          },
          {
            "id": "B",
            "text": "Stop now, find a defensible spot, and start preparing for an overnight",
            "grade": "A",
            "correct": true,
            "consequence": "You preserve daylight for shelter building and make yourself easier to find by staying put. This is the survival-trained response.",
            "teaching_point": "The rule is STOP: Stop, Think, Observe, Plan. Staying put is almost always the right call when lost."
          },
          {
            "id": "C",
            "text": "Try to climb the nearest high point to get your bearings and maybe cell signal",
            "grade": "C+",
            "correct": false,
            "consequence": "It takes 25 minutes of hard scrambling to reach the top. You're now sweaty, exposed, and it's nearly dark. No signal.",
            "teaching_point": "High ground for signal is a reasonable instinct, but it burns irreplaceable daylight and leaves you exposed at dusk."
          },
          {
            "id": "D",
            "text": "Follow the nearest stream or drainage downhill",
            "grade": "B-",
            "correct": false,
            "consequence": "Streams do often lead to civilization, but in dense New England forest this can take hours and lead through brutal terrain in the dark.",
            "teaching_point": "Following water out is a valid long-term strategy, but not the right first move when you still have daylight to prep shelter."
          }
        ]
      },
      {
        "id": "dp_002",
        "sequence": 2,
        "situation": "You're exposed on the high point, damp from exertion, wind cutting through your fleece. It's 4:55 PM. You spotted a stream drainage in the valley below and a dense stand of conifers about 150 feet downslope. You have maybe 20 minutes of usable daylight. What do you prioritize?",
        "options": [
          {
            "id": "A",
            "text": "Descend fast toward that stream drainage \u2014 water is your most important resource",
            "grade": "C",
            "correct": false,
            "consequence": "You reach the stream in the dark. Your water bottle wasn't the crisis. You've burned your daylight on a resource you didn't urgently need.",
            "teaching_point": "In cold weather survival, priority order is: warmth, shelter, water, food. Most people invert this because thirst feels urgent and cold feels manageable \u2014 until it isn't."
          },
          {
            "id": "B",
            "text": "Get down into those conifers and start building shelter before it's fully dark",
            "grade": "A",
            "correct": true,
            "consequence": "You reach the hemlocks with 15 minutes of gray light to spare and start working immediately. You're cold but in control.",
            "teaching_point": "Shelter before water, always, in cold exposure scenarios. The conifers block wind and provide building material."
          },
          {
            "id": "C",
            "text": "Use your lighter to start a signal fire up here on the rocks while you still have visibility",
            "grade": "D",
            "correct": false,
            "consequence": "You're above treeline with no fuel. The lighter produces nothing useful and you've wasted precious minutes.",
            "teaching_point": "Signal fires require fuel. Rock outcrops have none. Never attempt a fire without confirming you have the materials to sustain it."
          },
          {
            "id": "D",
            "text": "Stay put, conserve energy, and use your phone flashlight to signal through the night",
            "grade": "D+",
            "correct": false,
            "consequence": "You survive the night exposed with no shelter, burning battery on a flashlight nobody is looking for yet. Hypothermia risk is high.",
            "teaching_point": "Phone light signaling only works if someone is actively searching. On night one, before anyone knows you're missing, it's just battery drain."
          }
        ]
      },
      {
        "id": "dp_003",
        "sequence": 3,
        "situation": "You're under the hemlocks in the dark. Hands getting clumsy \u2014 early sign of heat loss. Temp is probably high 30s. You have your lighter. What do you do first?",
        "options": [
          {
            "id": "A",
            "text": "Gather wood and get a fire going immediately \u2014 warmth is critical",
            "grade": "B-",
            "correct": false,
            "consequence": "Fire helps, but without shelter you're radiating heat into open air all night. Fire alone won't keep you warm in these conditions.",
            "teaching_point": "A fire with no shelter is inefficient. Shelter retains body heat even with no fire at all. Do both, but shelter first."
          },
          {
            "id": "B",
            "text": "Build a debris shelter first, then worry about fire",
            "grade": "A",
            "correct": true,
            "consequence": "You spend 40 minutes building a hemlock debris shelter. It's rough but wind-blocking. Your core temp stabilizes from the exertion. Then you build fire.",
            "teaching_point": "Ground insulation is the most critical element \u2014 the earth steals heat faster than cold air. Boughs underneath you first, always."
          },
          {
            "id": "C",
            "text": "Drink some water, eat your granola bar, then build a fire",
            "grade": "C+",
            "correct": false,
            "consequence": "Calories help, but the time cost of eating first when your hands are already getting clumsy is dangerous. Heat loss is accelerating.",
            "teaching_point": "Food and water matter, but not when you're actively losing core temperature. Shelter and warmth always outrank nutrition in acute cold exposure."
          },
          {
            "id": "D",
            "text": "Layer up with everything you have and build fire at the same time",
            "grade": "B",
            "correct": false,
            "consequence": "Multitasking works, but clumsy hands make fire-starting harder and slower. You end up with a mediocre shelter and a mediocre fire.",
            "teaching_point": "Sequencing matters. Do one thing well rather than two things poorly when resources and time are scarce."
          }
        ]
      },
      {
        "id": "dp_004",
        "sequence": 4,
        "situation": "You need fire. You have a lighter but it's dark and you didn't pre-collect tinder while you could still see. How do you approach getting a fire started?",
        "options": [
          {
            "id": "A",
            "text": "Dig into the duff and dead leaves at the base of the hemlocks \u2014 dry tinder is usually just below the surface",
            "grade": "B",
            "correct": false,
            "consequence": "You find some dry material but it's inconsistent and takes many attempts to catch. The lighter gets warm from repeated use.",
            "teaching_point": "Duff can work but is unreliable. It often contains moisture and doesn't shred into the fine fibers that catch a spark reliably."
          },
          {
            "id": "B",
            "text": "Strip the dry inner bark from a dead standing branch \u2014 it shreds into fine fibers",
            "grade": "B+",
            "correct": false,
            "consequence": "Good natural tinder. It takes a few minutes to prepare but catches well. Fire is going within 10 minutes.",
            "teaching_point": "Dead standing wood is always drier than ground wood. Inner bark of many species shreds into excellent natural tinder."
          },
          {
            "id": "C",
            "text": "Check your pockets and pack for anything man-made that burns well as a starter",
            "grade": "B+",
            "correct": false,
            "consequence": "You find a granola bar wrapper, a receipt, and cardboard from a pack tag. Good accelerants but burn fast \u2014 you need natural tinder underneath.",
            "teaching_point": "Man-made materials are excellent fire starters but burn too quickly to sustain. They need natural tinder underneath to bridge to real fuel."
          },
          {
            "id": "D",
            "text": "Both B and C \u2014 layer man-made tinder with natural fiber for the best chance of a catch",
            "grade": "A",
            "correct": true,
            "consequence": "Cardboard base, bark fiber nest, wrapper in the center. First flick catches. Fire is sustainable within 15 minutes.",
            "teaching_point": "Layering tinder types \u2014 man-made accelerant over natural fiber over coarse material \u2014 maximizes catch probability and minimizes lighter use."
          }
        ]
      },
      {
        "id": "dp_005",
        "sequence": 5,
        "situation": "It's around 8 PM. You're stable \u2014 fire going, rough shelter built. Battery at 26%, still no signal. What's your overnight strategy?",
        "options": [
          {
            "id": "A",
            "text": "Conserve battery completely \u2014 no phone use until morning when you'll move toward the stream and follow it out",
            "grade": "B-",
            "correct": false,
            "consequence": "Safe but passive. Nobody knows where you are. If weather turns or you're injured tomorrow, you have no communication attempt logged.",
            "teaching_point": "Battery conservation matters, but a text costs almost nothing and has enormous upside. Passive survival is a last resort, not a first choice."
          },
          {
            "id": "B",
            "text": "Send your GPS coordinates as a text to someone \u2014 texts sometimes push through even without a full signal bar",
            "grade": "A",
            "correct": true,
            "consequence": "The message queues, sits for 90 seconds, then shows a single checkmark. It went out. You enable airplane mode to conserve battery and set a 90-minute sleep alarm.",
            "teaching_point": "SMS uses a lower-bandwidth channel than voice or data and can push through on weak signal. It's a low-cost, high-upside move that most people don't know to try."
          },
          {
            "id": "C",
            "text": "Set a 90-minute sleep alarm, tend the fire, sleep in cycles through the night",
            "grade": "B+",
            "correct": false,
            "consequence": "Smart fire management and rest cycling are solid survival technique. But you've missed the communication opportunity.",
            "teaching_point": "Sleep cycling to maintain a fire is legitimate survival strategy \u2014 90 minutes aligns with a full sleep cycle. But pair it with a communication attempt first."
          },
          {
            "id": "D",
            "text": "Keep the phone flashlight on low all night so rescuers might spot it from above",
            "grade": "D",
            "correct": false,
            "consequence": "Phone dies by 2 AM. No one is searching yet \u2014 you're not officially missing until morning at the earliest. The fire is a far better signal.",
            "teaching_point": "Flashlight signaling only works when someone is looking. Your fire is visible for miles. Your phone light is visible for hundreds of feet. Use the right tool."
          }
        ]
      }
    ],
    "debrief": {
      "title": "Scenario Debrief",
      "core_lesson": "In cold-weather survival, the priority order is warmth first, shelter second, water third, food last. Most people invert this because thirst feels urgent and cold feels manageable \u2014 until it isn't.",
      "key_skills_tested": [
        "Survival priority order (STOP principle)",
        "Cold weather threat assessment",
        "Shelter construction fundamentals",
        "Fire-starting technique",
        "Emergency communication"
      ],
      "grade_thresholds": {
        "A": { "min_score": 90, "label": "Expert Survivor", "description": "You think like someone trained for this. Your instincts are calibrated and your decisions were sequenced correctly." },
        "B": { "min_score": 75, "label": "Capable Survivor", "description": "Solid instincts with a few costly mistakes. You made it through but left margins on the table." },
        "C": { "min_score": 60, "label": "Struggling Survivor", "description": "You survived, but more by luck than design. Some fundamental priorities need recalibration." },
        "D": { "min_score": 0, "label": "At Risk", "description": "Critical knowledge gaps in cold-weather survival. Study the debrief carefully \u2014 these mistakes are life-threatening in real conditions." }
      },
      "option_grade_weights": {
        "A": 100,
        "B": 80,
        "B+": 85,
        "B-": 72,
        "C+": 65,
        "C": 60,
        "C-": 55,
        "D+": 45,
        "D": 30,
        "F": 0
      }
    }
  },
  {
    "id": "scenario_002",
    "meta": {
      "title": "The Ridge Trail Rescue",
      "category": "wilderness_first_aid",
      "tags": ["first_aid", "fracture", "shock", "rescue", "improvised_splint"],
      "difficulty": "intermediate",
      "setting": "Remote mountain trail, southern Appalachians, July",
      "estimated_minutes": 12,
      "season": "summer",
      "environment": "mountain"
    },
    "intro": {
      "narrative": "It's mid-July in the southern Appalachians. You and your friend Marcus are on a 9-mile loop trail. You're 4.5 miles from the trailhead, on a narrow ridge section with loose rock.\n\nMarcus steps on a shifting slab and his right foot rolls hard into a crevice between rocks. You hear a sickening snap. He goes down screaming. His lower right leg is visibly deformed below the knee \u2014 angulated at an unnatural angle. He's conscious but in severe pain.\n\nIt's 1:45 PM. Temperature is 84\u00b0F with humidity. The nearest road is the trailhead, 4.5 miles back the way you came. No cell signal. No other hikers in sight.",
      "gear": [
        "Two day packs with hydration bladders (yours full, his half full)",
        "First aid kit: gauze, adhesive bandages, medical tape, ibuprofen, antiseptic wipes",
        "Two trekking poles (aluminum, adjustable)",
        "Rain jacket and extra t-shirt",
        "Pocket knife",
        "Whistle on pack strap",
        "Two phones \u2014 no signal (yours at 62%, his at 34%)",
        "Snacks: trail mix, two energy bars, jerky"
      ],
      "threat_summary": "Suspected open or closed fracture, shock risk, remote location, no communication, hours from trailhead"
    },
    "decision_points": [
      {
        "id": "dp_001",
        "sequence": 1,
        "situation": "Marcus is on the ground, gripping his leg, breathing fast. The deformity is obvious \u2014 his lower leg is bent where it shouldn't be. There's no bone protruding through the skin but the area is swelling rapidly. What do you do first?",
        "options": [
          {
            "id": "A",
            "text": "Immediately try to straighten the leg back into a normal position before it swells more",
            "grade": "D",
            "correct": false,
            "consequence": "Marcus screams. The attempt to realign causes excruciating pain and risks further damage to blood vessels and nerves. You stop, but the damage from the attempt may have worsened the injury.",
            "teaching_point": "Never attempt to realign or straighten a suspected fracture. Immobilize it in the position found. Manipulation can sever blood vessels, damage nerves, or convert a closed fracture to an open one. (Source: American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 9: Musculoskeletal Injuries)"
          },
          {
            "id": "B",
            "text": "Check the scene for further hazard, then assess Marcus systematically \u2014 airway, breathing, circulation, then the injury",
            "grade": "A",
            "correct": true,
            "consequence": "You confirm the rock is stable, kneel beside him, and talk him through slow breaths. Airway clear, breathing rapid but adequate, no arterial bleeding. You can now focus on the leg with a clear picture of his overall condition.",
            "teaching_point": "Scene safety first, then a systematic assessment. Even with an obvious injury, check ABCs (airway, breathing, circulation) before focusing on the fracture \u2014 there could be injuries you haven't noticed yet. (Source: American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 1: Before Giving Care)"
          },
          {
            "id": "C",
            "text": "Give him ibuprofen immediately and tell him to stay still while you figure out what to do",
            "grade": "C+",
            "correct": false,
            "consequence": "Pain relief is helpful but you've skipped the assessment. You don't know if he hit his head in the fall, if there's other bleeding, or if circulation below the fracture is compromised.",
            "teaching_point": "Pain management matters, but it's not the first priority. A full assessment ensures you don't miss life-threatening problems while focusing on the obvious injury. (Source: Wilderness Medical Society \u2014 Practice Guidelines for Wilderness Emergency Care)"
          },
          {
            "id": "D",
            "text": "Run to the nearest high point to try to get cell signal and call 911",
            "grade": "C",
            "correct": false,
            "consequence": "You leave Marcus alone, panicked, on unstable rock for 15 minutes. No signal at the high point. When you return, he's tried to move himself and is in worse shape.",
            "teaching_point": "Never leave an injured person without first stabilizing them and the scene. Communication attempts come after immediate care. An unattended patient can worsen their own injury. (Source: National Park Service \u2014 Wilderness First Aid Guidelines)"
          }
        ]
      },
      {
        "id": "dp_002",
        "sequence": 2,
        "situation": "You've assessed Marcus. The fracture appears closed \u2014 skin intact but the leg is badly angulated below the knee and swelling fast. He can wiggle his toes and has feeling in his foot, which means circulation isn't cut off yet. You need to immobilize the leg. What's your approach?",
        "options": [
          {
            "id": "A",
            "text": "Use the two trekking poles as splints \u2014 pad them with clothing, secure with medical tape and strips cut from the rain jacket",
            "grade": "A",
            "correct": true,
            "consequence": "You extend both poles to matching length, pad them with the extra t-shirt, and place one on each side of the leg. You tape and tie them securely above and below the fracture site without disturbing the break. The leg is stable.",
            "teaching_point": "Splint in the position found, immobilizing the joints above and below the fracture. Trekking poles are ideal improvised splints \u2014 rigid, adjustable, and padded with available clothing. Always check circulation (pulse, sensation, movement) below the splint after applying. (Source: American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 9; U.S. Army FM 4-25.11 First Aid, Chapter 4: Splinting)"
          },
          {
            "id": "B",
            "text": "Splint the leg using sticks and branches found nearby, tied with strips of fabric",
            "grade": "B",
            "correct": false,
            "consequence": "You find two mostly-straight branches. They work but are uneven, have bark that irritates through clothing, and take 20 minutes to prepare. The splint holds but isn't as secure as it could be.",
            "teaching_point": "Natural materials can work for splinting, but manufactured gear like trekking poles is superior when available \u2014 they're straighter, adjustable, and more consistent. Use the best materials you have. (Source: U.S. Army FM 4-25.11 First Aid, Chapter 4: Fractures and Splinting)"
          },
          {
            "id": "C",
            "text": "Tape the injured leg to the uninjured leg for stabilization",
            "grade": "B-",
            "correct": false,
            "consequence": "The buddy-splint technique provides some stability, but it immobilizes Marcus's good leg too, making any future movement extremely difficult. It also doesn't provide rigid support for the angulated fracture.",
            "teaching_point": "Buddy-splinting (tying injured limb to uninjured limb) is a last resort when no rigid materials are available. It limits the patient's mobility severely and provides less support than a rigid splint. (Source: American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 9: Immobilizing Injuries)"
          },
          {
            "id": "D",
            "text": "Skip the splint \u2014 just keep him still and focus on getting help as fast as possible",
            "grade": "D+",
            "correct": false,
            "consequence": "Without a splint, every small movement causes the broken bone ends to shift. Marcus gasps in pain each time. The uncontrolled movement increases the risk of the fracture becoming open and worsens his shock.",
            "teaching_point": "Splinting is not optional for suspected fractures. It reduces pain, prevents further tissue damage, reduces bleeding at the fracture site, and lowers the risk of shock. Skipping it to save time costs more than it gains. (Source: American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 9; NIH/MedlinePlus \u2014 Fracture First Aid)"
          }
        ]
      },
      {
        "id": "dp_003",
        "sequence": 3,
        "situation": "Thirty minutes have passed. Marcus's skin has gone pale and clammy despite the summer heat. His pulse is rapid and weak. He says he feels dizzy and nauseous. You recognize these as signs of shock. How do you manage this?",
        "options": [
          {
            "id": "A",
            "text": "Have him sit upright so he can breathe more easily, and give him water to drink",
            "grade": "C",
            "correct": false,
            "consequence": "Sitting upright drops blood pressure further away from his core. He takes a few sips but the nausea worsens. His condition isn't improving.",
            "teaching_point": "In shock, the body is struggling to circulate blood to vital organs. Sitting upright works against gravity. The correct position is lying flat. Water is reasonable in small sips if conscious and not vomiting, but position is the priority. (Source: American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 6: Shock)"
          },
          {
            "id": "B",
            "text": "Lay him flat on his back, elevate his uninjured leg about 12 inches, cover him with the rain jacket to maintain body temperature, and reassure him calmly",
            "grade": "A",
            "correct": true,
            "consequence": "You carefully position him flat, prop his good leg on a pack, and drape the rain jacket over his torso. You talk to him steadily. After 10 minutes his color improves slightly and his breathing slows.",
            "teaching_point": "Shock management: lay the patient flat, elevate legs if no spinal injury is suspected, maintain body temperature (even in summer \u2014 shock victims lose heat rapidly), and provide calm reassurance. Do not elevate the injured leg. (Source: American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 6: Shock; NIH/MedlinePlus \u2014 Shock First Aid)"
          },
          {
            "id": "C",
            "text": "Pour cold water over him to cool him down \u2014 heat and shock are a dangerous combination",
            "grade": "D",
            "correct": false,
            "consequence": "The cold water causes him to shiver violently, which increases oxygen demand and worsens the shock. His body is already struggling to regulate temperature.",
            "teaching_point": "Never cool a shock victim. Shock impairs thermoregulation \u2014 the body loses the ability to maintain its own temperature. Your job is to maintain normal body temperature, not lower it. Cooling worsens peripheral vasoconstriction and increases metabolic demand. (Source: NIH/MedlinePlus \u2014 Shock First Aid; American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 6)"
          },
          {
            "id": "D",
            "text": "Give him both ibuprofen and food to get his energy up and fight the shock",
            "grade": "C+",
            "correct": false,
            "consequence": "He takes the ibuprofen but can barely eat with the nausea. Pain relief helps marginally, but you've addressed a symptom without managing the underlying shock mechanics.",
            "teaching_point": "Pain management helps reduce shock, but the immediate priorities are position, temperature management, and reassurance. Food can wait \u2014 and in severe shock, eating may cause vomiting which risks aspiration. (Source: Wilderness Medical Society \u2014 Practice Guidelines: Management of Shock in Wilderness Settings)"
          }
        ]
      },
      {
        "id": "dp_004",
        "sequence": 4,
        "situation": "It's 2:45 PM. Marcus is stabilized but cannot walk. You're 4.5 miles from the trailhead on a trail with no cell signal. No other hikers have passed. What's your strategy for getting help?",
        "options": [
          {
            "id": "A",
            "text": "Help Marcus hop on one leg while you support him \u2014 4.5 miles is doable if you go slow",
            "grade": "D+",
            "correct": false,
            "consequence": "After 200 yards of agonizing hopping on rough terrain, Marcus collapses. The jarring has destabilized the splint, the pain is unbearable, and his shock symptoms are returning. You've moved a quarter mile and lost an hour.",
            "teaching_point": "Never attempt to walk out a patient with a suspected leg fracture, especially on rough terrain. Every step transmits force to the fracture site, worsens pain, increases shock risk, and can convert a closed fracture to open. If they can't bear weight, they can't hike out. (Source: Wilderness Medical Society \u2014 Practice Guidelines for Spine and Musculoskeletal Injuries; National Park Service \u2014 SAR Incident Guidelines)"
          },
          {
            "id": "B",
            "text": "Leave Marcus with supplies and clear instructions, mark the trail, and hike out fast to get help",
            "grade": "A",
            "correct": true,
            "consequence": "You give Marcus both water bladders, the food, the rain jacket, and his phone. You mark the spot with a bright shirt hung from a branch. You explain your plan clearly, set a return timeline, and move fast. You reach the trailhead in 90 minutes and call 911.",
            "teaching_point": "When a patient cannot be moved, sending the able person for help is the correct protocol. Leave the patient with supplies, clear instructions, shelter materials, and a signaling device. Mark the location visibly. Give an estimated return time so the patient knows what to expect. (Source: National Park Service \u2014 If You Need Help on the Trail; American Red Cross \u2014 Wilderness First Aid Guidelines)"
          },
          {
            "id": "C",
            "text": "Both stay put and blow the whistle in groups of three at regular intervals to attract other hikers or searchers",
            "grade": "B-",
            "correct": false,
            "consequence": "You whistle for two hours. No one comes. It's now 4:45 PM and no one knows you need help. You've burned daylight on a strategy that depended entirely on someone else being in earshot on a low-traffic trail.",
            "teaching_point": "Whistle signaling (3 blasts = distress) is valid but passive \u2014 it only works if someone is within earshot. On a remote, low-traffic trail, active rescue-seeking is more reliable. Signal while you wait, but don't make it your only strategy. (Source: National Park Service \u2014 Hiking Safety; U.S. Air Force Survival Manual AF 64-4)"
          },
          {
            "id": "D",
            "text": "Build a makeshift litter from trekking poles and jackets and carry him out together",
            "grade": "C",
            "correct": false,
            "consequence": "You spend 30 minutes building a litter. You can barely lift it, let alone carry it on a narrow trail. After 100 yards on rough terrain you're exhausted and Marcus is in agony from the jostling. This isn't sustainable.",
            "teaching_point": "Improvised litter evacuation requires at minimum 4-6 strong carriers and relatively flat terrain. A two-person carry over 4.5 miles of mountain trail is physically impossible and dangerous to the patient. Know the limits of self-rescue. (Source: U.S. Army FM 4-25.11 First Aid, Chapter 3: Casualty Evacuation; Wilderness Medical Society \u2014 Evacuation Guidelines)"
          }
        ]
      },
      {
        "id": "dp_005",
        "sequence": 5,
        "situation": "You've hiked out and called 911. Search and rescue is mobilizing but can't reach Marcus until first light tomorrow \u2014 the trail is too technical for a night extraction. You've hiked back to Marcus with a SAR radio. It's 7 PM and getting dark. How do you manage the overnight?",
        "options": [
          {
            "id": "A",
            "text": "Focus entirely on keeping Marcus awake all night \u2014 falling asleep with a fracture could be dangerous",
            "grade": "C",
            "correct": false,
            "consequence": "You keep him talking but by 2 AM you're both exhausted. Sleep deprivation worsens his pain perception and your decision-making. There's no medical reason to keep a fracture patient awake unless there's a head injury.",
            "teaching_point": "There is no medical need to keep a fracture patient awake. Sleep is restorative. The concern about staying awake applies to suspected head injuries/concussions, not fractures. Let the patient rest in cycles. (Source: NIH/MedlinePlus \u2014 Fracture Aftercare; Wilderness Medical Society \u2014 Practice Guidelines)"
          },
          {
            "id": "B",
            "text": "Insulate Marcus from the ground, maintain his body temperature, monitor his splint and circulation, manage pain, and keep him hydrated",
            "grade": "A",
            "correct": true,
            "consequence": "You build a pad of leaves and branches underneath him, layer both jackets over him, check his toes for warmth and sensation every hour, give small sips of water, and offer ibuprofen on schedule. By dawn he's uncomfortable but stable. SAR arrives at 6:30 AM.",
            "teaching_point": "Extended patient care priorities: insulate from ground (conduction is the #1 heat thief), maintain body temperature, monitor circulation below the injury (check pulse, sensation, and skin color at the toes), manage pain on a schedule, and maintain hydration. Document what you gave and when for the rescue team. (Source: American Red Cross \u2014 Wilderness First Aid; FEMA/Ready.gov \u2014 First Aid Basics; U.S. Army FM 4-25.11, Chapter 2: Patient Care)"
          },
          {
            "id": "C",
            "text": "Loosen the splint to make Marcus more comfortable for the night \u2014 it's been tight for hours",
            "grade": "C+",
            "correct": false,
            "consequence": "The loosened splint allows the fracture to shift during the night. Marcus wakes in sharp pain at 3 AM and the swelling has increased significantly. You have to re-splint in the dark.",
            "teaching_point": "Never loosen a splint unless circulation is compromised (loss of pulse, numbness, blue/white toes). A properly applied splint should be snug. Check circulation regularly rather than loosening preemptively. (Source: American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 9: Splinting; U.S. Army FM 4-25.11)"
          },
          {
            "id": "D",
            "text": "Start a large fire nearby for warmth and as a signal for the rescue team in the morning",
            "grade": "B",
            "correct": false,
            "consequence": "The fire provides warmth and morale, but on a dry July ridge in the Appalachians you're risking a wildfire. Also, SAR already knows your location via the radio \u2014 a signal fire is redundant and the smoke bothers Marcus's breathing.",
            "teaching_point": "Fire can be valuable for warmth in cold conditions, but in summer on a dry ridge it's a wildfire risk. When rescue already has your coordinates, a signal fire adds risk without benefit. Focus on patient care over signaling when communication is established. (Source: National Park Service \u2014 Wildfire Prevention; FEMA/Ready.gov \u2014 Wildfires)"
          }
        ]
      }
    ],
    "debrief": {
      "title": "Scenario Debrief",
      "core_lesson": "Wilderness first aid for fractures follows a clear priority chain: scene safety, systematic assessment, immobilization, shock management, then rescue logistics. The most common mistakes are attempting to realign fractures, trying to walk out a non-ambulatory patient, and neglecting shock management because the fracture seems like the only problem.",
      "key_skills_tested": [
        "Scene safety and systematic patient assessment",
        "Improvised splinting technique",
        "Shock recognition and management",
        "Self-rescue vs. go-for-help decision-making",
        "Extended wilderness patient care"
      ],
      "grade_thresholds": {
        "A": { "min_score": 90, "label": "Field Medic", "description": "You handled this like someone with real wilderness first aid training. Your priorities were correct and your patient care was sound." },
        "B": { "min_score": 75, "label": "Competent Responder", "description": "Good instincts overall, but some decisions added unnecessary risk or delayed proper care. Review the teaching points." },
        "C": { "min_score": 60, "label": "Needs Training", "description": "You kept your partner alive, but several critical mistakes could have turned a bad situation into a fatal one. Consider a wilderness first aid course." },
        "D": { "min_score": 0, "label": "Dangerous Gaps", "description": "Multiple decisions here could have caused serious additional harm. Wilderness first aid training is strongly recommended before your next backcountry trip." }
      },
      "option_grade_weights": {
        "A": 100,
        "B": 80,
        "B+": 85,
        "B-": 72,
        "C+": 65,
        "C": 60,
        "C-": 55,
        "D+": 45,
        "D": 30,
        "F": 0
      }
    }
  },
  {
    "id": "scenario_003",
    "meta": {
      "title": "Lost with the Kids",
      "category": "wilderness_survival",
      "tags": ["navigation", "heat_exposure", "water", "children", "psychology"],
      "difficulty": "intermediate",
      "setting": "Pacific Northwest forest, mid-August",
      "estimated_minutes": 12,
      "season": "summer",
      "environment": "woodland"
    },
    "intro": {
      "narrative": "It's mid-August in the Oregon Cascades. You took your two kids \u2014 Lily (10) and Sam (7) \u2014 on what was supposed to be an easy 3-mile nature loop. Your partner stayed at the campground.\n\nYou left the marked trail to follow what looked like a shortcut back, but the path petered out 30 minutes ago. You've been bushwhacking and nothing looks familiar. It's 2:15 PM. Temperature is 91\u00b0F in the shade and the kids are already complaining of thirst.\n\nYou told your partner you'd be back by 3 PM. Your phone has 38% battery and no signal.",
      "gear": [
        "Small day pack",
        "One 16oz water bottle \u2014 about a third full",
        "Bag of goldfish crackers and two granola bars",
        "Sunscreen (half a tube)",
        "Phone at 38% battery, no signal",
        "Lily has a whistle on her pack",
        "Light cotton t-shirts and shorts on all three of you",
        "One baseball cap (yours)"
      ],
      "threat_summary": "Heat exposure, dehydration with limited water, two children depending on you, no one will start looking until after 3 PM"
    },
    "decision_points": [
      {
        "id": "dp_001",
        "sequence": 1,
        "situation": "You've just realized you're definitely lost. Sam is whining about the heat, Lily is scared and asking if you're lost. You're sweating heavily and the water bottle is almost empty. What do you do first?",
        "options": [
          {
            "id": "A",
            "text": "Keep pushing forward \u2014 the trail has to be close. Tell the kids everything is fine and to stop complaining",
            "grade": "D+",
            "correct": false,
            "consequence": "Twenty more minutes of bushwhacking in 91\u00b0F heat. Sam is stumbling. Lily is crying silently. You're further from the trail than when you started, and you've burned energy and water you can't replace.",
            "teaching_point": "Random movement when lost is the #1 cause of worsening the situation. Dismissing children's fears increases their anxiety \u2014 they know when adults are lying. (Source: National Park Service \u2014 If You Get Lost; FEMA/Ready.gov \u2014 Helping Children Cope)"
          },
          {
            "id": "B",
            "text": "Stop immediately. Sit everyone down in the shade. Calmly tell the kids the truth: we're turned around, people will come looking, and you have a plan",
            "grade": "A",
            "correct": true,
            "consequence": "You find a shaded spot under a large Douglas fir. The kids are scared but your calm honesty steadies them. Lily asks what the plan is. Sam stops whining once he's sitting down. You can think clearly now.",
            "teaching_point": "STOP: Stop, Think, Observe, Plan. With children, honest age-appropriate communication plus calm authority is critical. Kids handle hard truths better than they handle sensing an adult is panicking and hiding it. Give them information and roles. (Source: U.S. Forest Service \u2014 Wilderness Survival; American Psychological Association \u2014 Helping Children Manage Stress)"
          },
          {
            "id": "C",
            "text": "Climb the nearest hill to try to spot the trail or a road from above",
            "grade": "C",
            "correct": false,
            "consequence": "You drag two overheated kids uphill for 15 minutes. Canopy is too thick to see anything. Everyone is more dehydrated and exhausted. Sam sits down and refuses to move.",
            "teaching_point": "In dense Pacific Northwest forest, canopy cover makes high-ground observation nearly useless. You've burned critical energy and water for nothing, and now have a child who may be approaching heat exhaustion. (Source: National Park Service \u2014 Hiking Safety; CDC \u2014 Heat-Related Illness Prevention)"
          },
          {
            "id": "D",
            "text": "Use the remaining phone battery to try to call 911 \u2014 some calls connect even with no signal bars",
            "grade": "B-",
            "correct": false,
            "consequence": "You try three times. No connection. Battery drops to 29%. You haven't addressed the kids' immediate condition or made any other plan.",
            "teaching_point": "911 calls can sometimes connect on any available carrier network even without signal bars, so it's worth a try \u2014 but it shouldn't be your first action. Stabilize the situation (shade, rest, plan) before spending limited battery. (Source: FCC.gov \u2014 911 Wireless Services; National Park Service \u2014 Cell Phone Safety in the Backcountry)"
          }
        ]
      },
      {
        "id": "dp_002",
        "sequence": 2,
        "situation": "You're in the shade. The water bottle has maybe two swallows left. It's 2:40 PM and 91\u00b0F. Sam's face is flushed and he says his head hurts. Lily seems okay but is very quiet. How do you manage the water situation?",
        "options": [
          {
            "id": "A",
            "text": "Give all the remaining water to Sam \u2014 he's the smallest and most vulnerable",
            "grade": "B",
            "correct": false,
            "consequence": "Sam drinks it all. He feels slightly better. But now you and Lily have nothing, and you're the decision-maker. If you go down to heat illness, all three of you are in serious trouble.",
            "teaching_point": "Children are more vulnerable to heat illness than adults due to their higher surface-area-to-body-mass ratio. But the leader must stay functional. The correct approach is to split the water, prioritizing the most symptomatic person while keeping everyone minimally hydrated. (Source: CDC \u2014 Heat-Related Illness in Children; American Red Cross \u2014 Heat Emergency First Aid)"
          },
          {
            "id": "B",
            "text": "Give Sam most of the water but save a small amount for yourself. Move Sam to the deepest shade, remove his shirt, and fan him. Wet the baseball cap and put it on his head",
            "grade": "A",
            "correct": true,
            "consequence": "Sam gets most of the water in small sips. You wet the cap and place it on his head. The evaporative cooling helps. His headache eases after 10 minutes in deeper shade. You have just enough to wet your own lips and Lily's.",
            "teaching_point": "Headache and flushing are early signs of heat exhaustion. Active cooling (shade, wet clothing, fanning) is as important as water. Evaporative cooling from a wet hat or shirt can lower skin temperature significantly. Don't pour all water into one person \u2014 keep the leader functional. (Source: CDC \u2014 Warning Signs of Heat-Related Illness; American Red Cross \u2014 First Aid/CPR/AED Manual, Chapter 7: Heat Emergencies)"
          },
          {
            "id": "C",
            "text": "Save the water for later \u2014 you might need it more tonight. Have everyone chew on some goldfish crackers to keep energy up",
            "grade": "D",
            "correct": false,
            "consequence": "Sam's headache worsens. Salty crackers without water accelerate dehydration. Within 20 minutes Sam is nauseous and Lily is starting to flush too. You've rationed water while a child was developing heat exhaustion.",
            "teaching_point": "Never ration water when someone is showing signs of heat illness \u2014 the water is needed NOW, not later. Salty food without adequate water worsens dehydration by requiring more water for digestion. Treat the immediate threat. (Source: U.S. Army FM 21-76 Survival Manual \u2014 Water; CDC \u2014 Heat-Related Illness Prevention)"
          },
          {
            "id": "D",
            "text": "Leave the kids in the shade and go search for a stream or water source nearby",
            "grade": "C+",
            "correct": false,
            "consequence": "You walk 10 minutes and find nothing. When you return, Sam is crying and Lily is panicking because you disappeared. You've lost trust and 20 minutes of daylight with nothing to show for it.",
            "teaching_point": "Never leave children alone in a survival situation unless there is absolutely no alternative. The psychological trauma of abandonment compounds the physical danger. If you must search for water, bring them with you or send the older child within earshot. (Source: NPS \u2014 Hiking with Children Safety; FEMA/Ready.gov \u2014 Helping Children Cope)"
          }
        ]
      },
      {
        "id": "dp_003",
        "sequence": 3,
        "situation": "It's 3:10 PM. Your partner at the campground will realize you're overdue now. Sam is resting. You hear what might be running water downhill to the west, about 200 yards away through thick brush. What's your strategy?",
        "options": [
          {
            "id": "A",
            "text": "Stay put. Your partner will alert rangers. Make your location findable by creating noise and visual markers",
            "grade": "A",
            "correct": true,
            "consequence": "You tie your bright sunscreen tube bag to a high branch, have Lily blow three whistle blasts every few minutes, and arrange rocks in a clearing to spell HELP. You stay cool in the shade and conserve energy. You're playing defense while search teams play offense.",
            "teaching_point": "When someone knows your general area and expected return time, staying put is almost always the right call. SAR teams search from last known point outward. Every step you take away from the trail makes their job harder. Make yourself findable: noise (whistle), color (bright objects), and ground signals. (Source: National Park Service \u2014 If You Get Lost; U.S. Forest Service \u2014 Search and Rescue Best Practices)"
          },
          {
            "id": "B",
            "text": "Move everyone toward the water sound. Water means a trail crossing or drainage to follow out, plus you need to refill",
            "grade": "B-",
            "correct": false,
            "consequence": "The 200 yards takes 25 minutes of difficult scrambling with two kids. You find a small creek. The water is a relief, but you've moved further from where anyone will start looking, and the creek doesn't follow any trail.",
            "teaching_point": "Moving to water is tempting and not unreasonable, but with a known return time and someone expecting you, staying put is statistically far more likely to result in faster rescue. SAR teams find stationary people dramatically faster than moving ones. Every move changes the search equation. (Source: National Park Service \u2014 SAR Statistics; Robert Koester \u2014 Lost Person Behavior, research cited by NPS)"
          },
          {
            "id": "C",
            "text": "Send Lily with the whistle to the water while you stay with Sam. She's old enough and it's only 200 yards",
            "grade": "D",
            "correct": false,
            "consequence": "Lily gets 50 yards into thick brush, gets scared, and starts crying. You can hear her but can't see her. Now you have one sick child here and one frightened child alone in the woods. You spend 15 frantic minutes getting her back.",
            "teaching_point": "Never split up children from the group, and never send a child alone through unfamiliar terrain. 200 yards through thick Pacific Northwest brush is not 200 yards on a sidewalk. A 10-year-old's navigation and judgment in dense forest is not reliable. Keep the group together. (Source: NPS \u2014 Hiking with Children; American Red Cross \u2014 Child Safety in Emergencies)"
          },
          {
            "id": "D",
            "text": "Try the phone again \u2014 climb a nearby tree to get elevation for signal",
            "grade": "C",
            "correct": false,
            "consequence": "You climb 20 feet up a Douglas fir. One bar flickers. You try 911 \u2014 it connects for 3 seconds then drops. You're not sure they got your location. Battery is now at 19%. The climb cost energy you didn't have to spare.",
            "teaching_point": "Elevation can help cell signal, but tree climbing in a survival situation risks a fall injury that would leave two children with an incapacitated parent. The brief 911 connection may or may not have registered your location. The risk-reward is poor when SAR is already likely being notified by your partner. (Source: FCC.gov \u2014 911 Location Accuracy; NPS \u2014 Cell Phone Limitations in Wilderness)"
          }
        ]
      },
      {
        "id": "dp_004",
        "sequence": 4,
        "situation": "It's 4:30 PM. You've heard a distant helicopter but it didn't come your direction. The kids are hungry and anxious. Lily keeps asking 'when are they coming?' Sam is subdued. How do you manage the group?",
        "options": [
          {
            "id": "A",
            "text": "Tell them rescue is coming any minute so they stop worrying. Promise they'll be back at camp for dinner",
            "grade": "C",
            "correct": false,
            "consequence": "They brighten up for 30 minutes. Then 5 PM passes, then 5:30. When dinner time comes and goes, both children lose trust in your promises. Lily says 'you lied.' Sam shuts down completely. You've spent your credibility.",
            "teaching_point": "False promises destroy credibility and backfire hard when the timeline passes. Children remember broken promises acutely. Honest, bounded optimism ('people are looking for us, we're going to be okay, it might take a while') maintains trust. (Source: American Psychological Association \u2014 Talking to Children About Emergencies; FEMA/Ready.gov \u2014 Helping Children Cope)"
          },
          {
            "id": "B",
            "text": "Distribute the snacks to maintain energy, give each child a specific job to do, and explain honestly that you might be here until morning but you're prepared for that",
            "grade": "A",
            "correct": true,
            "consequence": "Lily is in charge of whistle duty (3 blasts every 5 minutes). Sam is in charge of arranging pine cones in an arrow pointing toward your shade spot. They eat granola bars and crackers. Having tasks calms them. Lily says 'I can do this.' Sam is focused on his arrow project.",
            "teaching_point": "Purposeful activity is the most effective intervention for anxiety in both children and adults. Give specific, achievable tasks that contribute to the group's survival. Honest framing ('we might sleep outside tonight, and that's okay') paired with a demonstrated plan builds resilience rather than panic. (Source: U.S. Air Force Survival Manual \u2014 Psychology of Survival; American Academy of Pediatrics \u2014 Children and Disasters)"
          },
          {
            "id": "C",
            "text": "Save all the food for later \u2014 you might need it more tomorrow. Focus on keeping everyone quiet and still to conserve energy",
            "grade": "C+",
            "correct": false,
            "consequence": "Hungry, anxious children don't stay quiet and still. Sam has a meltdown 20 minutes later. Caloric intake would have stabilized blood sugar and improved everyone's mood and decision-making. Silence gives children nothing to do but worry.",
            "teaching_point": "In a short-term survival situation (hours, not days), eating available food maintains blood sugar, cognitive function, and morale. Food rationing makes sense over days, not hours. Inactivity amplifies anxiety, especially in children. Keep them fed, occupied, and informed. (Source: U.S. Army FM 21-76 Survival Manual \u2014 Nutrition; American Red Cross \u2014 Children and Emergencies)"
          },
          {
            "id": "D",
            "text": "Start walking back the way you came \u2014 you've waited long enough and daylight is burning",
            "grade": "D+",
            "correct": false,
            "consequence": "You spent 90 minutes bushwhacking to get here. Retracing that route with two tired kids in fading light through unmarked forest is nearly impossible. After 20 minutes, nothing looks familiar. You're now further lost and running out of daylight.",
            "teaching_point": "Backtracking through unmarked terrain is extremely difficult even for experienced navigators, and nearly impossible with tired children. If you've committed to staying put and someone is searching, moving at this point resets the search and puts you in a worse position \u2014 now moving through unfamiliar terrain with darkness approaching. (Source: NPS \u2014 Lost Person Behavior Research; U.S. Forest Service \u2014 SAR Procedures)"
          }
        ]
      },
      {
        "id": "dp_005",
        "sequence": 5,
        "situation": "It's 7 PM. Still light but cooling off. No rescue yet, though you've heard distant voices once. You're likely spending the night. Temperature will drop to about 55\u00b0F. Everyone is in cotton t-shirts and shorts. What do you prioritize?",
        "options": [
          {
            "id": "A",
            "text": "Build a fire \u2014 it will keep everyone warm, boost morale, and act as a signal for searchers",
            "grade": "B+",
            "correct": false,
            "consequence": "Good instinct and the fire helps, but you don't have a lighter or matches. You spend 40 minutes trying to friction-start with green sticks before giving up. That time could have been spent on shelter and insulation.",
            "teaching_point": "Fire is excellent for warmth, morale, and signaling \u2014 but only if you can make one. Without an ignition source, friction fire in Pacific Northwest damp conditions is extremely difficult even for experts. Assess your actual capabilities before committing time to a method that may fail. Shelter and insulation don't require fire. (Source: U.S. Army FM 21-76 Survival Manual \u2014 Fire; NPS \u2014 Wilderness Survival Basics)"
          },
          {
            "id": "B",
            "text": "Build an insulated nest \u2014 pile dry leaves and debris between tree roots, huddle all three of you together with the kids in the middle",
            "grade": "A",
            "correct": true,
            "consequence": "You pile up a thick bed of dry fir needles and leaves between the roots of a large tree. All three of you curl up with the kids between you. Body heat from three people in an insulated space keeps everyone surprisingly warm. Sam falls asleep within minutes. Lily stays awake but calm.",
            "teaching_point": "Group huddling with children in the center conserves heat extremely efficiently. At 55\u00b0F, hypothermia isn't an acute threat but discomfort is. Ground insulation is critical \u2014 the earth draws heat away fast. A 4-6 inch layer of dry debris underneath you makes an enormous difference. Three bodies together generate significant shared warmth. (Source: U.S. Army FM 21-76 Survival Manual \u2014 Shelter; American Red Cross \u2014 Cold Exposure First Aid; Wilderness Medical Society \u2014 Hypothermia Prevention)"
          },
          {
            "id": "C",
            "text": "Keep everyone walking in circles to stay warm through the night \u2014 you can't risk the cold",
            "grade": "D",
            "correct": false,
            "consequence": "Exhausted children cannot walk through the night. Sam falls after 15 minutes. Walking burns calories you can't replace and increases dehydration. At 55\u00b0F, this level of activity is unnecessary and counterproductive.",
            "teaching_point": "55\u00b0F is uncomfortable but not immediately life-threatening. Walking to stay warm burns far more energy than it generates and is unsustainable, especially for children. Insulation and huddling are far more efficient. Save walking for temperatures where hypothermia is an acute threat and no shelter is possible. (Source: CDC \u2014 Hypothermia Prevention; Wilderness Medical Society \u2014 Hypothermia Guidelines)"
          },
          {
            "id": "D",
            "text": "Have the kids sleep while you stay awake all night to listen for searchers and signal if needed",
            "grade": "B",
            "correct": false,
            "consequence": "The kids sleep, which is good. But you're awake, alone, cold, and exhausted by 2 AM. If searchers arrive at dawn, you'll be impaired and slow to respond. You also missed the body heat benefit of huddling.",
            "teaching_point": "An all-night vigil sounds heroic but produces a sleep-deprived, cognitively impaired leader by morning. Set up signaling that works passively (bright objects visible from above, arranged ground signals) and sleep in shifts or huddle together. Searchers in the morning will call out loudly \u2014 you'll hear them. (Source: CDC \u2014 Sleep Deprivation Effects; NIH \u2014 Sleep and Cognitive Performance; U.S. Air Force Survival Manual \u2014 Rest Management)"
          }
        ]
      }
    ],
    "debrief": {
      "title": "Scenario Debrief",
      "core_lesson": "Surviving while responsible for children changes every calculation. Physical survival priorities remain the same, but psychological management \u2014 honest communication, purposeful tasks, and calm authority \u2014 becomes equally critical. Children handle hard truths better than broken promises, and active roles better than passive waiting.",
      "key_skills_tested": [
        "STOP protocol with dependents",
        "Heat illness recognition and field treatment",
        "Stay-put vs. move decision-making",
        "Child psychological management in emergencies",
        "Overnight shelter without gear"
      ],
      "grade_thresholds": {
        "A": { "min_score": 90, "label": "Prepared Parent", "description": "You kept your kids safe, informed, and calm. Your instincts balanced physical survival with the psychological needs of children under stress." },
        "B": { "min_score": 75, "label": "Capable Guardian", "description": "Good decisions overall, but some choices added unnecessary risk or missed opportunities to manage the children's experience. Review the teaching points." },
        "C": { "min_score": 60, "label": "Risky Choices", "description": "You made it through, but several decisions put your children in avoidable danger. The gap between adult solo survival and responsible guardianship needs work." },
        "D": { "min_score": 0, "label": "Dangerous Gaps", "description": "Multiple decisions here endangered your children. Wilderness outings with kids require specific preparation and different decision frameworks than solo trips." }
      },
      "option_grade_weights": {
        "A": 100,
        "B": 80,
        "B+": 85,
        "B-": 72,
        "C+": 65,
        "C": 60,
        "C-": 55,
        "D+": 45,
        "D": 30,
        "F": 0
      }
    }
  },
  {
    "id": "scenario_004",
    "meta": {
      "title": "Blackout",
      "category": "urban_emergency",
      "tags": ["power_outage", "urban", "food_safety", "carbon_monoxide", "communication"],
      "difficulty": "beginner",
      "setting": "Suburban neighborhood, February ice storm",
      "estimated_minutes": 10,
      "season": "winter",
      "environment": "urban"
    },
    "intro": {
      "narrative": "It's early February. A severe ice storm has hit your area. You wake at 6 AM to a silent, dark house. The power is out. Outside, tree limbs coated in thick ice sag over power lines. You can hear branches cracking.\n\nYour household: you, your spouse, your elderly mother-in-law (78, on blood pressure medication that requires refrigeration), and your dog. The thermostat reads 58\u00b0F and dropping. The outdoor temperature is 22\u00b0F.\n\nYour phone has 71% battery. You have cell signal but data is slow. Local news says the outage covers three counties and could last 3-5 days.",
      "gear": [
        "Gas stove (works without electricity with manual ignition)",
        "Fireplace with half a cord of seasoned firewood",
        "Flashlights with batteries (two working)",
        "Car in the garage with a full tank of gas",
        "Chest freezer and refrigerator (both full, now without power)",
        "Medications: blood pressure pills (need refrigeration), ibuprofen, first aid kit",
        "Pantry: canned goods, rice, pasta, peanut butter, crackers",
        "Five gallons of bottled water, plus tap water (still flowing for now)"
      ],
      "threat_summary": "Extended power outage, falling indoor temperatures, elderly family member with medical needs, food safety concerns, potential carbon monoxide hazards"
    },
    "decision_points": [
      {
        "id": "dp_001",
        "sequence": 1,
        "situation": "The house is 58\u00b0F and dropping. Your mother-in-law is shivering in her bedroom. You need to warm the house. What's your first move?",
        "options": [
          {
            "id": "A",
            "text": "Start a fire in the fireplace and consolidate everyone into the living room with blankets and the dog for shared warmth",
            "grade": "A",
            "correct": true,
            "effect": "fire",
            "consequence": "The fireplace draws well. Within 30 minutes the living room is tolerable. You close doors to unused rooms and hang blankets over doorways to contain the heat. Your mother-in-law warms up quickly with layered blankets and the dog on her lap.",
            "teaching_point": "Consolidating into one heated room is the most efficient strategy for an extended outage. Close off unused rooms to reduce the space you're heating. A working fireplace with seasoned wood is one of the safest backup heat sources. Layer clothing and blankets \u2014 shared body heat helps significantly, especially for elderly individuals who lose heat faster. (Source: American Red Cross \u2014 Power Outage Safety; FEMA/Ready.gov \u2014 Winter Storms)"
          },
          {
            "id": "B",
            "text": "Bring the gas grill inside from the patio to heat the living room \u2014 it produces a lot of BTUs",
            "grade": "F",
            "correct": false,
            "consequence": "This is lethal. Within an hour, carbon monoxide levels in the house reach dangerous concentrations. You start feeling dizzy and nauseous. Your mother-in-law, more vulnerable due to age, could lose consciousness before anyone recognizes the danger.",
            "teaching_point": "NEVER use a grill, camp stove, or generator indoors or in an enclosed space. Carbon monoxide is colorless and odorless \u2014 it kills over 400 Americans every year, with spikes during power outages. Even a garage with the door open is not safe. (Source: CDC \u2014 Carbon Monoxide Poisoning Prevention; FEMA/Ready.gov \u2014 Power Outages)"
          },
          {
            "id": "C",
            "text": "Start the car in the garage with the door cracked to run the heater, then pipe warm air inside",
            "grade": "D",
            "correct": false,
            "consequence": "Even with the garage door cracked, carbon monoxide accumulates rapidly. CO seeps into the house through the shared wall. This is one of the most common causes of CO death during winter outages.",
            "teaching_point": "Never run a vehicle in an attached or enclosed garage, even with the door open. CO accumulates faster than it ventilates and seeps into living spaces through shared walls, ducts, and gaps. If you must run the car for charging devices, pull it completely outside into open air. (Source: CDC \u2014 Carbon Monoxide Poisoning; FEMA/Ready.gov \u2014 Generator and Vehicle Safety)"
          },
          {
            "id": "D",
            "text": "Turn on all the gas burners on the stove and leave them running to heat the kitchen",
            "grade": "D+",
            "correct": false,
            "consequence": "Gas burners produce carbon monoxide and consume oxygen. In a closed-up house this creates a lethal CO buildup over hours. It also creates a fire hazard with unattended open flames.",
            "teaching_point": "A gas stove is designed for cooking, not space heating. Prolonged use for heating produces dangerous levels of carbon monoxide and depletes indoor oxygen. Brief use for cooking is fine with some ventilation, but running burners for hours as a heat source is a well-documented cause of CO poisoning during outages. (Source: FEMA/Ready.gov \u2014 Power Outages; CDC \u2014 CO Poisoning Prevention; U.S. Fire Administration \u2014 Heating Fire Safety)"
          }
        ]
      },
      {
        "id": "dp_002",
        "sequence": 2,
        "ambient_effect": "fire",
        "situation": "It's 9 AM. The living room is warm from the fire, but you're thinking about the food. The refrigerator has been off for 3 hours. The freezer is full. Your mother-in-law's blood pressure medication is in the fridge. How do you handle the food and medication situation?",
        "options": [
          {
            "id": "A",
            "text": "Move all perishable food outside into coolers or bags \u2014 it's 22\u00b0F, nature is your refrigerator. Keep the fridge and freezer doors shut",
            "grade": "A",
            "correct": true,
            "effect": "snow",
            "consequence": "You bag the medication and most-perishable refrigerator items and place them in a cooler on the shaded porch. The freezer stays shut \u2014 it'll hold for 48 hours if you don't open it. The medication stays at safe temperature.",
            "teaching_point": "At 22\u00b0F, the outdoors is a natural refrigerator for perishable food (keep it shaded and in animal-proof containers). A full freezer holds safe temperature for approximately 48 hours if the door stays closed (24 hours if half full). Minimize door openings. Temperature-sensitive medications can be stored outside in the same temperature range. (Source: USDA/FoodSafety.gov \u2014 Food Safety During Power Outages; FDA \u2014 Medication Storage During Emergencies)"
          },
          {
            "id": "B",
            "text": "Open the fridge and freezer to assess everything and make an inventory of what you have",
            "grade": "C",
            "correct": false,
            "consequence": "You spend 10 minutes with both doors open. The refrigerator is now warming faster and the freezer has lost significant cold air. Your inventory gives you information but at the cost of accelerated food spoilage.",
            "teaching_point": "Every time you open the refrigerator or freezer during an outage, you let cold air escape and warm air in \u2014 dramatically shortening the safe storage time. If you must open them, have a plan beforehand, grab what you need quickly, and close the door. The USDA recommends keeping doors closed as much as possible. (Source: USDA/FoodSafety.gov \u2014 Food Safety in Power Outages; FEMA/Ready.gov \u2014 Food and Water in Emergencies)"
          },
          {
            "id": "C",
            "text": "Cook all the perishable meat now while the gas stove works \u2014 cooked food lasts longer",
            "grade": "B-",
            "correct": false,
            "consequence": "You open the freezer to pull meat and lose significant cold air. Cooking uses time and gas. Cooked food does last a bit longer unrefrigerated, but you've opened the freezer that was keeping everything frozen, and the cooked food still needs to stay below 40\u00b0F within 2 hours.",
            "teaching_point": "Cooking perishables doesn't eliminate the need for refrigeration \u2014 cooked food enters the USDA 'danger zone' (40\u00b0F\u2013140\u00b0F) just like raw food. The better strategy is to keep the freezer sealed and let the frozen mass maintain its own temperature. Cook from the pantry first (canned goods, dry goods) and use perishables only as they approach unsafe temperatures. (Source: USDA/FoodSafety.gov \u2014 Leftovers and Food Safety; American Red Cross \u2014 Food Safety After an Outage)"
          },
          {
            "id": "D",
            "text": "Don't worry about the food yet \u2014 3 hours without power isn't enough to spoil anything",
            "grade": "C+",
            "correct": false,
            "consequence": "You're right that 3 hours isn't critical for the freezer, but the refrigerator is already approaching the 4-hour limit \u2014 especially for items near the door. And the medication situation is time-sensitive. Waiting means missing the window to act proactively.",
            "teaching_point": "A closed refrigerator keeps food safe for about 4 hours. After that, perishable food above 40\u00b0F must be discarded. In a multi-day outage, proactive action in the first few hours (moving items outside, securing medication) prevents waste and health risks later. The freezer has more time, but the fridge does not. (Source: USDA/FoodSafety.gov \u2014 Food Safety During Power Outages; FDA \u2014 Are You Storing Food Safely?)"
          }
        ]
      },
      {
        "id": "dp_003",
        "sequence": 3,
        "ambient_effect": "snow",
        "situation": "It's noon on day one. Your phone is at 52% and you've learned the outage could last 3-5 days. Your mother-in-law needs to contact her doctor about the medication. Your spouse wants to post updates to family on social media. How do you manage communication and power?",
        "options": [
          {
            "id": "A",
            "text": "Let everyone use their phones normally \u2014 cell towers have battery backup so service should hold",
            "grade": "C",
            "correct": false,
            "consequence": "By day two, all phones are dead. Cell towers do have backup batteries, but they last only 4-8 hours. When tower batteries die, you lose service entirely. You've burned your most critical communication tool on non-essential use.",
            "teaching_point": "Cell tower backup batteries typically last 4-8 hours, not days. During a widespread outage, towers fail progressively. Once your phone is dead and towers are down, you have no communication at all. Conservation from hour one is critical for multi-day events. (Source: FCC.gov \u2014 Communications During Emergencies; FEMA/Ready.gov \u2014 Power Outages)"
          },
          {
            "id": "B",
            "text": "Prioritize: one essential medical call for the medication, one brief group text to family with your status, then enable airplane mode on all phones. Charge from the car battery outside periodically",
            "grade": "A",
            "correct": true,
            "consequence": "You make the medication call \u2014 the doctor says it's stable at room temperature for up to 72 hours. Your spouse sends a single group text. Phones go to airplane mode. You run the car (outside in the driveway) for 30 minutes to charge phones via the car USB ports.",
            "teaching_point": "In an extended outage, phone battery is a finite survival resource. Prioritize: medical/emergency calls first, one status update to your emergency contact network, then aggressive conservation (airplane mode, low brightness, disable background apps). Charge from the vehicle battery with the car OUTSIDE \u2014 never in the garage. (Source: FEMA/Ready.gov \u2014 Make a Plan: Communication; FCC.gov \u2014 Tips for Communicating During Emergencies; American Red Cross \u2014 Power Outage Preparedness)"
          },
          {
            "id": "C",
            "text": "Turn off all phones completely to conserve battery. You can check in tomorrow",
            "grade": "C+",
            "correct": false,
            "consequence": "Maximum conservation, but you've missed the medication consultation and your family has no idea if you're safe. If an evacuation order comes via Wireless Emergency Alert, you won't receive it. Going completely dark creates its own risks.",
            "teaching_point": "Complete communication blackout trades one problem for another. You lose incoming emergency alerts (WEA), miss potential evacuation notices, and can't coordinate if the situation worsens. Airplane mode with periodic check-ins is the right balance \u2014 the phone is off the network but available for emergencies. (Source: FCC.gov \u2014 Wireless Emergency Alerts; FEMA/Ready.gov \u2014 Alerts and Warnings)"
          },
          {
            "id": "D",
            "text": "Drive to the nearest location with power to charge all devices and use Wi-Fi for updates",
            "grade": "B-",
            "correct": false,
            "consequence": "Roads are coated in ice. The drive is dangerous, and you leave an elderly person, a dog, and a fire unattended. You find a coffee shop with power 6 miles away, charge up, and drive back nervously on ice. The round trip costs 2 hours and fuel.",
            "teaching_point": "During ice storms, road travel is one of the highest-risk activities. The benefit of charging phones doesn't outweigh the risk of a vehicle accident on ice that could leave your household stranded without their primary caretaker. Use the car as a charging station in your own driveway instead. (Source: FEMA/Ready.gov \u2014 Winter Storms and Extreme Cold; NWS \u2014 Ice Storm Safety)"
          }
        ]
      },
      {
        "id": "dp_004",
        "sequence": 4,
        "situation": "Day two. The house is holding at 55\u00b0F in the living room with the fire. Your neighbor knocks \u2014 she's 82, lives alone, has no fireplace, and her house is at 42\u00b0F. She's confused and shivering badly. What do you do?",
        "options": [
          {
            "id": "A",
            "text": "Bring her in immediately. Get her warm, wrapped in blankets by the fire, and give her warm fluids. She's showing signs of hypothermia",
            "grade": "A",
            "correct": true,
            "consequence": "You sit her by the fire, wrap her in blankets, and your spouse makes warm broth on the gas stove. After 30 minutes her confusion clears and her shivering becomes more vigorous (a good sign \u2014 her body is fighting). She'll stay with you for the duration.",
            "teaching_point": "Confusion combined with shivering in an elderly person at 42\u00b0F is likely mild-to-moderate hypothermia. Elderly people lose body heat faster and are less able to sense cold. Rewarming should be gradual: warm room, blankets, warm (not hot) fluids. This is a medical emergency \u2014 untreated, she could progress to severe hypothermia and cardiac arrest alone in her home. (Source: CDC \u2014 Hypothermia Prevention; NIH/NIA \u2014 Hypothermia: A Cold Weather Danger for Older Adults; American Red Cross \u2014 Cold Exposure First Aid)"
          },
          {
            "id": "B",
            "text": "Give her extra blankets and some hot water in a thermos to take back to her house \u2014 you can't fit another person",
            "grade": "C",
            "correct": false,
            "consequence": "She walks back to her 42\u00b0F house. The blankets help briefly but without a heat source, her house will continue dropping. By morning it could be in the 30s. Confused and alone, she may not recognize worsening hypothermia. You've sent a hypothermic elderly person back into the cold.",
            "teaching_point": "Blankets slow heat loss but don't generate heat. Without a heat source, her house will continue cooling toward the outdoor temperature. Hypothermia impairs judgment \u2014 she may not realize she's deteriorating. The CDC specifically warns that elderly people living alone during power outages are at extreme risk. Check on them or bring them in. (Source: CDC \u2014 Hypothermia: Key Facts; FEMA/Ready.gov \u2014 Extreme Cold; NIH/NIA \u2014 Hypothermia in Older Adults)"
          },
          {
            "id": "C",
            "text": "Call 911 for her \u2014 she needs medical attention, not just a warm room",
            "grade": "B",
            "correct": false,
            "consequence": "You call 911. They're overwhelmed with calls across three counties. Estimated response: 4-6 hours. Meanwhile, she's still in your doorway, confused and shivering. You should have started rewarming her immediately while waiting for EMS.",
            "teaching_point": "Calling 911 for a potentially hypothermic elderly person is appropriate, but during a mass casualty event like a multi-county ice storm, response times may be hours. Begin rewarming immediately while you wait. Warming first, calling second. You can do both \u2014 but warming is the time-critical intervention. (Source: American Red Cross \u2014 First Aid: Hypothermia; FEMA \u2014 CERT Manual: Mass Casualty Events)"
          },
          {
            "id": "D",
            "text": "Tell her to go to the community shelter \u2014 the local school should be open as a warming center",
            "grade": "C+",
            "correct": false,
            "consequence": "You're guessing about the shelter. She'd have to walk on ice-covered sidewalks while confused and hypothermic. Even if the shelter exists, sending a disoriented elderly person out alone in an ice storm is dangerous.",
            "teaching_point": "Community warming centers do open during extended outages, but sending a confused, hypothermic 82-year-old out to walk on ice alone is dangerous. If a shelter exists and you can transport her safely later \u2014 fine. Right now, get her warm first. The immediate threat is hypothermia, not housing logistics. (Source: FEMA/Ready.gov \u2014 Extreme Cold: Protect Yourself; American Red Cross \u2014 Warming Centers)"
          }
        ]
      },
      {
        "id": "dp_005",
        "sequence": 5,
        "situation": "Day three. You're managing. The fire is going, you have enough firewood for two more days, food from the pantry, and water is still flowing from the tap (for now). The utility company says power restoration could be another 48 hours. Your mother-in-law is anxious about her medication. Your spouse is going stir-crazy. What's your priority for maintaining the household through the extended outage?",
        "options": [
          {
            "id": "A",
            "text": "Focus exclusively on staying warm \u2014 everything else can wait until the power comes back",
            "grade": "C+",
            "correct": false,
            "consequence": "Warmth is handled, but you neglect water storage and your mother-in-law's growing anxiety spirals into a panic attack. When pipes freeze that night, you have no water stored. Single-focus management misses cascading problems.",
            "teaching_point": "Extended emergencies are about managing multiple slow-moving threats simultaneously, not just the most obvious one. While warmth is critical, water supply (pipes can freeze), medication management, psychological wellbeing, and hygiene all need attention. Think 24 hours ahead, not just right now. (Source: FEMA/Ready.gov \u2014 Extended Power Outages; American Red Cross \u2014 Power Outage Preparedness Checklist)"
          },
          {
            "id": "B",
            "text": "Fill every available container with water while it's still flowing, maintain a 24-hour household routine (meals, activities, rest), check on neighbors, and contact the doctor about extending the medication",
            "grade": "A",
            "correct": true,
            "consequence": "You fill the bathtub, every pot, and all available containers with water. You establish a routine: meals at regular times, board games in the afternoon, firewood collection in the morning. Your spouse takes the neighbor for a walk when the sun is out. Your mother-in-law's doctor confirms the medication is safe for 5 days at room temperature. The household is functioning.",
            "teaching_point": "Routine is the most underrated survival tool. Regular meals, scheduled activities, and assigned responsibilities maintain psychological stability during extended disruptions. Fill water containers NOW while taps work \u2014 if pumping stations lose backup power or pipes freeze, the tap stops without warning. Proactive multi-threat management is what separates a manageable inconvenience from a crisis. (Source: FEMA/Ready.gov \u2014 Extended Power Outage Guide; American Red Cross \u2014 Coping with Disaster; American Psychological Association \u2014 Building Resilience)"
          },
          {
            "id": "C",
            "text": "Pack everyone into the car and drive to a hotel or relative's house that has power",
            "grade": "B-",
            "correct": false,
            "consequence": "Roads are still icy and littered with downed branches. Hotels within 50 miles are fully booked. Your relatives are 3 hours away on roads that may be impassable. You burn a quarter tank of gas finding this out and return home, having wasted daylight and fuel.",
            "teaching_point": "Evacuation to a powered location is a valid option IF roads are safe and you have a confirmed destination. During ice storms, road conditions are the primary risk. Call ahead before driving to confirm availability. If your current shelter is warm and supplied, sheltering in place is often safer than traveling on dangerous roads. (Source: FEMA/Ready.gov \u2014 Winter Storm Safety; NWS \u2014 Ice Storm Driving Safety; American Red Cross \u2014 When to Evacuate)"
          },
          {
            "id": "D",
            "text": "Run the generator you borrowed from a neighbor in the basement to restore power to the refrigerator and some lights",
            "grade": "D",
            "correct": false,
            "consequence": "A generator in the basement is a carbon monoxide death trap. Even with a door open, CO accumulates in enclosed and semi-enclosed spaces. This is the exact scenario that kills dozens of Americans every year during winter storms.",
            "teaching_point": "Generators must be run OUTDOORS, at least 20 feet from any window, door, or vent, with the exhaust pointing away from the building. Never in a basement, garage, crawlspace, or any enclosed or partially enclosed space. CO-related generator deaths spike during every major power outage. This is the single most important safety rule for generator use. (Source: CDC \u2014 Carbon Monoxide Poisoning Prevention; CPSC \u2014 Generator Safety; FEMA/Ready.gov \u2014 Portable Generator Safety)"
          }
        ]
      }
    ],
    "debrief": {
      "title": "Scenario Debrief",
      "core_lesson": "Urban power outages are deceptively dangerous because the threats are slow-building and domestic. Carbon monoxide from indoor fuel burning is the #1 killer. Food safety, medication management, water security, and caring for vulnerable people (elderly, children, pets) require proactive, multi-threaded thinking \u2014 not just waiting for the power to return.",
      "key_skills_tested": [
        "Carbon monoxide hazard awareness",
        "Food safety during power outages",
        "Communication and battery management",
        "Elderly/vulnerable person care",
        "Extended outage household management"
      ],
      "grade_thresholds": {
        "A": { "min_score": 90, "label": "Emergency Ready", "description": "You managed your household through a multi-day crisis with the right priorities, awareness of hidden hazards, and care for vulnerable members." },
        "B": { "min_score": 75, "label": "Mostly Prepared", "description": "Solid decisions but some gaps in hazard awareness or proactive planning. Review the carbon monoxide and food safety teaching points." },
        "C": { "min_score": 60, "label": "Gaps to Address", "description": "You survived but made decisions that could have had serious consequences. Extended outage preparedness needs attention." },
        "D": { "min_score": 0, "label": "Critical Danger", "description": "Some of these decisions \u2014 particularly around carbon monoxide \u2014 are lethal mistakes made by real people every winter. Please review every teaching point carefully." }
      },
      "option_grade_weights": {
        "A": 100,
        "B": 80,
        "B+": 85,
        "B-": 72,
        "C+": 65,
        "C": 60,
        "C-": 55,
        "D+": 45,
        "D": 30,
        "F": 0
      }
    }
  },
  {
    "id": "scenario_005",
    "meta": {
      "title": "Ember in the Wind",
      "category": "wildfire_evacuation",
      "tags": ["wildfire", "evacuation", "decision_making", "smoke", "go_bag"],
      "difficulty": "intermediate",
      "setting": "Wildland-urban interface, foothills of the western US, late September",
      "estimated_minutes": 12,
      "season": "fall",
      "environment": "wildland_urban_interface"
    },
    "intro": {
      "narrative": "It's 2:15 PM on a bone-dry September afternoon. You live in a single-story home on the edge of a foothill community where oak and chaparral push right up to the back fence. The wind has been gusting hard out of the east since morning — 25 to 35 mph, dry as paper. Humidity is 9%.\n\nA Red Flag Warning has been in effect since yesterday. You just got a wireless emergency alert: a fast-moving brush fire has ignited 6 miles east of you and is being pushed west by the wind. No mandatory evacuation order yet — only an evacuation WARNING for your zone. You can smell smoke. The sky to the east is turning brown.\n\nYour spouse is at work 30 minutes away. Your dog is in the yard. The kids are at school across town.",
      "gear": [
        "SUV in the driveway, 3/4 tank of gas",
        "Phone at 80%, working signal",
        "Garden hose and exterior spigots",
        "Go-bag in the hall closet (built last year, never reviewed)",
        "Important documents in a fireproof box",
        "N95 masks left over from last fire season",
        "Dog, dog crate, dog food"
      ],
      "threat_summary": "Wind-driven wildfire, ember cast, narrow evacuation routes, family separated"
    },
    "decision_points": [
      {
        "id": "dp_001",
        "sequence": 1,
        "situation": "You just got the evacuation WARNING (not order). Smoke is visible east, wind is howling. What do you do in the first five minutes?",
        "options": [
          {
            "id": "A",
            "text": "Wait for the mandatory evacuation order before doing anything — warnings often don't escalate",
            "grade": "D",
            "correct": false,
            "consequence": "You lose 20+ minutes of clear-headed prep time. When the order comes, you'll be rushing while roads clog.",
            "teaching_point": "In wind-driven wildfire, a warning is your prep window. By the time an order comes, conditions can already be dangerous. Treat warnings as 'pack now, leave soon.'"
          },
          {
            "id": "B",
            "text": "Start packing the car, load the dog, and pull up Watch Duty / local fire alerts to track the fire's behavior",
            "grade": "A",
            "correct": true,
            "consequence": "Within five minutes you're situationally aware, packing in parallel, and ready to leave on a moment's notice. The dog is in the crate in the SUV.",
            "teaching_point": "Warnings are your free time. Use them to load, get information, and reduce decision load for when conditions deteriorate. Real-time fire tracking apps are critical infrastructure now."
          },
          {
            "id": "C",
            "text": "Hose down the roof and exterior of the house immediately to fireproof it",
            "grade": "C",
            "correct": false,
            "consequence": "You spend 25 minutes wetting things down. In 9% humidity and 30 mph wind, the surfaces are dry again before you finish. Meanwhile you haven't packed.",
            "teaching_point": "Pre-wetting a structure has near-zero value in dry, windy conditions — it evaporates almost instantly. Defensible space matters; last-minute hosing usually doesn't."
          },
          {
            "id": "D",
            "text": "Drive to the school right now to grab the kids before traffic builds",
            "grade": "B-",
            "correct": false,
            "consequence": "Schools have evacuation plans and contact you when activated. You may cross the fire's projected path or get stuck while your house is unattended and unloaded.",
            "teaching_point": "Schools are required to manage student evacuation and reunification. Trust the plan unless they tell you otherwise — coordinate, don't intercept."
          }
        ]
      },
      {
        "id": "dp_002",
        "sequence": 2,
        "situation": "It's 2:35 PM. You have ten minutes of useful packing time before you want to be ready to roll. The go-bag hasn't been opened in a year. What do you grab beyond it?",
        "options": [
          {
            "id": "A",
            "text": "Documents box, medications, phone chargers, hard drives or laptops, and a change of clothes per person",
            "grade": "A",
            "correct": true,
            "consequence": "You hit the irreplaceables and the practical needs for 72 hours away from home. Everything fits in two trips to the SUV.",
            "teaching_point": "The 'six P's' framework: People, Pets, Papers, Prescriptions, Pictures, Personal computer. Irreplaceables first, comfort items last."
          },
          {
            "id": "B",
            "text": "Family photo albums, heirlooms, and sentimental items from every room",
            "grade": "C",
            "correct": false,
            "consequence": "You spend 20 minutes wandering room to room making emotional choices. You forget your medications.",
            "teaching_point": "Sentimental items matter, but only after irreplaceable functional items (meds, documents, ID). Decide on sentimental items in advance, not in a panic."
          },
          {
            "id": "C",
            "text": "Fill every container you can with water in case the house survives but utilities don't",
            "grade": "C-",
            "correct": false,
            "consequence": "Filling containers takes 15 minutes. If the house burns, none of it matters. If it doesn't, you can return for water.",
            "teaching_point": "In an active evacuation, every minute spent on 'what if I come back' scenarios is a minute not spent on 'what if I can't.'"
          },
          {
            "id": "D",
            "text": "Skip extra packing — the go-bag is enough, just leave",
            "grade": "B",
            "correct": false,
            "consequence": "Faster departure, but a year-old unreviewed go-bag may have expired meds, dead batteries, and missing documents. You'll feel the gaps in 12 hours.",
            "teaching_point": "Go-bags need annual review. An unreviewed bag is a hopeful guess, not a plan. If you have ten minutes, use them to supplement what's likely stale."
          }
        ]
      },
      {
        "id": "dp_003",
        "sequence": 3,
        "situation": "2:50 PM. The school has texted: students are being released to parents at a reunification site on the WEST side of town, away from the fire. Your spouse is driving home from the south. The fire alert app shows the fire has jumped a containment line and is now 3 miles east, moving fast. What's your move?",
        "options": [
          {
            "id": "A",
            "text": "Drive home first to grab your spouse, then go to the kids together",
            "grade": "D",
            "correct": false,
            "consequence": "Your spouse is already mobile. Routing everyone through the threatened area to converge is the worst possible plan.",
            "teaching_point": "In evacuation, never converge on the threat. Each person moves away from danger toward a shared safe rally point."
          },
          {
            "id": "B",
            "text": "Leave now for the school reunification site. Text spouse to meet you there directly.",
            "grade": "A",
            "correct": true,
            "consequence": "You roll out at 2:55 PM with the dog. Spouse acknowledges and reroutes. Everyone is converging on the same safe point from different directions, away from the fire.",
            "teaching_point": "Pre-decided rally points are gold. When you don't have one, the safest shared destination becomes the rally point — and 'away from the fire' beats 'toward each other.'"
          },
          {
            "id": "C",
            "text": "Stay put until your spouse arrives so you can caravan together",
            "grade": "D+",
            "correct": false,
            "consequence": "You burn 25 minutes waiting. The fire closes ground at the same time. Roads start to clog.",
            "teaching_point": "Caravanning feels safer but costs time you don't have. Independent movement to a shared point is faster and more resilient if one vehicle gets stuck."
          },
          {
            "id": "D",
            "text": "Call 911 and ask them what to do",
            "grade": "C-",
            "correct": false,
            "consequence": "You spend four minutes on hold during a regional emergency. The dispatcher tells you to follow local evacuation guidance — which you already have.",
            "teaching_point": "911 is for life-threatening emergencies in progress, not for decision support. During a major incident, dispatch is overwhelmed and can't replace your own situational awareness."
          }
        ]
      },
      {
        "id": "dp_004",
        "sequence": 4,
        "situation": "You're in the SUV. The most direct route to the school goes through a two-lane canyon road that runs east-west — the same axis as the wind and fire spread. A longer route loops north on a wider arterial, adding 12 minutes. Visibility is dropping; you can taste smoke. Which route?",
        "options": [
          {
            "id": "A",
            "text": "Take the canyon — it's faster and you need to get to the kids",
            "grade": "F",
            "correct": false,
            "consequence": "Canyon roads in wind-driven fires are deathtraps. They funnel fire, fill with smoke, and have no escape. People die on roads exactly like this.",
            "teaching_point": "Narrow canyon roads aligned with the wind are the single most dangerous feature in a wildfire evacuation. The fastest route on the map is sometimes the route that kills you."
          },
          {
            "id": "B",
            "text": "Take the longer arterial route north — wider, more lanes, away from the fire's axis",
            "grade": "A",
            "correct": true,
            "consequence": "You add 12 minutes but stay on a road with shoulders, multiple lanes, and movement options. Visibility stays workable.",
            "teaching_point": "In wildfire evacuation, route choice is about survivability, not speed. Wide, multi-lane roads away from the fire's directional axis are always preferred — even if they're longer."
          },
          {
            "id": "C",
            "text": "Try the canyon, and if conditions deteriorate, turn around",
            "grade": "D",
            "correct": false,
            "consequence": "You can't turn around on a two-lane canyon road in heavy traffic and smoke. The decision to enter is the decision to commit.",
            "teaching_point": "Treat any constrained route as a one-way commitment. If you can't guarantee an exit, don't enter."
          },
          {
            "id": "D",
            "text": "Pull over and wait for the smoke to clear before deciding",
            "grade": "D+",
            "correct": false,
            "consequence": "Smoke from a wind-driven fire doesn't clear — it intensifies. Waiting puts you closer to the fire, not further.",
            "teaching_point": "In a moving fire, time is always working against you. Stationary is rarely a safer choice than moving away."
          }
        ]
      },
      {
        "id": "dp_005",
        "sequence": 5,
        "situation": "You're on the arterial heading north, smoke thick enough that headlights are barely punching through. Ash is hitting the windshield. The radio just announced the warning has escalated to a mandatory order for your zone. You realize you didn't put on your N95 and the cabin is filling with smoke smell. The dog is panting hard. What do you do?",
        "options": [
          {
            "id": "A",
            "text": "Set the climate control to recirculate, turn fans to max, and put on your N95",
            "grade": "A",
            "correct": true,
            "consequence": "Cabin air quality stabilizes within a minute. The mask handles the rest. The dog calms slightly as the cabin cools. You keep moving.",
            "teaching_point": "Recirculate mode is your single best tool against wildfire smoke in a vehicle. Combined with N95s for occupants, it dramatically reduces particulate exposure."
          },
          {
            "id": "B",
            "text": "Roll the windows down to clear the smoke smell",
            "grade": "F",
            "correct": false,
            "consequence": "You flood the cabin with smoke and ash. Visibility worsens. The dog starts coughing. You become a hazard to yourself and other drivers.",
            "teaching_point": "Smoke outside is always worse than smoke inside. Seal the cabin, recirculate, and use masks. Never ventilate to outside air during active smoke."
          },
          {
            "id": "C",
            "text": "Pull over, get out, mask everyone up properly, then continue",
            "grade": "C",
            "correct": false,
            "consequence": "Stopping in dense smoke on a busy evacuation route risks being rear-ended. You can mask up while driving slowly in stable traffic.",
            "teaching_point": "During active evacuation, momentum matters. Solve problems in motion when you can; stop only when stopping is genuinely safer than continuing."
          },
          {
            "id": "D",
            "text": "Speed up to get out of the smoke faster",
            "grade": "D",
            "correct": false,
            "consequence": "Visibility is too low for higher speed. You nearly rear-end a slower vehicle. Smoke extends for miles — you can't outrun it on this road.",
            "teaching_point": "Smoke is not a wall you punch through. It's a region you traverse carefully. Match speed to visibility, always."
          }
        ]
      }
    ],
    "debrief": {
      "title": "Scenario Debrief",
      "core_lesson": "Wildfire evacuation is decided in the warning phase, not the order phase. The people who survive wind-driven fires are the ones who treat warnings as departure prep, choose survivable routes over fast ones, and never converge on the threat.",
      "key_skills_tested": [
        "Warning vs. order interpretation",
        "Rapid prioritized packing (six P's)",
        "Family rally-point logic under separation",
        "Wildfire-aware route selection",
        "Smoke management in a vehicle"
      ],
      "grade_thresholds": {
        "A": { "min_score": 90, "label": "Expert Survivor", "description": "You understand that wildfire survival is about decisions made before the panic phase. Your sequencing was textbook." },
        "B": { "min_score": 75, "label": "Capable Survivor", "description": "Solid evacuation instincts with a few avoidable losses of time or margin." },
        "C": { "min_score": 60, "label": "Struggling Survivor", "description": "You got out, but several decisions added unnecessary risk. Re-read the route and rally-point lessons." },
        "D": { "min_score": 0, "label": "At Risk", "description": "Critical gaps in wildfire evacuation reasoning. These mistakes get people killed in real wind-driven fires." }
      },
      "option_grade_weights": {
        "A": 100,
        "B": 80,
        "B+": 85,
        "B-": 72,
        "C+": 65,
        "C": 60,
        "C-": 55,
        "D+": 45,
        "D": 30,
        "F": 0
      }
    }
  }
];
