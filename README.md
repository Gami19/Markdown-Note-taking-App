# Markdown Note-taking App

A REST API that saves markdown notes, lists them, renders HTML, checks grammar, and accepts `.md` file uploads.

Project: [project URL](https://roadmap.sh/projects/markdown-note-taking-app)

## Features

- Save notes as markdown text (JSON body)
- Upload `.md` files via `multipart/form-data`
- List saved markdown files
- Get a single note as markdown
- Render a note as HTML
- Check grammar of a saved note (textlint)

## Tech Stack

- TypeScript
- Express
- marked (Markdown → HTML)
- textlint (grammar / writing checks)
- multer (file uploads)
- Vitest (unit tests)

## Setup

```bash
npm install
npx tsc
```

## Run

```bash
node dist/index.js
```

The server listens on `http://localhost:3000`.

Notes are stored under the `public/` directory.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Health check |
| POST | `/notes` | Save a note from JSON (`title`, `note`) |
| GET | `/notes` | List saved markdown files |
| GET | `/notes/:filename` | Get a note as markdown |
| GET | `/notes/:filename/html` | Get a note rendered as HTML |
| GET | `/notes/:filename/fix` | Check grammar of a note |
| POST | `/notes/upload` | Upload a `.md` file |

`:filename` is the note name **without** the `.md` extension (example: `first` for `public/first.md`).

## Examples

### Save note (JSON)

```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"my-note","note":"# Hello\nThis is a markdown note."}'
```

### List notes

```bash
curl http://localhost:3000/notes
```

### Get markdown / HTML / grammar check

```bash
curl http://localhost:3000/notes/my-note
curl http://localhost:3000/notes/my-note/html
curl http://localhost:3000/notes/my-note/fix
```

### Upload a markdown file

```bash
curl -X POST http://localhost:3000/notes/upload \
  -F "file=@/path/to/your-note.md"
```

Only `.md` files are accepted. The original filename is kept under `public/`.

## Tests

```bash
npm test
```

Unit tests cover happy-path cases for `markdownToHtml` and `checkGrammar`.
