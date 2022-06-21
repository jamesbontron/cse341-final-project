const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Medical Appointment Scheduler API',
    description:
      'API for a Medical Appointment Scheduler Project for cse341 course developed by Alejandro Naranjo and José Aguirre',
  },
  host: 'medical-scheduler.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpoint = ['./routes/index.js'];

swaggerAutogen(outputFile, endpoint, doc);
