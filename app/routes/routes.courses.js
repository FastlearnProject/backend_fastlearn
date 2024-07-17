import express from "express";
import { insertarCurso, upload, mostrarCursos, mostrarCursosFree, mostrarCurso, eliminarCurso } from "../controllers/control.cursos.js";
import { verifyToken } from "../middlewares/oauth.js";

const router = express.Router();

router.post("/cursos", verifyToken, upload.fields([{ name: 'imagen', maxCount: 1 }, { name: 'video', maxCount: 1 }]), insertarCurso);
router.get("/cursos", verifyToken, mostrarCursos);
router.get("/cursos/free", mostrarCursosFree);
router.get("/cursos/:id", verifyToken, mostrarCurso);
router.delete("/cursos/:id", verifyToken, eliminarCurso);

export default router;
