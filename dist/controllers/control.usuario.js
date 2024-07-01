"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarusuarios = exports.mostrarusuario = exports.modificarusuario = exports.modificarRolUsuario = exports.logueoUsuario = exports.eliminarusuario = exports.crearusuario = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
var _mensajes = require("../message/mensajes.js");
var _dotenv = require("dotenv");
(0, _dotenv.config)();

// Creaciones usuario

var crearusuario = exports.crearusuario = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, nombre, correo, contrasenaPlain, fechaNacimiento, telefono, contrasenaHash, contrasena, _respuesta, idConsulta, nuevoUsuarioId, payload, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, correo = _req$body.correo, contrasenaPlain = _req$body.contrasenaPlain, fechaNacimiento = _req$body.fechaNacimiento, telefono = _req$body.telefono;
          _context.prev = 1;
          _context.next = 4;
          return _bcrypt["default"].hash(contrasenaPlain, 10);
        case 4:
          contrasenaHash = _context.sent;
          contrasena = contrasenaHash;
          _context.next = 8;
          return _dbConfig["default"].query("CALL sp_insertarusuario('".concat(nombre, "', '").concat(correo, "', '").concat(contrasena, "', '").concat(fechaNacimiento, "', 'null', 'null', '").concat(telefono, "')"));
        case 8:
          _respuesta = _context.sent;
          if (!(_respuesta[0].affectedRows == 1)) {
            _context.next = 19;
            break;
          }
          _context.next = 12;
          return _dbConfig["default"].query("SELECT LAST_INSERT_ID() AS id");
        case 12:
          idConsulta = _context.sent;
          nuevoUsuarioId = idConsulta[0][0].id;
          payload = {
            id: nuevoUsuarioId,
            nombre: nombre,
            correo: correo
          };
          token = _jsonwebtoken["default"].sign(payload, process.env.TOKEN_PRIVATEKEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN
          });
          return _context.abrupt("return", res.status(201).json({
            message: "Usuario creado exitosamente",
            token: token
          }));
        case 19:
          return _context.abrupt("return", res.status(200).json({
            message: "No se pudo crear el usuario"
          }));
        case 20:
          _context.next = 25;
          break;
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 22]]);
  }));
  return function crearusuario(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Obtener usuario(s)

var mostrarusuario = exports.mostrarusuario = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, _respuesta2;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params['id'];
          _context2.prev = 1;
          _context2.next = 4;
          return _dbConfig["default"].query("CALL sp_mostrarusuario(".concat(id, ")"));
        case 4:
          _respuesta2 = _context2.sent;
          (0, _mensajes.completo)(req, res, 200, _respuesta2[0]);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          (0, _mensajes.incompleto)(req, res, 400, respuesta[0]);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 8]]);
  }));
  return function mostrarusuario(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var mostrarusuarios = exports.mostrarusuarios = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _respuesta3;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _dbConfig["default"].query("CALL sp_mostrarusuarios()");
        case 3:
          _respuesta3 = _context3.sent;
          (0, _mensajes.completo)(req, res, 200, _respuesta3[0]);
          _context3.next = 10;
          break;
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          (0, _mensajes.incompleto)(req, res, 400, respuesta[0]);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function mostrarusuarios(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// Modificar usuario

var modificarusuario = exports.modificarusuario = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, id, nombre, correo, contrasenaPlain, fechaNacimiento, genero, telefono, contrasenaHash, contrasena, _respuesta4;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, id = _req$body2.id, nombre = _req$body2.nombre, correo = _req$body2.correo, contrasenaPlain = _req$body2.contrasenaPlain, fechaNacimiento = _req$body2.fechaNacimiento, genero = _req$body2.genero, telefono = _req$body2.telefono;
          _context4.prev = 1;
          _context4.next = 4;
          return _bcrypt["default"].hash(contrasenaPlain, 10);
        case 4:
          contrasenaHash = _context4.sent;
          contrasena = contrasenaHash;
          _context4.next = 8;
          return _dbConfig["default"].query("CALL sp_modificarusuario(".concat(id, ", '").concat(nombre, "', '").concat(correo, "', '").concat(contrasena, "', '").concat(fechaNacimiento, "', '").concat(genero, "', '").concat(telefono, "')"));
        case 8:
          _respuesta4 = _context4.sent;
          if (_respuesta4[0].affectedRows == 1) {
            (0, _mensajes.completo)(req, res, 201, "Usuario modificado exitosamente");
          } else {
            (0, _mensajes.completo)(req, res, 200, "No se pudo modificar el usuario");
          }
          _context4.next = 15;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          (0, _mensajes.incompleto)(req, res, 500, "Error en el servidor, por favor intentalo de nuevo más tarde");
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 12]]);
  }));
  return function modificarusuario(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var modificarRolUsuario = exports.modificarRolUsuario = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var rol, correo, _yield$conexion$query, _yield$conexion$query2, result, payload, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          rol = req.body.rol;
          correo = req.user.correo;
          _context5.prev = 2;
          console.log("Correo del usuario:", correo);
          console.log("Rol seleccionado:", rol);
          _context5.next = 7;
          return _dbConfig["default"].query('CALL sp_modificarrol(?, ?)', [correo, rol]);
        case 7:
          _yield$conexion$query = _context5.sent;
          _yield$conexion$query2 = (0, _slicedToArray2["default"])(_yield$conexion$query, 1);
          result = _yield$conexion$query2[0];
          if (!(result.affectedRows === 1)) {
            _context5.next = 16;
            break;
          }
          payload = {
            correo: correo,
            rol: rol
          };
          token = _jsonwebtoken["default"].sign(payload, process.env.TOKEN_PRIVATEKEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN
          });
          return _context5.abrupt("return", res.status(200).json({
            message: 'Rol actualizado exitosamente',
            token: token
          }));
        case 16:
          return _context5.abrupt("return", res.status(404).json({
            message: 'Usuario no encontrado'
          }));
        case 17:
          _context5.next = 23;
          break;
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](2);
          console.error('Error al actualizar el rol:', _context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: 'Error en el servidor, por favor intentalo de nuevo más tarde'
          }));
        case 23:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 19]]);
  }));
  return function modificarRolUsuario(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var eliminarusuario = exports.eliminarusuario = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, _respuesta5;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params['id'];
          _context6.prev = 1;
          _context6.next = 4;
          return _dbConfig["default"].query("CALL sp_eliminarusuario(".concat(id, ")"));
        case 4:
          _respuesta5 = _context6.sent;
          if (_respuesta5[0].affectedRows == 1) {
            (0, _mensajes.completo)(req, res, 200, "Usuario eliminado");
          } else {
            (0, _mensajes.completo)(req, res, 200, "Usuario no se pudo eliminar");
          }
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          (0, _mensajes.incompleto)(req, res, 400, "Error interno: Intente de nuevo");
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 8]]);
  }));
  return function eliminarusuario(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var logueoUsuario = exports.logueoUsuario = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _req$body3, correo, contrasena, _yield$conexion$query3, _yield$conexion$query4, rows, usuario, match, payload, token;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body3 = req.body, correo = _req$body3.correo, contrasena = _req$body3.contrasena;
          _context7.prev = 1;
          _context7.next = 4;
          return _dbConfig["default"].query('CALL sp_buscarusuario(?)', [correo]);
        case 4:
          _yield$conexion$query3 = _context7.sent;
          _yield$conexion$query4 = (0, _slicedToArray2["default"])(_yield$conexion$query3, 1);
          rows = _yield$conexion$query4[0];
          if (!(rows.length === 0 || rows[0].length === 0)) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(401).json({
            message: "Usuario no existe"
          }));
        case 9:
          usuario = rows[0][0];
          _context7.next = 12;
          return _bcrypt["default"].compare(contrasena, usuario.contrasena);
        case 12:
          match = _context7.sent;
          if (match) {
            _context7.next = 15;
            break;
          }
          return _context7.abrupt("return", res.status(401).json({
            message: "Clave incorrecta"
          }));
        case 15:
          payload = {
            id: usuario.id,
            correo: usuario.correo,
            rol: usuario.rol // Asegúrate de que el rol esté incluido en el payload
          };
          token = _jsonwebtoken["default"].sign(payload, process.env.TOKEN_PRIVATEKEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN
          });
          return _context7.abrupt("return", res.status(200).json({
            message: "Inicio de sesión exitoso",
            token: token
          }));
        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7["catch"](1);
          return _context7.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 23:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 20]]);
  }));
  return function logueoUsuario(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();