'use strict';

const express = require('express');
var app = express();

// Log Middleware
app.use(require('./middlewares/log'))

// Configure database connection
require('./db/connection')(app);

// Constrollers
app.use(require('./controllers/user')(app));

// Starting server
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/users');