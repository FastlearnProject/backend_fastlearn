"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incompleto = exports.completo = void 0;
/**
 * @module msg
 */

/**
 * Envía una respuesta JSON con un estado de éxito.
 * 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @param {number} [status=200] - El código de estado HTTP.
 * @param {string} [mensaje=""] - El mensaje a incluir en la respuesta.
 */
var completo = exports.completo = function completo(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var mensaje = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  res.status(status).json({
    error: false,
    status: status,
    body: mensaje
  });
};

/**
 * Envía una respuesta JSON con un estado de error.
 * 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @param {number} [status=500] - El código de estado HTTP.
 * @param {string} [mensaje=""] - El mensaje a incluir en la respuesta.
 */
var incompleto = exports.incompleto = function incompleto(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var mensaje = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  res.status(status).json({
    error: true,
    status: status,
    body: mensaje
  });
};