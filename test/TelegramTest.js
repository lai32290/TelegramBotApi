'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);

describe('TelegramBotApi', function() {

    describe('getUpdates', function() {
        this.timeout(10000);
        
        it('is success', function() {
            return bot.getUpdates()
                .then(function(res) {
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
        const chatId = config.chatId;

        it('only required data', function() {
            return bot.sendMessage(chatId, 'Olaa')
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                });
        });
    });
});
