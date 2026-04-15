/**
 * REYCH Landing Page — Google Apps Script
 * Backend para formulario de contacto
 * Guarda datos en Google Sheets
 */

const SHEET_ID = "17ub7gbSBi70DTidbID3jM-ZLLD69lu2JxlxAbCSwykQ";

/**
 * Endpoint GET para procesar el formulario
 */
function doGet(e) {
  try {
    // Extraer parámetros de la URL
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const phone = e.parameter.phone || '';
    const message = e.parameter.message || '';

    // Validar campos requeridos
    if (!name || !email || !phone || !message) {
      return buildResponse(false, 'Campos requeridos faltantes');
    }

    // Abrir Google Sheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Contactos');

    // Crear hoja si no existe
    if (!sheet) {
      sheet = ss.insertSheet('Contactos');
      sheet.appendRow([
        'Fecha',
        'Nombre',
        'Email',
        'Teléfono',
        'Mensaje'
      ]);
    }

    // Agregar fila con los datos
    sheet.appendRow([
      new Date(),
      name,
      email,
      phone,
      message
    ]);

    return buildResponse(true, 'Mensaje recibido correctamente');

  } catch (error) {
    return buildResponse(false, 'Error: ' + error.message);
  }
}

/**
 * Construir respuesta JSON
 */
function buildResponse(success, message) {
  const response = {
    success: success,
    message: message
  };
  const output = ContentService.createTextOutput(JSON.stringify(response));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
