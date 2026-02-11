// ... (Lógica anterior do Clima) ...
function updateWeather() {
    const card = document.getElementById("weather-card");
    const btn = card.querySelector(".update-btn");
    const status = card.querySelector(".status");
    
    btn.innerText = "Buscando...";
    btn.disabled = true;
    status.innerText = "Conectando ao satélite...";

    setTimeout(() => {
        const temps = [22, 23, 24, 25, 21];
        const icons = ["⛅", "⛈️", "☀️", "🌧️"];
        const randomTemp = temps[Math.floor(Math.random() * temps.length)];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        card.querySelector(".temp").innerText = randomTemp + "°C";
        card.querySelector(".icon").innerText = randomIcon;
        btn.innerText = "Atualizar Clima";
        btn.disabled = false;
        const now = new Date();
        status.innerText = "Atualizado às " + now.toLocaleTimeString();
    }, 1500);
}


// --- ANIMAÇÃO DE FUNDO (ÍCONES CLIMÁTICOS) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const weatherIcons = ['☀️', '☁️', '⚡', '💧', '❄️'];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class WeatherParticle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.icon = weatherIcons[Math.floor(Math.random() * weatherIcons.length)];
        this.size = Math.random() * 20 + 10;
        this.speedY = Math.random() * 0.5 + 0.1; // Cai devagar (como chuva/neve)
        this.speedX = Math.random() * 0.4 - 0.2; // Vento leve
        this.opacity = Math.random() * 0.3 + 0.1;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.y > height) this.y = -20;
        if (this.x > width) this.x = 0;
        else if (this.x < 0) this.x = width;
    }

    draw() {
        ctx.font = `${this.size}px Arial`; // Emoji precisa de fonte padrão
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.icon, this.x, this.y);
        ctx.globalAlpha = 1;
    }
}

function initAnimation() {
    resize();
    particles = [];
    const count = 40;
    for(let i=0; i<count; i++) particles.push(new WeatherParticle());
    animate();
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
initAnimation();
