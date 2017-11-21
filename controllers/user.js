const express = require('express');
var router = express.Router();
var graphqlHTTP = require('express-graphql');

/**
 * Create the HTTP GraphQL Users route.
 *     - /users
 * @param {object} app - Express object.
 * @returns {object} the express HTTP 
 */
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

