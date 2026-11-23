
// MATRIX BACKGROUND
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
let drops = Array(Math.floor(canvas.width / fontSize)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(5,8,15,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff9c";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];

        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    });
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
});

// CLOCK
function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// SCROLL
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// MODAL CONTENT
const content = {
    about: [
        "CYBERCORE is an interactive educational cybersecurity dashboard. Explore Linux concepts, network fundamentals, ethical hacking principles, digital privacy and security awareness."
    ],

    linux: [
        "Linux is an open-source operating system. It is widely used in servers, programming, cybersecurity and cloud computing. Kali Linux is a specialized Linux distribution designed for security education and authorized testing."
    ],

    security: [
        "Cybersecurity protects computers, networks, software and information from unauthorized access. Important areas include authentication, encryption, firewalls, backups and security awareness."
    ],

    network: [
        "A computer network connects devices so they can exchange information. Common concepts include IP addresses, DNS, routers, switches, ports and protocols."
    ],

    ethical: [
        "Ethical hacking is authorized security testing. Ethical hackers work within clear permission and scope, document weaknesses and help improve security without harming systems."
    ],

    privacy: [
        "Protect your privacy by using unique passwords, multifactor authentication, software updates, secure connections and careful sharing of personal information."
    ],

    glossary: [
        "IP Address: A network address assigned to a device. | DNS: A system that translates domain names into IP addresses. | Firewall: A security control that filters network traffic. | Encryption: Protects information by transforming it into a form that cannot easily be read without the proper key."
    ]
};

function showModal(type) {
    const modal = document.getElementById("modal");
    const title = document.getElementById("modalTitle");
    const text = document.getElementById("modalText");

    title.textContent = type.toUpperCase().replace("_", " ");
    text.textContent = content[type] || "Information unavailable.";

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

window.addEventListener("click", (e) => {
    if (e.target.id === "modal") {
        closeModal();
    }
});

// TERMINAL
const output = document.getElementById("terminalOutput");
const input = document.getElementById("commandInput");

function runCommand() {
    const command = input.value.trim().toLowerCase();

    if (!command) return;

    output.innerHTML += "\nuser@cybercore:~$ " + escapeHTML(command) + "\n";

    let response = "";

    switch(command) {
        case "help":
            response = `Available commands:

help      - show commands
about     - about CyberCore
date      - show date and time
whoami    - show current user
clear     - clear terminal
linux     - learn about Linux
security  - security tips
network   - networking concepts
matrix    - matrix effect info
`;
            break;

        case "about":
            response = "CyberCore is an interactive cybersecurity learning dashboard.";
            break;

        case "date":
            response = new Date().toString();
            break;

        case "whoami":
            response = "student@cybercore | Role: Cybersecurity Learner";
            break;

        case "linux":
            response = "Linux is an open-source operating system used for servers, development and security education.";
            break;

        case "security":
            response = "Security tip: Use unique passwords, enable MFA and keep software updated.";
            break;

        case "network":
            response = "Networking basics: IP, DNS, routers, switches, TCP and UDP.";
            break;

        case "matrix":
            response = "The Matrix background is running.";
            break;

        case "clear":
            output.textContent = "";
            input.value = "";
            return;

        default:
            response = "Command not recognized. Type 'help' for available commands.";
    }

    output.innerHTML += escapeHTML(response) + "\n";
    output.scrollTop = output.scrollHeight;
    input.value = "";
}

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter") runCommand();
});

// SAFE HTML DISPLAY
function escapeHTML(text) {
    return text.replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}

// PASSWORD STRENGTH
function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const bar = document.getElementById("strengthBar");
    const result = document.getElementById("passwordResult");

    let score = 0;

    if(password.length >= 8) score++;
    if(password.length >= 12) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;

    const percentage = (score / 6) * 100;
    bar.style.width = percentage + "%";

    if(password.length === 0) {
        result.innerHTML = "";
        bar.style.width = "0%";
        return;
    }

    let label;

    if(score <= 2) label = "Weak — consider a longer unique password";
    else if(score <= 4) label = "Moderate — improve its length and variety";
    else label = "Good characteristics — keep it unique";

    result.innerHTML = label + "<br>Score: " + score + "/6";
}

// ESCAPE CLOSE
document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeModal();
});
