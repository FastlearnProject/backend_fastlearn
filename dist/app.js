"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = require("dotenv");
var _index = _interopRequireDefault(require("./routes/index.js"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("./swagger-output.json"));
(0, _dotenv.config)();

/**
 * Configuaración y creación de Express.
 * 
 * @type {object}
 */
var app = (0, _express["default"])();

// Middleware para tener en cuenta el JSON..
app.use(_express["default"].json());

// Middleware para tener en cuenta URL-encoded.
app.use(_express["default"].urlencoded({
  extended: true
}));

// Configuración del puerto de la aplicación.
app.set("port", process.env.PORT || 6000);

// Middleware para habilitar CORS.
app.use((0, _cors["default"])());

/**
 * Middleware principal para manejar las rutas de la aplicación.
 * @type {Router}
 */
app.use("/", _index["default"]);

// Usar Swagger UI para la documentación
app.use('/doc', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
var _default = exports["default"] = app;