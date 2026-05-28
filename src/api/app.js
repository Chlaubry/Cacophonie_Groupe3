const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Cacophonie API",
            description: "API de gestion des bots"
        }
    },
    apis: [path.join(__dirname, 'routes/*.js')]
});


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log(swaggerSpec.paths);

const botRoutes = require('./routes/botRoutes');
app.use('/bots', botRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

module.exports = app;