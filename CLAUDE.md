# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Landing page for **REYCH**, built entirely with **Google Apps Script (GAS)**. The project runs inside the Google ecosystem and uses only services available natively in the GAS runtime (no Node.js, no npm).

## Stack

- **Runtime**: Google Apps Script (V8 engine)
- **Frontend**: HTML Service (`HtmlService.createTemplateFromFile`) — HTML, CSS, JS served via `doGet()`
- **Backend**: GAS server-side `.gs` files
- **Google Services in scope**: any service available in the GAS environment (Sheets, Drive, Gmail, Forms, UrlFetch, etc.)

## Deployment & Development

Google Apps Script projects are managed via the [clasp CLI](https://github.com/google/clasp) or directly in the Apps Script editor at script.google.com.

**Script ID:** `1BcoGRhbIBZEUJtRFlw76kxOzAaZNTwoEGVXrFo8-PMcMo7zRM5dK70s3`  
**Editor:** https://script.google.com/home/projects/1BcoGRhbIBZEUJtRFlw76kxOzAaZNTwoEGVXrFo8-PMcMo7zRM5dK70s3/edit

### With clasp (recommended for local dev)
```bash
npm install -g @google/clasp
clasp login
clasp pull          # pull latest from Apps Script
clasp push          # push local changes to Apps Script
clasp deploy        # create a new deployment
clasp open          # open the project in the browser editor
```

### Key constraints
- All `.gs` files share a single global scope — no ES modules (`import`/`export`).
- HTML files must be served through `HtmlService`; they cannot directly import each other (use `<?!= include('filename') ?>` for partials).
- External HTTP requests require `UrlFetchApp`; no `fetch` or `XMLHttpRequest` on the server side.
- `doGet(e)` is the entry point for web app requests.

## Architecture

```
Code.gs          → Entry point: doGet(), server-side functions callable from client
*.gs             → Additional server-side modules (all globals, loaded alphabetically)
*.html           → HTML templates served via HtmlService
appsscript.json  → Manifest: scopes (oauthScopes), webapp config, runtime version
```

Client-side JS inside HTML files communicates with the server via `google.script.run.functionName()`.
