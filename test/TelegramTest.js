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
        it('is success', function(done) {
            bot.getUpdates()
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                    done();
                });
        });
    });

    describe('getMe', function() {
        this.timeout(10000);
        it('is success', function(done) {
            bot.getMe()
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.property(res.ok, true);
                    done();
                });
        });
    });

    describe('sendMessage', function() {
        const chatId = config.chatId;

        it('only required data', function(done) {
            this.timeout(10000);
            bot.sendMessage(chatId, 'Olaa')
                .then(function(res) {
                    assert.property(res, 'ok');
                    assert.property(res.ok, true);
                    done();
                });
        });
    });
});
