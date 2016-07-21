'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

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
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                assert.equal(res.result.text, testName);
            });
    });
});