'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('sendContact', function() {
    this.timeout(50000);
    const options = {
        chat_id: chatId
        , phone_number: 123456789
        , first_name: 'Hello JSON'
    };

    it('only require data', function() {
        return bot.sendContact(options.chat_id, options.phone_number, options.first_name)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                assert.equal(res.result.contact.first_name, options.first_name);
                assert.equal(res.result.contact.phone_number, options.phone_number);
            });
    });

    it('only require data in JSON', function() {
        return bot.sendContact(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
                assert.equal(res.result.contact.first_name, options.first_name);
                assert.equal(res.result.contact.phone_number, options.phone_number);
            });
    });

});