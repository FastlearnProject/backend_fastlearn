import { Router } from "express";

/**
 * Se utiliza el Express Router para manejar la ruta inicial del proyecto.
 * @type {object}
 */
const rutaMain = Router();

/**
 * Ruta inicial, muestra un mensaje dando la bienvenida al backend.
 * @name post/cursos
 * @memberof rutaCursos
 * @function
 */
rutaMain.get("/", (req, res) =>{
    res.json("Inicio del backend")
})

export default rutaMain;