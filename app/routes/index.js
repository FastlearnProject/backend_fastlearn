/**
 * @module rutas-index
 */
import { Router, json  } from "express";
import rutaMain from "../routes/routes.main.js"
import rutaUser from "../routes/routes.user.js"
import rutaCursos from "./routes.courses.js";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../tools/swagger-output.json';

/**
 * Se utiliza el Express Router para manejar las rutas del proyecto.
 * @type {object}
 */
const ruta = Router();

/**
 * Hace uso de la ruta Main
 * @name / 
 * @memberof ruta
 * @function
 */
ruta.use("/", rutaMain);

/**
 * Hace uso de la ruta User
 * @name / 
 * @memberof ruta
 * @function
 */
ruta.use("/", rutaUser);

/**
 * Hace uso de la ruta Cursos
 * @name / 
 * @memberof ruta
 * @function
 */
ruta.use("/", rutaCursos);

/**
 * Hace uso de Swagger UI para realizar la documentación de la API.
 * @name / doc
 * @memberof ruta
 * @function
 */
ruta.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default ruta;