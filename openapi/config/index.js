'use strict';

module.exports = require('nconf')
    .argv()
    .env()
    .file({ file: './default.json' })
    .defaults({
        port: process.env.RANDOM_API_PORT || 42002,
        version: require('../package.json').version,
        'redis.namespace': 'openapi',
        'datasmart.url': 'http://localhost:4420',
        'baseurlpath': '/api/v1',
        'source.user': 'http://api.randomuser.me/',
        'source.face': 'http://uifaces.com/api/v1/random',
        'twitter': require('./twitter.json')
    });
