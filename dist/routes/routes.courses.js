"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _control = require("../controllers/control.cursos");
var rutaCursos = (0, _express.Router)();
rutaCursos.get("/cursos", _control.mostrarCursos);
rutaCursos.post("/cursos", _control.insertarCurso);
var _default = exports["default"] = rutaCursos;