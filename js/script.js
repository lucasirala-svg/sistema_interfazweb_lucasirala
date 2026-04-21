const chatBtn = document.getElementById('chat-btn');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const inputChat = document.getElementById('chat-input');
const btnEnviar = document.getElementById('chat-send');
const cajaMensajes = document.getElementById('chat-messages');

chatBtn.addEventListener('click', () => {
    chatContainer.style.display = 'flex';
    chatBtn.style.display = 'none';
});

chatClose.addEventListener('click', () => {
    chatContainer.style.display = 'none';
    chatBtn.style.display = 'block';
});

function agregarMensaje(texto, tipo) {
    const msjDiv = document.createElement('div');
    msjDiv.classList.add('message');
    msjDiv.classList.add(tipo === 'usuario' ? 'user-message' : 'bot-message');
    msjDiv.innerText = texto;
    cajaMensajes.appendChild(msjDiv);
    cajaMensajes.scrollTop = cajaMensajes.scrollHeight; 
}

async function procesarPregunta(pregunta) {
    try {
        const msjEscribiendo = document.createElement('div');
        msjEscribiendo.classList.add('message', 'bot-message');
        msjEscribiendo.innerHTML = "<em>Escribiendo... ✍️</em>";
        msjEscribiendo.id = "escribiendo-temp"; 
        cajaMensajes.appendChild(msjEscribiendo);
        cajaMensajes.scrollTop = cajaMensajes.scrollHeight;

        const respuestaServidor = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pregunta: pregunta })
        });

        const datos = await respuestaServidor.json();

        setTimeout(() => {
            const temp = document.getElementById('escribiendo-temp');
            if(temp) temp.remove();

            agregarMensaje(datos.respuesta, 'bot');
        }, 1000); 
        
    } catch (error) {
        const temp = document.getElementById('escribiendo-temp');
        if(temp) temp.remove();
        agregarMensaje("Error: El servidor backend está desconectado. Por favor, enciéndelo ejecutando 'node server.js'.", 'bot');
    }
}

btnEnviar.addEventListener('click', () => {
    let textoUsuario = inputChat.value.trim();
    if (textoUsuario !== "") {
        agregarMensaje(textoUsuario, 'usuario'); 
        inputChat.value = ""; 
        procesarPregunta(textoUsuario); 
    }
});

inputChat.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        btnEnviar.click();
    }
});