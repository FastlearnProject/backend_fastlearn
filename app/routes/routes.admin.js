import { Router } from "express";
import { verifyToken } from "../middlewares/oauth.js";
import { logueoAdmin, mostrarAdmin, mostrarAdmins } from "../controllers/control.admin.js";

const rutaAdmin = Router();

rutaAdmin.get("/admin/:id", mostrarAdmin)
rutaAdmin.get("/admin", mostrarAdmins)
rutaAdmin.post("/loginAdmin", logueoAdmin)

export default rutaAdmin;