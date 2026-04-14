# Setup — REYCH Landing Page

Guía para configurar y empezar a desarrollar la landing page con Google Apps Script.

## Requisitos Previos

- Cuenta de Google
- [clasp CLI](https://github.com/google/clasp) instalado (opcional pero recomendado)
  ```bash
  npm install -g @google/clasp
  ```

## Pasos Iniciales

### 1. Crear el Script en Google Apps Script

1. Ve a [script.google.com](https://script.google.com)
2. Crea un nuevo proyecto
3. Copia el **Script ID** de la URL (o desde Project Settings)

### 2. Configurar clasp (Desarrollo Local)

```bash
# Autenticarse con tu cuenta de Google
clasp login

# Ir a la carpeta del proyecto
cd REYCH-LANDING-PAGE

# Copiar el Script ID en .clasp.json
# Reemplazar YOUR_SCRIPT_ID_HERE con tu ID real
```

### 3. Conectar el Proyecto

```bash
# Descargar los archivos existentes del Apps Script (si hay)
clasp pull

# Ver tu proyecto en el editor web
clasp open
```

### 4. Hacer Push de los Cambios

```bash
# Subir cambios locales a Google Apps Script
clasp push

# Ver logs en tiempo real
clasp logs
```

### 5. Crear una Implementación (Deploy)

En Google Apps Script:
1. Click en "Deploy" → "New deployment"
2. Seleccionar tipo: "Web app"
3. Execute as: Tu cuenta
4. Who has access: "Anyone"
5. Deploy

Copiar la URL de la web app → esa es tu landing page

## Configuración de Alcances (Scopes)

El archivo `config/appsscript.json` ya incluye los scopes necesarios:

- `spreadsheets` — Google Sheets
- `drive` — Google Drive
- `gmail.send` — Enviar emails
- `script.external_request` — Peticiones HTTP

Si necesitas más servicios, actualiza `oauthScopes` en ese archivo.

## Desarrollo

### Estructura
- `src/server/` — Código backend (.gs)
- `src/client/` — HTML, CSS, JS del frontend
- `src/utils/` — Utilidades reutilizables
- `config/` — Configuración del proyecto

### Workflow típico

1. Edita archivos localmente
2. `clasp push` para subir cambios
3. Recarga la web app en el navegador
4. `clasp logs` para ver errores

### Testing

En el editor de Google Apps Script:
1. Selecciona una función (ej: `doGet`)
2. Click en "Run"
3. Ver logs en "Execution log"

## Primeros Pasos

1. Actualiza `SHEETS_CONFIG` en `src/utils/constants.gs` con tus IDs reales
2. Modifica `src/client/index.html` con tu contenido
3. Añade funciones en `src/server/handlers.gs` según necesites
4. Deploy y prueba tu landing page

## Troubleshooting

**Script ID inválido:**
- Asegúrate de usar el ID correcto de script.google.com

**Archivos no se suben:**
- Verifica `clasp push` sin errores
- Recarga la página en script.google.com

**Permisos insuficientes:**
- Revisa `oauthScopes` en `appsscript.json`
- Requiere nuevo deploy después de cambiar scopes
