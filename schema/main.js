'use strict';

const graphql = require('graphql')
const users = require('./users.json')
let userType = require('./user')

/**
* Main GraphQL Schema
* @param {object} app express object.
* @return {GraphQLSchema} the main graphql schema
 */
module.exports = function(app){

	const userModel = require('../model/user')(app);

	let schema = new graphql.GraphQLSchema({
		query: new graphql.GraphQLObjectType({
			name: 'Query',
			fields: {
				users: {
					type: new graphql.GraphQLList(userType),
					args: {
						_id:{
							type: graphql.GraphQLString
						}
					},
					resolve: userModel.getUsers
				}
			}
		})
	})
	
	return schema;
}
