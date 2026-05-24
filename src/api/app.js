const express = require('express');
const app = express();

app.use(express.json());

// import routes
const botsRoutes = require('./routes/bots_routes');

// branchement
app.use('/bots', botsRoutes);

module.exports = app;

