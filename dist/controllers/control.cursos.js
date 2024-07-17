"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = exports.mostrarCursosFree = exports.mostrarCursos = exports.mostrarCurso = exports.insertarCurso = exports.eliminarCurso = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _multer = _interopRequireDefault(require("multer"));
var _storageBlob = require("@azure/storage-blob");
var _dbConfig = _interopRequireDefault(require("../config/db.config.js"));
var _dotenv = require("dotenv");
(0, _dotenv.config)();

// Configurar Azure Blob Storage
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
var uploadToBlobStorage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(buffer, fileName) {
    var blockBlobClient, uploadBlobResponse;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          blockBlobClient = containerClient.getBlockBlobClient(fileName);
          _context.prev = 1;
          _context.next = 4;
          return blockBlobClient.uploadData(buffer);
        case 4:
          uploadBlobResponse = _context.sent;
          console.log("Archivo ".concat(fileName, " subido a Azure Blob Storage"));
          return _context.abrupt("return", blockBlobClient.url);
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error('Error al subir la imagen a Azure Blob Storage:', _context.t0.message);
          throw _context.t0;
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 9]]);
  }));
  return function uploadToBlobStorage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Controlador para insertar curso
var insertarCurso = exports.insertarCurso = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, titulo, descripcion, linkCurso, tagsCurso, categoria, imagen, video, imageName, videoName, imageUrl, videoUrl, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, titulo = _req$body.titulo, descripcion = _req$body.descripcion, linkCurso = _req$body.linkCurso, tagsCurso = _req$body.tagsCurso, categoria = _req$body.categoria;
          imagen = req.files['imagen'][0]; // Accede al primer archivo de imagen
          video = req.files['video'][0];
          imageName = imagen.originalname;
          videoName = video.originalname;
          _context2.prev = 5;
          _context2.next = 8;
          return uploadToBlobStorage(imagen.buffer, imageName);
        case 8:
          imageUrl = _context2.sent;
          _context2.next = 11;
          return uploadToBlobStorage(video.buffer, videoName);
        case 11:
          videoUrl = _context2.sent;
          _context2.next = 14;
          return _dbConfig["default"].query("CALL sp_insertarcurso('".concat(imageUrl, "','").concat(videoUrl, "','").concat(titulo, "', '").concat(descripcion, "', '").concat(linkCurso, "', '").concat(tagsCurso, "', '").concat(categoria, "')"));
        case 14:
          respuesta = _context2.sent;
          if (!(respuesta[0].affectedRows == 1)) {
            _context2.next = 19;
            break;
          }
          return _context2.abrupt("return", res.status(201).json({
            message: "Curso creado exitosamente"
          }));
        case 19:
          return _context2.abrupt("return", res.status(200).json({
            message: "No se pudo crear el curso"
          }));
        case 20:
          _context2.next = 26;
          break;
        case 22:
          _context2.prev = 22;
          _context2.t0 = _context2["catch"](5);
          console.error("Error al crear curso:", _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 22]]);
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
var mostrarCurso = exports.mostrarCurso = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params['id'];
          _context5.prev = 1;
          _context5.next = 4;
          return _dbConfig["default"].query("CALL sp_mostrarcurso(".concat(id, ")"));
        case 4:
          respuesta = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(respuesta[0]));
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error("Error al mostrar cursos:", _context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor inténtalo de nuevo más tarde"
          }));
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function mostrarCurso(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var eliminarCurso = exports.eliminarCurso = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, respuesta;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return _dbConfig["default"].query("CALL sp_eliminarcurso(".concat(id, ")"));
        case 4:
          respuesta = _context6.sent;
          if (!(respuesta[0].affectedRows === 1)) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            message: "Curso eliminado exitosamente"
          }));
        case 9:
          return _context6.abrupt("return", res.status(404).json({
            message: "Curso no encontrado"
          }));
        case 10:
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          console.error("Error al eliminar el curso:", _context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            message: "Error en el servidor, por favor intentalo de nuevo más tarde"
          }));
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return function eliminarCurso(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();