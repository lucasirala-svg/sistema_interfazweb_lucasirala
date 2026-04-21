# Examen Final: Árbol de Decisiones y Flujo Conversacional

## 1. Diseño del Árbol de Decisiones (Dominio: EstudiaSmart)
El árbol de decisiones está diseñado para resolver las consultas más comunes mediante un flujo guiado (onboarding y soporte), evitando la frustración del usuario.

* **Nodo Raíz (Inicio):** Saludo y menú principal.
* **Ramas principales:** 
  1. *Planes y Precios:* Deriva a la información comercial. (Condición de parada).
  2. *Soporte Técnico:* Deriva a problemas de cuenta o uso de app.
  3. *Hacer una pregunta libre:* Transición al modelo de palabras clave NLP.
* **Condiciones de parada (Nodos Hoja):** Ocurren cuando se le entrega la respuesta final al usuario, ofreciendo un botón único para "Volver al menú principal" y reiniciar el estado.

## 2. Representación en Datos (Estructura Serializable)
El árbol se serializó en un formato JSON estricto. Cada nodo posee:

* `id`: Identificador único del nodo.
* `text`: El mensaje que envía el bot.
* `options`: Aristas o ramas (etiqueta del botón y el `id` del siguiente nodo).
* `isFreeText` (Metadato): Booleano que indica si se debe habilitar el input de texto libre.

```json
{
  "root": {
    "text": "¡Hola! Soy el asistente de EstudiaSmart. Selecciona una opción:",
    "options":[
      { "label": "💰 Planes y Precios", "next": "planes" },
      { "label": "🛠️ Soporte Técnico", "next": "soporte" },
      { "label": "✍️ Escribir mi duda", "next": "duda_libre" }
    ]
  }
}
```

## 3. Integración en el Flujo Conversacional
El flujo maneja un estado del recorrido. Al inicio, el campo de texto (input) está oculto para forzar al usuario a usar el menú de botones. El usuario navega haciendo clic.

* `Transición a respuesta libre`: El teclado (Input de texto) permanece bloqueado/oculto durante el recorrido del árbol. Solo se muestra y habilita si el usuario llega al nodo con el metadato allowFreeText: true.

## 4. Conexión con la lógica del Chatbot
Se logró una integración sin contradicciones:

* `Fase 1 (Reglas Guiadas):` El frontend consume el endpoint /api/tree que devuelve los nodos del menú.
* `Fase 2 (Texto Libre):` Al transicionar a texto libre, el frontend desactiva los botones y redirige los mensajes del usuario al endpoint /api/chat, el cual evalúa las expresiones mediante el modelo de coincidencia de palabras clave desarrollado previamente.

