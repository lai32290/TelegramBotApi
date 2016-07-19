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
});
