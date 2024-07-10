"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.mostrarCursosFree = exports.mostrarCursos = exports.insertarCurso = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _multer = _interopRequireDefault(require("multer"));
var _storageBlob = require("@azure/storage-blob");
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
var _dotenv = require("dotenv");
/**
 * Este es el controlador de cursos
 * @module ctr-cursos
 */

(0, _dotenv.config)(); // Cargar variables de entorno desde .env

var connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
var containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
var blobServiceClient = _storageBlob.BlobServiceClient.fromConnectionString(connectionString);
var containerClient = blobServiceClient.getContainerClient(containerName);

// Configurar multer para manejar la carga de archivos
var storage = _multer["default"].memoryStorage();
var upload = exports.upload = (0, _multer["default"])({
  storage: storage
});

// Función para subir imagen a Azure Blob Storage
var uploadImageToBlobStorage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(imageBuffer, imageName) {
    var blockBlobClient, uploadBlobResponse;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          blockBlobClient = containerClient.getBlockBlobClient(imageName);
          _context.prev = 1;
          _context.next = 4;
          return blockBlobClient.uploadData(imageBuffer);
        case 4:
          uploadBlobResponse = _context.sent;
          return _context.abrupt("return", blockBlobClient.url);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.error('Error al subir la imagen a Azure Blob Storage:', _context.t0.message);
          throw _context.t0;
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return function uploadImageToBlobStorage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Controlador para insertar curso
var insertarCurso = exports.insertarCurso = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, video, titulo, descripcion, linkCurso, tagsCurso, categoria, imagen, imageName, imageUrl, respuesta, curso;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, video = _req$body.video, titulo = _req$body.titulo, descripcion = _req$body.descripcion, linkCurso = _req$body.linkCurso, tagsCurso = _req$body.tagsCurso, categoria = _req$body.categoria;
          imagen = req.file;
          if (imagen) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: "La imagen es requerida"
          }));
        case 4:
          imageName = imagen.originalname;
          _context2.prev = 5;
          _context2.next = 8;
          return uploadImageToBlobStorage(imagen.buffer, imageName);
        case 8:
          imageUrl = _context2.sent;
          _context2.next = 11;
          return _dbConfig["default"].query("CALL sp_insertarcurso('".concat(imageUrl, "','").concat(video, "','").concat(titulo, "', '").concat(descripcion, "', '").concat(linkCurso, "', '").concat(tagsCurso, "', '").concat(categoria, "')"));
        case 11:
          respuesta = _context2.sent;
          if (!(respuesta[0].affectedRows == 1)) {
            _context2.next = 17;
            break;
          }
          curso = respuesta[0][0];
          return _context2.abrupt("return", res.status(201).json({
            message: "Curso creado exitosamente",
            curso: curso
          }));
        case 17:
          return _context2.abrupt("return", res.status(200).json({
            message: "No se pudo crear el curso"
          }));
        case 18:
          _context2.next = 24;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](5);
          console.error("Error al crear curso:", _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 20]]);
  }));
  return function insertarCurso(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var mostrarCursos = exports.mostrarCursos = /*#__PURE__*/function () {
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
          console.error("Error al mostrar cursos:", _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function mostrarCursos(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var mostrarCursosFree = exports.mostrarCursosFree = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _dbConfig["default"].query("CALL sp_mostrarcursos()");
        case 3:
          respuesta = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(respuesta[0]));
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error("Error al mostrar cursos:", _context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function mostrarCursosFree(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();