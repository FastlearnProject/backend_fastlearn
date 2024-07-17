import { Router } from "express";
import { verifyToken } from "../middlewares/oauth.js";
import { logueoAdmin, mostrarAdmins } from "../controllers/control.admin.js";

const rutaAdmin = Router();

rutaAdmin.get("/admin", mostrarAdmins)
rutaAdmin.post("/loginAdmin", logueoAdmin)

export default rutaAdmin;