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
     * List all users if the identifier is not provided.
     * @param {object} _ the root object from graphql. It´s not used. 
     * @param {string} _id the user identifiier. If it´s not provide list all users.
     * @returns {array} List all users async.
     */
    module.getUsers = async ({_id, name}) => {
        let query = {};
        
        if (_id) {
            query._id = _id;
        }
        
        if (name) {
            query.name = name;
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

