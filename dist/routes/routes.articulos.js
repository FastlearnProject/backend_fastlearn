"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _control = require("../controllers/control.articulos");
var _oauth = require("../middlewares/oauth.js");
var rutaArticulos = (0, _express.Router)();
rutaArticulos.post("/articles", _oauth.verifyToken, _control.insertarArticulo);
rutaArticulos.get("/articles", _oauth.verifyToken, _control.mostrarArticulos);
rutaArticulos.get("/articles/:id", _oauth.verifyToken, _control.mostrarArticulo);
rutaArticulos["delete"]("/articles/:id", _oauth.verifyToken, _control.eliminarArticulo);
rutaArticulos.get("/articlesUser/:id", _oauth.verifyToken, _control.mostrarArticuloUsuario);
var _default = exports["default"] = rutaArticulos;