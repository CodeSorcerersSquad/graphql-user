/**
 * Main GraphQL Schema
 * @param {object} app express object.
 * @return {GraphQLSchema} the main graphql schema
 */
module.exports = function (app) {

	const userModel = require('../model/user')(app);

	var module = {};
	module.users = userModel.getUsers;
	module.users_name = userModel.getUserByName;

	return module;
}