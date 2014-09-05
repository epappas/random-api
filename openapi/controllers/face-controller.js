'use strict';

var restify = require('restify');
var conf = require('../config');

module.exports = function(server, models, redis) {
    return {
        randomFace: function(req, res, next) {
            var args = { };

            models.face.getRandom(args, function(err, result) {
                if (err) return next(new restify.InternalError('Face creation Failed'));
                if (!result) return next(new restify.InternalError('Face creation Failed'));

                res.send(200, result);
                next();
            });
        }
    };
};
