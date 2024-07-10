"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = require("dotenv");
var _mensajes = require("../message/mensajes.js");
(0, _dotenv.config)();

/**
 * Middleware para verificar el token (JWT).
 * 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @param {Function} next - La función next para pasar al siguiente middleware.
 */
var verifyToken = exports.verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authHeader, token, valida;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          authHeader = req.headers["authorization"];
          token = authHeader && authHeader.split(" ")[1];
          if (token) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", (0, _mensajes.incompleto)(req, res, 401, "Token no proporcionado"));
        case 4:
          _context.prev = 4;
          _context.next = 7;
          return _jsonwebtoken["default"].verify(token, process.env.TOKEN_PRIVATEKEY);
        case 7:
          valida = _context.sent;
          req.user = valida;
          next();
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](4);
          return _context.abrupt("return", (0, _mensajes.incompleto)(req, res, 401, "Token no válido"));
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 12]]);
  }));
  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();