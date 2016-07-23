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
    const options = {
        'chat_id': chatId,
        'text': 'Send message'
    };

    it('only require data', function() {
        return bot.sendMessage(options.chat_id, options.text)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                assert.equal(res.result.text, options.text);
            });
    });

    it('only require data with json', function() {
        return bot.sendMessage(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                assert.equal(res.result.text, options.text);
            });
    });

    it('send reply keyboard', function() {
        var op = JSON.parse(JSON.stringify(options));
        const keyboard = {
            keyboard: [
                [{text: 'option 1'}, {text: 'option 2'}]
                , [{text: 'option 3'}, {text: 'option 4'}]
            ]
            , one_time_keyboard: true
        };
        op.reply_markup = JSON.stringify(keyboard);
        return bot.sendMessage(op)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });
});