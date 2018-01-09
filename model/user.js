/**
 * @file User Model
 * @author @rmzoni
 * @since 2017-11-21
 */
/**
 * User model. This module provides functions to access the user information.
 * The user information is persisted in an MongoDB Colletion.
 * @param {object} app - Express object.
 */
module.exports = function(app) {

    // Database connection
    const mongoose = app.get('mongoose');
    const db = mongoose.connection;
    const utils = require('../db/mongo-utils')(db);
    const {GraphQLError} = require('graphql');

    let module = {};

    /**
     * Create a new user
     * @param {object} user the user object to be created
     * @returns {object} The created user
     */
    module.createUser = async ({user}) => {
        try {
            return await utils.insert('users', user);
        } catch (err) {
            return new GraphQLError(`Error: ${err}`);
        }
    };

    /**
     * Update a existing user
     * @param {string} _id the user identifier
     * @param {object} user the user object to be created
     * @returns {object} The updated user
     */
    module.updateUser = async ({_id, user}) => {
        try {
            await utils.update('users', _id, user);
            return await utils.find('users', _id);
        } catch (err) {
            return new GraphQLError(`Error: ${err}`);
        }
    };

    /**
     * List all users if the identifier is not provided.
     * @param {string} _id the user identifiier. If it´s not provide list all users.
     * @param {string} name the user name for a like comparsion. If it´s not provide list all users.
     * @returns {array} List all users async.
     */
    module.getUsers = async ({_id, name}) => {
        let query = {};

        if (_id) {
            query._id = _id;
        }

        if (name) {
            query.name = new RegExp(`.*${name}.*`);
        }

        try {
            return await utils.scan('users', query);
        } catch (err) {
            return new GraphQLError(`Error: ${err}`);
        }

    };


    /**
     * Find an user by his identifier.
     * @param {object} _ the root object from graphql. It´s not used.
     * @param {string} _id the user identifiier. If it´s not provide list all users.
     * @return {object} The user returned async.
     */
    module.getUserById = async ({_id}) => {
        try {
            return await utils.find('users', _id);
        } catch (err) {
            return new GraphQLError(`Error: ${err}`);
        }
    };

    return module;
};

