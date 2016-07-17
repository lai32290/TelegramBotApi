"use strict";

const request = require('request')
    , fs = require('fs')
    , qs = require('querystring')
    , extend = require('json-extend')
    ;

const config = {
    host: 'api.bot.org'
    , baseUrl : 'https://api.telegram.org/bot'
    , methods: {
        getMe: 'getMe'
        , sendMessage: 'sendMessage'
        , forwardMessage: 'forwardMessage'
        , sendPhoto: 'sendPhoto'
        , sendVenue: 'sendVenue'
        , sendContact: 'sendContact'
        , getUpdates: 'getUpdates'
    }
};

const parseMode = {
    markdown: 'Markdown'
    , html: 'HTML'
};

function getMe() {
    var self = this;

    return new Promise((resolve, reject) => {
        onlyReturn(self.token, config.methods.getMe, resolve, reject);
    });
}
function sendMessage() {
    var self = this;

    const params = [
        'chat_id'
        , 'text'
    ];
    var parametters = prepareParametters(params, arguments);
    console.log(['aquii', parametters]);

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
function forwardMessage() {
    var self = this;

    var parametters = {};

    switch (arguments.length) {
        case 1:
            parametters = arguments[0];
            break;

        case 3:
            parametters = {
                'chat_id' : arguments[0]
                , 'from_chat_id' : arguments[1]
                , 'message_id' : arguments[2]
            };
            break;

        default:
            parametters = extend({
                'chat_id' : arguments[0]
                , 'from_chat_id' : arguments[1]
                , 'message_id' : arguments[2]
            }, arguments[3]);
            break;
    }

    parametters = qs.stringify(parametters);

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, config.methods.forwardMessage) + '?' + parametters
            , json: true
        };

        request.get(options, (err, res, body) => {
            if(err) reject(err);

            resolve(body);
        });
    });
}
function sendPhoto() {
    var self = this;

    var parametters = {};

    switch (arguments.length) {
        case 1:
            parametters = arguments[0];
            break;

        case 2:
            parametters = {
                'chat_id' : arguments[0]
                , 'photo' : arguments[1]
            };
            break;

        default:
            parametters = extend({
                'chat_id' : arguments[0]
                , 'photo' : arguments[1]
            }, arguments[2]);
            break;
    }

    if(fs.existsSync(parametters['photo']))
        parametters['photo'] = fs.createReadStream(parametters['photo']);

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, config.methods.sendPhoto)
            , formData: parametters
            , json: true
        };

        request.post(options, (err, res, body) => {
            if(err) reject(err);

            resolve(body);
        });
    });
}
function sendVenue() {
    var self = this;

    const params = [
        'chat_id'
        , 'latitude'
        , 'longitude'
        , 'title'
        , 'address'
    ];
    var parametters = prepareParametters(params, arguments);

    parametters = qs.stringify(parametters);

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, config.methods.sendVenue) + '?' + parametters
            , json: true
        };

        request.get(options, (err, res, body) => {
            if(err) reject(err);

            resolve(body);
        });
    });
}
function sendContact() {
    var self = this;

    var parametters = {};
    switch (arguments.length) {
        case 1:
            parametters = arguments[0];
            break;

        case 2:
            parametters = {
                'chat_id' : arguments[0]
                , 'phone_number' : arguments[1]
                , 'first_name' : arguments[2]
            };
            break;

        default:
            parametters = extend({
                'chat_id' : arguments[0]
                , 'phone_number' : arguments[1]
                , 'first_name' : arguments[2]
            }, arguments[3]);
            break;
    }

    parametters = qs.stringify(parametters);

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, config.methods.sendContact) + '?' + parametters
            , json: true
        };

        request.get(options, (err, res, body) => {
            if(err) reject(err);

            resolve(body);
        });
    });
}
function getUpdates() {
    var self = this;

    return new Promise((resolve, reject) => {
        onlyReturn(self.token, config.methods.getUpdates, resolve, reject);
    });
}

function _makeUrl(token, method) {
    return config.baseUrl + token + '/' + method;
}
function onlyReturn(token, method, resolve, reject) {
    const options = {
        url : _makeUrl(token, method)
        , json : true
    };

    request.get(options, (err, res, body) => {
        if(err) reject(err);

        resolve(body);
    });
}
function argumentsToParametters(parametters, args) {
    var params = {};

    for(var index in parametters) {
        var value = args[index];
        var key = parametters[index];

        params[key] = value;
    }

    return params;
}
function prepareParametters(params, args) {
    var parametters = {};

    switch (args.length) {
        case 1:
            parametters = args[0];
            break;

        case params.length:
            parametters = argumentsToParametters(params, args);
            break;

        default:
            parametters = extend(argumentsToParametters(params, args),
                args[params.length]);
            break;
    }

    return parametters;
}

function TelegraBotApi(token) {
    var self = this;

    if(token) self.token = token;
}

TelegraBotApi.prototype.getMe = getMe;
TelegraBotApi.prototype.sendMessage = sendMessage;
TelegraBotApi.prototype.forwardMessage = forwardMessage;
TelegraBotApi.prototype.sendPhoto = sendPhoto;
TelegraBotApi.prototype.sendVenue = sendVenue;
TelegraBotApi.prototype.sendContact = sendContact;
TelegraBotApi.prototype.getUpdates = getUpdates;

module.exports = {
    bot: TelegraBotApi
    , parseMode: parseMode
};