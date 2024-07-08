"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _oauth = require("../middlewares/oauth");
var _control = require("../controllers/control.cursos");
/**
 * Se utiliza el Express Router para manejar las rutas de los cursos.
 * @type {object}
 */
var rutaCursos = (0, _express.Router)();

/**
 * Ruta para obtener la lista de cursos.
 * @name get/cursos
 * @memberof rutaCursos
 * @function
 * @inner
 */
rutaCursos.get("/cursos", _control.mostrarCursos);

/**
 * Ruta para insertar un nuevo curso.
 * @name post/cursos
 * @memberof rutaCursos
 * @function
 */
rutaCursos.post("/cursos", _control.insertarCurso);

/**
 * Ruta para mostrar cursos.
 * @name get/cursos-free
 * @memberof rutaCursos
 * @function
 */
rutaCursos.get("/cursos-free", _control.mostrarCursosFree);
/**
 * Ruta para incertar cursos y verificar token.
 * @name post/cursos
 * @memberof rutaCursos
 * @function
 */
rutaCursos.post("/cursos", _oauth.verifyToken, _control.insertarCurso);
var _default = exports["default"] = rutaCursos;