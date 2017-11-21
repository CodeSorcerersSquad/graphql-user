'use strict';

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var app = express();

// Configure database connection
require('./db/connection')(app);

// Construct a schema, using GraphQL schema language
var schema = require('./schema/main')(app);

app.use('/users', graphqlHTTP({
  schema: schema,
  pretty: true,
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/users');