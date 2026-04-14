# Deployment Guide: Netlify + Google Apps Script

Este documento explica cómo desplegar REYCH usando **Netlify para el frontend** y **Google Apps Script para el backend**.

## Arquitectura

```
┌─────────────┐
│  Netlify    │  ◄─────┐
│  (Frontend) │        │  Usuario
└──────┬──────┘        │
       │               │
       └───────────────┘
            │
            │ API Calls
            │ (google.script.run)
            ↓
┌──────────────────────────┐
│  Google Apps Script      │
│  (Backend/Business Logic)│
└──────────────────────────┘
            │
            │
    ┌───────┴────────┐
    ↓                ↓
┌────────┐      ┌─────────┐
│ Sheets │      │  Drive  │
│  API   │      │   API   │
└────────┘      └─────────┘
```

## Paso 1: Crear repositorio en GitHub

```bash
# Desde el directorio del proyecto
git remote add origin https://github.com/YOUR_USERNAME/reych-landing-page.git
git push -u origin main
git push -u origin develop
```

## Paso 2: Configurar Netlify

### 2.1 Conectar GitHub a Netlify

1. Ir a [netlify.com](https://netlify.com)
2. Hacer clic en "Add new site" → "Import an existing project"
3. Seleccionar GitHub y autorizar
4. Seleccionar el repositorio `reych-landing-page`
5. Configurar:
   - **Base directory**: (vacío o `.`)
   - **Build command**: `npm run build` (o dejar vacío si no hay build)
   - **Publish directory**: `dist` (crear este directorio con el HTML compilado)

### 2.2 Configurar variables de entorno

En el dashboard de Netlify:

1. **Site settings** → **Build & deploy** → **Environment**
2. Agregar variables:
   ```
   APPS_SCRIPT_ID = "1BcoGRhbIBZEUJtRFlw76kxOzAaZNTwoEGVXrFo8-PMcMo7zRM5dK70s3"
   APPS_SCRIPT_DEPLOYMENT_ID = "[Tu ID de deployment de Apps Script]"
   NETLIFY_DEPLOY_SECRET = "[Token único para seguridad]"
   ```

**Obtener el APPS_SCRIPT_DEPLOYMENT_ID:**

```bash
clasp deployments
# Copia el ID de la versión activa
```

## Paso 3: Configurar Apps Script para recibir requests de Netlify

### 3.1 Crear un endpoint público en Apps Script

En `Code.gs`, asegúrate de que `doGet(e)` está disponible:

```javascript
function doGet(e) {
  const path = e.parameter.path || '';
  const method = e.parameter.method || 'GET';
  
  // Validar secret de Netlify
  const netlifySecret = e.parameter.secret;
  if (netlifySecret !== NETLIFY_DEPLOY_SECRET) {
    return HtmlService.createTextOutput(
      JSON.stringify({error: 'Unauthorized'})
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Procesar según la ruta
  if (path === 'status') {
    return HtmlService.createTextOutput(
      JSON.stringify({status: 'ok', message: 'REYCH backend is running'})
    ).setMimeType(ContentService.MimeType.JSON);
  }
  
  return HtmlService.createTextOutput(
    JSON.stringify({error: 'Not found'})
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### 3.2 Desplegar Apps Script

```bash
# Desde el directorio del proyecto
clasp deploy
# Obtén el deployment ID del output
```

## Paso 4: Integración Netlify → Apps Script

### 4.1 Crear Build Plugin para Netlify (opcional)

Crea un archivo `netlify/functions/sync.js`:

```javascript
exports.handler = async (event, context) => {
  const appsScriptId = process.env.APPS_SCRIPT_ID;
  const secret = process.env.NETLIFY_DEPLOY_SECRET;
  
  try {
    const response = await fetch(
      `https://script.google.com/macros/d/${appsScriptId}/usercontent/v1/?path=status&secret=${secret}`
    );
    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        netlify: 'OK',
        appsScript: data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: error.message})
    };
  }
};
```

### 4.2 Agregar script en package.json

```json
{
  "scripts": {
    "build": "cp -r src/client dist || echo 'dist directory created'",
    "deploy": "npm run build && netlify deploy --prod",
    "verify": "node netlify/functions/sync.js"
  }
}
```

## Paso 5: Flujo de desarrollo y deployment

### Branch: `develop` (Staging/Preview)
- Push → Netlify despliega automáticamente en Preview
- Verifica cambios en ambiente temporal

### Branch: `main` (Production)
- Merge desde `develop` → Netlify despliega en producción
- Cambios van a la URL oficial

## Monitoreo

### Verificar status de Apps Script

```bash
# Desde Netlify
netlify functions:invoke sync
```

### Ver logs de Apps Script

```bash
# Desde el editor de Apps Script
# script.google.com → Proyectos recientes → REYCH
# Ejecutor → Ver logs de ejecución
```

## Troubleshooting

### "Apps Script endpoint not responding"
1. Verifica que el APPS_SCRIPT_ID es correcto
2. Verifica que el Apps Script está desplegado (`clasp deploy`)
3. Verifica los permisos de OAuth en `appsscript.json`

### "Unauthorized" error
1. Verifica que el `NETLIFY_DEPLOY_SECRET` coincide en ambos lados
2. Regenera el secret en Netlify settings

### Build fallando en Netlify
1. Revisa los logs en el dashboard de Netlify
2. Verifica `netlify.toml` está en la raíz
3. Asegúrate de que `package.json` existe con el script `build`

## Resumen

| Componente | Ubicación | Responsabilidad |
|-----------|-----------|-----------------|
| **Frontend** | Netlify | Servir HTML, CSS, JS estático |
| **Backend** | Apps Script | Lógica de negocio, acceso a APIs de Google |
| **Control de Versiones** | GitHub | Historia de commits, branches |
| **CI/CD** | Netlify | Desplegar automáticamente en cada push |
