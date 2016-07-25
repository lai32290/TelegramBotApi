'use strict';

const chai = require('chai')
    , assert = chai.assert
    , TelegramBotApi = require('../telegramBotApi')
    , Bot = TelegramBotApi.bot
    , config = require('../testConfig.json')
    ;

var bot = new Bot(config.token);
const chatId = config.chatId;

describe('sendChatAction', function() {
    this.timeout(50000);
    const options = {
        chat_id: chatId
        , action: 'typing'
    };

    it('only require data', function() {
        return bot.sendChatAction(options.chat_id, options.action)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('only require data in JSON', function() {
        return bot.sendChatAction(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('send typing', function() {
        return bot.sendChatAction(options)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('send upload_photo', function() {
        var op = JSON.parse(JSON.stringify(options));
        op.action = 'upload_photo';

        return bot.sendChatAction(op)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('send record_video', function() {
        var op = JSON.parse(JSON.stringify(options));
        op.action = 'record_video';

        return bot.sendChatAction(op)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('send upload_video', function() {
        var op = JSON.parse(JSON.stringify(options));
        op.action = 'upload_video';

        return bot.sendChatAction(op)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('send record_audio', function() {
        var op = JSON.parse(JSON.stringify(options));
        op.action = 'record_audio';

        return bot.sendChatAction(op)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('send upload_audio', function() {
        var op = JSON.parse(JSON.stringify(options));
        op.action = 'upload_audio';

        return bot.sendChatAction(op)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('send upload_document', function() {
        var op = JSON.parse(JSON.stringify(options));
        op.action = 'upload_document';

        return bot.sendChatAction(op)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

    it('send find_location', function() {
        var op = JSON.parse(JSON.stringify(options));
        op.action = 'find_location';

        return bot.sendChatAction(op)
            .then(function(res) {
                assert.property(res, 'ok');
                assert.equal(res.ok, true);
            });
    });

});