"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
/**
 * Se utiliza el Express Router para manejar la ruta inicial del proyecto.
 * @type {object}
 */
var rutaMain = (0, _express.Router)();

/**
 * Ruta inicial, muestra un mensaje dando la bienvenida al backend.
 * @name post/cursos
 * @memberof rutaCursos
 * @function
 */
rutaMain.get("/", function (req, res) {
  res.json("Inicio del backend");
});
var _default = exports["default"] = rutaMain;