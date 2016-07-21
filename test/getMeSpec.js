'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

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