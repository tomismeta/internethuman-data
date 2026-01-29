# Internet Human API

Structured data API for essays and thoughts from [internethuman.neocities.org](https://internethuman.neocities.org).

The collection includes long-form essays and short-form thoughts exploring network consciousness, new forms of art, the future of aesthetics, hyperstition, and what it means to be human in an increasingly networked world.

## Endpoints

### Essays
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/essays` | List all essays |
| GET | `/api/essays/{id}` | Get full essay data |
| GET | `/api/themes/{essayId}` | Get all themes + relationships |
| GET | `/api/themes/{essayId}/{themeId}` | Get a specific theme by ID |

### Thoughts
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/thoughts` | List all thoughts |
| GET | `/api/thoughts/{id}` | Get a single thought |
| GET | `/api/thoughts/tags/{tag}` | Get thoughts by tag |

### Authors
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/authors` | List all authors |
| GET | `/api/authors/{handle}` | Get author with all their quotes |

## Examples

```bash
# List essays
curl https://internethuman.vercel.app/api/essays

# Get "New Art" essay
curl https://internethuman.vercel.app/api/essays/new-art

# Get themes for an essay
curl https://internethuman.vercel.app/api/themes/new-art

# Get a specific theme
curl https://internethuman.vercel.app/api/themes/new-art/hindsight-recognition

# List all thoughts
curl https://internethuman.vercel.app/api/thoughts

# Get a single thought
curl https://internethuman.vercel.app/api/thoughts/hyper-abstractionism

# Search thoughts by tag
curl https://internethuman.vercel.app/api/thoughts/tags/hyperstition

# Get author quotes
curl https://internethuman.vercel.app/api/authors/tomismeta
```

## Documentation

- **Explorer**: [internethuman.vercel.app](https://internethuman.vercel.app)
- **Swagger UI**: [/swagger.html](https://internethuman.vercel.app/swagger.html)
- **OpenAPI spec**: [/openapi.json](https://internethuman.vercel.app/openapi.json)

## Content

### Essays (2)
- `new-art` — A conversation on new art between d and tomismeta
- `new-aesthetics` — On the future of aesthetics, comfort substrates, and BCI-streamed skins

### Thoughts (13)
Short-form pieces on: immaculate canonization, hyper-abstractionism, hyperstitional retrocasting, hyperstition and hyperreality, portable human presence, consciousness and network minds, human emotion packages, spiritual freedom, network spirituality, post-authorship, internet life and abundance, reputation, reputation as currency.

### Tags
`abstraction`, `akashic-records`, `algorithms`, `authenticity`, `authorship`, `BCI`, `canonization`, `collective-intelligence`, `commodification`, `communion`, `consciousness`, `curation`, `currency`, `embodiment`, `emotion`, `freedom`, `hyperreality`, `hyperstition`, `icons`, `interaction`, `LLM`, `memetics`, `network`, `network-minds`, `peace`, `presence`, `receivers`, `representation`, `reputation`, `retrocasting`, `singularity`, `spirituality`, `streaming`, `theatre`, `trust`, `value`

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tomismeta/internethuman-data)

## Author

[@tomismeta](https://x.com/tomismeta)
