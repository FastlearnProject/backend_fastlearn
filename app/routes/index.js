import { Router, json  } from "express";
import rutaMain from "../routes/routes.main.js"
import rutaUser from "../routes/routes.user.js"
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../tools/swagger-output.json';


const ruta = Router();

ruta.use("/", rutaMain);
ruta.use("/", rutaUser);
ruta.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile, {
    swaggerOptions: {
        docExpansion: "none", // Configura cómo se muestra la documentación
        defaultModelsExpandDepth: -1, // Configura la profundidad de expansión de los modelos
    },
    customCss: ".swagger-ui .topbar { display: none }",
}));

export default ruta;