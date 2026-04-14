/**
 * helpers.gs
 * Funciones helper reutilizables
 */

/**
 * Log con timestamp
 * @param {string} message - Mensaje a loguear
 */
function log(message) {
  const timestamp = new Date().toLocaleString('es-AR');
  console.log(`[${timestamp}] ${message}`);
}

/**
 * Obtiene el ID de la hoja activa
 * @return {string} ID del spreadsheet
 */
function getActiveSpreadsheetId() {
  return SpreadsheetApp.getActiveSpreadsheet().getId();
}

/**
 * Obtiene una hoja por nombre
 * @param {string} sheetName - Nombre de la hoja
 * @return {Sheet} Objeto de la hoja
 */
function getSheetByName(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Hoja "${sheetName}" no encontrada`);
  }
  return sheet;
}

/**
 * Añade una fila a una hoja
 * @param {string} sheetName - Nombre de la hoja
 * @param {Array} data - Datos a insertar
 */
function appendRow(sheetName, data) {
  const sheet = getSheetByName(sheetName);
  sheet.appendRow(data);
  log(`Fila añadida a ${sheetName}`);
}
