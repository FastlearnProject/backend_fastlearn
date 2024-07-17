"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarArticulos = exports.mostrarArticuloUsuario = exports.mostrarArticulo = exports.insertarArticulo = exports.eliminarArticulo = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _db = _interopRequireDefault(require("../config/db.config"));
var insertarArticulo = exports.insertarArticulo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, id_usuario, titulo, texto1, texto2, texto3, texto4, query, _yield$conexion$execu, _yield$conexion$execu2, rows, _yield$conexion$execu3, _yield$conexion$execu4, _rows;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, id_usuario = _req$body.id_usuario, titulo = _req$body.titulo, texto1 = _req$body.texto1, texto2 = _req$body.texto2, texto3 = _req$body.texto3, texto4 = _req$body.texto4; // Validar la entrada para prevenir inyección SQL
          if (!(!id_usuario || !titulo || !texto1 || !texto2 || !texto3 || !texto4)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Todos los campos son obligatorios"
          }));
        case 3:
          // Uso de prepared statements para evitar inyección SQL
          query = 'CALL sp_insertararticulo(?, ?, ?, ?, ?, ?)';
          _context.prev = 4;
          _context.next = 7;
          return _db["default"].execute(query, [id_usuario, titulo, texto1, texto2, texto3, texto4]);
        case 7:
          _yield$conexion$execu = _context.sent;
          _yield$conexion$execu2 = (0, _slicedToArray2["default"])(_yield$conexion$execu, 1);
          rows = _yield$conexion$execu2[0];
          if (!(rows.affectedRows === 1)) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", res.status(201).json({
            message: "Articulo creado exitosamente"
          }));
        case 14:
          return _context.abrupt("return", res.status(200).json({
            message: "No se pudo crear el articulo"
          }));
        case 15:
          _context.next = 39;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](4);
          console.error("Error al crear articulo:", _context.t0);

          // Reintentar en caso de error de conexión
          if (!(_context.t0.code === 'ECONNRESET')) {
            _context.next = 38;
            break;
          }
          _context.prev = 21;
          _context.next = 24;
          return _db["default"].execute(query, [id_usuario, titulo, texto1, texto2, texto3, texto4]);
        case 24:
          _yield$conexion$execu3 = _context.sent;
          _yield$conexion$execu4 = (0, _slicedToArray2["default"])(_yield$conexion$execu3, 1);
          _rows = _yield$conexion$execu4[0];
          if (!(_rows.affectedRows === 1)) {
            _context.next = 31;
            break;
          }
          return _context.abrupt("return", res.status(201).json({
            message: "Articulo creado exitosamente"
          }));
        case 31:
          return _context.abrupt("return", res.status(200).json({
            message: "No se pudo crear el articulo"
          }));
        case 32:
          _context.next = 38;
          break;
        case 34:
          _context.prev = 34;
          _context.t1 = _context["catch"](21);
          console.error("Error al reintentar crear articulo:", _context.t1);
          return _context.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 38:
          return _context.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 39:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 17], [21, 34]]);
  }));
  return function insertarArticulo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var mostrarArticulos = exports.mostrarArticulos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _db["default"].query("CALL sp_mostrararticulos()");
        case 3:
          respuesta = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(respuesta[0]));
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error al mostrar articulos:", _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function mostrarArticulos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var mostrarArticulo = exports.mostrarArticulo = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params["id"];
          _context3.prev = 1;
          _context3.next = 4;
          return _db["default"].query("CALL sp_mostrararticulo(".concat(id, ")"));
        case 4:
          respuesta = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(respuesta[0]));
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error("Error al mostrar articulos:", _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function mostrarArticulo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var mostrarArticuloUsuario = exports.mostrarArticuloUsuario = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params["id"];
          _context4.prev = 1;
          _context4.next = 4;
          return _db["default"].query("CALL sp_mostrararticulouser(".concat(id, ")"));
        case 4:
          respuesta = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(respuesta[0]));
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          console.error("Error al mostrar articulos:", _context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function mostrarArticuloUsuario(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var eliminarArticulo = exports.eliminarArticulo = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _db["default"].query("CALL sp_eliminararticulo(".concat(id, ")"));
        case 4:
          respuesta = _context5.sent;
          if (!(respuesta[0].affectedRows === 1)) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            message: "Articulo eliminado exitosamente"
          }));
        case 9:
          return _context5.abrupt("return", res.status(404).json({
            message: "Articulo no encontrado"
          }));
        case 10:
          _context5.next = 16;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          console.error("Error al eliminar articulo:", _context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return function eliminarArticulo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();