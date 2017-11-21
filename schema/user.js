const graphql = require('graphql');
let knowledgeType = require('./knowledge');

module.exports = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
      name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
      full_name: { type: graphql.GraphQLString },
      age: { type: graphql.GraphQLInt },
      city: { type: graphql.GraphQLString },
      tag: { type: graphql.GraphQLString },
      url: { type: graphql.GraphQLString },
      knowledge: { type: new graphql.GraphQLList(knowledgeType) }
    }
})