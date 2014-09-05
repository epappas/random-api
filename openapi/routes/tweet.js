'use strict';

var conf = require('../config');
var ctrlBuilder = require('../controllers/tweet-controller');

var version = conf.get('version');
var base_route = conf.get('baseurlpath');

var tweet_route = base_route + '/tweet';

module.exports = function (server, models, redis, twitter) {
    var controller = ctrlBuilder(server, models, redis, twitter);

    server.get({path: tweet_route, version: version}, controller.randomTweet);
    server.head({path: tweet_route, version: version}, controller.randomTweet);

};
