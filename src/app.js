const express = require('express');

const app = express();

app.set('port', process.env.PORT || 3000);

// Middleware

// Process JSON data
app.use(express.json());
// Process Form data
app.use(express.urlencoded({extended: false}));
// Authorization controller
app.use(require('./controllers/authController'));


module.exports = app;