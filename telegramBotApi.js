"use strict";

const request = require('request')
    , qs = require('querystring')
    , extend = require('json-extend')
    ;

const config = {
    host: 'api.telegram.org'
    , baseUrl : 'https://api.telegram.org/bot'
    , methods: {
        getUpdates: 'getUpdates'
        , sendMessage: 'sendMessage'
    }
};

function TelegraBotApi(token) {
    var self = this;
    self.token = token !== undefined ? token : undefined;

    self.getUpdates = getUpdates;
    self.sendMessage = sendMessage;

    function getUpdates() {
        return new Promise((resolve, reject) => {
            const options = {
                url : _makeUrl(config.methods.getUpdates)
                , json : true
            };

            request.get(options, (err, res, body) => {
                if(err) reject(err);

                resolve(body);
            });
        });
    }

    function sendMessage() {
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
                }, arguments[3]);
                break;
        }

        parametters = qs.stringify(parametters);

        return new Promise((resolve, reject) => {
            const options = {
                url: _makeUrl(config.methods.sendMessage) + '?' + parametters
                , json: true
            };

            request.get(options, (err, res, body) => {
                if(err) reject(err);

                resolve(body);
            });
        });
    }

    function _makeUrl(method) {
        return config.baseUrl + self.token + '/' + method;
    }
}

module.exports = TelegraBotApi;