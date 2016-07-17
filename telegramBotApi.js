"use strict";

const request = require('request')
    , qs = require('querystring')
    , extend = require('json-extend')
    ;

const config = {
    host: 'api.bot.org'
    , baseUrl : 'https://api.telegram.org/bot'
    , methods: {
        getUpdates: 'getUpdates'
        , sendMessage: 'sendMessage'
    }
};

const parseMode = {
    markdown: 'Markdown'
    , html: 'HTML'
};

function getUpdates() {
    var self = this;

    return new Promise((resolve, reject) => {
        const options = {
            url : _makeUrl(self.token, config.methods.getUpdates)
            , json : true
        };

        request.get(options, (err, res, body) => {
            if(err) reject(err);

            resolve(body);
        });
    });
}

function sendMessage() {
    var self = this;

    var parametters = {};

    switch (arguments.length) {
        case 1:
            parametters = arguments[0];
            break;

        case 2:
            parametters = {
                'chat_id' : arguments[0]
                , 'text' : arguments[1]
            };
            break;

        default:
            parametters = extend({
                'chat_id': arguments[0]
                , 'text': arguments[1]
            }, arguments[2]);
            break;
    }

    parametters = qs.stringify(parametters);

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, config.methods.sendMessage) + '?' + parametters
            , json: true
        };

        request.get(options, (err, res, body) => {
            if(err) reject(err);

            resolve(body);
        });
    });
}

function _makeUrl(token, method) {
    return config.baseUrl + token + '/' + method;
}

function TelegraBotApi(token) {
    var self = this;

    if(token) self.token = token;
}

TelegraBotApi.prototype.getUpdates = getUpdates;
TelegraBotApi.prototype.sendMessage = sendMessage;

module.exports = {
    bot: TelegraBotApi
    , parseMode: parseMode
};