'use strict';

const mongoose = require('mongoose');

/**
* MongoDB connection factory module.
* @param {object} serverExpress express object.
* @return {void} 
 */
module.exports = (app) => {

    let options = {
        useMongoClient: true,
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
    };

    const uri = 'mongodb://localhost:27017/graph-user-db';
    mongoose.connect(uri, options);

    mongoose.connection.on('connected', function () {
        console.log(`Mongoose default connection connected to "${uri}"`);
    });
    mongoose.connection.on('error', function (err) {
        console.log(`Mongoose default connection error: ${err}`);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    mongoose.connection.on('open', function () {
        console.log('Mongoose default connection is open');
    });

    app.set('mongoose', mongoose);

}
