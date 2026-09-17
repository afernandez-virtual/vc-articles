> **Idea de partida:** «Eso está explicado en algún sitio».

Piensa en una ocasión en la que hayas escuchado esa frase. Quizá la respuesta estaba en una página de servicios, un documento compartido o un correo que nadie conseguía localizar.

La información existía. Lo difícil era llegar a ella.

Ahora imagina que una persona pudiera preguntar con sus propias palabras y recibir una explicación acompañada del documento que la respalda.

Esta es una de las aplicaciones de RAG: conectar la generación de respuestas con la recuperación de información relevante.

## El problema no siempre es la falta de información

Imaginemos una empresa con una web, varias guías de servicio y documentación interna.

Una persona que visita la web quiere saber qué necesita preparar antes de iniciar un proyecto. Al mismo tiempo, alguien que acaba de incorporarse al equipo busca el procedimiento para atender una solicitud.

Son necesidades distintas, con un objetivo de diseño común: **acercar a cada persona la información que le corresponde, sin obligarla a conocer dónde está guardada**.

Para el visitante, pensemos en una ayuda que le oriente entre contenidos públicos. Para el equipo, en una herramienta que consulte documentación interna autorizada.

Serían experiencias con alcances y permisos diferentes.

Pero no des por hecho que todo necesita una conversación. Antes de crear un asistente, valora si una página más clara o un buscador bien resuelto sería suficiente.

## RAG explicado con una idea sencilla

RAG son las siglas de *Retrieval-Augmented Generation*, que suele traducirse como **generación aumentada por recuperación**.

Antes de redactar una respuesta, el sistema busca información relevante en las fuentes que se han preparado para la consulta. Después incorpora esos fragmentos al contexto con el que trabaja el modelo.

Podemos imaginarlo como una respuesta «con el manual abierto», en lugar de una respuesta basada únicamente en el conocimiento general del modelo.

Eso no significa que el asistente haya aprendido permanentemente todos los documentos. Consultar información y reentrenar un modelo son mecanismos diferentes.

Por ejemplo, ante una pregunta sobre qué incluye un servicio, podríamos diseñar el asistente para buscar su descripción aprobada y elaborar una explicación apoyada en ella.

El objetivo sería que no improvisase condiciones que la empresa nunca ha definido.

![Una pregunta activa la búsqueda en documentos seleccionados y produce una respuesta respaldada](rag-tres-pasos.webp "RAG en tres pasos: preguntar, recuperar y responder")

Responder con documentación no es lo mismo que responder siempre bien. RAG puede reducir el riesgo de respuestas inventadas, pero no elimina los errores.

La documentación aporta contexto; la comprobación sigue siendo necesaria.

## Cómo sería un asistente en tu web

Una persona entra en una web de servicios digitales y pregunta: «¿Se puede mejorar la gestión de consultas sin rehacer toda la web?».

En este ejemplo, el asistente buscaría primero información publicada sobre integraciones y procesos. Solo debería responder sobre las posibilidades respaldadas por esas fuentes.

Si la documentación no permitiera determinar la compatibilidad con la web concreta del visitante, debería reconocerlo. No tendría que convertir una posibilidad general en una promesa sobre ese proyecto.

A partir de ahí, podría plantearse una transición hacia el equipo: preparar un resumen de la consulta y ofrecer a la persona enviarlo mediante el canal de contacto. La recogida y el envío de datos deberían ser visibles y estar bajo su control.

El objetivo es una conversación mejor preparada, no una presión constante para rellenar un formulario.

El mismo ejercicio podría plantearse dentro de la empresa. Por ejemplo, un asistente interno que ayudase a localizar una guía de incorporación o el procedimiento de una tarea, siempre dentro del acceso autorizado.

La pregunta es qué necesita entender esta persona para poder avanzar.

## La confianza se diseña desde el principio

Antes de pensar en el aspecto visual del asistente, conviene resolver tres cuestiones.

### Trabajar con información vigente

Selecciona documentos aprobados y asigna una persona responsable de mantenerlos. Define también cómo se actualiza la información que consulta el sistema cuando cambia una página o un procedimiento.

La actualización de las fuentes y su incorporación al sistema forman parte del funcionamiento de RAG; no conviene dar por hecho que cualquier cambio externo aparecerá inmediatamente en las respuestas.

### Mostrar en qué se apoya la respuesta

Los sistemas RAG pueden incluir referencias a los contenidos consultados, lo que permite revisar el origen de una explicación.

Busca que esas referencias conduzcan al fragmento relevante. Comprueba, además, que realmente respalda lo que se afirma: mostrar un enlace no debería sustituir la revisión de la respuesta.

Cuando falte información suficiente, es preferible un «no puedo confirmarlo con esta documentación» a una explicación inventada.

### Separar los accesos

La documentación pública y la interna requieren controles de acceso distintos. En una aplicación RAG, esos permisos deben aplicarse a la recuperación de documentos según la identidad autorizada; no basta con una instrucción que diga al asistente que no revele información.

Un punto de partida prudente para una versión pública es limitar las fuentes a contenido aprobado para la web.

![Dos espacios de conocimiento separados protegen la información pública y la documentación interna](accesos-publico-interno.webp "Accesos distintos para conocimiento público e interno")

## Por dónde empezar sin intentar abarcarlo todo

Empieza por una familia de preguntas: qué incluye un servicio, cómo preparar una solicitud o dónde encontrar una guía concreta.

Después, selecciona las fuentes que deberían permitir responderlas. Aprovecha ese paso para detectar huecos: preguntas razonables para las que todavía no existe una respuesta aprobada.

Incluye en la prueba preguntas claras, formulaciones ambiguas y consultas que el sistema no debería contestar. Comprueba también qué ocurre ante intentos de acceder a contenido fuera de su alcance.

Mide si la respuesta es correcta, si se apoya en las fuentes adecuadas y si ayuda a resolver la duda. Cuando sea necesario derivar a una persona, evalúa si el contexto llega completo.

No midas el éxito por evitar cualquier contacto humano. En algunas consultas, pasar la conversación al equipo sería el mejor resultado.

## Cierre

Antes de pedirle a la IA que sepa más, decide qué información debería poder encontrar y compartir. Una familia de preguntas concretas y unas fuentes aprobadas bastan para empezar.
