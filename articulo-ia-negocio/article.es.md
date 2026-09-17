> **Idea de partida:** elige una tarea concreta antes de preguntar si conviene poner IA en la web.

## Una tarea repetida, una oportunidad concreta

Imagina esta situación: alguien llega a tu web, consulta un servicio y envía una pregunta. Una persona del equipo lee el mensaje, busca información, pide un dato que falta y prepara una respuesta. Después, registra la conversación y avisa a un compañero.

Nada especialmente complicado. Pero ¿qué ocurre cuando esa secuencia se repite varias veces al día?

Antes de preguntar si conviene poner IA en la web, hay otra pregunta:

¿Qué parte de este recorrido necesita criterio humano y qué parte podríamos simplificar?

Quizá no haga falta cambiar toda la web. El primer paso puede ser preparar mejor las solicitudes antes de que lleguen al equipo, o que una persona encuentre la información adecuada sin recorrer cinco páginas.

El punto de partida es elegir una necesidad concreta.

## Tres conceptos de IA, sin complicaciones

### IA generativa: preparar un primer resultado

La IA generativa puede producir contenido a partir de instrucciones y del contexto que recibe. En una aplicación de texto, eso permite plantear tareas como redactar un borrador o resumir información. El resultado hay que comprobarlo. Es un primer contenido, no una respuesta correcta por definición.

Pensemos en una solicitud larga enviada desde la web. Una aplicación posible sería preparar un resumen con lo que la persona necesita, los datos que ha facilitado y las preguntas pendientes.

Para orientar esa tarea se utiliza un **prompt**: la instrucción que recibe el modelo. Especificar el objetivo, el contexto y el formato esperado ayuda a guiar su respuesta.

Por ejemplo:

> Resume esta solicitud para el equipo. Separa la necesidad principal, los datos aportados y la información que falta. No completes los huecos con suposiciones.

El objetivo de negocio sería que quien atienda el caso empiece con la información ordenada, sin dejar de tener acceso al mensaje original.

### RAG: consultar información de tu empresa antes de responder

RAG es el nombre técnico de un enfoque bastante intuitivo: **buscar información relevante en unas fuentes seleccionadas y utilizarla para preparar la respuesta**. Esas fuentes pueden ser páginas de servicios, preguntas frecuentes o documentación autorizada. No equivale a reentrenar el modelo cada vez que se añade un documento.

Es parecido a consultar un manual antes de explicar cómo funciona algo.

En una web, un posible uso sería responder a una pregunta sobre el alcance de un servicio basándose en su descripción publicada, con una referencia que permita comprobarla.

Eso no elimina los errores: las fuentes pueden estar desactualizadas, la búsqueda puede recuperar información insuficiente y el modelo todavía puede equivocarse. Por eso conviene prever qué hacer cuando no exista una respuesta respaldada.

A veces, la mejor respuesta será pedir una aclaración o dar paso a una persona.

![Una consulta selecciona documentación relevante y produce una respuesta conectada con sus fuentes](rag-fuentes-respuesta.webp "RAG: responder con las fuentes abiertas")

### Flujos y agentes: pasar de responder a realizar tareas

Un flujo automatizado sigue un recorrido definido. Un agente de IA puede decidir qué pasos y herramientas utilizar dentro de los límites que se le hayan establecido. No toda automatización necesita un agente ni todas las tareas requieren el mismo grado de autonomía.

Por ejemplo, clasificar una solicitud y enviarla a una bandeja concreta podría resolverse con un flujo sencillo. Una tarea que exija consultar varias fuentes y decidir qué información falta podría justificar un diseño más flexible.

Conviene decidir qué se le permite hacer en ese proceso.

## De una visita a una tarea bien encaminada

Unamos las ideas en un ejemplo hipotético, no en un caso de cliente.

Una persona escribe en la web:

> Queremos mejorar la gestión de consultas. Ahora llegan por distintos canales y nos cuesta hacer seguimiento.

Una experiencia diseñada alrededor de esa necesidad podría funcionar así:

**Primero, aclarar la petición.** El asistente preguntaría qué canales utilizan y dónde se atasca el seguimiento, sin convertir la conversación en un interrogatorio.

**Después, aportar información relevante.** Consultaría los contenidos autorizados y mostraría lo que realmente encaja con la pregunta, sin inventar prestaciones, precios o plazos.

**A continuación, preparar el contexto.** Con los datos necesarios, elaboraría un resumen para el equipo y señalaría las cuestiones pendientes.

**Por último, dar continuidad.** Si existiera la integración correspondiente, podría registrar la solicitud en el sistema de gestión de clientes o preparar una tarea interna. Las acciones sujetas a aprobación quedarían pendientes de revisión.

Ese último paso no ocurriría por el simple hecho de añadir un modelo de IA: habría que conectar las herramientas, configurar los permisos y definir el recorrido.

El objetivo sería que la conversación dejase un siguiente paso claro para la persona y para el equipo.

![Una consulta pasa por aclaración y organización antes de la aprobación humana](consulta-a-tarea.webp "De la consulta a una tarea preparada y revisada")

## Automatizar con criterio

Antes de poner una solución así en marcha, conviene definir qué información puede consultar, qué acciones tiene permitidas y en qué situaciones debe intervenir una persona. También debe quedar claro para el visitante que está interactuando con IA. Son decisiones de diseño. Hay que tomarlas antes del lanzamiento.

Para el ejemplo anterior, propondríamos límites concretos: no confirmar condiciones comerciales, no acceder a documentación ajena a la consulta y no ejecutar acciones sensibles sin la aprobación correspondiente.

Además, prepararíamos una salida sencilla hacia el equipo humano. Una conversación que necesita atención personal no debería quedarse atrapada en un intercambio automático.

La IA puede resolver bien una parte y entregar el resto con suficiente contexto.

## Empezar por una mejora que se pueda medir

Para una primera prueba, elegiríamos una tarea frecuente, acotada y fácil de revisar. Por ejemplo, preparar el resumen de las solicitudes que llegan desde la web antes de incorporarle respuestas al público o acciones adicionales.

La propuesta sería comparar el proceso actual con el nuevo utilizando casos representativos, incluidas peticiones incompletas o ambiguas. La evaluación debería comprobar la calidad de las respuestas y su correspondencia con la información disponible, no solo si están bien redactadas.

Desde negocio, estas serían cuatro comprobaciones:

| Qué observar | Qué comprobar |
| --- | --- |
| Tiempo del equipo | Minutos dedicados por caso, incluida la revisión y las correcciones. |
| Calidad | Resultados correctos y completos en una muestra revisada por personas. |
| Continuidad | Solicitudes que llegan al siguiente paso con la información necesaria. |
| Coste total | Implantación, uso, mantenimiento y supervisión del sistema. |

Una respuesta rápida que exige rehacer el trabajo no cumpliría el objetivo. Una prueba que ahorra tiempo pero pierde información importante, tampoco.

## Cierre

El primer proyecto tiene que permitir una decisión informada sobre el siguiente. Elige una tarea que se repita, mide el tiempo y la calidad, y decide con datos si el siguiente paso merece la pena.
