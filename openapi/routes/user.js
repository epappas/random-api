'use strict';

var conf = require('../config');
var ctrlBuilder = require('../controllers/user-controller');

var version = conf.get('version');
var base_route = conf.get('baseurlpath');

var user_route = base_route + '/user';

module.exports = function (server, models, redis) {
    var controller = ctrlBuilder(server, models, redis);

    server.get({path: user_route, version: version}, controller.randomUser);
    server.head({path: user_route, version: version}, controller.randomUser);

};
