# Estructura de Carpetas — REYCH Landing Page

```
REYCH-LANDING-PAGE/
├── src/                          # Código fuente principal
│   ├── client/                   # Código del lado cliente (HTML, CSS, JS)
│   │   ├── index.html           # Página principal
│   │   ├── styles.html          # CSS (incrustado o referenciado)
│   │   └── *.html               # Componentes/páginas adicionales
│   │
│   ├── server/                   # Código del lado servidor (.gs)
│   │   ├── Code.gs              # Entry point: doGet(), funciones principales
│   │   ├── handlers.gs          # Manejadores de rutas y endpoints
│   │   ├── sheets.gs            # Integración con Google Sheets
│   │   ├── mail.gs              # Integración con Gmail/Mail
│   │   ├── forms.gs             # Integración con Google Forms
│   │   └── *.gs                 # Módulos adicionales por función
│   │
│   └── utils/                    # Utilidades compartidas
│       ├── constants.gs          # Constantes, config IDs (Sheet ID, Drive ID, etc.)
│       ├── helpers.gs            # Funciones helper reutilizables
│       └── validators.gs         # Validación de datos
│
├── config/                       # Archivos de configuración
│   ├── appsscript.json          # Manifest de Apps Script (scopes, runtime)
│   └── settings.gs              # Variables de configuración por ambiente
│
├── assets/                       # Archivos estáticos
│   ├── images/                  # Imágenes (logos, iconos, etc.)
│   └── styles/                  # Estilos CSS globales (opcional)
│
├── templates/                    # Templates HTML reutilizables
│   ├── header.html              # Componente: header
│   ├── footer.html              # Componente: footer
│   └── *.html                   # Otros componentes
│
├── docs/                         # Documentación del proyecto
│   ├── API.md                   # Documentación de funciones GAS
│   ├── SETUP.md                 # Instrucciones de setup
│   └── DEPLOYMENT.md            # Notas de deploy
│
├── tasks/                        # Tracking de requisitos y tareas
│   └── REQUIREMENTS.md           # Ledger de requerimientos
│
├── CLAUDE.md                     # Guía para Claude Code
├── STRUCTURE.md                  # Este archivo
└── README.md                     # (Crear cuando esté listo)
```

## Convención de Nombres

- **Archivos `.gs`**: `camelCase.gs` o `descriptiveModule.gs`
- **Archivos `.html`**: `lowercase-with-dashes.html` o `index.html` para templates principales
- **Variables/Constantes**: `CONSTANT_NAME` para constantes, `variableName` para variables
- **Funciones públicas** (llamables desde cliente): `functionName()` con documentación JSDoc

## Flujo Típico

1. Usuario accede → `Code.gs` recibe `doGet(e)` 
2. `Code.gs` devuelve HTML desde `src/client/index.html`
3. Cliente ejecuta JS que llama `google.script.run.serverFunction()`
4. `handlers.gs` o módulo específico procesa la llamada
5. Interactúa con Google Services (Sheets, Drive, Mail, etc.)
6. Devuelve resultado al cliente

## Archivo `.clasp.json` (para desarrollo local)

```json
{
  "scriptId": "TU_SCRIPT_ID",
  "rootDir": ".",
  "fileExtension": ["gs", "html", "json"],
  "filePushOrder": ["src/utils/**", "src/server/**", "src/client/**", "config/**"]
}
```

Esto garantiza que los archivos de utilidad y servidor se carguen antes que el cliente.
