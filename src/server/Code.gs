/**
 * REYCH Landing Page — Google Apps Script
 * API Backend para formulario de contacto
 * Guarda datos en Google Sheets
 */

const SHEET_ID = "17ub7gbSBi70DTidbID3jM-ZLLD69lu2JxlxAbCSwykQ";

/**
 * Endpoint POST para procesar el formulario
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const formData = payload.data;

    // Validar campos requeridos
    if (!formData.name || !formData.email || !formData.phone) {
      return buildResponse(false, 'El nombre, email y teléfono son requeridos');
    }

    // Guardar en Google Sheets
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Contactos');

    if (!sheet) {
      sheet = ss.insertSheet('Contactos');
      sheet.appendRow([
        'Fecha',
        'Nombre',
        'Email',
        'Teléfono',
        'País',
        'Asunto',
        'Mensaje'
      ]);
    }

    // Agregar fila con los datos del formulario
    sheet.appendRow([
      new Date(),
      formData.name,
      formData.email,
      formData.phone,
      formData.country || '(No especificado)',
      formData.subject,
      formData.message
    ]);

    return buildResponse(true, '¡Mensaje recibido! Pronto me pondré en contacto.');
  } catch (error) {
    return buildResponse(false, error.message);
  }
}

/**
 * Construir respuesta con headers CORS
 */
function buildResponse(success, message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: success,
      message: message
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * Manejo de requests OPTIONS (CORS preflight)
 */
function doOptions(e) {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
