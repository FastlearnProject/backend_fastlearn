import swaggerAutogen from 'swagger-autogen';


const doc = {
  info: {
    title: 'FastLearn API',
    description: 'API documentation for FastLearn',
  },
  host: 'backend-fastlearn.onrender.com',
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john.doe@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
    Login: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john.doe@example.com' },
        password: { type: 'string', example: 'password123' },
      },
    },
    Role: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'correo' },
        role: { type: 'string', example: 'student' },
      },
    },
  },
};

const outputFile = './swagger-output.json';
const routes = ['../routes/routes.main.js', '../routes/routes.user.js'];



swaggerAutogen()(outputFile, routes, doc);