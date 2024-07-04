import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'FastLearn API',
    description: 'API documentation for FastLearn',
  },
  host: 'backend-fastlearn.onrender.com',
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

const outputFile = './swagger-output.json';
const routes = ['../routes/routes.main.js', '../routes/routes.user.js', '../routes/routes.courses.js'];

swaggerAutogen()(outputFile, routes, doc);
