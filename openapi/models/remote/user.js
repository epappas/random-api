'use strict';

var request = require('request');

module.exports = function User(redis, conf) {
    return {

        /**
         * Get a random user
         *
         * @param args {Object} Arguments
         * @param cb {Function} Function callback ->(error, object)
         */
        getRandom: function (args, cb) {
            var options = {
                method: 'GET',
                url: conf.get('source.user'),
                headers: { 'Accept': 'application/json' }
            };
            request(options, function (err, response, json) {
                if (err) return cb(err, null);
                if (response.statusCode >= 400) return cb(json, null);
                if (!json) return cb(null, null);

                var result = JSON.parse(json);

                cb(null, schema(result['results'][0].user));
            });
        }
    };
};

function schema(user) {
    return {
        "gender": user['gender'],
        "name": {
            "title": user['name']['title'],
            "first": user['name']['first'],
            "last": user['name']['last']
        },
        "address": {
            "street": user['location']['street'],
            "city": user['location']['city'],
            "state": user['location']['state'],
            "zip": user['location']['zip']
        },
        "email": user['email'],
        "username": user['username'],
        "picture": user['picture']
    };
}
