'use strict';

const graphql = require('graphql');
let knowledgeType = require('./knowledge');

/**
 * Create User GraphQL Schema
 * @returns <GraphQLObjectType> A GraphQL Type that representates the user schema
 */
module.exports = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      _id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      full_name: { type: graphql.GraphQLString },
      age: { type: graphql.GraphQLInt },
      city: { type: graphql.GraphQLString },
      tag: { type: graphql.GraphQLString },
      url: { type: graphql.GraphQLString },
      knowledge: { type: new graphql.GraphQLList(knowledgeType) }
    }
})