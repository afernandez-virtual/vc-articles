
## Purpose of this guide

AI can help a development team a great deal: it can generate code, explain classes, propose tests, summarize documentation, or review a pull request.

But there is a very important idea:

> **We use AI to move faster, not to think less.**

This guide explains, in plain language and with low-complexity examples, what a team working with **Java, Spring Boot, and microservices** should know to leverage AI without losing technical judgment.


## AI is not a software architect

AI can help write code, but it should not decide on its own how a system is designed.

A technical team remains responsible for deciding things such as:

- what each microservice does;
- which data belongs to each service;
- how services communicate;
- how errors are handled;
- how information is protected;
- how tests are written;
- how code is maintained over the long term.

### Simple example

You ask the AI:

```text
Create a service to manage users and orders.
```

The AI might propose something like this:

```text
UserService manages users.
OrderService manages orders.
UserService queries the orders database directly.
```

This may seem convenient, but in microservices it is usually a bad idea.

Each microservice should own its own data. One service should not query another service's database directly.

### Better approach

A healthier approach would be:

```text
User Service has its own database.
Order Service has its own database.
User Service and Order Service communicate via API or events.
```

### Key idea

> AI can propose options, but the team must decide whether those options make technical sense.

---

## Code that compiles is not always correct code

AI can generate code that looks clean and even compiles, but that does not mean it is good code.

### Bad example

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

At first glance it looks correct, but it has several problems:

- the controller accesses the repository directly;
- it returns a JPA entity in the API;
- there is no DTO;
- there is no clear error handling;
- no permission validation is visible;
- it may expose internal database fields.

### More recommended version

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

Here the controller does not know how the user is looked up. It only delegates to a use case.

### Key idea

> It is not enough for the code to compile. It must be secure, understandable, testable, and consistent with the architecture.

---

## AI must respect the project's architecture

AI tends to generate generic examples. If you do not explain how your project is organized, it may mix layers or create code that is hard to maintain.

### Recommended simple structure

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

### What each layer means

### api

Contains what is exposed outward:

- controllers;
- input DTOs;
- output DTOs.

### application

Contains the use cases:

- create user;
- find user;
- update user;
- delete user.

### domain

Contains the main business rules:

- domain models;
- important validations;
- business exceptions.

### infrastructure

Contains technical details:

- database;
- JPA repositories;
- HTTP clients;
- messaging;
- integration with other systems.

### Useful prompt example

```text
Generate the code respecting this structure:

- Controller in api.controller
- DTOs in api.dto
- Use case in application.usecase
- Domain model in domain.model
- JPA repository in infrastructure.persistence

Do not put business logic in the controller.
Do not return JPA entities in the API.
```

### Key idea

> AI must adapt to the team's architecture, not the other way around.

---

## Asking AI the right way: simple, useful prompts

A prompt is the instruction you give to the AI.

A bad prompt yields generic results. A good prompt yields more useful results.

### Prompt that is too vague

```text
Make me an endpoint to create users.
```

The AI does not know:

- which Java version you use;
- whether you use DTOs;
- whether you use MapStruct;
- whether you want tests;
- whether you have hexagonal architecture;
- how you handle errors.

### More useful prompt

```text
Act as a senior Java developer.

Stack:
- Java 21
- Spring Boot 3
- Maven
- MapStruct
- JUnit 5
- Mockito

I need to create an endpoint to create users.

Rules:
- Do not expose JPA entities.
- Use DTOs.
- Use a use case.
- Do not put business logic in the controller.
- Add unit tests.
- Explain important decisions.
```

### Key idea

> The better you explain the context, the better the AI's response will be.

---

## Do not accept generated code without tests

A very healthy rule for the team would be:

> **All AI-generated code must come with tests.**

AI can write code quickly, but the team needs to verify that it works.

### Use case example

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

### Tests we should request

```text
Generate unit tests for GetUserUseCase.

Include:
- when the user exists;
- when the user does not exist;
- verification that the repository is called;
- clear test names.
```

### Simple test example

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

### Beware of `@SpringBootTest`

AI tends to use this for everything:

```java
@SpringBootTest
class UserServiceTest {
}
```

But you do not always need to start the entire application.

### Simple guide

| Test type | When to use it |
|---|---|
| `@Test` | For simple business logic |
| `@WebMvcTest` | To test controllers |
| `@DataJpaTest` | To test repositories |
| `@SpringBootTest` | For more complete integration tests |

### For teams that want to level up

Beyond the basics, it is often valuable to include:

- contract tests between microservices (consumer/provider);
- `Testcontainers` to integrate with real test databases or Kafka;
- a balanced test pyramid (more unit tests, fewer end-to-end);
- minimum quality criteria in PRs (for example, coverage per module and edge cases).

### Key idea

> AI can write code, but tests help demonstrate that the code behaves as we expect.

---

## Security: AI can generate dangerous code

AI can generate insecure code without realizing it.

### Dangerous example

```java
@CrossOrigin("*")
@GetMapping("/admin/users")
public List<UserEntity> getAllUsers() {
    return userRepository.findAll();
}
```

Problems:

- it allows calls from any origin;
- it looks like an admin endpoint;
- no authorization is visible;
- it returns JPA entities;
- it may expose sensitive data;
- it has no pagination.

### More thoughtful version

```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
public Page<UserResponse> getAllUsers(Pageable pageable) {
    return getUsersUseCase.execute(pageable);
}
```

It is still a simple example, but it already improves several points:

- it requires an admin role;
- it uses a DTO;
- it has pagination;
- it delegates to a use case.

### Security checklist when reviewing AI-generated code

Before accepting code, review:

- is there authentication?
- is there authorization?
- are sensitive data exposed?
- is input data validated?
- are tokens or personal data being logged?
- are there unprotected admin endpoints?
- is CORS open without need?
- are JPA entities returned directly?
- is there injection risk (SQL, NoSQL, LDAP)?
- is there SSRF risk when calling external URLs?
- is there unsafe deserialization of untrusted data?
- is there mass assignment (fields updated that should not be)?
- are internal stack traces exposed in HTTP errors?
- are secrets outside the code and rotated?

### Useful reference

If the team needs a common baseline, you can use OWASP ASVS as a more complete security checklist.

### Key idea

> AI output should be treated like code written by someone external: it must be reviewed.

---

## Transactions in Spring Boot

AI tends to put `@Transactional` on many methods without explaining why.

### Simple example

```java
@Transactional
public void createUser(CreateUserRequest request) {
    User user = new User(request.name(), request.email());
    userRepository.save(user);
}
```

This case may make sense because it is a database write operation.

### Example with a possible problem

```java
@Transactional
public void createUserAndNotify(CreateUserRequest request) {
    User user = new User(request.name(), request.email());
    userRepository.save(user);

    emailClient.sendWelcomeEmail(user.getEmail());
}
```

Here you need to think more carefully.

The method opens a database transaction and also calls an external email service.

What if?

- the user is saved but the email fails;
- the email takes too long;
- the external service does not respond;
- the email is sent but the transaction then fails.

### Better idea

A safer option may be:

```text
1. Save the user.
2. Commit the transaction.
3. Publish a UserCreated event.
4. Another process sends the email.
```

### Important detail: avoid losing events

If you publish the event right after the commit, that publication can still fail.

For critical systems, it is common to use the **Transactional Outbox** pattern:

```text
1. In the same transaction you save the user + event record (outbox).
2. A separate process reads the outbox and publishes the event.
3. When published successfully, it marks the event as sent.
```

This reduces the risk of "data saved but event lost".

### Key idea

> Do not put external calls inside a transaction without thinking it through carefully.

---

## Microservices: beware of overly simple solutions

AI may propose a solution that works locally but fails in real systems.

### Simple example

We have two microservices:

```text
Order Service
Payment Service
```

The AI might propose:

```text
1. Order Service creates the order.
2. Order Service calls Payment Service.
3. Payment Service charges.
4. Done.
```

It seems easy.

But you need to ask questions:

- what if Payment Service is down?
- what if it charges but does not respond?
- what if Order Service retries and charges twice?
- how do we know what state the order ended up in?
- how do we trace it in logs?

### Useful concepts

### Idempotency

Avoid repeating a dangerous operation.

Example:

```text
If the same payment request arrives twice with the same key,
it is only charged once.
```

### Retry with backoff

Retry an operation, but wait between attempts.

```text
First attempt fails.
We wait 1 second.
Second attempt fails.
We wait 3 seconds.
Third attempt fails.
It is sent for review.
```

Important: do not retry non-idempotent operations without control, because you can duplicate charges or orders.

### Circuit breaker

Avoid continuing to call a service that is failing.

```text
Payment Service fails many times.
The system stops calling it temporarily.
This avoids saturating it further.
```

### Explicit timeouts

Do not leave remote calls without a time limit.

```text
Every HTTP/gRPC call must have connection and response timeouts.
```

Without a timeout, a thread can get blocked and degrade the entire service.

### Bulkhead (isolation)

Separate resources so a failure in one integration does not drag everything down.

```text
If Payment Service fails, the entire Order Service should not run out of resources.
```

### Correlation ID

Common identifier to follow an operation across services.

```text
Order 123
Correlation ID: abc-999

Order Service logs abc-999.
Payment Service logs abc-999.
Notification Service logs abc-999.
```

This makes it easier to investigate problems.

### Key idea

> In microservices, it is not enough to call another service. You must think about failures, retries, duplicates, and traceability.

---

## Do not trust invented dependencies

AI can invent libraries, class names, or versions.

### Invented example

```xml
<dependency>
    <groupId>com.magic-ai</groupId>
    <artifactId>spring-ai-helper</artifactId>
    <version>9.9.9</version>
</dependency>
```

It may look real, but it may not exist.

### What the team should do

Before adding a dependency suggested by AI, verify:

- whether it exists;
- whether it is maintained;
- whether it has good documentation;
- whether it has a compatible license;
- whether it has known vulnerabilities;
- whether it is really needed;
- whether Spring already offers an official or more standard solution;
- what transitive dependencies it pulls in;
- whether we can pin the exact version and avoid accidental upgrades;
- whether it appears in the project's SBOM;
- whether it comes from a repository allowed by the company.

### Practical recommendation

For enterprise projects, it is worth defining a simple policy:

```text
- approved repositories only;
- pinned versions;
- CVE scanning in CI;
- periodic dependency updates.
```

### Useful prompt

```text
Before recommending a dependency, tell me:
- exact name;
- what it is for;
- alternative without a dependency;
- risks;
- how to verify it is official or trustworthy.
```

### Key idea

> Do not copy dependencies suggested by AI without verifying them.

---

## Using AI with legacy code

AI can be very useful for understanding old code, but it can also invent explanations.

### Dangerous prompt

```text
Explain what this class is for.
```

The AI may respond with great confidence even if it does not have enough context.

### Better prompt

```text
Analyze this class based only on the code.

Return:
- what it does for certain;
- what it seems to do, but cannot be confirmed;
- dependencies;
- side effects;
- possible risks;
- open questions.
```

### Example

If a class is named:

```java
CustomerSyncService
```

The AI might say:

```text
Synchronizes customers with an external system.
```

That may be true, but it must be verified in the code.

Perhaps it actually:

- reads customers from a table;
- calls an external API;
- writes logs;
- changes states;
- deletes old records.

### Key idea

> AI helps understand legacy code, but it does not know the real history of the system unless you provide it.

---

## MapStruct: review your mappings

MapStruct is very useful for transforming objects, but you must carefully review what is being mapped.

### Simple example

```java
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

    User toDomain(UserEntity entity);

    UserEntity toEntity(User user);
}
```

This looks fine if the fields match.

### Possible problem

Imagine that `UserEntity` has this field:

```java
private String passwordHash;
```

And `UserResponse` also has a similar field by mistake.

The AI might generate or accept a mapping that exposes sensitive information.

### Better DTO

```java
public record UserResponse(
    Long id,
    String name,
    String email
) {
}
```

We do not include `passwordHash`.

### What to review in AI-generated mappings

- sensitive fields;
- fields with similar names but different meaning;
- dates;
- money;
- enums;
- nulls;
- JPA relationships;
- large lists;
- computed data;
- internal and external IDs.

### Key idea

> The fact that MapStruct can map something does not mean it should map it.

---

## API first, code second

A bad practice is to ask directly for the controller code.

### Poor prompt

```text
Make me a controller to create orders.
```

### Better approach

First ask for the contract:

```text
Design the REST contract to create an order.

Include:
- endpoint;
- request JSON;
- response JSON;
- HTTP status codes;
- possible errors;
- validations;
- examples.
```

### Simple contract example

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

Errors:

```text
400 - Invalid data
404 - Product not found
409 - Insufficient stock
```

### API contract best practices

Beyond the simple example, it also helps to define:

- standard error format (for example `application/problem+json`);
- API versioning;
- backward compatibility;
- pagination, sorting, and filtering rules;
- when an operation should be idempotent and how to guarantee it.

After this is clear, it makes sense to generate code.

### Key idea

> First think about the contract. Then generate the implementation.

---

## Technical documentation with AI

AI is very good at helping with documentation.

It can generate:

- README;
- ADRs;
- changelogs;
- API documentation;
- onboarding guides;
- Mermaid diagrams;
- summaries of technical decisions.

### Simple ADR example

Prompt:

```text
Generate an ADR explaining why we use MapStruct instead of manual mappings.

Include:
- context;
- decision;
- alternatives;
- consequences.
```

Expected result:

```text
Context:
We have many DTOs and entities. Manual mappings are repeated a lot.

Decision:
We will use MapStruct to generate mappings at compile time.

Alternatives:
- manual mapping;
- ModelMapper;
- static methods.

Consequences:
- less repeated code;
- errors detectable at compile time;
- sensitive fields must be reviewed carefully.
```

### Caution

AI can document things that do not exist in the project.

For example, it might write:

```text
The system uses Kafka for events.
```

But perhaps your system does not use Kafka.

### Key idea

> AI can draft documentation, but the team must validate that it describes reality.

---

## Design patterns: do not use them just because

AI may recommend patterns even when they are not needed.

It may propose:

- hexagonal architecture;
- DDD;
- CQRS;
- saga;
- event sourcing;
- factory;
- strategy;
- mediator.

All can be useful, but not always.

### Simple example

You have a small application that only stores notes:

```text
Create note
Edit note
Delete note
List notes
```

The AI might propose:

```text
Use DDD, CQRS, domain events, event sourcing, and sagas.
```

But that is probably too much.

### Question the team should ask

```text
Does this pattern reduce complexity or increase it?
```

### Example of good pattern use

If you have several payment methods:

```text
Card
PayPal
Bank transfer
Bizum
```

It may make sense to use Strategy:

```java
public interface PaymentMethod {
    void pay(BigDecimal amount);
}
```

But if you only have one payment method, it may not be necessary.

### Key idea

> A pattern is good when it solves a real problem, not when it makes the code look more sophisticated.

---

## AI as support in code review

AI can be an additional reviewer, but it should not approve code on its own.

### Useful prompt to review a PR

```text
Review this code as a Java/Spring Boot technical lead.

Look for:
- bugs;
- security issues;
- missing tests;
- business logic in controllers;
- JPA entity exposure;
- misuse of transactions;
- duplicated code;
- excessive coupling.

Return:
- critical issues;
- recommended improvements;
- things that are good.
```

### What it can detect well

- methods that are too long;
- null errors;
- missing validations;
- confusing names;
- duplication;
- insufficient tests;
- endpoints without security;
- incorrect DTO usage.

### What it may not understand well

- business context;
- historical decisions;
- company constraints;
- accepted technical debt;
- the team's future plans;
- unwritten internal agreements.

### Key idea

> AI can help with review, but final responsibility is human.

---

## Privacy and sensitive data

The team must have clear rules about what can be pasted into an AI tool.

### Do not paste without permission

- passwords;
- tokens;
- private keys;
- personal data;
- medical information;
- banking data;
- logs with emails or phone numbers;
- database dumps;
- private contracts;
- sensitive proprietary code;
- production configurations.

### Bad example

```text
This is the production log with real data.
Tell me what happened.
```

If the log contains tokens, emails, or personal data, it can be a problem.

### Better approach

Anonymize first:

```text
User USER_123 receives error 500 when creating order ORDER_456.
The payment-service returns timeout.
Correlation ID: CORR_789.
```

### Simple rule

> If you would not post it on a public forum, do not paste it into an external AI without approval.

### Key idea

> AI must be used respecting privacy, security, and company policies.

---

## Ask for explanations, not just code

To avoid losing technical judgment, the team should always ask for a brief explanation.

### Recommended prompt

```text
In addition to the code, explain:
- why you designed it this way;
- what alternatives existed;
- what risks it has;
- which tests are important;
- what a person should review.
```

### Example

If the AI proposes using events, ask it:

```text
Why use events here?
Would a REST call be enough?
What problems can arise?
How is it retried if it fails?
How do we avoid duplicates?
```

### Key idea

> AI should help you think better, not just produce more code.

---

## Signs of a bad AI response

There are responses that should set off alarms.

### Be wary if the AI

- gives a very confident answer with little context;
- generates a lot of code without explaining;
- invents classes that do not exist;
- adds dependencies without being asked;
- mixes layered architecture with hexagonal without criteria;
- puts business logic in controllers;
- uses `@SpringBootTest` for everything;
- returns JPA entities in the API;
- does not consider errors;
- does not add tests;
- ignores security;
- uses outdated APIs;
- does not respect the project's style.

### Quick checklist

Before accepting generated code, ask:

```text
Does it compile?
Does it have tests?
Does it respect the architecture?
Is it secure?
Is it easy to understand?
Is it maintainable?
Does it handle errors?
Does it cover edge cases?
Does it avoid exposing internal data?
Does it fit the domain?
```

### Key idea

> A polished answer is not always a good answer.

---

## Recommended workflow with AI

A good workflow for using AI in backend development can be this:

```text
1. Explain the requirement.
2. Ask for doubts and edge cases.
3. Design the API contract.
4. Review the design.
5. Generate the use case.
6. Generate DTOs and mappers.
7. Generate tests.
8. Review security.
9. Review transactions.
10. Do human code review.
```

### Practical example

Task:

```text
Create endpoint to register a user.
```

Do not ask directly:

```text
Write all the code for me.
```

Better go step by step:

```text
First design the REST contract.
```

Then:

```text
Now generate DTOs and validations.
```

Then:

```text
Now generate the use case.
```

Then:

```text
Now generate unit tests.
```

Then:

```text
Review the result looking for security and architecture issues.
```

### Key idea

> AI works best when used as a step-by-step work companion.

---

## Minimum concepts the team should know

### Prompt

It is the instruction you give to the AI.

Example:

```text
Generate unit tests for this class.
```

### Context

It is the information you provide so it can respond better.

Example:

```text
We use Java 21, Spring Boot 3, MapStruct, and hexagonal architecture.
```

### Hallucination

It is when the AI invents something.

Example:

```text
The AI says a PaymentHelper class exists, but that class is not in the project.
```

### RAG

It is a technique for the AI to respond using documentation or real code as a source.

Example:

```text
You ask: how is this service deployed?
The AI searches internal documentation and responds based on it.
```

### Tool calling

It is when the AI can use external tools.

Example:

```text
The AI queries an internal API to get the status of an order.
```

### Agent

It is an AI that not only responds, but can plan steps and use tools.

Example:

```text
Analyze a bug, search logs, review code, and propose a solution.
```

### Guardrails

They are safety limits.

Example:

```text
The AI can read tickets, but it cannot delete data.
```

### Evals

They are tests to verify whether the AI responds well.

Example:

```text
We have 50 frequently asked questions.
Every time we change the prompt, we check whether it still responds well.
```

### Structured outputs

It is asking the AI to respond in a controlled format.

Example:

```json
{
  "severity": "HIGH",
  "problem": "Endpoint without authorization",
  "recommendation": "Add role validation"
}
```

### LLMOps

It is managing AI systems in production.

It includes:

- logs;
- metrics;
- costs;
- versioned prompts;
- response quality;
- errors;
- security.

### Key idea

> The whole team does not need to be an AI expert, but it should know the basic concepts to use it safely and with judgment.

---

## Recommended internal rules

These rules can serve as a baseline for a Java/Spring Boot team:

```text
1. AI can generate code, but not approve it.
2. All generated code must have human review.
3. Code the team does not understand is not accepted.
4. All important code must have tests.
5. JPA entities are not exposed in APIs.
6. Business logic is not placed in controllers.
7. Dependencies suggested by AI are not added without verification.
8. Secrets and sensitive data are not pasted into external tools.
9. AI must respect the project's architecture.
10. Architecture changes require technical discussion.
11. External calls must be reviewed carefully when transactions are involved.
12. In microservices, failures, retries, and idempotency must be considered.
13. AI-generated documentation must be reviewed.
14. Design patterns are used only if they solve a real problem.
15. Final approval is always the team's responsibility.
```

### Key idea

> Rules are not meant to slow down AI. They are meant to use it well.

---

## Final summary

AI is a very powerful tool for a development team.

It can help:

- write code faster;
- generate tests;
- explain legacy code;
- review pull requests;
- create documentation;
- detect errors;
- propose alternatives;
- learn new concepts.

But it can also:

- invent things;
- generate insecure code;
- mix layers;
- create overly complex solutions;
- suggest fake dependencies;
- omit edge cases;
- give confident but incorrect answers.

That is why the team must maintain technical judgment.

The most important sentence in this guide is:

> **We use AI to move faster, not to think less.**

In a Java, Spring Boot, and microservices stack, the team must continue to master:

- architecture;
- testing;
- security;
- transactions;
- APIs;
- microservices;
- maintainability;
- observability;
- code review;
- privacy.

AI can be an excellent copilot, but the team remains the pilot.

---

## Appendix: useful prompts for the team

### Prompt to generate a feature

```text
Act as a senior Java/Spring Boot developer.

Stack:
- Java 21
- Spring Boot 3
- Maven
- MapStruct
- JUnit 5
- Mockito

I need to implement this functionality:
[DESCRIBE FUNCTIONALITY]

Rules:
- Do not expose JPA entities.
- Use DTOs.
- Do not put business logic in controllers.
- Use use cases.
- Use MapStruct for mappings.
- Add unit tests.
- Handle errors clearly.
- Explain important decisions.
```

### Prompt to review code

```text
Review this code as a Java/Spring Boot technical lead.

Look for:
- bugs;
- security issues;
- missing tests;
- business logic in controllers;
- JPA entity exposure;
- misuse of transactions;
- excessive coupling;
- duplication;
- maintainability issues.

Return:
- critical issues;
- recommended improvements;
- things that are good;
- minimal changes to approve.
```

### Prompt to understand legacy code

```text
Analyze this code based only on what appears in the code.

Return:
- what it does for certain;
- what it seems to do but cannot be confirmed;
- dependencies;
- side effects;
- risks;
- possible bugs;
- open questions.
```

### Prompt to generate tests

```text
Generate unit tests for this class.

Include:
- success case;
- invalid data;
- entity not found;
- external service error;
- mock interaction verification;
- clear test names;
- idempotency/retry cases if applicable;
- which test is unit, integration, or contract.
```

### Prompt to review security

```text
Review this code looking for security issues.

Check:
- authentication;
- authorization;
- sensitive data exposure;
- input validation;
- insecure logs;
- CORS;
- secrets in code;
- admin endpoints;
- error handling;
- injection risk;
- SSRF risk;
- mass assignment.
```

### Prompt to design an API

```text
Design the REST contract for this functionality:
[DESCRIBE FUNCTIONALITY]

Include:
- endpoint;
- HTTP method;
- request JSON;
- response JSON;
- HTTP status codes;
- errors;
- validations;
- examples;
- important decisions;
- versioning strategy;
- error format (`problem+json`);
- idempotency rules.
```

---

## Final checklist before accepting AI-generated code

```text
[ ] I understand what the code does.
[ ] It compiles.
[ ] It has tests.
[ ] It respects the architecture.
[ ] It does not expose JPA entities in the API.
[ ] It does not put business logic in controllers.
[ ] It handles errors.
[ ] It validates inputs.
[ ] It reviews permissions.
[ ] It does not leak sensitive data.
[ ] It does not add dependencies without validation.
[ ] Dependencies reviewed (CVE/transitive/license/repository).
[ ] It does not use unnecessary patterns.
[ ] If there are events, consistency was reviewed (outbox or alternative).
[ ] External calls have timeout and safe retry strategy.
[ ] It has clear names.
[ ] It is maintainable.
[ ] It fits the domain.
[ ] It has been reviewed by a person.
```
