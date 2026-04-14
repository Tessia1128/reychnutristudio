# API Reference — REYCH Landing Page

Documentación de funciones callable desde el cliente y el servidor.

## Funciones Servidor (Callable)

Estas funciones pueden ser llamadas desde el cliente con `google.script.run`.

### `onClientMessage(message)`

Función de ejemplo para probar la conexión cliente-servidor.

**Parámetros:**
- `message` (string) — Mensaje del cliente

**Retorna:**
```javascript
{
  success: true,
  message: "Servidor recibió: ...",
  timestamp: "2026-04-10T10:30:00Z"
}
```

**Ejemplo:**
```javascript
google.script.run
  .withSuccessHandler(result => console.log(result))
  .onClientMessage("Hola servidor");
```

---

### `handleFormSubmission(formData)`

Procesa un envío de formulario.

**Parámetros:**
- `formData` (object) — Objeto con campos del formulario
  ```javascript
  {
    name: "Juan",
    email: "juan@example.com",
    message: "Mensaje de contacto"
  }
  ```

**Retorna:**
```javascript
{
  success: true/false,
  message: "Descripción del resultado",
  data: formData
}
```

**Ejemplo:**
```javascript
const form = {
  name: document.getElementById('name').value,
  email: document.getElementById('email').value
};

google.script.run
  .withSuccessHandler(result => {
    if (result.success) alert('Enviado!');
  })
  .handleFormSubmission(form);
```

---

## Funciones Utilidad

### `log(message)` — `src/utils/helpers.gs`

Loguea un mensaje con timestamp.

```javascript
log("Esto es un log"); // [2026-04-10 10:30:45] Esto es un log
```

---

### `getSheetByName(sheetName)` — `src/utils/helpers.gs`

Obtiene una hoja de cálculo por nombre.

```javascript
const sheet = getSheetByName("Submissions");
```

---

### `appendRow(sheetName, data)` — `src/utils/helpers.gs`

Añade una fila a una hoja.

```javascript
appendRow("Submissions", ["Juan", "juan@example.com", "2026-04-10"]);
```

---

## Constantes Globales

Ver `src/utils/constants.gs`:

```javascript
SHEETS_CONFIG.SPREADSHEET_ID    // ID de tu Google Sheet
SHEETS_CONFIG.SHEET_SUBMISSIONS // Nombre de la hoja
MAIL_CONFIG.ADMIN_EMAIL         // Email del admin
MESSAGES.SUCCESS                // "Operación completada exitosamente"
```

---

## Patrón Cliente-Servidor

**Cliente → Servidor:**
```javascript
google.script.run
  .withSuccessHandler(onSuccess)
  .withFailureHandler(onError)
  .serverFunction(param1, param2);
```

**Servidor → Cliente:**
```javascript
function serverFunction(param1, param2) {
  return {
    data: "resultado",
    status: "ok"
  };
}
```

---

## Tips

- Las funciones callable no pueden tener `_` al inicio (son privadas)
- Siempre devuelve objetos JS simples (no clases)
- Maneja errores con try/catch en el servidor
- Usa `withFailureHandler` en el cliente para errores
