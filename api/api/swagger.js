
const swaggerJSDoc = require('swagger-jsdoc')

let swaggerDefinition = {
  info: {
    "title": "Hom-E API",
    "description": "Restful API for the home web application",
    "version": "1.0.0"
  },
  openapi: "3.0.9",
  produces: ['application/json'],
  consumes: ['application/json'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  security: [
    { JWT: [] }
  ],
  servers: [{
    url: '/api'
  }]
}

let options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./api/routes/**/*.js', './api/models/**/*.js']
}
module.exports = swaggerJSDoc(options)