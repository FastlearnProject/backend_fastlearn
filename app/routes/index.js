import { Router, json  } from "express";
import rutaMain from "../routes/routes.main.js"
import rutaUser from "../routes/routes.user.js"
import rutaCursos from "./routes.courses.js";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../tools/swagger-output.json';


const ruta = Router();

ruta.use("/", rutaMain);
ruta.use("/", rutaUser);
ruta.use("/", rutaCursos);
ruta.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default ruta;