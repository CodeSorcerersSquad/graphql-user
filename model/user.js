'use strict';

/**
 * User model
 * @param {object} app - Express object
 */
module.exports = function(app) {

    // Database connection
    const mongoose = app.get('mongoose');
    const db = mongoose.connection;
    const users = db.collection('users');   

    var module = {};

    function prepare(user){
        user._id = user._id.toString();
        return user;
    }

    module.getUsers = async (_, {_id}) => {
        var query = {};
        if(_id){
            query._id = mongoose.Types.ObjectId(_id);
        }

        return (await users.find(query).toArray()).map(prepare);
    };

    module.getUserById = async (_, {id}) => {
        return prepare(await uses.findOne(mongoose.Types.ObjectId(id)))
    };

    return module;
}

