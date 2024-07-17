"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _controlCursos = require("../controllers/control.cursos.js");
var _oauth = require("../middlewares/oauth.js");
var router = _express["default"].Router();
router.post("/cursos", _oauth.verifyToken, _controlCursos.upload.fields([{
  name: 'imagen',
  maxCount: 1
}, {
  name: 'video',
  maxCount: 1
}]), _controlCursos.insertarCurso);
router.get("/cursos", _oauth.verifyToken, _controlCursos.mostrarCursos);
router.get("/cursos/free", _controlCursos.mostrarCursosFree);
router.get("/cursos/:id", _oauth.verifyToken, _controlCursos.mostrarCurso);
router["delete"]("/cursos/:id", _oauth.verifyToken, _controlCursos.eliminarCurso);
var _default = exports["default"] = router;