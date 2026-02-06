function updateWeather() {
    const card = document.getElementById("weather-card");
    const btn = card.querySelector(".update-btn");
    const status = card.querySelector(".status");
    
    // Simula estado de carregamento
    btn.innerText = "Buscando...";
    btn.disabled = true;
    status.innerText = "Conectando ao satélite...";

    setTimeout(() => {
        // Gera dados aleatórios para simular mudança
        const temps = [22, 23, 24, 25, 21];
        const icons = ["⛅", "⛈️", "☀️", "🌧️"];
        
        const randomTemp = temps[Math.floor(Math.random() * temps.length)];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];

        // Atualiza UI
        card.querySelector(".temp").innerText = randomTemp + "°C";
        card.querySelector(".icon").innerText = randomIcon;
        
        // Reseta Botão
        btn.innerText = "Atualizar Clima";
        btn.disabled = false;
        
        // Atualiza hora
        const now = new Date();
        status.innerText = "Atualizado às " + now.toLocaleTimeString();

    }, 1500);
}
