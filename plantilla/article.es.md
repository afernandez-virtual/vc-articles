> **Idea de partida:** una frase que oriente la lectura. Quítala si no aporta.

## Primera sección

El H1 no va aquí: sale de `article.json`. Empieza por el problema o la decisión, no por un índice de lo que vas a contar.

Sustituye este párrafo. Una afirmación concreta vale más que un marco abstracto.

### Cómo encaja

- Punto comprobable.
- Otro punto, con un nombre, un límite o un número si lo tienes.
- Lo que descartáis y por qué.

![Descripción de la figura 1](images/figura-01.webp "Pie de foto. Explica qué debe verse, no «diagrama».")

### Cuándo sí y cuándo no

Usa esta subsección si el artículo recomienda un enfoque. Si no aplica, bórrala.

Si la tabla es una figura de marca, enlázala con `images/{nombre}.webp` y deja el contenido en `<details>`. Si no hace falta ilustrarla, una tabla Markdown basta:

| Caso | Encaja | No encaja |
| --- | --- | --- |
| Situación A | Motivo breve | Motivo breve |
| Situación B | Motivo breve | Motivo breve |

## Segunda sección

Otra idea, no una paráfrasis de la anterior. Si el artículo es corto, una sola `##` basta.

### Ejemplo

```java
// Código real del dominio del artículo. Recorta lo que no se lee.
public final class Example {
  public void apply() {
    // ...
  }
}
```

> La cita es para una regla o una consecuencia, no para repetir el párrafo de encima.

## Cierre

Termina con lo que el lector puede hacer o decidir. El CTA comercial va en `cta.json`, no en este markdown.
