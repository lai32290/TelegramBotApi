'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('getFile', function() {
    this.timeout(50000);
    const options = {
        file_id: config.fileId
    };

    it('only require data', function() {

        return bot.getFile(options.file_id)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                assert.equal(res.result.file_id, options.file_id);
            });
    });

    it('only require data in JSON', function() {
        return bot.getFile(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                assert.equal(res.result.file_id, options.file_id);
            });
    });
});