import { Router } from "express";
import { 
        crearusuario, 
        mostrarusuarios, 
        mostrarusuario, 
        modificarusuario, 
        eliminarusuario, 
        logueoUsuario, 
        modificarRolUsuario 
    } from "../controllers/control.usuario.js";

import { verifyToken } from "../middlewares/oauth.js";

/**
 * Se utiliza el Express Router para manejar las rutas de usuarios
 * @type {object}
 */
const rutaUser = Router();

/**
 * Ruta para la creación del usuario.
 * @name post/usuario
 * @memberof rutaUser
 * @function
 */
rutaUser.post("/usuario", crearusuario);
/**
 * Ruta para el login del usuario .
 * @name post/usuario
 * @memberof rutaUser
 * @function
 */
rutaUser.post("/login", logueoUsuario);

/**
 * Ruta para mostrar lista de usuarios.
 * @name get/usuario
 * @memberof rutaUser
 * @function
 */
rutaUser.get("/usuario", verifyToken, mostrarusuarios);
/**
 * Ruta para mostrar usuarios por ID.
 * @name get/usuario/:id
 * @memberof rutaUser
 * @function
 */
rutaUser.get("/usuario/:id", verifyToken, mostrarusuario);

/**
 * Ruta para modificar información de usuarios.
 * @name put/usuario/:id
 * @memberof rutaUser
 * @function
 */
rutaUser.put("/usuario/:id_usuario", verifyToken, modificarusuario);
/**
 * Ruta para modificar Rol de usuarios.
 * @name put/rol
 * @memberof rutaUser
 * @function
 */
rutaUser.put("/rol", verifyToken, modificarRolUsuario);
/**
 * Ruta para eliminar usuarios.
 * @name delete/usuario/:id
 * @memberof rutaUser
 * @function
 */
rutaUser.delete("/usuario/:id", verifyToken, eliminarusuario);

export default rutaUser;
