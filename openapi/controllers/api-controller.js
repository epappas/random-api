'use strict';

var restify = require('restify');
var conf = require('../config');

module.exports = function(server, models, redis) {
    return {
        status: function(req, res, next) {
            res.send(200, {status: 'ok'});
            next();
        },
        isOk: function(req, res, next) {
            if(!req.user) return next(new restify.NotAuthorizedError());

            res.send(200, {status: 'ok'});
            next();
        },
        ping: function(req, res, next) {
            res.send(200, {status: 'PONG', when: Date.now()});
            next();
        }
    };
};
