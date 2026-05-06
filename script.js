// Funzione per aprire la finestra modale
function openModal(id) {
    document.getElementById(id).style.display = "block";
    document.body.style.overflow = "hidden"; // Blocca lo scroll dello sfondo
}

// Funzione per chiudere la finestra modale
function closeModal(id) {
    document.getElementById(id).style.display = "none";
    document.body.style.overflow = "auto"; // Riattiva lo scroll
}

// Chiude la modale se clicchi fuori dalla finestra della descrizione
window.onclick = function(event) {
    if (event.target.className === "modal") {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('visualizerCanvas');
    if (!canvas) {
        console.error("Canvas non trovato!");
        return;
    }

    const ctx = canvas.getContext('2d');
    
    // Forziamo le dimensioni
    canvas.width = 700;
    canvas.height = 700;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 175; // Esattamente sul bordo del cerchio da 350px
    const barCount = 300; 
    let time = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        time += 0.03;

        for (let i = 0; i < barCount; i++) {
            const angle = (i * (Math.PI * 2)) / barCount;

            // Frequenza per avere tante piccole barre "nervose" (i * 0.2)
            const noise = Math.sin(i * 0.2 + time) * Math.cos(i * 0.3 + time * 0.5);
            const amplitude = 50; 
            const currentHeight = noise * amplitude;

            // Coordinate: Radius centrale +/- altezza
            const xStart = centerX + Math.cos(angle) * (baseRadius - currentHeight);
            const yStart = centerY + Math.sin(angle) * (baseRadius - currentHeight);
            const xEnd = centerX + Math.cos(angle) * (baseRadius + currentHeight);
            const yEnd = centerY + Math.sin(angle) * (baseRadius + currentHeight);

            ctx.beginPath();
            ctx.moveTo(xStart, yStart);
            ctx.lineTo(xEnd, yEnd);

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "#00d2ff"; // Azzurro Neon
            ctx.lineCap = 'round';
            
            // Togliamo il shadowBlur per ora (a volte i browser lenti non lo caricano)
            ctx.stroke();
        }

        requestAnimationFrame(draw);
    }

    draw();
});

// --- GESTIONE MODALI ---

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Blocca lo scroll dello sfondo
    } else {
        console.error("Errore: Modale con ID '" + id + "' non trovato!");
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Riattiva lo scroll
    }
}

// Chiude il modale se clicchi sulla parte scura esterna
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
});