'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('sendPhoto', function() {
    this.timeout(50000);
    const options = {
        chat_id: chatId
        , photo: './test/botfather.png'
    };

    it('only require data', function() {

        return bot.sendPhoto(options.chat_id, options.photo)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('only require data in JSON', function() {

        return bot.sendPhoto(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });
});