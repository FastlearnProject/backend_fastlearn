"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _dotenv = require("dotenv");
var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
(0, _dotenv.config)();
var backend = process.env.BACKEND || 3000;
var doc = {
  info: {
    title: 'API FASTLEARN',
    description: 'Gestion de usuarios'
  },
  host: backend
};
var outputFile = './swagger-output.json';
var routes = ['../routes/routes.main.js', '../routes/routes.user.js'];
(0, _swaggerAutogen["default"])()(outputFile, routes, doc);