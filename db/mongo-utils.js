/**
 * @file Mongo DB Utils.
 * @author @douglaspands
 * @since 2017-11-21
 */
const {
    ObjectID
} = require('mongodb');
const _ = require('lodash');

module.exports = (db) => {

    /**
     * Query a collection with paramerters
     * @param {string} collection the collection to be scanned
     * @param {object} key parameters to filter the collection
     * @param {object} sort the sort criteria
     * @return {Promise.<array>} The collections filtered
     */
    async function scan(collection, key, sort) {
        const query = (key && typeof key === 'object') ? key : {};

        if (query._id) {
            query['_id'] = ObjectID(query._id);
        }

        return new Promise((resolve, reject) => {

            db.collection(collection)
                .find(query)
                .sort(sort)
                .toArray()
                .then(data => resolve(data))
                .catch(err => reject(err));

        });

    };

    /**
     * Find one object by its identifier
     * @param {string} collection the collection itself
     * @param {string} _id the object identifier
     * @return {Promise.<object>} return the object by its identifier
     */
    async function find(collection, _id) {
        let objectId;

        return new Promise((resolve, reject) => {

            if (_id) {
                objectId = ObjectID(_id);
            } else {
                reject('Not a valid _id');
            }

            db.collection(collection)
                .findOne(objectId)
                .then(data => resolve(data))
                .catch(err => reject(err));

        });

    };

    /**
     * Remove a object by its identifier
     * @param {string} collection the collection itself
     * @param {string} _id the object identifier
     * @return {Promise.<string>} Remotion status
     */
    async function remove(collection, _id) {
        const query = {};

        return new Promise((resolve, reject) => {

            if (_id) {
                query['_id'] = ObjectID(_id);
            } else {
                reject({});
            }

            db.collection(collection)
                .deleteOne(query)
                .then(data => resolve(`mongo-utils - remove - ${data.deletedCount} documents had been removed!`))
                .catch(err => reject(err));

        });

    };

    /**
     * Insert a new object into the collection
     * @param {string} collection the collection itself
     * @param {object} document the document itself to be persisted
     * @return {Promise.<object>} The object itself with its identifier
     */
    async function insert(collection, document) {

        return new Promise((resolve, reject) => {

            if (typeof document === 'object') {
                if (document._id) delete document._id;
            } else {
                reject({});
            }

            db.collection(collection)
                .insert(document)
                .then(data => resolve(_.get(data, 'ops[0]', {})))
                .catch(err => reject(err));

        });

    };

    /**
     * Update a document into the collection
     * @param {string} collection the collection itself
     * @param {string} _id the document identifier
     * @param {object} set fields set of the updated document
     * @return {Promise.<object>} The updated object itself
     */
    async function update(collection, _id, set) {

        const query = {};
        const update = {};

        await new Promise((resolve, reject) => {

            if (_id) {
                query['_id'] = ObjectID(_id);
            } else {
                reject({});
            }

            if (typeof set === 'object') {
                if (set._id) delete set._id;
                update['$set'] = set;
            } else {
                reject({});
            }

            db.collection(collection)
                .updateOne(query, update)
                .then(data => resolve(`mongo-utils - update - ${data.matchedCount} documents had been updated!`))
                .catch(err => reject(err));

        });

        return await find(collection, _id);
    };

    /**
     * Aggregate function
     * @param {string} collection the collection itself
     * @param {object} match the match object (filter criterias)
     * @param {object} lookup the lookup aggregation / join criteria
     * @param {object} group the group by criteria
     * @return {Promise.<array>} return the list of aggragates objects
     */
    async function aggregate(collection, match, lookup, group) {

        // Aggreagations Conditions
        let aggregations = [];

        // Check the usage of match condition
        if (match) {
            aggregations.push({
                $match: match
            });
        }

        // Check the usage of lookup condition
        if (lookup) {
            aggregations.push({
                $lookup: lookup
            });
        }

        // Check the usage of group condition
        if (group) {
            aggregations.push({
                $group: group
            });
        }

        return await db.collection(collection).aggregate(aggregations).toArray();
    };

    return {
        scan,
        find,
        remove,
        insert,
        update,
        aggregate
    };
};
