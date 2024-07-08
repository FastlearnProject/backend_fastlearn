"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _routesMain = _interopRequireDefault(require("../routes/routes.main.js"));
var _routesUser = _interopRequireDefault(require("../routes/routes.user.js"));
var _routesCourses = _interopRequireDefault(require("./routes.courses.js"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOutput = _interopRequireDefault(require("../tools/swagger-output.json"));
/**
 * @module rutas-index
 */

/**
 * Se utiliza el Express Router para manejar las rutas del proyecto.
 * @type {object}
 */
var ruta = (0, _express.Router)();

/**
 * Hace uso de la ruta Main
 * @name / 
 * @memberof ruta
 * @function
 */
ruta.use("/", _routesMain["default"]);

/**
 * Hace uso de la ruta User
 * @name / 
 * @memberof ruta
 * @function
 */
ruta.use("/", _routesUser["default"]);

/**
 * Hace uso de la ruta Cursos
 * @name / 
 * @memberof ruta
 * @function
 */
ruta.use("/", _routesCourses["default"]);

/**
 * Hace uso de Swagger UI para realizar la documentación de la API.
 * @name / doc
 * @memberof ruta
 * @function
 */
ruta.use("/doc", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerOutput["default"]));
var _default = exports["default"] = ruta;