'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('forwardMessage', function() {
    const options = {
        chat_id: chatId
        , from_chat_id: chatId
        , message_id: 543
    };
    it('only require data', function() {
        this.timeout(10000);

        return bot.forwardMessage(options.chat_id, options.from_chat_id, options.message_id)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('only require data in JSON', function() {
        this.timeout(10000);

        return bot.forwardMessage(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });
});