'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('getChatAdministrators', function() {
    this.timeout(10000);
    const options = {
        chat_id: chatId
    };

    it('is success', function() {
        return bot.getChatAdministrators(options.chat_id)
            .then(function(res) {
                console.log(res);
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });
});