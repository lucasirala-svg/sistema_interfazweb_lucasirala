const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); 
app.use(express.json()); 

const baseDeDatosBot = [
  { palabras:["gratis", "pago", "precio", "cuesta", "cobran"], respuesta: "El precio de nuestro plan básico es Gs. 0 (100% gratis). También contamos con un plan Premium por Gs. 40.000 al mes con funciones ilimitadas." },
  { palabras:["horario", "hora", "atienden"], respuesta: "Nuestro sistema funciona 24/7, pero si necesitas soporte humano, nuestro horario de atención es de Lunes a Viernes de 08:00 a 18:00 hs." },
  { palabras: ["métodos", "pomodoro", "estudio", "técnica"], respuesta: "Actualmente incluimos un temporizador Pomodoro integrado y un sistema de repasos espaciados para memorizar mejor." },
  { palabras:["celular", "móvil", "teléfono", "app", "tablet"], respuesta: "Sí, nuestra plataforma web es totalmente adaptable y funciona perfectamente en cualquier dispositivo móvil." },
  { palabras: ["notificaciones", "avisos", "alertas"], respuesta: "Puedes configurar alertas por correo o en tu navegador 24 horas y 1 hora antes de una entrega." },
  { palabras:["compartir", "grupo", "compañeros"], respuesta: 'Sí, puedes crear "Grupos de Estudio" y compartir fechas de entregas de trabajos grupales.' },
  { palabras:["contraseña", "olvidé", "recuperar", "clave"], respuesta: 'En el inicio de sesión, haz clic en "Olvidé mi contraseña" y te enviaremos un correo seguro para recuperarla.' },
  { palabras:["descargar", "instalar", "bajar"], respuesta: "Puedes usar EstudiaSmart directamente en tu navegador sin instalar nada, o si prefieres, descargar la app oficial." },
  { palabras:["internet", "wifi", "offline", "conexión", "datos"], respuesta: '¡Excelente pregunta! Puedes anotar tus tareas en modo offline. Al tener conexión, todo se guardará en la nube.' },
  { palabras:["contacto", "ayuda", "soporte", "humano", "hablar"], respuesta: "Puedes escribirnos directamente a soporte@estudiasmart.com." },
  { palabras:["consejo", "tip", "tips", "recomendación", "útil", "ayúdame"], respuesta: "💡 TIP: Tu cerebro no se concentra más de 40 min. Usa Pomodoro: estudia 25 min, descansa 5." }
];

app.post('/api/chat', (req, res) => {
    const preguntaUsuario = req.body.pregunta.toLowerCase();
    
    let respuestaFinal = "No entendí tu consulta, ¿podés reformularla?";

    for (let item of baseDeDatosBot) {
        let coincide = item.palabras.some(palabra => preguntaUsuario.includes(palabra));
        if (coincide) {
            respuestaFinal = item.respuesta;
            break;
        }
    }

    res.json({ respuesta: respuestaFinal });
});

const PUERTO = 3000;
app.listen(PUERTO, () => {
    console.log(`✅ Servidor EstudiaSmart corriendo en http://localhost:${PUERTO}`);
});