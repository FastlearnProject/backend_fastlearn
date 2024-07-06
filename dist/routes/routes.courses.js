"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _oauth = require("../middlewares/oauth");
var _control = require("../controllers/control.cursos");
var rutaCursos = (0, _express.Router)();
rutaCursos.get("/cursos", _oauth.verifyToken, _control.mostrarCursos);
rutaCursos.get("/cursos-free", _control.mostrarCursosFree);
rutaCursos.post("/cursos", _oauth.verifyToken, _control.insertarCurso);
var _default = exports["default"] = rutaCursos;