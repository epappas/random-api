'use strict';

var data = [
    {
        text: 'It is certain',
        level: 'positive'
    },
    {
        text: 'It is decidedly so',
        level: 'positive'
    },
    {
        text: 'Without a doubt',
        level: 'positive'
    },
    {
        text: 'Yes definitely',
        level: 'positive'
    },
    {
        text: 'You may rely on it',
        level: 'positive'
    },
    {
        text: 'As I see it, yes',
        level: 'positive'
    },
    {
        text: 'Most likely',
        level: 'positive'
    },
    {
        text: 'Outlook good',
        level: 'positive'
    },
    {
        text: 'Yes',
        level: 'positive'
    },
    {
        text: 'Signs point to yes',
        level: 'positive'
    },
    {
        text: 'Reply hazy try again',
        level: 'neutral'
    },
    {
        text: 'Ask again later',
        level: 'neutral'
    },
    {
        text: 'Better not tell you now',
        level: 'neutral'
    },
    {
        text: 'Cannot predict now',
        level: 'neutral'
    },
    {
        text: 'Concentrate and ask again',
        level: 'neutral'
    },
    {
        text: 'Don\'t count on it',
        level: 'negative'
    },
    {
        text: 'My reply is no',
        level: 'negative'
    },
    {
        text: 'My sources say no',
        level: 'negative'
    },
    {
        text: 'Outlook not so good',
        level: 'negative'
    },
    {
        text: 'Very doubtful',
        level: 'negative'
    }
];

module.exports = function User() {
    return {

        /**
         * Get a Quote
         *
         * @param cb {Function} Function callback ->(error, object)
         */
        getRandom: function (cb) {
            cb(null, data[parseInt((Math.random() * data.length) % data.length)]);
        }
    };
};

