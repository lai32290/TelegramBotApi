'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('sendVenue', function() {
    this.timeout(50000);
    const options = {
        chat_id: chatId
        , latitude: '-22.503010'
        , longitude: '-47.565686'
        , title: 'Limbo'
        , address: 'Streat 12.343, limbo'
    };

    it('only require data', function() {
        return bot.sendVenue(options.chat_id, options.latitude, options.longitude, options.title, options.address)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('only require data in JSON', function() {
        return bot.sendVenue(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

});