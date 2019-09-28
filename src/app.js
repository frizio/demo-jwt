const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

// Database connection
require('./database');

// Middleware

// Process JSON data
app.use(express.json());
// Process Form data
app.use(express.urlencoded({extended: false}));


module.exports = app;