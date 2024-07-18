import { config } from 'dotenv';
import swaggerAutogen from 'swagger-autogen';
config();


/**
 * Configuración de la documentación de la API.
 * @type {object}
 */
const doc = {
  info: {
    title: 'FastLearn API',
    description: 'API documentation for FastLearn',
  },
  host: 'service-fastlearn.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

/**
 *  Ruta de salida para el archivo generado por swagger-autogen.
 * @type {string}
 */
const outputFile = './swagger-output.json';

/**
 * Lista de rutas a ser incluidas en la documentación.
 * @type {Array<string>}
 */
const routes = ['../routes/routes.main.js', '../routes/routes.user.js', '../routes/routes.courses.js', '../routes/routes.articulos.js', '../routes/routes.admin.js'];


/**
 * Generar la documentación con ayuda de Swagger.
 */
swaggerAutogen()(outputFile, routes, doc);
