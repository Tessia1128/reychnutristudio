/**
 * constants.gs
 * Variables de configuración y constantes del proyecto
 */

// IDs de Google Sheets (actualizar con IDs reales)
const SHEETS_CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',
  SHEET_SUBMISSIONS: 'Submissions',  // Nombre de la hoja donde guardar envíos
  SHEET_SETTINGS: 'Settings'         // Hoja de configuración
};

// Configuración de Gmail (si aplica)
const MAIL_CONFIG = {
  SENDER_EMAIL: 'noreply@example.com',
  ADMIN_EMAIL: 'admin@example.com',
  REPLY_TO: 'contact@example.com'
};

// URLs y endpoints
const URLS = {
  BASE: 'https://script.google.com/macros/d/{SCRIPT_ID}/userweb',
  DOCS: 'https://docs.google.com/document/d/{DOCUMENT_ID}'
};

// Mensajes y textos constantes
const MESSAGES = {
  SUCCESS: 'Operación completada exitosamente',
  ERROR: 'Ocurrió un error. Por favor intenta de nuevo.',
  VALIDATION_ERROR: 'Los datos no son válidos'
};
