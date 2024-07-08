"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app.js"));
/**
 * Inicio del servidor y escucha en el puerto especifico.
 * @callback listen
 */
_app["default"].listen(_app["default"].get("port"), function () {
  console.log("Ejecutandose en: http://localhost:".concat(_app["default"].get("port")));
});