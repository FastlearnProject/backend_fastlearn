"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mostrarCursosFree = exports.mostrarCursos = exports.insertarCurso = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
/**
 * Este es el controlador de cursos
 * @module ctr-cursos
 */

/**
 * Con esta función se crean o insertan los apartados de los cursos.
 * @param {object} req Pide la información a ingresar, Imagen, Nombre, Descripción, Link y tags.
 * @param {object} res Envía la información necesaria ingresada.
 * 
 */
var insertarCurso = exports.insertarCurso = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, imgCurso, nomCurso, desCurso, linkCurso, tagsCurso, respuesta, curso;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, imgCurso = _req$body.imgCurso, nomCurso = _req$body.nomCurso, desCurso = _req$body.desCurso, linkCurso = _req$body.linkCurso, tagsCurso = _req$body.tagsCurso;
          _context.prev = 1;
          _context.next = 4;
          return _dbConfig["default"].query("CALL sp_insertarcurso('".concat(imgCurso, "','").concat(nomCurso, "', '").concat(desCurso, "', '").concat(linkCurso, "', '").concat(tagsCurso, "' )"));
        case 4:
          respuesta = _context.sent;
          if (!(respuesta[0].affectedRows == 1)) {
            _context.next = 10;
            break;
          }
          curso = respuesta[0][0];
          return _context.abrupt("return", res.status(201).json({
            message: "Curso creado exitosamente",
            curso: curso
          }));
        case 10:
          return _context.abrupt("return", res.status(200).json({
            message: "No se pudo crear el curso"
          }));
        case 11:
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.error("Error al crear curso:", _context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 13]]);
  }));
  return function insertarCurso(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Esto muestra los cursos creados a partir de la función "insertarCurso"
 * 
 * @param {Object} req captura peticiones en HTML
 * @param {Object} res  envia peticiones en HTML
 *
 */
var mostrarCursos = exports.mostrarCursos = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _dbConfig["default"].query("CALL sp_mostrarcursos()");
        case 3:
          respuesta = _context2.sent;
          return _context2.abrupt("return", res.status(200).json(respuesta[0]));
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error al mostrar cursos:", err);
          return _context2.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function mostrarCursos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Esto muestra los cursos
 * 
 * @param {Object} req captura peticiones en HTML
 * @param {Object} res  envia peticiones en HTML
 *
 */
var mostrarCursosFree = exports.mostrarCursosFree = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _dbConfig["default"].query("CALL sp_mostrarcursos()");
        case 3:
          respuesta = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(respuesta[0]));
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Erorr al mostrar cursos: ", err);
          return _context3.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function mostrarCursosFree(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();