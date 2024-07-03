import { Router } from "express";
import { insertarCurso, mostrarCursos } from "../controllers/control.cursos";

const rutaCursos = Router();

rutaCursos.get("/cursos", mostrarCursos);
rutaCursos.post("/cursos", insertarCurso);

export default rutaCursos;