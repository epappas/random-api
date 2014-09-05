'use strict';

var conf = require('../config');
var ctrlBuilder = require('../controllers/magic8-controller');

var version = conf.get('version');
var base_route = conf.get('baseurlpath');

var magic8_route = base_route + '/magic8';

module.exports = function (server, models, redis) {
    var controller = ctrlBuilder(server, models, redis);

    server.get({path: magic8_route, version: version}, controller.randomQuote);
    server.head({path: magic8_route, version: version}, controller.randomQuote);

};
