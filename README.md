# REYCH Landing Page

Landing page para REYCH construida con **Google Apps Script** y desplegada en **Netlify**.

## 🏗️ Stack

- **Frontend**: HTML Service (Google Apps Script)
- **Backend**: Google Apps Script
- **Deployment**: Netlify (frontend) + Google Apps Script (backend)
- **VCS**: GitHub

## 🚀 Quick Start

### Desarrollar localmente

```bash
# Ver cambios en el editor de Google Apps Script
clasp open

# O sincronizar desde este repositorio
clasp pull   # Traer cambios de la nube
clasp push   # Enviar cambios a la nube
```

### Desplegar en Netlify

```bash
# 1. Crear repo en GitHub
git remote add origin https://github.com/YOUR_USERNAME/reych-landing-page.git
git push -u origin main develop

# 2. Conectar en netlify.com
# - Ir a "Add new site" → "Import an existing project"
# - Seleccionar GitHub y este repositorio
# - Configura variables de entorno (ver docs/DEPLOYMENT.md)

# 3. Desplegar Apps Script
clasp deploy
```

## 📁 Estructura

```
src/
├── client/           # Frontend (HTML)
│   └── index.html
├── server/           # Backend (Apps Script)
│   ├── Code.gs       # Entry point
│   └── handlers.gs   # Request handlers
└── utils/            # Utilidades compartidas
    ├── constants.gs
    └── helpers.gs

config/
└── appsscript.json   # Manifest de Apps Script

docs/
├── DEPLOYMENT.md     # Guía de deployment
├── SETUP.md
└── API.md
```

## 🔗 Flujo de Deploy

```
develop branch → Netlify Preview Deploy → Test
    ↓
main branch → Netlify Production Deploy → Live
    ↓
clasp push/deploy → Google Apps Script Update
```

## 📚 Documentación

- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Configurar Netlify + Apps Script
- **[SETUP.md](docs/SETUP.md)** - Setup del proyecto
- **[API.md](docs/API.md)** - Endpoints disponibles
- **[CLAUDE.md](CLAUDE.md)** - Instrucciones para Claude Code

## 🔑 Variables de entorno (Netlify)

Configurar en Netlify dashboard → Site settings → Environment:

```
APPS_SCRIPT_ID = "tu-script-id-aqui"
APPS_SCRIPT_DEPLOYMENT_ID = "tu-deployment-id-aqui"
NETLIFY_DEPLOY_SECRET = "token-unico-para-seguridad"
```

## 🛠️ Desarrollo

### Crear un nuevo branch

```bash
git checkout develop
git checkout -b feature/tu-feature
# Hacer cambios
git commit -m "feat: descripción de cambios"
git push origin feature/tu-feature
# Abrir Pull Request en GitHub
```

### Mergear a main (Producción)

```bash
git checkout main
git merge develop
git push origin main
```

## 📞 Soporte

Para preguntas sobre Google Apps Script, ver documentación oficial:
- https://developers.google.com/apps-script

Para Netlify:
- https://netlify.com/docs

## 📄 License

MIT
