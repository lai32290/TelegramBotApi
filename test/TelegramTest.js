'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
var getUpdates = {};
var lastMessage = {};
const chatId = config.chatId;

describe('TelegramBotApi', function() {

    describe('getUpdates', function() {
        this.timeout(10000);

        it('is success', function() {
            return bot.getUpdates()
                .then(function(res) {
                    getUpdates = res;
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true); 
                });
        });
    });

    describe('getMe', function() {
        this.timeout(10000);

        it('is success', function() {
            return bot.getMe()
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                });
        });
    });

    describe('sendMessage', function() {
        this.timeout(10000);

        it('only require data', function() {
            const testName = 'only require data';
            return bot.sendMessage(chatId, testName)
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                    assert.equal(res.result.text, testName);
                });
        });

        it('only require data with json', function() {
            const testName = 'only require data with json';
            const options = {
                'chat_id': chatId,
                'text': testName
            };
            return bot.sendMessage(options)
                .then(function(res) {
                    lastMessage = res.result;
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                    assert.equal(res.result.text, testName);
                });
        });
    });

    describe('forwardMessage', function() {
        it('only require data', function() {
            this.timeout(10000);

            const messageId = lastMessage.message_id;
            return bot.forwardMessage(chatId, chatId, messageId)
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                });
        });

        it('only require data in JSON', function() {
            this.timeout(10000);

            const messageId = lastMessage.message_id;
            const options = {
                chat_id: chatId
                , from_chat_id: chatId
                , message_id: messageId
            };
            return bot.forwardMessage(options)
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                });
        });
    });

    describe('sendPhoto', function() {
        this.timeout(50000);

        it('only require data', function() {
            const photo = './test/botfather.png';

            return bot.sendPhoto(chatId, photo)
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                });
        });

        it('only require data in JSON', function() {
            const options = {
                chat_id: chatId
                , photo: './test/botfather.png'
            };

            return bot.sendPhoto(options)
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                });
        });
    });

    describe('sendVenue', function() {
        this.timeout(50000);

        it('only require data', function() {
            return bot.sendVenue(chatId, -22.503010, -47.565686, 'title', 'address')
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                });
        });

        it('only require data in JSON', function() {
            const options = {
                chat_id: chatId
                , latitude: '-22.503010'
                , longitude: '-47.565686'
                , title: 'Limbo'
                , address: 'Streat 12.343, limbo'
            };
            return bot.sendVenue(options)
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                });
        });

    });
});
