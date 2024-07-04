import swaggerAutogen from 'swagger-autogen';


const doc = {
  info: {
    title: 'FastLearn API',
    description: 'API documentation for FastLearn',
  },
  host: 'backend-fastlearn.onrender.com',
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const routes = ['../routes/routes.main.js', '../routes/routes.user.js'];



swaggerAutogen()(outputFile, routes, doc);