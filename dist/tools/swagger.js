"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _dotenv = require("dotenv");
var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
(0, _dotenv.config)();

/**
 * Configuración de la documentación de la API.
 * @type {object}
 */
var doc = {
  info: {
    title: 'FastLearn API',
    description: 'API documentation for FastLearn'
  },
  host: 'service-fastlearn.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      "in": 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
};

/**
 *  Ruta de salida para el archivo generado por swagger-autogen.
 * @type {string}
 */
var outputFile = './swagger-output.json';

/**
 * Lista de rutas a ser incluidas en la documentación.
 * @type {Array<string>}
 */
var routes = ['../routes/routes.main.js', '../routes/routes.user.js', '../routes/routes.courses.js'];

/**
 * Generar la documentación con ayuda de Swagger.
 */
(0, _swaggerAutogen["default"])()(outputFile, routes, doc);