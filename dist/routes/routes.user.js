"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controlUsuario = require("../controllers/control.usuario.js");
var _oauth = require("../middlewares/oauth.js");
/**
 * Se utiliza el Express Router para manejar las rutas de usuarios
 * @type {object}
 */
var rutaUser = (0, _express.Router)();

/**
 * Ruta para la creación del usuario.
 * @name post/usuario
 * @memberof rutaUser
 * @function
 */
rutaUser.post("/usuario", _controlUsuario.crearusuario);
/**
 * Ruta para el login del usuario .
 * @name post/usuario
 * @memberof rutaUser
 * @function
 */
rutaUser.post("/login", _controlUsuario.logueoUsuario);

/**
 * Ruta para mostrar lista de usuarios.
 * @name get/usuario
 * @memberof rutaUser
 * @function
 */
rutaUser.get("/usuario", _oauth.verifyToken, _controlUsuario.mostrarusuarios);
/**
 * Ruta para mostrar usuarios por ID.
 * @name get/usuario/:id
 * @memberof rutaUser
 * @function
 */
rutaUser.get("/usuario/:id", _oauth.verifyToken, _controlUsuario.mostrarusuario);

/**
 * Ruta para modificar información de usuarios.
 * @name put/usuario/:id
 * @memberof rutaUser
 * @function
 */
rutaUser.put("/usuario/:id_usuario", _oauth.verifyToken, _controlUsuario.modificarusuario);
/**
 * Ruta para modificar Rol de usuarios.
 * @name put/rol
 * @memberof rutaUser
 * @function
 */
rutaUser.put("/rol", _oauth.verifyToken, _controlUsuario.modificarRolUsuario);
/**
 * Ruta para eliminar usuarios.
 * @name delete/usuario/:id
 * @memberof rutaUser
 * @function
 */
rutaUser["delete"]("/usuario/:id", _oauth.verifyToken, _controlUsuario.eliminarusuario);
var _default = exports["default"] = rutaUser;