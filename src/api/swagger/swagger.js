const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Cacophonie API",
            description: "API de gestion des bots"
        }
    },
    apis: ["./src/api/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);