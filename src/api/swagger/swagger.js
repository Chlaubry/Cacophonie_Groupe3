const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Cacophonie API",
            description: "API de gestion des bots"
        }
    },
    apis: [path.join(__dirname, '..', 'api', 'routes', '*.js')]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);