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
        image: "assets/images/pipeline_robot.jpg",
        gallery: ["assets/images/pipeline_robot2.jpg"],
        status: "Research prototype",
        featured: true
    },

    {
        slug: "vehicle",
        title: "Self-Navigating Vehicle",
        tag: "Control Systems",
        summary: "An autonomous prototype vehicle featuring custom hardware integration for navigation, steering, and speed modulation. Utilizes MATLAB for hardware-in-the-loop control logic to execute real-time obstacle avoidance and dynamic acceleration across uneven terrain.",
        caseStudy: [
            {
                heading: "Real-World Application",
                text: "Serves as a foundational prototype for autonomous transport mechanics, demonstrating how raw sensor data is translated into physical steering and throttle actuation in real-world, unpredictable environments."
            },
            {
                heading: "Methodology & Architecture",
                text: "The project heavily emphasized physical mechatronic integration. The navigation and motor control logic was formulated using MATLAB, interfacing directly with the onboard microcontroller hardware."
            },
            {
                heading: "Control Logic",
                text: "Engineered the physical steering linkages and drive motor controls to respond to sensor inputs. The control loops dynamically manage acceleration and deceleration specifically tailored for terrain variations, such as identifying and safely traversing speed bumps while maintaining autonomous trajectory."
            }
        ],
        tech: ["MATLAB", "Hardware Integration", "Control Systems", "Mechatronics", "Sensors"],
        image: "assets/images/autonomous_vehicle.jpg",
        gallery: [],
        status: "Research prototype",
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
    }
];
