const routes = require('express').Router();
const sawggerUi = require('swagger-ui-express');
const swaggerDocumentation = require('../swagger.json');

routes.use('/', sawggerUi.serve);
routes.get('/', sawggerUi.setup(swaggerDocumentation));

module.exports = routes;
