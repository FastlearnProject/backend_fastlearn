import { Router } from "express";
import { crearusuario, mostrarusuarios, mostrarusuario, modificarusuario, eliminarusuario, logueoUsuario, modificarRolUsuario } from "../controllers/control.usuario.js";
import { verifyToken } from "../middlewares/oauth.js";

const rutaUser = Router();

rutaUser.post("/usuario", crearusuario);
rutaUser.post("/login", logueoUsuario);

rutaUser.get("/usuario", verifyToken, mostrarusuarios);
rutaUser.get("/usuario/:id", verifyToken, mostrarusuario);

rutaUser.put("/usuario/:id", verifyToken, modificarusuario);
rutaUser.put("/rol", verifyToken, modificarRolUsuario);
rutaUser.delete("/usuario/:id", verifyToken, eliminarusuario);

export default rutaUser;
