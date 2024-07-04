import { config } from 'dotenv';
import swaggerAutogen from 'swagger-autogen';
config();

let backend = process.env.BACKEND || 3000;

const doc = {
  info: {
    title: 'API FASTLEARN',
    description: 'Gestion de usuarios'
  },
  host: backend
};

const outputFile = './swagger-output.json';
const routes = ['../routes/routes.main.js', '../routes/routes.user.js'];



swaggerAutogen()(outputFile, routes, doc);