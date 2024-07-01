"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.incompleto = exports.completo = void 0;
var completo = exports.completo = function completo(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var mensaje = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  res.status(status).json({
    error: false,
    status: status,
    body: mensaje
  });
};
var incompleto = exports.incompleto = function incompleto(req, res) {
  var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var mensaje = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  res.status(status).json({
    error: true,
    status: status,
    body: mensaje
  });
};