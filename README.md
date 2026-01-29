# Internet Human Essays API

Structured data API for essays from [internethuman.neocities.org](https://internethuman.neocities.org).

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/essays` | List all essays |
| GET | `/api/essays/{id}` | Get full essay data |
| GET | `/api/themes/{essayId}` | Get all themes + relationships |
| GET | `/api/themes/{essayId}/{themeId}` | Get a specific theme by ID |

## Example

```bash
# List essays
curl https://internethuman-data.vercel.app/api/essays

# Get "New Art" essay
curl https://internethuman-data.vercel.app/api/essays/new-art

# Get themes only
curl https://internethuman-data.vercel.app/api/themes/new-art
```

## Swagger/OpenAPI

- **Swagger UI**: `/docs` or `/index.html`
- **OpenAPI spec**: `/openapi.json`

## Available Essays

- `new-art` — A conversation on new art between d and tomismeta

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tomismeta/internethuman-data)

## Author

[@tomismeta](https://x.com/tomismeta)
