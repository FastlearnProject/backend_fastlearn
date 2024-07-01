"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var rutaMain = (0, _express.Router)();
rutaMain.get("/", function (req, res) {
  res.json("Inicio del backend");
});
var _default = exports["default"] = rutaMain;