'use strict';

var debug = require('debug')('random-api');
var fs = require('fs');
var path = require('path');
var restify = require('restify');
var responseTime = require('response-time');
var winston = require('winston');
var bunyanToWinstonAdapter = require('bunyan-winston-adapter');

var conf = require('./config');
var redisTrait = require('./modules/redis');
var tweetProvider = require('./modules/tweetProvider');

// Global redis instance
var redis = redisTrait.redis;
var twitter = tweetProvider(conf);
var winstonLogger = new winston.Logger({
    transports: [
        new (winston.transports.Console)({colorize: true, json: false})
    ]
});

// HTTP Server
var server = restify.createServer({
    name: 'random-api',
    log: bunyanToWinstonAdapter.createAdapter(winstonLogger),
    version: conf.get('version')
});

// Initialize Models' injection
var models = {
    user: require('./models/remote/user')(redis, conf),
    face: require('./models/remote/face')(redis, conf),
    magic8: require('./models/static/magic8')(redis, conf)
};

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.CORS({
    credentials: true
}));
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: true,
    keepExtensions: false
}));
server.use(responseTime(0));
server.use(restify.requestLogger());
server.use(restify.throttle({
    burst: 100,
    rate: 50,
    ip: true,
    overrides: {
        '127.0.0.1': {
            rate: 0, // unlimited
            burst: 0
        }
    }
}));
server.use(function (req, res, next) {
    res.header('X-Powered-By', 'Random-API');
    res.header('X-Request-ID', req.id());
    res.header('Server', 'api.random.io');
    next();
});

require('./modules/reqtracker')(server, winstonLogger);

require('./routes/api')(server, models, redis);
require('./routes/user')(server, models, redis);
require('./routes/face')(server, models, redis);
require('./routes/magic8')(server, models, redis);
require('./routes/tweet')(server, models, redis, twitter);

//server.on('after', restify.auditLogger({
//    log: logger
//}));

server.listen(conf.get('port'), function () {
    console.log('%s is listening at %s', server.name, server.url)
});