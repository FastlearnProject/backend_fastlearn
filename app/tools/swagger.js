
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API FASTLEARN',
    description: 'Gestion de usuarios'
  },
  host: "https://backend-fastlearn.onrender.com/" + ""
};

const outputFile = './swagger-output.json';
const routes = ['../routes/routes.main.js', '../routes/routes.user.js'];



swaggerAutogen()(outputFile, routes, doc);