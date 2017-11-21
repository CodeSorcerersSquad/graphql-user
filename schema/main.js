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
	let schema = new graphql.GraphQLSchema({
		query: new graphql.GraphQLObjectType({
			name: 'Query',
			fields: {
				user: {
					type: userType,
					args: {
						id:{
							type: graphql.GraphQLInt
						}
					},
					resolve: function (_ , {id}) {
						let response = users.find(function (user){
							return (user.id === id)
						})
						return response;
					}
				}
			}
		})
	})
	
	return schema;
}
