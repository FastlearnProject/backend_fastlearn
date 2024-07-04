"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
var doc = {
  info: {
    title: 'FastLearn API',
    description: 'API documentation for FastLearn'
  },
  host: 'backend-fastlearn.onrender.com',
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
var outputFile = './swagger-output.json';
var routes = ['../routes/routes.main.js', '../routes/routes.user.js', '../routes/routes.courses.js'];
(0, _swaggerAutogen["default"])()(outputFile, routes, doc);