# REYCH Landing Page — Requirements Ledger

Tracking requerimientos, tareas y decisiones del proyecto.

## Core Requirements

| # | Requisito | Status | Notas |
|---|-----------|--------|-------|
| 1 | HTML landing page | ✅ | Diseño completo con animaciones |
| 2 | Formulario de contacto | ⬜ | Guardar en Google Sheets |
| 3 | Descarga de recetario mensual | ⬜ | Link a Drive o email |
| 4 | Formulario de pedidos personalizados | ⬜ | Integración con email |
| 5 | Deploy en web app pública | ⬜ | Accessible via URL pública |

**Status:** ⬜ = Pendiente | 🔄 = En progreso | ✅ = Completado

## Google Services Requeridos

| Servicio | Necesario | Notas |
|----------|-----------|-------|
| Sheets | ✅ | Guardar formularios y datos |
| Drive | ✅ | Almacenar recetarios |
| Gmail | ✅ | Notificaciones y confirmaciones |
| UrlFetch | ❓ | Solo si se integran APIs externas |
| Forms | ❓ | No necesario (tenemos formulario custom) |

## Decisiones de Diseño

- Mantener el diseño actual sin cambios (muy profesional)
- Colores: azul primario (#7cb4f1), azul oscuro (#172674), amarillo (#fff3b3)
- Sin cambios en la estructura visual
- Animaciones: scroll reveal + frutas flotantes (mantener)

## Notas Técnicas

- Script ID: `1BcoGRhbIBZEUJtRFlw76kxOzAaZNTwoEGVXrFo8-PMcMo7zRM5dK70s3`
- HTML ya integrado en `src/client/index.html`
- Usar Google Sheets para almacenar datos de formularios
- Usar Gmail para notificaciones
- Próxima tarea: implementar formulario de contacto 
