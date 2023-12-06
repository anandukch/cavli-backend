import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Cavli API',
    description: 'API Documentation for Cavli Wireless',
  },
  host: 'localhost:5000'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/*.js'];

swaggerAutogen()(outputFile, routes, doc);