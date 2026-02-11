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

// --- FUNDO: ÍCONES DE CLIMA VETORIAIS (ESTILO APP) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let icons = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initAnimation();
}

// Funções de desenho para formas específicas
function drawSun(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = '#00ff88'; // Verde Neon
    ctx.lineWidth = 3;
    
    // Círculo central
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.stroke();

    // Raios
    for(let i=0; i<8; i++) {
        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(size + 5, 0);
        ctx.lineTo(size + 15, 0);
        ctx.stroke();
    }
    ctx.restore();
}

function drawCloud(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = '#00d2ff'; // Ciano
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.arc(0, 0, size, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(size * 0.7, -size * 0.5, size * 0.7, Math.PI * 1, Math.PI * 1.85);
    ctx.arc(size * 1.4, 0, size * 0.5, Math.PI * 1.37, Math.PI * 0.5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function drawLightning(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(10, -size);
    ctx.lineTo(-5, 0);
    ctx.lineTo(5, 0);
    ctx.lineTo(-10, size);
    ctx.stroke();
    ctx.restore();
}

class WeatherShape {
    constructor(type, x, y, size) {
        this.type = type; // 'sun', 'cloud', 'lightning'
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.pulseSpeed = Math.random() * 0.005 + 0.002;
        this.pulseDir = 1;
    }

    update() {
        this.opacity += this.pulseSpeed * this.pulseDir;
        if (this.opacity > 0.5 || this.opacity < 0.1) {
            this.pulseDir *= -1;
        }
    }

    draw() {
        if (this.type === 'sun') drawSun(this.x, this.y, this.size, this.opacity);
        else if (this.type === 'cloud') drawCloud(this.x, this.y, this.size, this.opacity);
        else if (this.type === 'lightning') drawLightning(this.x, this.y, this.size, this.opacity);
    }
}

function initAnimation() {
    icons = [];
    
    // Posicionamento manual para evitar sobreposição (Grid 2x2 imaginário)
    // Canto Superior Esquerdo
    icons.push(new WeatherShape('sun', width * 0.15, height * 0.2, 30));
    // Canto Superior Direito
    icons.push(new WeatherShape('cloud', width * 0.85, height * 0.15, 40));
    // Canto Inferior Esquerdo
    icons.push(new WeatherShape('cloud', width * 0.1, height * 0.85, 35));
    // Canto Inferior Direito
    icons.push(new WeatherShape('lightning', width * 0.9, height * 0.8, 40));
    // Centro Esquerda
    icons.push(new WeatherShape('lightning', width * 0.05, height * 0.5, 25));
    // Centro Direita
    icons.push(new WeatherShape('sun', width * 0.95, height * 0.4, 25));
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    icons.forEach(i => {
        i.update();
        i.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
// Inicializa
width = canvas.width = window.innerWidth;
height = canvas.height = window.innerHeight;
initAnimation();
animate();
