/**
 * REYCH Landing Page — Google Apps Script
 * API Backend para formulario de contacto
 * Guarda datos en Google Sheets
 * Webhook handler para Netlify deployments
 */

const SHEET_ID = "17ub7gbSBi70DTidbID3jM-ZLLD69lu2JxlxAbCSwykQ";
const NETLIFY_SECRET = "reych-secret-2024-xyzabc123"; // Debe coincidir con variable de Netlify

/**
 * Endpoint GET para procesar el formulario (parámetros en URL)
 */
function doGet(e) {
  try {
    Logger.log('=== FORM SUBMISSION RECEIVED ===');
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));

    // Extraer datos de los parámetros (de la URL)
    const formData = {
      name: e.parameter.name,
      email: e.parameter.email,
      phone: e.parameter.phone,
      country: e.parameter.country,
      subject: e.parameter.subject,
      message: e.parameter.message
    };

    Logger.log('Form Data: ' + JSON.stringify(formData));

    // Validar campos requeridos
    if (!formData.name || !formData.email || !formData.phone) {
      Logger.log('ERROR: Missing required fields');
      return buildResponse(false, 'El nombre, email y teléfono son requeridos');
    }

    // Guardar en Google Sheets
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Contactos');

    if (!sheet) {
      Logger.log('Creating new sheet: Contactos');
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
    const newRow = [
      new Date(),
      formData.name,
      formData.email,
      formData.phone,
      formData.country || '(No especificado)',
      formData.subject || '(Sin asunto)',
      formData.message || '(Sin mensaje)'
    ];

    Logger.log('Appending row: ' + JSON.stringify(newRow));
    sheet.appendRow(newRow);
    Logger.log('Row appended successfully');

    return buildResponse(true, '¡Mensaje recibido! Pronto me pondré en contacto.');
  } catch (error) {
    Logger.log('ERROR: ' + error.message);
    Logger.log('Stack: ' + error.stack);
    return buildResponse(false, 'Error: ' + error.message);
  }
}

/**
 * Construir respuesta con headers CORS
 * @param {boolean} success - Indica si la operación fue exitosa
 * @param {string|object} data - Mensaje (string) o datos (object)
 */
function buildResponse(success, data) {
  let response;

  // Si data es un string, es un mensaje (compatibilidad backwards)
  if (typeof data === 'string') {
    response = {
      success: success,
      message: data
    };
  } else {
    // Si es un objeto, es data estructurada
    response = {
      success: success,
      data: data
    };
  }

  // Retornar respuesta JSON simple
  // Los headers CORS se manejan en el frontend con mode: 'no-cors'
  const output = ContentService.createTextOutput(JSON.stringify(response));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
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

/**
 * Endpoint GET para health checks y Netlify webhooks
 * Uso: /apps/macros/d/{SCRIPT_ID}/usercontent/v1/?path=status&secret={NETLIFY_SECRET}
 */
function doGet(e) {
  try {
    const path = e.parameter.path || '';
    const secret = e.parameter.secret || '';

    // Health check (sin autenticación)
    if (path === 'status') {
      return buildResponse(true, {
        status: 'ok',
        message: 'REYCH backend is running',
        timestamp: new Date().toISOString()
      });
    }

    // Validar secret de Netlify para otras rutas
    if (secret !== NETLIFY_SECRET) {
      return buildResponse(false, { error: 'Unauthorized' });
    }

    // Webhook de Netlify deployment
    if (path === 'netlify-webhook') {
      logDeployment({
        timestamp: new Date().toISOString(),
        event: 'netlify_deployment',
        deployId: e.parameter.deployId || 'unknown',
        branch: e.parameter.branch || 'unknown'
      });

      return buildResponse(true, {
        message: 'Deployment logged successfully',
        deployId: e.parameter.deployId
      });
    }

    return buildResponse(false, { error: 'Not found' });
  } catch (error) {
    return buildResponse(false, { error: error.message });
  }
}

/**
 * Registrar deployments en Google Sheets
 */
function logDeployment(deploymentData) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName('Deployments');

    if (!sheet) {
      sheet = ss.insertSheet('Deployments');
      sheet.appendRow(['Timestamp', 'Event', 'Deploy ID', 'Branch', 'Status']);
    }

    sheet.appendRow([
      deploymentData.timestamp,
      deploymentData.event,
      deploymentData.deployId,
      deploymentData.branch,
      'Logged'
    ]);
  } catch (error) {
    Logger.log('Error logging deployment: ' + error.message);
  }
}

