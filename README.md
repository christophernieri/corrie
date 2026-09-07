# Corrie Relationship Map

An interactive map of Coronation Street’s characters and storylines during
1998–2004. Explore 96 characters and 139 connections, including marriages,
affairs, family ties, feuds and murders.

## Features

- Pan, zoom and drag around a force-directed relationship graph
- Select a character to centre them and highlight every connection
- Filter connections by relationship type
- Search the complete character roster
- Read storyline notes with links to the supporting Wikipedia pages
- Responsive desktop and mobile layouts

## Development

```bash
npm install
npm run dev
```

The local app runs at `http://localhost:5173`.

```bash
npm run build
npm run lint
```

## Data

The curated roster and connections live in:

- `src/data/characters.ts`
- `src/data/relationships.ts`

Run `npm run fetch:wiki` to refresh character metadata and locally cached
portraits from the English Wikipedia API. Pages without usable portraits receive
an initials avatar.

Character stills may be subject to Wikipedia’s fair-use terms. Each character
and storyline links back to its Wikipedia source.
