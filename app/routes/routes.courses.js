import { Router } from "express";
import { insertarCurso, mostrarCursos } from "../controllers/control.cursos";

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

export default rutaCursos;