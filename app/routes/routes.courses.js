import express from "express";
import { insertarCurso, upload, mostrarCursos, mostrarCursosFree, mostrarCurso } from "../controllers/control.cursos.js";
import { verifyToken } from "../middlewares/oauth.js";

const router = express.Router();

router.post("/cursos", verifyToken, upload.fields([{ name: 'imagen', maxCount: 1 }, { name: 'video', maxCount: 1 }]), insertarCurso);
router.get("/cursos", mostrarCursos);
router.get("/cursos/free", mostrarCursosFree);
router.get("/cursos/:id", mostrarCurso);

export default router;
