'use strict';

var conf = require('../config');
var ctrlBuilder = require('../controllers/api-controller');
var restify = require('restify');

var version = conf.get('version');
var base_route = conf.get('baseurlpath');

var status_route        = base_route + '/status';
var ping_route          = base_route + '/ping';

module.exports = function (server, models, redis) {
    var controller = ctrlBuilder(server, models, redis);

    server.get({path: status_route, version: version}, controller.status);
    server.head({path: status_route, version: version}, controller.status);

    server.get({path: ping_route, version: version}, controller.ping);
    server.head({path: ping_route, version: version}, controller.ping);

};
