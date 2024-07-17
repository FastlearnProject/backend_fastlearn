import { Router } from "express";
import { logueoAdmin, mostrarAdmin, mostrarAdmins } from "../controllers/control.admin.js";
import { verifyToken } from "../middlewares/oauth.js";

const rutaAdmin = Router();

rutaAdmin.get("/admin/:id", verifyToken, mostrarAdmin)
rutaAdmin.get("/admin", verifyToken, mostrarAdmins)
rutaAdmin.post("/loginAdmin", logueoAdmin)
rutaAdmin.put("/admin", logueoAdmin)
rutaAdmin.delete("/admin", logueoAdmin)

export default rutaAdmin;