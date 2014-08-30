'use strict';

var redis = require('redis');

var HOST = process.env.REDIS_HOST || 'localhost';
var PORT = process.env.REDIS_PORT || 6379;

exports.redis = redis.createClient();

exports.newRedis = function(host, port, options) {
    if(arguments.length === 1 && typeof host === 'object') {
        options = host;
        redis.createClient(HOST, PORT, options);
    }
    if(arguments.lenght > 0 ) return redis.createClient(host || HOST, port || PORT, options);
    return redis.createClient();
};
