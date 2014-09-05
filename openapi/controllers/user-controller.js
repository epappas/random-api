'use strict';

var restify = require('restify');
var conf = require('../config');

module.exports = function(server, models, redis) {
    return {
        randomUser: function(req, res, next) {
            var args = { };

            models.user.getRandom(args, function(err, result) {
                if (err) return next(new restify.InternalError('User creation Failed'));
                if (!result) return next(new restify.InternalError('User creation Failed'));

                res.send(200, result);
                next();
            });
        }
    };
};
