'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);

describe('TelegramBotApi', function() {
    this.timeout(10000);

    describe('getUpdates', () => {
        it('is success', (done) => {
            bot.getUpdates()
                .then(res => {
                    assert.property(res, 'ok');
                    assert.equal(res.ok, true);
                    done();
                });
        });
    });

    describe('getMe', () => {
        it('is success', (done) => {
            bot.getMe()
                .then(res => {
                    console.log(res);
                    assert.property(res, 'ok');
                    assert.property(res.ok, true);
                    done();
                });
        });
    });

    describe('sendMessage', () => {
        const chatId = config.chatId;

        it('only required data', (done) => {
            bot.sendMessage(chatId, 'Olaa')
                .then(res=> {
                    assert.property(res, 'ok');
                    assert.property(res.ok, true);
                    done();
                });
        });
    });
});
