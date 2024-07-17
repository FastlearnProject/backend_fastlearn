"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarAdmins = exports.mostrarAdmin = exports.logueoAdmin = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var mostrarAdmins = exports.mostrarAdmins = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _dbConfig["default"].query("CALL sp_mostraradmins()");
        case 3:
          respuesta = _context.sent;
          return _context.abrupt("return", res.status(200).json(respuesta[0]));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error al mostrar cursos:", _context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function mostrarAdmins(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var mostrarAdmin = exports.mostrarAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params['id'];
          _context2.prev = 1;
          _context2.next = 4;
          return _dbConfig["default"].query("CALL sp_mostraradmin(".concat(id, ")"));
        case 4:
          respuesta = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(respuesta[0]));
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.error("Error al mostrar cursos:", _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function mostrarAdmin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var logueoAdmin = exports.logueoAdmin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, correo, contrasena, _yield$conexion$query, _yield$conexion$query2, rows, admin, match, payload, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, correo = _req$body.correo, contrasena = _req$body.contrasena;
          _context3.prev = 1;
          _context3.next = 4;
          return _dbConfig["default"].query("CALL sp_buscaradmin(?)", [correo]);
        case 4:
          _yield$conexion$query = _context3.sent;
          _yield$conexion$query2 = (0, _slicedToArray2["default"])(_yield$conexion$query, 1);
          rows = _yield$conexion$query2[0];
          if (!(rows.length === 0 || rows[0].length === 0)) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            message: "Aministrador no existe"
          }));
        case 9:
          admin = rows[0][0];
          _context3.next = 12;
          return _bcrypt["default"].compare(contrasena, admin.contrasena);
        case 12:
          match = _context3.sent;
          if (match) {
            _context3.next = 15;
            break;
          }
          return _context3.abrupt("return", res.status(401).json({
            message: "Clave incorrecta"
          }));
        case 15:
          payload = {
            id_admin: admin.id_admin,
            correo: admin.correo,
            rol: admin.rol
          };
          token = _jsonwebtoken["default"].sign(payload, process.env.TOKEN_PRIVATEKEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN
          });
          return _context3.abrupt("return", res.status(200).json({
            message: "Inicio de sesión exitoso",
            token: token
          }));
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](1);
          console.error("Error al iniciar sesión:", _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 20]]);
  }));
  return function logueoAdmin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();