"use strict";

const request = require('request')
    , config = require('./config.json')
    , fs = require('fs')
    , qs = require('querystring')
    , extend = require('json-extend')
    ;

const parseMode = {
    markdown: 'Markdown'
    , html: 'HTML'
};

function getMe() {
    const methodName = 'getMe';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments);
    
    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}
function sendMessage() {
    const methodName = 'sendMessage';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments);
    
    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}
function forwardMessage() {
    const methodName = 'forwardMessage';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments);

    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}
function sendPhoto() {
    var self = this;

    const method = config.methods.sendPhoto.urlString;
    const params = config.methods.sendPhoto.requireParams;

    var parametters = prepareParametters(params, arguments);

    if (fs.existsSync(parametters['photo']))
        parametters['photo'] = fs.createReadStream(parametters['photo']);

    return new Promise((resolve, reject) => {
        postRequire(self.token, method, parametters, resolve, reject);
    });
}
function sendVenue() {
    const methodName = 'sendVenue';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments);

    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}
function sendContact() {
    const methodName = 'sendContact';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments);

    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}
function sendSticker() {
    const methodName = 'sendSticker';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments);

    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}
function sendLocation() {
    const methodName = 'sendLocation';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments);

    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}
function getUpdates() {
    const methodName = 'getUpdates';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments)
    
    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}

function makeUrl(token, method) {
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
        url: makeUrl(token, method) + '?' + parametters
        , json: true
    };

    request.get(options, (err, res, body) => {
        if (err) reject(err);

        resolve(body);
    });
}
function postRequire(token, method, parametters, resolve, reject) {
    const options = {
        url: makeUrl(token, method)
        , formData: parametters
        , json: true
    };

    request.post(options, (err, res, body) => {
        if (err) reject(err);

        resolve(body);
    });
}
function makeGetMethod(token, methodName, args) {
    const method = config.methods[methodName].urlString;
    var parametters = args || "";

    return new Promise((resolve, reject) => {
        getRequire(token, method, parametters, resolve, reject);
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
TelegraBotApi.prototype.sendSticker = sendSticker;
TelegraBotApi.prototype.sendLocation = sendLocation;
TelegraBotApi.prototype.getUpdates = getUpdates;

module.exports = {
    bot: TelegraBotApi
    , parseMode: parseMode
};