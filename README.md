# Destiny 2 Style Calculator (Proof of Concept)

This is a lightweight offline calculator built with Electron. It highlights
keywords from Destiny 2 style loadouts and shows basic interactions. The
application uses local JSON files so it works completely offline.

## Development

```bash
npm install
npm start
```

## Packaging

Install dependencies (this will install `electron-builder` as a dev dependency)
and run:

```bash
npm run dist
```

Electron Builder will create distributable files in the `dist/` directory.

## File Structure

- `main.js` – Main Electron process
- `preload.js` – Secure preload exposing data loading APIs
- `renderer.js` – Frontend logic
- `data/` – Sample JSON data used by the app

## License

MIT
