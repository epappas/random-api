'use strict';

var conf = require('../config');
var ctrlBuilder = require('../controllers/face-controller');

var version = conf.get('version');
var base_route = conf.get('baseurlpath');

var face_route = base_route + '/face';

module.exports = function (server, models, redis) {
    var controller = ctrlBuilder(server, models, redis);

    server.get({path: face_route, version: version}, controller.randomFace);
    server.head({path: face_route, version: version}, controller.randomFace);

};
