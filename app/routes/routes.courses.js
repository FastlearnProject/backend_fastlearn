import express from "express";
import { insertarCurso, upload, mostrarCursos, mostrarCursosFree } from "../controllers/control.cursos.js";
import { verifyToken } from "../middleware/oauth.js";

const router = express.Router();

router.post("/cursos", verifyToken, upload.single('imagen'), insertarCurso);
router.get("/cursos", mostrarCursos);
router.get("/cursos/free", mostrarCursosFree);

export default router;
