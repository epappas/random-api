'use strict';

var Twit = require('twit');
var MAX = 50;
var cursor = 0;
var data = [];

module.exports = function TweetProvider(conf) {

    var tStream = (new Twit(conf.get('twitter')))
        .stream('statuses/filter', { track: '#apple', language: 'en' });

    tStream.on('tweet', function (tweet) {
        data[cursor++ % MAX] = tweet;
    });

    return {

        /**
         * Get a Tweet
         *
         * @param cb {Function} Function callback ->(error, object)
         */
        getRandom: function (cb) {
            cb(null, data[parseInt((Math.random() * data.length) % data.length)]);
        }
    };
};

