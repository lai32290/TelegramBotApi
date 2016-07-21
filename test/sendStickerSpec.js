'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('sendSticker', function() {
    this.timeout(50000);
    const options = {
        chat_id: chatId
        , sticker: 'BQADBAADeQEAAl1PhAGLuwZNlAnLjAI'
    };

    it('only require data', function() {
        return bot.sendSticker(options.chat_id, options.sticker)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                checkData(res);
            });
    });

    it('only require data in JSON', function() {
        return bot.sendSticker(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                checkData(res);
            });
    });

    function checkData(res) {
    	assert.equal(res.result.sticker.file_id, options.sticker);
    }

});