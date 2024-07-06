import { Router } from "express";
import {verifyToken} from "../middlewares/oauth"
import { insertarCurso, mostrarCursos, mostrarCursosFree } from "../controllers/control.cursos";

/**
 * Se utiliza el Express Router para manejar las rutas de los cursos.
 * @type {object}
 */
const rutaCursos = Router();

/**
 * Ruta para obtener la lista de cursos.
 * @name get/cursos
 * @memberof rutaCursos
 * @function
 * @inner
 */
rutaCursos.get("/cursos", mostrarCursos);

/**
 * Ruta para insertar un nuevo curso.
 * @name post/cursos
 * @memberof rutaCursos
 * @function
 */
rutaCursos.post("/cursos", insertarCurso);
rutaCursos.get("/cursos", verifyToken, mostrarCursos);
rutaCursos.get("/cursos-free", mostrarCursosFree);
rutaCursos.post("/cursos", verifyToken, insertarCurso);

export default rutaCursos;