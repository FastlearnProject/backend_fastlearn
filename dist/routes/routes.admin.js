"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _oauth = require("../middlewares/oauth.js");
var _controlAdmin = require("../controllers/control.admin.js");
var rutaAdmin = (0, _express.Router)();
rutaAdmin.get("/admin/:id", _controlAdmin.mostrarAdmin);
rutaAdmin.get("/admin", _controlAdmin.mostrarAdmins);
rutaAdmin.post("/loginAdmin", _controlAdmin.logueoAdmin);
var _default = exports["default"] = rutaAdmin;