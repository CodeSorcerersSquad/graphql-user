const should = require('should');
const express = require('express');

describe('User Model - Unit Test', async() => {

    var createFindMock = (usersMock) => {
        return {
            connection: {
                collection: (name) => {
                    return {
                        find: (query) => {
                            return {
                                toArray: () => {
                                    return new Promise((resolve) => {
                                        resolve(usersMock)
                                    });
                                }
                            }
                        }
                    };
                }
            }
        }
    }

    it('should return 1 item by getUsers', async() => {
        var app = express();
        app.set('mongoose', createFindMock([{_id: '1'}]));

        const user = require('../../model/user')(app);
        var users = await user.getUsers([]);
        should(users.length).be.exactly(1);
    });

});