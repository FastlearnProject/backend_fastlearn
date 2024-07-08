"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireWildcard(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = require("dotenv");
var _index = _interopRequireDefault(require("./routes/index.js"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
(0, _dotenv.config)();

/**
 * Configuaración y creación de Express.
 * 
 * @type {object}
 */
var app = (0, _express["default"])();

// Middleware para tener en cuenta el JSON..
app.use(_express["default"].json());

// Middleware para tener en cuenta URL-encoded.
app.use(_express["default"].urlencoded({
  extended: true
}));

// Configuración del puerto de la aplicación.
app.set("port", process.env.PORT || 6000);

//Middleware para habilitar CORS.
app.use((0, _cors["default"])());

/**
 * Middleware principal para manejar las rutas de la aplicación.
 * @type {Router}
 */
app.use("/", _index["default"]);
var _default = exports["default"] = app;