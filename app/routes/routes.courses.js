import { Router } from "express";
import {verifyToken} from "../middlewares/oauth"
import { insertarCurso, mostrarCursos, mostrarCursosFree } from "../controllers/control.cursos";

const rutaCursos = Router();

rutaCursos.get("/cursos", verifyToken, mostrarCursos);
rutaCursos.get("/cursos-free", mostrarCursosFree);
rutaCursos.post("/cursos", verifyToken, insertarCurso);

export default rutaCursos;