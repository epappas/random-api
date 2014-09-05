'use strict';

var conf = require('../config');

module.exports = function(server, models, redis, twitter) {
    return {
        randomTweet: function(req, res, next) {
            twitter.getRandom(function(err, result) {
                res.send(200, result);
                next();
            });
        }
    };
};
