"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _swaggerAutogen = _interopRequireDefault(require("swagger-autogen"));
var doc = {
  info: {
    title: 'API FASTLEARN',
    description: 'Gestion de usuarios'
  },
  host: "https://backend-fastlearn.onrender.com/" + ""
};
var outputFile = './swagger-output.json';
var routes = ['../routes/routes.main.js', '../routes/routes.user.js'];
(0, _swaggerAutogen["default"])()(outputFile, routes, doc);