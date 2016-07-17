"use strict";

const request = require('request')
    , fs = require('fs')
    , qs = require('querystring')
    , extend = require('json-extend')
    ;

const config = {
    host: 'api.bot.org'
    , baseUrl: 'https://api.telegram.org/bot'
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
    const method = config.methods.getMe;

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, method)
            , json: true
        };

        request.get(options, (err, res, body) => {
            if (err) reject(err);

            resolve(body);
        });
    });
}
function sendMessage() {
    var self = this;

    const params = [
        'chat_id'
        , 'text'
    ];
    var parametters = prepareParametters(params, arguments);

    parametters = qs.stringify(parametters);

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, config.methods.sendMessage) + '?' + parametters
            , json: true
        };

        request.get(options, (err, res, body) => {
            if (err) reject(err);

            resolve(body);
        });
    });
}
function forwardMessage() {
    var self = this;

    const params = [
        'chat_id'
        , 'from_chat_id'
        , 'message_id'
    ];
    var parametters = prepareParametters(params, arguments);

    parametters = qs.stringify(parametters);

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, config.methods.forwardMessage) + '?' + parametters
            , json: true
        };

        request.get(options, (err, res, body) => {
            if (err) reject(err);

            resolve(body);
        });
    });
}
function sendPhoto() {
    var self = this;

    const params = [
        'chat_id'
        , 'photo'
    ];
    var parametters = prepareParametters(params, arguments);

    if (fs.existsSync(parametters['photo']))
        parametters['photo'] = fs.createReadStream(parametters['photo']);

    return new Promise((resolve, reject) => {
        const options = {
            url: _makeUrl(self.token, config.methods.sendPhoto)
            , formData: parametters
            , json: true
        };

        request.post(options, (err, res, body) => {
            if (err) reject(err);

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
            if (err) reject(err);

            resolve(body);
        });
    });
}
function sendContact() {
    var self = this;

    const method = config.methods.sendContact;
    const params = [
        'chat_id'
        , 'phone_number'
        , 'first_name'
    ];
    var parametters = prepareParametters(params, arguments);
    parametters = qs.stringify(parametters);

    return new Promise((resolve, reject) => {
        getRequire(self.token, method, parametters, resolve, reject);
    });
}
function getUpdates() {
    var self = this;
    const method = config.methods.getUpdates;

    return new Promise((resolve, reject) => {
        getRequire(self.token, method, '', resolve, reject);
    });
}

function _makeUrl(token, method) {
    return config.baseUrl + token + '/' + method;
}
function argumentsToParametters(parametters, args) {
    var params = {};

    for (var index in parametters) {
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
function getRequire(token, method, parametters, resolve, reject) {
    const options = {
        url: _makeUrl(token, method) + '?' + parametters
        , json: true
    };

    request.get(options, (err, res, body) => {
        if (err) reject(err);

        resolve(body);
    });
}

function TelegraBotApi(token) {
    var self = this;

    if (token) self.token = token;
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