'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('sendDocument', function() {
    this.timeout(50000);
    const options = {
        chat_id: chatId
        , document: './test/botfather.png'
        , caption: 'BotFather'
    };

    it('only require data', function() {

        return bot.sendDocument(options.chat_id, options.document)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('only require data in JSON', function() {

        return bot.sendDocument(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });
});