const chatBtn = document.getElementById('chat-btn');
const chatContainer = document.getElementById('chat-container');
const chatClose = document.getElementById('chat-close');
const inputChat = document.getElementById('chat-input');
const btnEnviar = document.getElementById('chat-send');
const cajaMensajes = document.getElementById('chat-messages');
const areaInputText = document.getElementById('chat-input-area'); 

let isFreeTextMode = false;

chatBtn.addEventListener('click', () => {
    chatContainer.style.display = 'flex';
    chatBtn.style.display = 'none';

    if (cajaMensajes.children.length === 0) {
        cargarNodoArbol("root");
    }
});

chatClose.addEventListener('click', () => {
    chatContainer.style.display = 'none';
    chatBtn.style.display = 'block';
});

function agregarMensaje(texto, tipo) {
    const msjDiv = document.createElement('div');
    msjDiv.classList.add('message', tipo === 'usuario' ? 'user-message' : 'bot-message');
    msjDiv.innerText = texto;
    cajaMensajes.appendChild(msjDiv);
    cajaMensajes.scrollTop = cajaMensajes.scrollHeight; 
}

function agregarBotones(opciones) {
    const divBotones = document.createElement('div');
    divBotones.style.display = 'flex';
    divBotones.style.flexDirection = 'column';
    divBotones.style.gap = '5px';
    divBotones.style.marginBottom = '10px';

    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.innerText = opcion.label;
        btn.classList.add('btn', 'btn-outline-primary', 'btn-sm');
        
        btn.addEventListener('click', () => {
            agregarMensaje(opcion.label, 'usuario'); 
            cargarNodoArbol(opcion.next); 
        });
        
        divBotones.appendChild(btn);
    });

    cajaMensajes.appendChild(divBotones);
    cajaMensajes.scrollTop = cajaMensajes.scrollHeight;
}

async function cargarNodoArbol(nodeId) {
    try {
        const res = await fetch('http://localhost:3000/api/tree', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nodeId: nodeId })
        });
        const nodo = await res.json();

        agregarMensaje(nodo.text, 'bot');

        if (nodo.options && nodo.options.length > 0) {
            agregarBotones(nodo.options);
        }

        isFreeTextMode = nodo.isFreeText;
        areaInputText.style.display = isFreeTextMode ? 'flex' : 'none';

    } catch (e) {
        agregarMensaje("Error de conexión con el servidor.", "bot");
    }
}

async function procesarTextoLibre(pregunta) {
    try {
        const res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pregunta: pregunta })
        });
        const datos = await res.json();
        agregarMensaje(datos.respuesta, 'bot');
    } catch (error) {
        agregarMensaje("Error de conexión.", 'bot');
    }
}

btnEnviar.addEventListener('click', () => {
    let texto = inputChat.value.trim();
    if (texto !== "") {
        agregarMensaje(texto, 'usuario');
        inputChat.value = "";
        procesarTextoLibre(texto);
    }
});

inputChat.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnEnviar.click();
});