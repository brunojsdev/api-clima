function updateWeather() {
    const card = document.getElementById("weather-card");
    const btn = card.querySelector(".update-btn");
    const status = card.querySelector(".status");
    btn.innerText = "Buscando..."; btn.disabled = true; status.innerText = "Conectando ao satélite...";
    setTimeout(() => {
        card.querySelector(".temp").innerText = Math.floor(Math.random()*10 + 20) + "°C";
        btn.innerText = "Atualizar Clima"; btn.disabled = false;
        status.innerText = "Atualizado às " + new Date().toLocaleTimeString();
    }, 1500);
}

// --- FUNDO: ÍCONES NEON LINEARES (BASEADOS NA REFERÊNCIA) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height, icons = [];

const drawNeonIcon = {
    sun: (ctx, x, y, s) => {
        ctx.beginPath(); ctx.arc(x, y, s*0.6, 0, Math.PI*2); ctx.stroke();
        for(let i=0; i<8; i++){
            const a = (Math.PI*2*i)/8;
            ctx.moveTo(x+Math.cos(a)*s*0.8, y+Math.sin(a)*s*0.8);
            ctx.lineTo(x+Math.cos(a)*s*1.1, y+Math.sin(a)*s*1.1);
        }
        ctx.stroke();
    },
    cloud: (ctx, x, y, s) => {
        ctx.beginPath();
        ctx.arc(x-s*0.4, y, s*0.4, Math.PI*0.8, Math.PI*1.5);
        ctx.arc(x, y-s*0.4, s*0.5, Math.PI*1.1, Math.PI*0.1);
        ctx.arc(x+s*0.5, y, s*0.4, Math.PI*1.5, Math.PI*0.2);
        ctx.lineTo(x-s*0.5, y+s*0.1); ctx.stroke();
    },
    bolt: (ctx, x, y, s) => {
        ctx.beginPath(); ctx.moveTo(x+s*0.2, y-s); ctx.lineTo(x-s*0.3, y);
        ctx.lineTo(x+s*0.2, y); ctx.lineTo(x-s*0.2, y+s); ctx.stroke();
    },
    rain: (ctx, x, y, s) => {
        for(let i=0; i<3; i++){
            ctx.beginPath(); ctx.moveTo(x-s*0.3 + i*s*0.3, y-s*0.2);
            ctx.lineTo(x-s*0.5 + i*s*0.3, y+s*0.3); ctx.stroke();
        }
    }
};

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    icons = [];
    const types = ['sun', 'cloud', 'bolt', 'rain'];
    for(let i=0; i<12; i++){
        icons.push({
            type: types[i%4], x: (i%4)*(width/4) + width/8, y: Math.floor(i/4)*(height/3) + height/6,
            s: 40, op: 0.15, p: Math.random()*Math.PI
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    icons.forEach(icon => {
        icon.p += 0.015;
        let op = 0.1 + Math.sin(icon.p) * 0.1;
        ctx.strokeStyle = '#00ffcc';
        ctx.shadowBlur = 10; ctx.shadowColor = '#00ffcc';
        ctx.lineWidth = 2;
        ctx.globalAlpha = Math.max(0.05, op);
        drawNeonIcon[icon.type](ctx, icon.x, icon.y, icon.s);
        ctx.shadowBlur = 0;
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize(); animate();
