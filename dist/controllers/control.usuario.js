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
var _dotenv = require("dotenv");
/**
 * Este es el controlador de usuario
 * @module ctr-usuario
 */

(0, _dotenv.config)();

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @param {Object} req - Toma los datos necesarios para el registro del usuario.
 * @param {Object} res - Envía los datos recibidos.
 */
var crearusuario = exports.crearusuario = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, nombre, correo, contrasenaPlain, fechaNacimiento, telefono, contrasenaHash, respuesta, usuario, idUsuario, payload, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          //Captura todos los datos necesarios para el registro del usuario
          _req$body = req.body, nombre = _req$body.nombre, correo = _req$body.correo, contrasenaPlain = _req$body.contrasenaPlain, fechaNacimiento = _req$body.fechaNacimiento, telefono = _req$body.telefono;
          _context.prev = 1;
          _context.next = 4;
          return _bcrypt["default"].hash(contrasenaPlain, 10);
        case 4:
          contrasenaHash = _context.sent;
          _context.next = 7;
          return _dbConfig["default"].query("CALL sp_insertarusuario(?, ?, ?, ?, ?, ?, ?)", [nombre, correo, contrasenaHash, fechaNacimiento, "null", "null", telefono]);
        case 7:
          respuesta = _context.sent;
          if (!respuesta[0][0]) {
            _context.next = 16;
            break;
          }
          usuario = respuesta[0][0];
          idUsuario = usuario[0].id_usuario;
          payload = {
            id_usuario: idUsuario,
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
        case 16:
          return _context.abrupt("return", res.status(200).json({
            message: "No se pudo crear el usuario"
          }));
        case 17:
          _context.next = 23;
          break;
        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](1);
          console.error("Error al crear usuario:", _context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 23:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 19]]);
  }));
  return function crearusuario(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Muestra la información de un usuario por su ID.
 * 
 * @param {Object} req - Recibe el parametro necesario.
 * @param {Object} res - Envía la respuesta.
 */
var mostrarusuario = exports.mostrarusuario = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return _dbConfig["default"].query("CALL sp_mostrarusuario(".concat(id, ")"));
        case 4:
          respuesta = _context2.sent;
          if (!(respuesta[0].length > 0)) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(200).json(respuesta[0][0]));
        case 9:
          return _context2.abrupt("return", res.status(404).json({
            message: "Usuario no encontrado"
          }));
        case 10:
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          console.error("Error al mostrar usuario:", _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return function mostrarusuario(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Muestra la lista de todos los usuarios.
 * 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 */
var mostrarusuarios = exports.mostrarusuarios = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _dbConfig["default"].query("CALL sp_mostrarusuarios()");
        case 3:
          respuesta = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(respuesta[0]));
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error al mostrar usuarios:", _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function mostrarusuarios(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Modifica la información de un usuario existente.
 * 
 * @param {Object} req - Toma la información nueva.
 * @param {Object} res - Envía la información a la base de datos.
 */
var modificarusuario = exports.modificarusuario = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, nombre, correo, contrasenaPlain, fechaNacimiento, genero, telefono, contrasenaHash, contrasena, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params['id_usuario'];
          _req$body2 = req.body, nombre = _req$body2.nombre, correo = _req$body2.correo, contrasenaPlain = _req$body2.contrasenaPlain, fechaNacimiento = _req$body2.fechaNacimiento, genero = _req$body2.genero, telefono = _req$body2.telefono;
          _context4.prev = 2;
          _context4.next = 5;
          return _bcrypt["default"].hash(contrasenaPlain, 10);
        case 5:
          contrasenaHash = _context4.sent;
          contrasena = contrasenaHash;
          _context4.next = 9;
          return _dbConfig["default"].query("CALL sp_modificarusuario(".concat(id, ",'").concat(nombre, "', '").concat(correo, "', '").concat(contrasena, "', '").concat(fechaNacimiento, "', '").concat(genero, "', '").concat(telefono, "')"));
        case 9:
          respuesta = _context4.sent;
          if (!(respuesta[0].affectedRows === 1)) {
            _context4.next = 14;
            break;
          }
          return _context4.abrupt("return", res.status(200).json({
            message: "Usuario modificado exitosamente"
          }));
        case 14:
          return _context4.abrupt("return", res.status(404).json({
            message: "Usuario no encontrado"
          }));
        case 15:
          _context4.next = 21;
          break;
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](2);
          console.error("Error al modificar usuario:", _context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 17]]);
  }));
  return function modificarusuario(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Modifica el rol de un usuario.
 * 
 * @param {Object} req - Recibe la solicitud.
 * @param {Object} res - Envía la respuesta.
 */
var modificarRolUsuario = exports.modificarRolUsuario = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var rol, id_usuario, correo, _yield$conexion$query, _yield$conexion$query2, result, payload, token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          rol = req.body.rol;
          id_usuario = req.user.id_usuario;
          correo = req.user.correo;
          _context5.prev = 3;
          console.log("Id del usuario:", id_usuario);
          console.log("Correo del usuario:", correo);
          console.log("Rol seleccionado:", rol);
          _context5.next = 9;
          return _dbConfig["default"].query("CALL sp_modificarrol(?, ?)", [correo, rol]);
        case 9:
          _yield$conexion$query = _context5.sent;
          _yield$conexion$query2 = (0, _slicedToArray2["default"])(_yield$conexion$query, 1);
          result = _yield$conexion$query2[0];
          console.log("Resultado de la consulta:", result);
          if (!(result && result.affectedRows === 1)) {
            _context5.next = 19;
            break;
          }
          payload = {
            id_usuario: id_usuario,
            correo: correo,
            rol: rol
          };
          token = _jsonwebtoken["default"].sign(payload, process.env.TOKEN_PRIVATEKEY, {
            expiresIn: process.env.TOKEN_EXPIRES_IN
          });
          return _context5.abrupt("return", res.status(200).json({
            message: "Rol actualizado exitosamente",
            token: token
          }));
        case 19:
          return _context5.abrupt("return", res.status(404).json({
            message: "Usuario no encontrado"
          }));
        case 20:
          _context5.next = 26;
          break;
        case 22:
          _context5.prev = 22;
          _context5.t0 = _context5["catch"](3);
          console.error("Error al actualizar el rol:", _context5.t0); // Loguea el error detallado
          return _context5.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde",
            error: _context5.t0.message // Agrega el mensaje de error a la respuesta
          }));
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 22]]);
  }));
  return function modificarRolUsuario(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Elimina un usuario por su ID.
 * 
 * @param {Object} req - Recibe la información del usuario (ID).
 * @param {Object} res - Envía la respuesta.
 */
var eliminarusuario = exports.eliminarusuario = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return _dbConfig["default"].query("CALL sp_eliminarusuario(".concat(id, ")"));
        case 4:
          respuesta = _context6.sent;
          if (!(respuesta[0].affectedRows === 1)) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            message: "Usuario eliminado exitosamente"
          }));
        case 9:
          return _context6.abrupt("return", res.status(404).json({
            message: "Usuario no encontrado"
          }));
        case 10:
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          console.error("Error al eliminar usuario:", _context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return function eliminarusuario(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Autentica un usuario y proporciona un token JWT.
 * 
 * @param {Object} req - Recibe la información de ingreso.
 * @param {Object} res - Da la respuesta adecuada dependiendo de las reglas del sistema.
 */
var logueoUsuario = exports.logueoUsuario = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var _req$body3, correo, contrasena, _yield$conexion$query3, _yield$conexion$query4, rows, usuario, match, payload, token;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body3 = req.body, correo = _req$body3.correo, contrasena = _req$body3.contrasena;
          _context7.prev = 1;
          _context7.next = 4;
          return _dbConfig["default"].query("CALL sp_buscarusuario(?)", [correo]);
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
            id_usuario: usuario.id_usuario,
            correo: usuario.correo,
            rol: usuario.rol
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
          console.error("Error al iniciar sesión:", _context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 24:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 20]]);
  }));
  return function logueoUsuario(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();