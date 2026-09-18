
## Objetivo de esta guía

La IA puede ayudar mucho a un equipo de desarrollo: puede generar código, explicar clases, proponer tests, resumir documentación o revisar una pull request.

Pero hay una idea muy importante:

> **Usamos IA para ir más rápido, no para pensar menos.**

Esta guía explica, con lenguaje sencillo y ejemplos de poca complejidad, qué debería conocer un equipo que trabaja con **Java, Spring Boot y microservicios** para aprovechar la IA sin perder criterio técnico.


## La IA no es un arquitecto de software

La IA puede ayudar a escribir código, pero no debería decidir por sí sola cómo se diseña un sistema.

Un equipo técnico sigue siendo responsable de decidir cosas como:

- qué hace cada microservicio;
- qué datos pertenecen a cada servicio;
- cómo se comunican los servicios;
- cómo se gestionan los errores;
- cómo se protege la información;
- cómo se hacen los tests;
- cómo se mantiene el código a largo plazo.

### Ejemplo sencillo

Le pides a la IA:

```text
Crea un servicio para gestionar usuarios y pedidos.
```

La IA podría proponer algo así:

```text
UserService gestiona usuarios.
OrderService gestiona pedidos.
UserService consulta directamente la base de datos de pedidos.
```

Esto puede parecer cómodo, pero en microservicios suele ser una mala idea.

Cada microservicio debería ser dueño de sus propios datos. Un servicio no debería consultar directamente la base de datos de otro.

### Mejor enfoque

Una forma más sana sería:

```text
User Service tiene su propia base de datos.
Order Service tiene su propia base de datos.
User Service y Order Service se comunican mediante API o eventos.
```

### Idea clave

> La IA puede proponer opciones, pero el equipo debe decidir si esas opciones tienen sentido técnico.

---

## Código que compila no siempre es código correcto

La IA puede generar código que parece limpio y que incluso compila, pero eso no significa que sea buen código.

### Ejemplo malo

```java
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public UserEntity getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow();
    }
}
```

A primera vista parece correcto, pero tiene varios problemas:

- el controlador accede directamente al repositorio;
- devuelve una entidad JPA en la API;
- no hay DTO;
- no hay manejo claro de errores;
- no se ve ninguna validación de permisos;
- puede exponer campos internos de la base de datos.

### Versión más recomendable

```java
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final GetUserUseCase getUserUseCase;

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return getUserUseCase.execute(id);
    }
}
```

Aquí el controlador no sabe cómo se busca el usuario. Solo delega en un caso de uso.

### Idea clave

> No basta con que el código compile. Debe ser seguro, entendible, testeable y coherente con la arquitectura.

---

## La IA debe respetar la arquitectura del proyecto

La IA suele generar ejemplos genéricos. Si no le explicas cómo está organizado tu proyecto, puede mezclar capas o crear código difícil de mantener.

### Estructura sencilla recomendada

```text
src/main/java/com/company/users
 ├── api
 │    ├── controller
 │    └── dto
 ├── application
 │    └── usecase
 ├── domain
 │    └── model
 └── infrastructure
      └── persistence
```

### Qué significa cada capa

### api

Contiene lo que se expone hacia fuera:

- controllers;
- DTOs de entrada;
- DTOs de salida.

### application

Contiene los casos de uso:

- crear usuario;
- buscar usuario;
- actualizar usuario;
- eliminar usuario.

### domain

Contiene las reglas principales del negocio:

- modelos de dominio;
- validaciones importantes;
- excepciones de negocio.

### infrastructure

Contiene detalles técnicos:

- base de datos;
- repositorios JPA;
- clientes HTTP;
- mensajería;
- integración con otros sistemas.

### Ejemplo de prompt útil

```text
Genera el código respetando esta estructura:

- Controller en api.controller
- DTOs en api.dto
- Caso de uso en application.usecase
- Modelo de dominio en domain.model
- Repositorio JPA en infrastructure.persistence

No pongas lógica de negocio en el controller.
No devuelvas entidades JPA en la API.
```

### Idea clave

> La IA debe adaptarse a la arquitectura del equipo, no al revés.

---

## Pedir bien a la IA: prompts sencillos y útiles

Un prompt es la instrucción que le das a la IA.

Un mal prompt da resultados genéricos. Un buen prompt da resultados más útiles.

### Prompt demasiado vago

```text
Hazme un endpoint para crear usuarios.
```

La IA no sabe:

- qué versión de Java usas;
- si usas DTOs;
- si usas MapStruct;
- si quieres tests;
- si tienes arquitectura hexagonal;
- cómo manejas errores.

### Prompt más útil

```text
Actúa como desarrollador senior Java.

Stack:
- Java 21
- Spring Boot 3
- Maven
- MapStruct
- JUnit 5
- Mockito

Necesito crear un endpoint para crear usuarios.

Reglas:
- No expongas entidades JPA.
- Usa DTOs.
- Usa un caso de uso.
- No pongas lógica de negocio en el controller.
- Añade tests unitarios.
- Explica las decisiones importantes.
```

### Idea clave

> Cuanto mejor expliques el contexto, mejor será la respuesta de la IA.

---

## No aceptar código generado sin tests

Una regla muy sana para el equipo sería:

> **Todo código generado por IA debe venir acompañado de tests.**

La IA puede escribir código rápido, pero el equipo necesita comprobar que funciona.

### Ejemplo de caso de uso

```java
public class GetUserUseCase {

    private final UserRepository userRepository;

    public UserResponse execute(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        return new UserResponse(user.id(), user.name(), user.email());
    }
}
```

### Tests que deberíamos pedir

```text
Genera tests unitarios para GetUserUseCase.

Incluye:
- cuando el usuario existe;
- cuando el usuario no existe;
- verificación de que se llama al repositorio;
- nombres de test claros.
```

### Ejemplo de test sencillo

```java
@Test
void shouldReturnUserWhenUserExists() {
    User user = new User(1L, "Raul", "raul@example.com");

    when(userRepository.findById(1L)).thenReturn(Optional.of(user));

    UserResponse response = getUserUseCase.execute(1L);

    assertEquals("Raul", response.name());
    assertEquals("raul@example.com", response.email());
}
```

### Cuidado con `@SpringBootTest`

La IA tiende a usar esto para todo:

```java
@SpringBootTest
class UserServiceTest {
}
```

Pero no siempre hace falta arrancar toda la aplicación.

### Guía sencilla

![Tabla para elegir el tipo de test adecuado en Spring Boot](/images/tabla-tipos-test-es.webp "Guía sencilla para elegir el tipo de test")

<details>
<summary>Tabla en texto: tipo de test y cuándo usarlo</summary>

<table>
<thead>
<tr><th>Tipo de test</th><th>Cuándo usarlo</th></tr>
</thead>
<tbody>
<tr><td><code>@Test</code></td><td>Para lógica de negocio simple</td></tr>
<tr><td><code>@WebMvcTest</code></td><td>Para probar controllers</td></tr>
<tr><td><code>@DataJpaTest</code></td><td>Para probar repositorios</td></tr>
<tr><td><code>@SpringBootTest</code></td><td>Para pruebas más completas de integración</td></tr>
</tbody>
</table>
</details>

### Para equipos que quieran subir nivel

Además de lo básico, suele aportar valor incluir:

- tests de contrato entre microservicios (consumer/provider);
- `Testcontainers` para integrar con base de datos o Kafka reales de test;
- una pirámide de tests equilibrada (más unitarios, menos end-to-end);
- criterios mínimos de calidad en PR (por ejemplo, cobertura por módulo y casos borde).

### Idea clave

> La IA puede escribir código, pero los tests ayudan a demostrar que ese código se comporta como esperamos.

---

## Seguridad: la IA puede generar código peligroso

La IA puede generar código inseguro sin darse cuenta.

### Ejemplo peligroso

```java
@CrossOrigin("*")
@GetMapping("/admin/users")
public List<UserEntity> getAllUsers() {
    return userRepository.findAll();
}
```

Problemas:

- permite llamadas desde cualquier origen;
- parece un endpoint de administración;
- no se ve autorización;
- devuelve entidades JPA;
- puede exponer datos sensibles;
- no tiene paginación.

### Versión mejor pensada

```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public Page<UserResponse> getAllUsers(Pageable pageable) {
    return getUsersUseCase.execute(pageable);
}
```

Sigue siendo un ejemplo simple, pero ya mejora varios puntos:

- exige rol de administrador;
- usa DTO;
- tiene paginación;
- delega en un caso de uso.

### Checklist de seguridad al revisar código generado por IA

Antes de aceptar código, revisar:

- ¿hay autenticación?
- ¿hay autorización?
- ¿se exponen datos sensibles?
- ¿se validan los datos de entrada?
- ¿se están logando tokens o datos personales?
- ¿hay endpoints administrativos sin protección?
- ¿hay CORS abierto sin necesidad?
- ¿se devuelven entidades JPA directamente?
- ¿hay riesgo de inyección (SQL, NoSQL, LDAP)?
- ¿hay riesgo de SSRF al llamar URLs externas?
- ¿hay deserialización insegura de datos no confiables?
- ¿hay mass assignment (se actualizan campos que no deberían)?
- ¿se exponen trazas internas en errores HTTP?
- ¿los secretos están fuera del código y rotados?

### Referencia útil

Si el equipo necesita una base común, podéis usar OWASP ASVS como checklist más completo de seguridad.

### Idea clave

> La salida de una IA debe tratarse como código escrito por alguien externo: hay que revisarlo.

---

## Transacciones en Spring Boot

La IA suele poner `@Transactional` en muchos métodos sin explicar por qué.

### Ejemplo sencillo

```java
@Transactional
public void createUser(CreateUserRequest request) {
    User user = new User(request.name(), request.email());
    userRepository.save(user);
}
```

Este caso puede tener sentido porque es una operación de escritura en base de datos.

### Ejemplo con posible problema

```java
@Transactional
public void createUserAndNotify(CreateUserRequest request) {
    User user = new User(request.name(), request.email());
    userRepository.save(user);

    emailClient.sendWelcomeEmail(user.getEmail());
}
```

Aquí hay que pensar más.

El método abre una transacción de base de datos y además llama a un servicio externo de email.

¿Qué pasa si?

- se guarda el usuario pero falla el email;
- el email tarda mucho;
- el servicio externo no responde;
- se envía el email pero luego falla la transacción.

### Mejor idea

Una opción más segura puede ser:

```text
1. Guardar el usuario.
2. Confirmar la transacción.
3. Publicar un evento UserCreated.
4. Otro proceso envía el email.
```

### Detalle importante: evitar perder eventos

Si publicas el evento justo después del commit, aún puede fallar esa publicación.

Para sistemas críticos, es habitual usar patrón **Transactional Outbox**:

```text
1. En la misma transacción guardas usuario + registro de evento (outbox).
2. Un proceso aparte lee la outbox y publica el evento.
3. Cuando publica bien, marca el evento como enviado.
```

Así reduces el riesgo de "dato guardado pero evento perdido".

### Idea clave

> No metas llamadas externas dentro de una transacción sin pensarlo bien.

---

## Microservicios: cuidado con las soluciones demasiado simples

La IA puede proponer una solución que funciona en local, pero falla en sistemas reales.

### Ejemplo sencillo

Tenemos dos microservicios:

```text
Order Service
Payment Service
```

La IA podría proponer:

```text
1. Order Service crea el pedido.
2. Order Service llama a Payment Service.
3. Payment Service cobra.
4. Fin.
```

Parece fácil.

Pero hay que hacerse preguntas:

- ¿qué pasa si Payment Service está caído?
- ¿qué pasa si cobra pero no responde?
- ¿qué pasa si Order Service reintenta y cobra dos veces?
- ¿cómo sabemos en qué estado quedó el pedido?
- ¿cómo lo trazamos en logs?

### Conceptos útiles

### Idempotencia

Evita repetir una operación peligrosa.

Ejemplo:

```text
Si llega dos veces la misma petición de pago con la misma clave,
solo se cobra una vez.
```

### Retry con backoff

Reintenta una operación, pero esperando entre intentos.

```text
Primer intento falla.
Esperamos 1 segundo.
Segundo intento falla.
Esperamos 3 segundos.
Tercer intento falla.
Se manda a revisión.
```

Importante: no reintentar sin control operaciones no idempotentes, porque puedes duplicar cobros o pedidos.

### Circuit breaker

Evita seguir llamando a un servicio que está fallando.

```text
Payment Service falla muchas veces.
El sistema deja de llamarlo temporalmente.
Así evitamos saturarlo más.
```

### Timeouts explícitos

No dejes llamadas remotas sin límite de tiempo.

```text
Toda llamada HTTP/gRPC debe tener timeout de conexión y de respuesta.
```

Sin timeout, un hilo puede quedarse bloqueado y degradar todo el servicio.

### Bulkhead (aislamiento)

Separa recursos para que un fallo en una integración no arrastre todo.

```text
Si falla Payment Service, no debería quedarse sin recursos todo el Order Service.
```

### Correlation ID

Identificador común para seguir una operación entre servicios.

```text
Pedido 123
Correlation ID: abc-999

Order Service loguea abc-999.
Payment Service loguea abc-999.
Notification Service loguea abc-999.
```

Así es más fácil investigar problemas.

### Idea clave

> En microservicios, no basta con llamar a otro servicio. Hay que pensar en fallos, reintentos, duplicados y trazabilidad.

---

## No confiar en dependencias inventadas

La IA puede inventar librerías, nombres de clases o versiones.

### Ejemplo inventado

```xml
<dependency>
    <groupId>com.magic-ai</groupId>
    <artifactId>spring-ai-helper</artifactId>
    <version>9.9.9</version>
</dependency>
```

Puede parecer real, pero no existir.

### Qué debe hacer el equipo

Antes de añadir una dependencia sugerida por IA, revisar:

- si existe;
- si está mantenida;
- si tiene buena documentación;
- si tiene licencia compatible;
- si tiene vulnerabilidades conocidas;
- si realmente hace falta;
- si Spring ya ofrece una solución oficial o más estándar;
- qué dependencias transitivas arrastra;
- si podemos fijar versión exacta y evitar upgrades accidentales;
- si aparece en una SBOM del proyecto;
- si viene de un repositorio permitido por la empresa.

### Recomendación práctica

Para proyectos de empresa, conviene definir una política simple:

```text
- solo repositorios aprobados;
- versiones fijadas;
- escaneo CVE en CI;
- actualización periódica de dependencias.
```

### Prompt útil

```text
Antes de recomendar una dependencia, dime:
- nombre exacto;
- para qué sirve;
- alternativa sin dependencia;
- riesgos;
- cómo verificar que es oficial o confiable.
```

### Idea clave

> No copies dependencias sugeridas por IA sin verificarlas.

---

## Usar IA con código legacy

La IA puede ser muy útil para entender código antiguo, pero también puede inventar explicaciones.

### Prompt peligroso

```text
Explícame para qué sirve esta clase.
```

La IA puede responder con mucha seguridad aunque no tenga suficiente contexto.

### Prompt mejor

```text
Analiza esta clase basándote solo en el código.

Devuelve:
- qué hace seguro;
- qué parece hacer, pero no se puede confirmar;
- dependencias;
- efectos secundarios;
- posibles riesgos;
- preguntas abiertas.
```

### Ejemplo

Si una clase se llama:

```java
CustomerSyncService
```

La IA podría decir:

```text
Sincroniza clientes con un sistema externo.
```

Eso puede ser cierto, pero hay que comprobarlo en el código.

Quizá realmente:

- lee clientes de una tabla;
- llama a una API externa;
- guarda logs;
- cambia estados;
- borra registros antiguos.

### Idea clave

> La IA ayuda a entender legacy, pero no conoce la historia real del sistema si no se la das.

---

## MapStruct: revisar los mapeos

MapStruct es muy útil para transformar objetos, pero hay que revisar bien qué se está mapeando.

### Ejemplo sencillo

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

    User toDomain(UserEntity entity);

    UserEntity toEntity(User user);
}
```

Esto parece bien si los campos coinciden.

### Posible problema

Imagina que `UserEntity` tiene este campo:

```java
private String passwordHash;
```

Y `UserResponse` también tiene un campo parecido por error.

La IA podría generar o aceptar un mapeo que exponga información sensible.

### Mejor DTO

```java
public record UserResponse(
    Long id,
    String name,
    String email
) {
}
```

No incluimos `passwordHash`.

### Qué revisar en mapeos generados por IA

- campos sensibles;
- campos con nombres parecidos pero distinto significado;
- fechas;
- dinero;
- enums;
- nulls;
- relaciones JPA;
- listas grandes;
- datos calculados;
- IDs internos y externos.

### Idea clave

> Que MapStruct pueda mapear algo no significa que deba mapearlo.

---

## API primero, código después

Una mala práctica es pedir directamente el código del controller.

### Prompt pobre

```text
Hazme un controller para crear pedidos.
```

### Mejor enfoque

Primero pedir el contrato:

```text
Diseña el contrato REST para crear un pedido.

Incluye:
- endpoint;
- request JSON;
- response JSON;
- códigos HTTP;
- errores posibles;
- validaciones;
- ejemplos.
```

### Ejemplo de contrato simple

```http
POST /orders
```

Request:

```json
{
  "customerId": 10,
  "productId": 55,
  "quantity": 2
}
```

Response:

```json
{
  "orderId": 123,
  "status": "CREATED"
}
```

Errores:

```text
400 - Datos inválidos
404 - Producto no encontrado
409 - Stock insuficiente
```

### Buenas prácticas de contrato API

Además del ejemplo simple, ayuda definir también:

- formato estándar de errores (por ejemplo `application/problem+json`);
- versionado de API;
- compatibilidad hacia atrás;
- reglas de paginación, ordenación y filtros;
- cuándo una operación debe ser idempotente y cómo garantizarlo.

Después de tener esto claro, ya tiene sentido generar código.

### Idea clave

> Primero piensa el contrato. Luego genera la implementación.

---

## Documentación técnica con IA

La IA es muy buena ayudando a documentar.

Puede generar:

- README;
- ADRs;
- changelogs;
- documentación de APIs;
- guías de onboarding;
- diagramas Mermaid;
- resúmenes de decisiones técnicas.

### Ejemplo de ADR sencillo

Prompt:

```text
Genera un ADR para explicar por qué usamos MapStruct en vez de mapeos manuales.

Incluye:
- contexto;
- decisión;
- alternativas;
- consecuencias.
```

Resultado esperado:

```text
Contexto:
Tenemos muchos DTOs y entidades. Los mapeos manuales se repiten mucho.

Decisión:
Usaremos MapStruct para generar mapeos en tiempo de compilación.

Alternativas:
- mapeo manual;
- ModelMapper;
- métodos estáticos.

Consecuencias:
- menos código repetido;
- errores detectables en compilación;
- hay que revisar bien campos sensibles.
```

### Cuidado

La IA puede documentar cosas que no existen en el proyecto.

Por ejemplo, puede escribir:

```text
El sistema usa Kafka para eventos.
```

Pero quizá vuestro sistema no usa Kafka.

### Idea clave

> La IA puede redactar documentación, pero el equipo debe validar que describe la realidad.

---

## Patrones de diseño: no usarlos porque sí

La IA puede recomendar patrones aunque no hagan falta.

Puede proponer:

- arquitectura hexagonal;
- DDD;
- CQRS;
- saga;
- event sourcing;
- factory;
- strategy;
- mediator.

Todos pueden ser útiles, pero no siempre.

### Ejemplo simple

Tienes una aplicación pequeña que solo guarda notas:

```text
Crear nota
Editar nota
Borrar nota
Listar notas
```

La IA podría proponer:

```text
Usar DDD, CQRS, eventos de dominio, event sourcing y sagas.
```

Pero eso probablemente es demasiado.

### Pregunta que debe hacer el equipo

```text
¿Este patrón reduce la complejidad o la aumenta?
```

### Ejemplo de buen uso de patrón

Si tienes varios métodos de pago:

```text
Tarjeta
PayPal
Transferencia
Bizum
```

Puede tener sentido usar Strategy:

```java
public interface PaymentMethod {
    void pay(BigDecimal amount);
}
```

Pero si solo tienes un método de pago, quizá no hace falta.

### Idea clave

> Un patrón es bueno cuando resuelve un problema real, no cuando hace que el código parezca más sofisticado.

---

## IA como apoyo en code review

La IA puede ser un revisor adicional, pero no debe aprobar código por sí sola.

### Prompt útil para revisar una PR

```text
Revisa este código como technical lead Java/Spring Boot.

Busca:
- bugs;
- problemas de seguridad;
- falta de tests;
- lógica de negocio en controllers;
- exposición de entidades JPA;
- mal uso de transacciones;
- código duplicado;
- acoplamiento excesivo.

Devuelve:
- problemas críticos;
- mejoras recomendadas;
- cosas que están bien.
```

### Qué puede detectar bien

- métodos demasiado largos;
- errores de null;
- falta de validaciones;
- nombres confusos;
- duplicación;
- tests insuficientes;
- endpoints sin seguridad;
- uso incorrecto de DTOs.

### Qué puede no entender bien

- contexto de negocio;
- decisiones históricas;
- restricciones de la empresa;
- deuda técnica aceptada;
- planes futuros del equipo;
- acuerdos internos no escritos.

### Idea clave

> La IA puede ayudar a revisar, pero la responsabilidad final es humana.

---

## Privacidad y datos sensibles

El equipo debe tener reglas claras sobre qué se puede pegar en una herramienta de IA.

### No pegar sin permiso

- contraseñas;
- tokens;
- claves privadas;
- datos personales;
- información médica;
- datos bancarios;
- logs con emails o teléfonos;
- dumps de base de datos;
- contratos privados;
- código propietario sensible;
- configuraciones productivas.

### Ejemplo malo

```text
Este es el log de producción con datos reales.
Dime qué ha pasado.
```

Si el log contiene tokens, emails o datos personales, puede ser un problema.

### Mejor enfoque

Anonimizar antes:

```text
Usuario USER_123 recibe error 500 al crear pedido ORDER_456.
El servicio payment-service devuelve timeout.
Correlation ID: CORR_789.
```

### Regla sencilla

> Si no lo subirías a un foro público, no lo pegues en una IA externa sin aprobación.

### Idea clave

> La IA debe usarse respetando privacidad, seguridad y normas de la empresa.

---

## Pedir explicaciones, no solo código

Para no perder criterio técnico, el equipo debe pedir siempre una explicación breve.

### Prompt recomendable

```text
Además del código, explica:
- por qué lo has diseñado así;
- qué alternativas había;
- qué riesgos tiene;
- qué tests son importantes;
- qué debería revisar una persona.
```

### Ejemplo

Si la IA propone usar eventos, pregúntale:

```text
¿Por qué usar eventos aquí?
¿Sería suficiente una llamada REST?
¿Qué problemas pueden aparecer?
¿Cómo se reintenta si falla?
¿Cómo evitamos duplicados?
```

### Idea clave

> La IA debe ayudarte a pensar mejor, no solo a producir más código.

---

## Señales de una mala respuesta de IA

Hay respuestas que deberían hacer saltar las alarmas.

### Desconfiar si la IA

- da una respuesta muy segura con poco contexto;
- genera mucho código sin explicar;
- inventa clases que no existen;
- añade dependencias sin pedirlo;
- mezcla arquitectura en capas con hexagonal sin criterio;
- mete lógica de negocio en controllers;
- usa `@SpringBootTest` para todo;
- devuelve entidades JPA en la API;
- no contempla errores;
- no añade tests;
- ignora seguridad;
- usa APIs antiguas;
- no respeta el estilo del proyecto.

### Checklist rápido

Antes de aceptar código generado, preguntar:

```text
¿Compila?
¿Tiene tests?
¿Respeta la arquitectura?
¿Es seguro?
¿Es fácil de entender?
¿Es mantenible?
¿Maneja errores?
¿Tiene casos borde?
¿Evita exponer datos internos?
¿Encaja con el dominio?
```

### Idea clave

> Una respuesta bonita no siempre es una respuesta buena.

---

## Flujo recomendado de trabajo con IA

Un buen flujo para usar IA en backend puede ser este:

```text
1. Explicar el requisito.
2. Pedir dudas y casos borde.
3. Diseñar el contrato API.
4. Revisar el diseño.
5. Generar el caso de uso.
6. Generar DTOs y mappers.
7. Generar tests.
8. Revisar seguridad.
9. Revisar transacciones.
10. Hacer code review humano.
```

### Ejemplo práctico

Tarea:

```text
Crear endpoint para registrar un usuario.
```

No pedir directamente:

```text
Hazme todo el código.
```

Mejor ir por pasos:

```text
Primero diseña el contrato REST.
```

Luego:

```text
Ahora genera DTOs y validaciones.
```

Luego:

```text
Ahora genera el caso de uso.
```

Luego:

```text
Ahora genera tests unitarios.
```

Luego:

```text
Revisa el resultado buscando problemas de seguridad y arquitectura.
```

### Idea clave

> La IA funciona mejor cuando se usa como compañero de trabajo paso a paso.

---

## Conceptos mínimos que debe conocer el equipo

### Prompt

Es la instrucción que le das a la IA.

Ejemplo:

```text
Genera tests unitarios para esta clase.
```

### Contexto

Es la información que le das para que pueda responder mejor.

Ejemplo:

```text
Usamos Java 21, Spring Boot 3, MapStruct y arquitectura hexagonal.
```

### Alucinación

Es cuando la IA inventa algo.

Ejemplo:

```text
La IA dice que existe una clase PaymentHelper, pero esa clase no está en el proyecto.
```

### RAG

Es una técnica para que la IA responda usando documentación o código real como fuente.

Ejemplo:

```text
Preguntas: ¿cómo se despliega este servicio?
La IA busca en la documentación interna y responde basándose en ella.
```

### Tool calling

Es cuando la IA puede usar herramientas externas.

Ejemplo:

```text
La IA consulta una API interna para obtener el estado de un pedido.
```

### Agente

Es una IA que no solo responde, sino que puede planificar pasos y usar herramientas.

Ejemplo:

```text
Analiza un bug, busca logs, revisa código y propone una solución.
```

### Guardrails

Son límites de seguridad.

Ejemplo:

```text
La IA puede leer tickets, pero no puede borrar datos.
```

### Evals

Son pruebas para comprobar si la IA responde bien.

Ejemplo:

```text
Tenemos 50 preguntas frecuentes.
Cada vez que cambiamos el prompt, comprobamos si sigue respondiendo bien.
```

### Salidas estructuradas

Es pedir a la IA que responda en un formato controlado.

Ejemplo:

```json
{
  "severity": "HIGH",
  "problem": "Endpoint sin autorización",
  "recommendation": "Añadir validación de rol"
}
```

### LLMOps

Es gestionar sistemas con IA en producción.

Incluye:

- logs;
- métricas;
- costes;
- prompts versionados;
- calidad de respuestas;
- errores;
- seguridad.

### Idea clave

> No hace falta que todo el equipo sea experto en IA, pero sí debe conocer los conceptos básicos para usarla con seguridad y criterio.

---

## Reglas internas recomendadas

Estas reglas pueden servir como base para un equipo Java/Spring Boot:

```text
1. La IA puede generar código, pero no aprobarlo.
2. Todo código generado debe tener revisión humana.
3. No se acepta código que el equipo no entienda.
4. Todo código importante debe tener tests.
5. No se exponen entidades JPA en APIs.
6. No se pone lógica de negocio en controllers.
7. No se añaden dependencias sugeridas por IA sin verificarlas.
8. No se pegan secretos ni datos sensibles en herramientas externas.
9. La IA debe respetar la arquitectura del proyecto.
10. Los cambios de arquitectura requieren discusión técnica.
11. Las llamadas externas deben revisarse bien si hay transacciones.
12. En microservicios hay que pensar en fallos, reintentos e idempotencia.
13. La documentación generada por IA debe revisarse.
14. Los patrones de diseño se usan solo si resuelven un problema real.
15. La aprobación final siempre es responsabilidad del equipo.
```

### Idea clave

> Las reglas no son para frenar la IA. Son para usarla bien.

---

## Resumen final

La IA es una herramienta muy potente para un equipo de desarrollo.

Puede ayudar a:

- escribir código más rápido;
- generar tests;
- explicar código legacy;
- revisar pull requests;
- crear documentación;
- detectar errores;
- proponer alternativas;
- aprender conceptos nuevos.

Pero también puede:

- inventar cosas;
- generar código inseguro;
- mezclar capas;
- crear soluciones demasiado complejas;
- sugerir dependencias falsas;
- omitir casos borde;
- dar respuestas seguras pero incorrectas.

Por eso, el equipo debe mantener criterio técnico.

La frase más importante de esta guía es:

> **Usamos IA para ir más rápido, no para pensar menos.**

En un stack Java, Spring Boot y microservicios, el equipo debe seguir dominando:

- arquitectura;
- testing;
- seguridad;
- transacciones;
- APIs;
- microservicios;
- mantenibilidad;
- observabilidad;
- revisión de código;
- privacidad.

La IA puede ser un copiloto excelente, pero el equipo sigue siendo el piloto.

---

## Anexo: prompts útiles para el equipo

### Prompt para generar una feature

```text
Actúa como desarrollador senior Java/Spring Boot.

Stack:
- Java 21
- Spring Boot 3
- Maven
- MapStruct
- JUnit 5
- Mockito

Necesito implementar esta funcionalidad:
[DESCRIBIR FUNCIONALIDAD]

Reglas:
- No expongas entidades JPA.
- Usa DTOs.
- No pongas lógica de negocio en controllers.
- Usa casos de uso.
- Usa MapStruct para mapeos.
- Añade tests unitarios.
- Maneja errores de forma clara.
- Explica las decisiones importantes.
```

### Prompt para revisar código

```text
Revisa este código como technical lead Java/Spring Boot.

Busca:
- bugs;
- problemas de seguridad;
- falta de tests;
- lógica de negocio en controllers;
- exposición de entidades JPA;
- mal uso de transacciones;
- acoplamiento excesivo;
- duplicación;
- problemas de mantenibilidad.

Devuelve:
- problemas críticos;
- mejoras recomendadas;
- cosas que están bien;
- cambios mínimos para aprobar.
```

### Prompt para entender código legacy

```text
Analiza este código basándote solo en lo que aparece en el código.

Devuelve:
- qué hace seguro;
- qué parece hacer pero no se puede confirmar;
- dependencias;
- efectos secundarios;
- riesgos;
- posibles bugs;
- preguntas abiertas.
```

### Prompt para generar tests

```text
Genera tests unitarios para esta clase.

Incluye:
- caso correcto;
- datos inválidos;
- entidad no encontrada;
- error de servicio externo;
- verificación de interacciones con mocks;
- nombres de test claros;
- casos de idempotencia/reintentos si aplica;
- qué test es unitario, integración o contrato.
```

### Prompt para revisar seguridad

```text
Revisa este código buscando problemas de seguridad.

Comprueba:
- autenticación;
- autorización;
- exposición de datos sensibles;
- validación de entrada;
- logs inseguros;
- CORS;
- secretos en código;
- endpoints administrativos;
- manejo de errores;
- riesgo de inyección;
- riesgo de SSRF;
- mass assignment.
```

### Prompt para diseñar una API

```text
Diseña el contrato REST para esta funcionalidad:
[DESCRIBIR FUNCIONALIDAD]

Incluye:
- endpoint;
- método HTTP;
- request JSON;
- response JSON;
- códigos HTTP;
- errores;
- validaciones;
- ejemplos;
- decisiones importantes;
- estrategia de versionado;
- formato de errores (`problem+json`);
- reglas de idempotencia.
```

---

## Checklist final antes de aceptar código generado por IA

```text
[ ] Entiendo lo que hace el código.
[ ] Compila.
[ ] Tiene tests.
[ ] Respeta la arquitectura.
[ ] No expone entidades JPA en la API.
[ ] No mete lógica de negocio en controllers.
[ ] Maneja errores.
[ ] Valida entradas.
[ ] Revisa permisos.
[ ] No filtra datos sensibles.
[ ] No añade dependencias sin validar.
[ ] Dependencias revisadas (CVE/transitivas/licencia/repositorio).
[ ] No usa patrones innecesarios.
[ ] Si hay eventos, se revisó consistencia (outbox o alternativa).
[ ] Llamadas externas con timeout y estrategia de retry segura.
[ ] Tiene nombres claros.
[ ] Es mantenible.
[ ] Encaja con el dominio.
[ ] Ha sido revisado por una persona.
```
