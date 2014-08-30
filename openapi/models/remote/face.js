'use strict';

var request = require('request');

module.exports = function User(redis, conf) {
    return {

        /**
         * Get a random face
         *
         * @param args {Object} Arguments
         * @param cb {Function} Function callback ->(error, object)
         */
        getRandom: function (args, cb) {
            var options = {
                method: 'GET',
                url: conf.get('source.face'),
                headers: { 'Accept': 'application/json' }
            };
            request(options, function (err, response, json) {
                if (err) return cb(err, null);
                if (response.statusCode >= 400) return cb(json, null);
                if (!json) return cb(null, null);

                var result = JSON.parse(json);

                cb(null, schema(result));
            });
        }
    };
};

function schema(face) {
    return {
        "username": face['username'],
        "url": face['image_urls']['epic']
    };
}
