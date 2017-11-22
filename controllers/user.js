'use strict';

const express = require('express');
const router = express.Router();
const {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');
const fs = require('fs');
const path = require('path');

/**
 * Create the HTTP GraphQL Users route.
 *     - /users
 * @param {object} app - Express object.
 * @returns {object} the express HTTP 
 */
module.exports = function (app) {
    // Construct a schema, using GraphQL schema language
    let schemaFile = fs.readFileSync(path.join(__dirname, '../schema/schema.gql'), 'utf8'); 
    let schema = buildSchema(schemaFile);
    let schemaImpl = require('../schema/schema')(app);

    router.use('/users', graphqlHTTP({
        schema: schema,
        rootValue: schemaImpl,
        pretty: true,
        graphiql: true
    }));

    return router;
};