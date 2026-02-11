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

// --- FUNDO: ÍCONES VETORIAIS GEOMÉTRICOS (PREMIUM FLAT DESIGN) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let icons = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initAnimation();
}

// Desenho de um Sol Moderno (Círculo com raios geométricos)
function drawModernSun(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#00ff88'; // Verde Neon
    
    // Núcleo
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Raios (Retângulos arredondados)
    for (let i = 0; i < 8; i++) {
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(size * 0.8, -2, size * 0.4, 4);
    }
    ctx.restore();
}

// Desenho de uma Nuvem Sólida (Composta por círculos e base plana)
function drawModernCloud(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#00d2ff'; // Ciano
    
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2); // Esquerda
    ctx.arc(size * 0.5, -size * 0.3, size * 0.6, 0, Math.PI * 2); // Meio
    ctx.arc(size, 0, size * 0.4, 0, Math.PI * 2); // Direita
    ctx.rect(0, -size * 0.1, size, size * 0.5); // Base plana
    ctx.fill();
    ctx.restore();
}

// Desenho de um Raio Estilizado (Forma de Z agressiva)
function drawModernBolt(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#00ff88';
    
    ctx.beginPath();
    ctx.moveTo(size * 0.2, -size);
    ctx.lineTo(-size * 0.4, 0);
    ctx.lineTo(0, 0);
    ctx.lineTo(-size * 0.2, size);
    ctx.lineTo(size * 0.4, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Desenho de Gotas de Chuva (Geométricas)
function drawModernRain(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = '#00d2ff';
    
    for(let i=0; i<3; i++) {
        ctx.beginPath();
        ctx.arc(i*15, i*10, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

class WeatherElement {
    constructor(type, x, y, size) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = Math.random() * 0.2 + 0.05;
        this.pulse = Math.random() * Math.PI; // Início aleatório do pulso
    }

    update() {
        this.pulse += 0.02;
        // Pulsação suave usando seno
        this.currentOpacity = this.opacity + (Math.sin(this.pulse) * 0.05);
    }

    draw() {
        if (this.type === 'sun') drawModernSun(this.x, this.y, this.size, this.currentOpacity);
        else if (this.type === 'cloud') drawModernCloud(this.x, this.y, this.size, this.currentOpacity);
        else if (this.type === 'bolt') drawModernBolt(this.x, this.y, this.size, this.currentOpacity);
        else if (this.type === 'rain') drawModernRain(this.x, this.y, this.size, this.currentOpacity);
    }
}

function initAnimation() {
    icons = [];
    const stepX = width / 4;
    const stepY = height / 3;

    // Distribuição em grade para evitar bagunça e sobreposição
    const types = ['sun', 'cloud', 'bolt', 'rain'];
    
    for(let i = 0; i < 4; i++) {
        for(let j = 0; j < 3; j++) {
            // Adiciona um deslocamento aleatório leve para não parecer uma grade perfeita de Excel
            const x = (i * stepX) + (stepX/2) + (Math.random() * 40 - 20);
            const y = (j * stepY) + (stepY/2) + (Math.random() * 40 - 20);
            const type = types[(i + j) % types.length];
            icons.push(new WeatherElement(type, x, y, 40));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    icons.forEach(icon => {
        icon.update();
        icon.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
// Start
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
initAnimation();
animate();
