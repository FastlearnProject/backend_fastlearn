"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controlUsuario = require("../controllers/control.usuario.js");
var _oauth = require("../middlewares/oauth.js");
var rutaUser = (0, _express.Router)();
rutaUser.post("/usuario", _controlUsuario.crearusuario);
rutaUser.post("/login", _controlUsuario.logueoUsuario);
rutaUser.get("/usuario", _oauth.verifyToken, _controlUsuario.mostrarusuarios);
rutaUser.get("/usuario/:id", _oauth.verifyToken, _controlUsuario.mostrarusuario);
rutaUser.put("/usuario/:id", _oauth.verifyToken, _controlUsuario.modificarusuario);
rutaUser.put("/rol", _oauth.verifyToken, _controlUsuario.modificarRolUsuario);
rutaUser["delete"]("/usuario/:id", _oauth.verifyToken, _controlUsuario.eliminarusuario);
var _default = exports["default"] = rutaUser;