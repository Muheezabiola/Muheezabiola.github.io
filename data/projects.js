/* =====================================================================
   PROJECT DATA — single source of truth for the whole portfolio.
   Both index.html and projects.html render from this array.

   Fields
     slug       unique id, used for deep links (projects.html?p=slug)
     title      project name
     tag        primary category — drives the filters on projects.html
     summary    short overview, shown on cards and atop the modal
     caseStudy  expanded case study { heading, text } shown in the modal
     tech       full tag list, rendered as chips
     image      card / hero image
     gallery    extra images shown in the modal
     status     build maturity label
     featured   true renders the project on the index page

   To add a NEW project: copy an entry below, change the fields,
   and drop the image into assets/images/.
   ===================================================================== */

window.PROJECTS = [
    {
        slug: "lifeguard",
        title: "Life-Guard Node",
        tag: "Cyber-Physical",
        summary: "A decentralized hardware node that serves as both a community utility and a pipeline Guardian node. The benchtop proof-of-concept features a scaled solar-powered telemedical kiosk integrated with a simulated fluid pipeline testbed to prove a value-based security model.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Pipeline security relying on coercive force creates community friction and sabotage. This project introduces a \"Symbiotic Interlock\" model, deploying hardened telemetry nodes that simultaneously serve as community micro-utility hubs (telemedicine and charging) to naturally disincentivize infrastructure vandalism."
            },
            {
                heading: "Clinical Brain & AI",
                text: "The node utilizes a contactless MLX90614 sensor as a gatekeeper before initiating diagnostics. The system processes SpO2, heart rate, and internal temperature, cross-referencing this data with an MQ-135 Air Quality Index (AQI) sensor via the Gemini AI API for predictive health verdicts regarding localized gas flaring."
            },
            {
                heading: "Safety Interlock",
                text: "Utilizing an ESP32 and a 15km LoRa SX1278 link, the node actively monitors for pipeline breaches. If a leak is simulated via the fluid flow assembly, the system triggers an intrinsically safe interlock, instantly cutting power at the charging kiosk to eliminate ignition risks while dispatching automated WhatsApp alerts."
            }
        ],
        tech: ["Cyber-Physical Systems", "Gemini AI", "Telemedicine", "LoRa", "ESP32"],
        image: "assets/images/life-guard1.jpeg",
        gallery: ["assets/images/lifeguard2.jpeg", "assets/images/lifeguard3.jpeg"],
        status: "Benchtop proof-of-concept",
        featured: true
    },

    {
        slug: "pipeline",
        title: "Pipeline Robot",
        tag: "Robotics",
        summary: "A semi-autonomous pipeline inspection rover utilizing a Raspberry Pi architecture. Integrates a semi-circular array of ultrasonic sensors for physical hazard detection, automated email alerting, and bidirectional RESTful API teleoperation for constrained environments.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Replaces dangerous manual inspections in enclosed, high-risk industrial pipelines. The semi-autonomous functionality ensures the rover can safely halt itself before colliding with debris or structural collapses, even if the human operator loses visual feed."
            },
            {
                heading: "Methodology & Architecture",
                text: "The core logic is executed via Python on a Raspberry Pi. The hardware relies on three strategically placed ultrasonic sensors arranged in a 180-degree array across the front of the chassis to detect pipeline blockages."
            },
            {
                heading: "Control Logic",
                text: "Upon detecting an obstacle within a critical threshold, the rover autonomously halts and initiates an SMTP email alert to the operator. It remains in a safe state until the obstacle is cleared or it receives a manual REST API teleoperation command to reverse course and return to base."
            }
        ],
        tech: ["Python", "REST API", "Wireless Comms", "Robotics", "Raspberry Pi", "Ultrasonic"],
        image: "assets/images/pipeline_robot.png",
        gallery: ["assets/images/pipeline_robot2.jpg"],
        status: "Research prototype",
        featured: true
    },

    {
        slug: "plugguard",
        title: "PlugGuard",
        tag: "IoT",
        summary: "A high-capacity (30A) IoT smart plug engineered for energy management, home automation, and safety monitoring. Features cross-platform Flutter integration for manual or autonomous appliance control based on environmental triggers, complete with real-time hazard detection and automated messaging alerts.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Designed to prevent electrical fires and optimize energy consumption in residential and industrial settings. By supporting 30A relays, the system safely manages high-load appliances that standard smart plugs cannot handle."
            },
            {
                heading: "Methodology & Architecture",
                text: "The system architecture is built on a direct Wi-Fi micro-controller (operating without a SIM card) connected to a Firebase backend. Appliance actuation is handled either manually via the Flutter interface (Android, iOS, Web) or autonomously based on real-time temperature, ambient light, or timer configurations."
            },
            {
                heading: "Safety Logic",
                text: "Integrates air quality and smoke sensors. Upon detecting hazardous gas or smoke, the firmware triggers a local alarm, physically disconnects the appliance via the relay, and pushes an immediate WhatsApp notification to the user. The app continuously records usage history to provide estimated energy consumption metrics."
            }
        ],
        tech: ["IoT", "Energy Optimization", "Air Quality", "Safety", "Flutter", "ESP32", "Firebase"],
        image: "assets/images/plugguard.jpg",
        gallery: [],
        status: "Working prototype",
        featured: true
    },

    {
        slug: "drier",
        title: "Automated Food Drier",
        tag: "Automation",
        summary: "A solar-powered agricultural food preservation system featuring environmental telemetry and dual-mode operation. Integrates manual keypad inputs and a cross-platform Flutter application for autonomous temperature and humidity regulation.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Provides an off-grid, highly efficient food preservation solution for rural agriculture. By utilizing solar power, it prevents crop spoilage in regions with unstable electrical infrastructure."
            },
            {
                heading: "Methodology & Architecture",
                text: "The hardware integrates a ready-made solar charge controller to manage battery regeneration. Environmental telemetry (temperature and humidity) is fed into the microcontroller to determine the optimal drying environment."
            },
            {
                heading: "Control Logic",
                text: "Features a dual-interface system. Users can interact locally via a physical keypad or remotely via a Flutter application. Both interfaces allow the user to toggle between manual overrides or a fully autonomous mode that dynamically adjusts internal climate parameters."
            }
        ],
        tech: ["Solar Energy", "Flutter", "Environmental Telemetry", "Automation", "Firebase"],
        image: "assets/images/food_drier.jpg",
        gallery: [],
        status: "Working prototype",
        featured: true
    },

    {
        slug: "antitheft",
        title: "Motorcycle Anti-Theft",
        tag: "Security",
        summary: "A kinematic security system utilizing accelerometer data to monitor motorcycle orientation and physical load disturbances. Features multi-channel alerting and real-time Google Maps GPS tracking via a dedicated Flutter application.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Provides active deterrence and recovery tracking for urban vehicle theft. Rather than relying on easily bypassed ignition locks, the system monitors the physical state of the motorcycle itself."
            },
            {
                heading: "Methodology & Architecture",
                text: "Integrates a high-sensitivity accelerometer to monitor the bike's parking orientation. The logic is calibrated to detect unauthorized load sensing (e.g., an individual sitting on the seat) or a change in kickstand angle."
            },
            {
                heading: "Control Logic",
                text: "Upon detecting a kinematic disturbance, the system initiates a dual-layer communication protocol. It attempts to send a data-based alert, defaulting to a standard SMS payload if internet connectivity fails. The user can then open the integrated Flutter app to view a live, continuously updating Google Maps feed of the vehicle's GPS coordinates."
            }
        ],
        tech: ["Kinematics", "GPS/GSM", "Flutter", "Asset Security", "Telemetry"],
        image: "assets/images/anti_theft.jpg",
        gallery: [],
        status: "Working prototype",
        featured: true
    },

    {
        slug: "pills",
        title: "Smart Pill Dispenser",
        tag: "HealthTech",
        summary: "An automated medication administration system driven by precision stepper motor control. Ensures accurate dosage scheduling and dispensing while utilizing cloud-based mobile alerting to improve patient adherence.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Directly targets the healthcare challenge of medication non-adherence in geriatric and memory-care patients by removing the necessity for manual dose tracking."
            },
            {
                heading: "Methodology & Architecture",
                text: "Replaced standard servo actuation with high-precision stepper motor control to ensure exact rotational alignment of the medication carousel. This prevents pill jamming and ensures only the correct compartment is exposed at the scheduled time."
            },
            {
                heading: "Control Logic",
                text: "The hardware queries a cloud-based schedule. Upon dispensing, the system utilizes mobile alerting to notify caretakers or family members if a dosage was successfully retrieved or missed."
            }
        ],
        tech: ["Stepper Control", "IoT", "HealthTech", "Mobile Alerting", "Firebase"],
        image: "assets/images/pills_dispenser.jpg",
        gallery: [],
        status: "Working prototype",
        featured: true
    },

    {
        slug: "tracker-270",
        title: "270° Autonomous Tracking Camera",
        tag: "Security",
        summary: "An autonomous tracking camera system engineered to maximize spatial coverage without requiring a multi-camera network. Utilizes overlapping spatial geometry to detect motion and actuate edge hardware for localized visual surveillance.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Standard fixed-lens security cameras suffer from limited fields of view, creating blind spots that compromise perimeter monitoring. This solution provides ultra-wide surveillance coverage for resource-constrained environments by actively tracking and verifying peripheral motion."
            },
            {
                heading: "Sensing Architecture",
                text: "The design integrates two PIR motion sensors angled at 90 degrees to exploit their native 180-degree sweep. This overlapping physical arrangement effectively creates a continuous 270-degree detection zone around the central hardware."
            },
            {
                heading: "Actuation & Alerting",
                text: "Upon detecting motion in the peripheral zones, an ESP32-CAM mounted on an actuated mechanism pans directly toward the triggered sector. The system captures localized visual data, saves it to local SD storage, and transmits real-time image alerts over Wi-Fi via the Telegram API."
            }
        ],
        tech: ["Mechatronics", "ESP32-CAM", "Edge Telemetry", "Actuation", "Automation"],
        image: "assets/images/270-degree-camera.jpg",
        gallery: [],
        status: "Working prototype",
        featured: false
    },

    {
        slug: "grid-daq",
        title: "Grid-Edge Energy DAQ System",
        tag: "Energy",
        summary: "A customized data acquisition (DAQ) pipeline built to support edge-intelligence (TinyML) research. Leverages analog front-end metrology to process high-resolution electrical waveforms directly on-chip, streamlining decentralized demand-side management.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Decentralized solar microgrids frequently suffer from degraded inverters and battery banks due to unmonitored load surges. Advanced demand-side management requires high-resolution electrical waveforms processed directly at the edge, eliminating the latency and unreliability of cloud computation."
            },
            {
                heading: "Methodology & Architecture",
                text: "The hardware architecture bridges physical grid-edge metrology with theoretical machine learning. It utilizes non-invasive split-core current transformers (SCT-013) and precision voltage transformers (ZMPT101B) to safely step down high-voltage AC lines for microcontroller analog inputs."
            },
            {
                heading: "Signal Processing & Actuation",
                text: "Discrete-time sampling algorithms execute directly on the edge hardware, calculating True RMS Voltage, True RMS Current, and Active Power. An integrated relay bank allows for autonomous load shedding when total power exceeds thresholds, while telemetry is streamed over MQTT to a centralized dashboard."
            }
        ],
        tech: ["TinyML", "Data Acquisition", "True-RMS Metrology", "IoT Telemetry", "Smart Grid"],
        image: "assets/images/TinyML.jpeg",
        gallery: [],
        status: "Research prototype",
        featured: false
    }
];
