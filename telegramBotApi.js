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
    var parametters = prepareParametters(params, arguments);
    
    return callMethod(this.token, methodName, parametters);
}
function sendMessage() {
    const methodName = 'sendMessage';
    const params = config.methods[methodName].requireParams;
    var parametters = prepareParametters(params, arguments);

    return callMethod(this.token, methodName, parametters);
}
function forwardMessage() {
    const methodName = 'forwardMessage';
    const params = config.methods[methodName].requireParams;
    var parametters = prepareParametters(params, arguments);

    return callMethod(this.token, methodName, parametters);
}
function sendPhoto() {
    var self = this;
    const methodName = 'sendPhoto';
    const params = config.methods[methodName].requireParams;
    var parametters = prepareParametters(params, arguments);


    if (fs.existsSync(parametters['photo']))
        parametters['photo'] = fs.createReadStream(parametters['photo']);

    return callMethod(this.token, methodName, parametters);
    return new Promise((resolve, reject) => {
        postRequire(self.token, method, parametters, resolve, reject);
    });
}
function sendDocument() {
    var self = this;
    const methodName = 'sendDocument';
    const params = config.methods[methodName].requireParams;
    var parametters = prepareParametters(params, arguments);


    if (fs.existsSync(parametters['document']))
        parametters['document'] = fs.createReadStream(parametters['document']);

    return callMethod(this.token, methodName, parametters);
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
function sendChatAction() {
    const methodName = 'sendChatAction';
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
function getFile() {
    var self = this;
    const methodName = 'getFile';
    const params = config.methods[methodName].requireParams;
    const args = arguments[0].constructor === {}.constructor ? arguments[0][params[0]] : arguments[0];
    var parametters = prepareParametters(params, [args]);

    return callMethod(this.token, methodName, parametters);
}
function getChat() {
    const methodName = 'getChat';
    const params = config.methods[methodName].requireParams;
    const args = prepareParametters(params, arguments);

    var parametters = qs.stringify(args);
    return makeGetMethod(this.token, methodName, parametters);
}
function getChatAdministrators() {
    const methodName = 'getChatAdministrators';
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
        case params.length:
            parametters = argumentsToParametters(params, args);
            break;

        case 1:
            parametters = args[0];
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
    var options = {
        url: makeUrl(token, method)
        , json: true
    };

    if(Object.keys(parametters).length == 0) {
        request.post(options.url, options, (err, res, body) => {
            if (err) reject(err);

            resolve(body);
        });
        return;
    }

    options.formData = parametters;
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
function callMethod(token, methodName, args) {
    const method = config.methods[methodName].urlString;
    var parametters = args || {};


    return new Promise((resolve, reject) => {
        postRequire(token, method, parametters, resolve, reject);
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
TelegraBotApi.prototype.sendDocument = sendDocument;
TelegraBotApi.prototype.sendVenue = sendVenue;
TelegraBotApi.prototype.sendContact = sendContact;
TelegraBotApi.prototype.sendChatAction = sendChatAction;
TelegraBotApi.prototype.sendSticker = sendSticker;
TelegraBotApi.prototype.sendLocation = sendLocation;
TelegraBotApi.prototype.getFile = getFile;
TelegraBotApi.prototype.getChat = getChat;
TelegraBotApi.prototype.getChatAdministrators = getChatAdministrators;
TelegraBotApi.prototype.getUpdates = getUpdates;

module.exports = {
    bot: TelegraBotApi
    , parseMode: parseMode
};