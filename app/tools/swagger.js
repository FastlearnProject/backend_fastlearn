import { config } from 'dotenv';
import swaggerAutogen from 'swagger-autogen';
config();

let port = process.env.PORT || 3000;

const doc = {
  info: {
    title: 'API FASTLEARN',
    description: 'Gestion de usuarios'
  },
  host: 'localhost:' + port + ""
};

const outputFile = './swagger-output.json';
const routes = ['../routes/routes.main.js', '../routes/routes.user.js'];



swaggerAutogen()(outputFile, routes, doc);