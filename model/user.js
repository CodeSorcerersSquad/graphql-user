'use strict';

/**
 * User model. This module provides functions to access the user information.
 * The user information is persisted in an MongoDB Colletion.
 * @param {object} app - Express object.
 */
module.exports = function(app) {

    // Database connection
    const mongoose = app.get('mongoose');
    const db = mongoose.connection;
    const users = db.collection('users');   

    let module = {};

    /**
     * @private
     * User transformation to be compliance with GraphQL User Schema
     * @param {object} user - the user raw object
     */
    function prepare(user) {
        user._id = user._id.toString();
        return user;
    };

    /**
     * List all users if the identifier is not provided.
     * @param {object} _ the root object from graphql. It´s not used. 
     * @param {string} _id the user identifiier. If it´s not provide list all users.
     * @returns {array} List all users async.
     */
    module.getUsers = async (_, {_id}) => {
        let query = {};
        if (_id) {
            query._id = mongoose.Types.ObjectId(_id);
        }

        return (await users.find(query).toArray()).map(prepare);
    };

    /**
     * Find an user by his identifier.
     * @param {object} _ the root object from graphql. It´s not used. 
     * @param {string} _id the user identifiier. If it´s not provide list all users.
     * @return {object} The user returned async.
     */
    module.getUserById = async (_, {_id}) => {
        return prepare(await uses.findOne(mongoose.Types.ObjectId(_id)));
    };

    return module;
};

