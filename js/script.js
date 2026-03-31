const chatBtn = document.getElementById("chat-btn");
const chatContainer = document.getElementById("chat-container");
const chatClose = document.getElementById("chat-close");

chatBtn.addEventListener("click", () => {
  chatContainer.style.display = "flex";
  chatBtn.style.display = "none";
});

chatClose.addEventListener("click", () => {
  chatContainer.style.display = "none";
  chatBtn.style.display = "block";
});

const baseDeDatosBot = [
  {
    palabras: ["gratis", "pago", "precio", "cuesta", "cobran"],
    respuesta:
      "El precio de nuestro plan básico es Gs. 0 (100% gratis). También contamos con un plan Premium por Gs. 40.000 al mes con funciones ilimitadas.",
  },
  {
    palabras: ["horario", "hora", "atienden"],
    respuesta:
      "Nuestro sistema funciona 24/7, pero si necesitas soporte humano, nuestro horario de atención es de Lunes a Viernes de 08:00 a 18:00 hs.",
  },
  {
    palabras: ["métodos", "pomodoro", "estudio", "técnica"],
    respuesta:
      "Actualmente incluimos un temporizador Pomodoro integrado y un sistema de repasos espaciados para memorizar mejor.",
  },
  {
    palabras: ["celular", "móvil", "teléfono", "app", "tablet"],
    respuesta:
      "Sí, nuestra plataforma web es totalmente adaptable y funciona perfectamente en cualquier dispositivo móvil.",
  },
  {
    palabras: ["notificaciones", "avisos", "alertas"],
    respuesta:
      "Puedes configurar alertas por correo o en tu navegador 24 horas y 1 hora antes de una entrega.",
  },
  {
    palabras: ["compartir", "grupo", "compañeros"],
    respuesta:
      'Sí, puedes crear "Grupos de Estudio" y compartir fechas de entregas de trabajos grupales.',
  },
  {
    palabras: ["contraseña", "olvidé", "recuperar", "clave"],
    respuesta:
      'En el inicio de sesión, haz clic en "Olvidé mi contraseña" y te enviaremos un correo seguro para recuperarla.',
  },
  {
    palabras: ["descargar", "instalar", "bajar"],
    respuesta:
      "Puedes usar EstudiaSmart directamente en tu navegador sin instalar nada, o si prefieres, descargar la app oficial desde Google Play y la App Store.",
  },
  {
    palabras: ["internet", "wifi", "offline", "conexión", "datos"],
    respuesta:
      '¡Excelente pregunta! Puedes anotar tus tareas en modo "offline" (sin internet). Cuando vuelvas a tener conexión, todo se guardará en la nube automáticamente.',
  },
  {
    palabras: ["contacto", "ayuda", "soporte", "humano", "hablar"],
    respuesta:
      "Si el sistema te falla o necesitas ayuda más específica, puedes escribirnos directamente a soporte@estudiasmart.com.",
  },
  {
    palabras: ["consejo", "tip", "tips", "recomendación", "útil", "ayúdame"],
    respuesta:
      "💡 TIP ÚTIL DE ESTUDIO: Tu cerebro no puede concentrarse más de 40 minutos seguidos. Usa nuestra función Pomodoro para estudiar 25 minutos y descansa 5. En tu descanso, ¡levántate y toma agua!",
  },
];

const inputChat = document.getElementById("chat-input");
const btnEnviar = document.getElementById("chat-send");
const cajaMensajes = document.getElementById("chat-messages");

function agregarMensaje(texto, tipo) {
  const msjDiv = document.createElement("div");
  msjDiv.classList.add("message");
  msjDiv.classList.add(tipo === "usuario" ? "user-message" : "bot-message");
  msjDiv.innerText = texto;
  cajaMensajes.appendChild(msjDiv);
  cajaMensajes.scrollTop = cajaMensajes.scrollHeight;
}

function procesarPregunta(pregunta) {
  let textoLimpio = pregunta.toLowerCase();
  let respuestaBot =
    "Lo siento, no entendí bien. Intenta pedirme un 'consejo' o pregúntame sobre precios, contraseña, descargar la app o soporte técnico.";

  for (let item of baseDeDatosBot) {
    let coincide = item.palabras.some((palabra) =>
      textoLimpio.includes(palabra),
    );
    if (coincide) {
      respuestaBot = item.respuesta;
      break;
    }
  }

  // Medio segundo de retraso simulando que piensa
  setTimeout(() => {
    agregarMensaje(respuestaBot, "bot");
  }, 600);
}

btnEnviar.addEventListener("click", () => {
  let textoUsuario = inputChat.value.trim();
  if (textoUsuario !== "") {
    agregarMensaje(textoUsuario, "usuario");
    inputChat.value = "";
    procesarPregunta(textoUsuario);
  }
});

inputChat.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btnEnviar.click();
  }
});
