'use strict';

const graphql = require('graphql');

/**
 * Create knowledge GraphQL Schema
 * @returns <GraphQLObjectType> A GraphQL Type that representates the knowledge schema
 */
module.exports = new graphql.GraphQLObjectType({
	name:'Knowledge',
	fields: {
		language: { type: graphql.GraphQLString },
		frameworks: { type: new graphql.GraphQLList(graphql.GraphQLString ) }
	}
});