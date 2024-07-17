"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controlAdmin = require("../controllers/control.admin.js");
var _oauth = require("../middlewares/oauth.js");
var rutaAdmin = (0, _express.Router)();
rutaAdmin.get("/admin/:id", _oauth.verifyToken, _controlAdmin.mostrarAdmin);
rutaAdmin.get("/admin", _oauth.verifyToken, _controlAdmin.mostrarAdmins);
rutaAdmin.post("/loginAdmin", _controlAdmin.logueoAdmin);
rutaAdmin.put("/admin", _controlAdmin.logueoAdmin);
rutaAdmin["delete"]("/admin", _controlAdmin.logueoAdmin);
var _default = exports["default"] = rutaAdmin;