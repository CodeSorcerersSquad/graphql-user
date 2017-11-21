const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
	name:'Knowledge',
	fields: {
		language: { type: graphql.GraphQLString },
		frameworks: { type: new graphql.GraphQLList(graphql.GraphQLString ) }
	}
});