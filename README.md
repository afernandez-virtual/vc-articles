# Plantilla de artículo

Copia esta carpeta, renómbrala con el `id` del artículo (kebab-case) y rellena los archivos. Cada artículo es una carpeta autónoma, lista para un repositorio de GitHub y para ingerirla después en la web.

## Repositorio de contenido

```text
articulos/
  plantilla/                          ← esta carpeta; no publicar
  articulo-ia-negocio/                ← un artículo = una carpeta
  asistentes-ia-conocimiento/
```

Nombre de carpeta = `id` en `article.json`. Sin espacios, en minúsculas.

## Qué va en cada artículo

```text
{id}/
  article.json            Metadatos en español (título, slug, tags, autor, cover)
  cta.json                CTA de cierre, personalizado por artículo
  figures.json            Registro de imágenes del cuerpo (ancho, alto, alt)
  article.es.md           Cuerpo. Sin H1: el título sale de article.json
  cover/
    cover-editorial.webp  Portada 1600×900. Obligatoria
  images/
    {nombre}.webp         Figuras del cuerpo. Clave = images/{nombre}.webp
```

`visual-sources/` es opcional: originales de trabajo. No se publica.

## Orden de trabajo

1. Copia `plantilla/` → `{id}/`.
2. Edita `article.json`: `id`, `slug`, fechas, tags, título, excerpt, dek, alt de cover.
3. Sustituye `cover/cover-editorial.webp`.
4. Escribe `article.es.md`.
5. Suelta figuras en `images/`, decláralas en `figures.json` y enlázalas en el markdown con `images/{nombre}.webp`.
6. Reescribe `cta.json` para ese artículo. No reutilices el texto de otro post.
7. Pon `"status": "ready"` cuando el texto y las imágenes existan.

## Markdown

- No pongas `# Título`. El H1, la fecha y el autor los pinta la web.
- Usa `##` y `###`. El índice de la página se genera solo con esos niveles.
- Imagen del cuerpo:

```md
![Texto alternativo](images/figura-01.webp "Pie de foto opcional")
```

El `src` es la ruta relativa desde el markdown: `images/{nombre}.webp`. Esa misma cadena es la clave en `figures.json`. Así se ve en el editor y la web puede resolver el fichero. Sin barra inicial (`/images/...`) ni solo el nombre (`figura-01.webp`). Si la clave no está en `figures.json`, la web no lo muestra.

- Listas, citas `>` y bloques de código sí. Mermaid no: exporta el diagrama a WebP y trátalo como figura.
- Tablas: o Markdown, o figura WebP con el contenido en `<details>` para accesibilidad.

## Cover

| Campo | Valor |
| --- | --- |
| Archivo | `cover/cover-editorial.webp` |
| Tamaño | 1600×900 (16:9) |
| Formato | WebP, sin transparencia |
| Peso | < 400 KB |

El hero recorta a **21:9**. Deja el motivo en la banda central. El mismo archivo alimenta la ficha del índice y la imagen Open Graph.

## CTA

`cta.json` cierra el artículo (banda magenta). Título, descripción y botón propios de ese post.

## Tags permitidos

`software_engineering` · `observability` · `devops` · `cloud_architecture` · `ia`

## Cómo encaja con la web hoy

| En esta carpeta | En `vc-corporative-web` |
| --- | --- |
| `{id}/` | `id` del post |
| `article.es.md` | `content/blog/{id}.es.md` |
| `cover/cover-editorial.webp` | `public/blog/{id}/cover-editorial.webp` |
| `images/*` | `public/blog/{id}/` |
| `article.json` | `src/app/[locale]/(site)/blog/data.ts` + slugs en `blog-routing.ts` |
| `cta.json` | `messages/blog/es.json` → `blog.article.closing.{id}` |
| `figures.json` | `figures` en `data.ts` |

La ingesta desde GitHub puede automatizarse después. Mientras tanto, esta carpeta es el contrato: si está completa, el artículo se puede publicar sin reinventar la estructura.
