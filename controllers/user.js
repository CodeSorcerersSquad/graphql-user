const express = require('express');
var router = express.Router();
var graphqlHTTP = require('express-graphql');

module.exports = function(app){
    // Construct a schema, using GraphQL schema language
    var schema = require('../schema/main')(app);

    router.use('/users', graphqlHTTP({
        schema: schema,
        pretty: true,
        graphiql: true
    }));

    return router;
};

