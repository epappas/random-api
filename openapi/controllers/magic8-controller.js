'use strict';

var conf = require('../config');

module.exports = function(server, models, redis) {
    return {
        randomQuote: function(req, res, next) {
            models.magic8.getRandom(function(err, result) {
                res.send(200, result);
                next();
            });
        }
    };
};
