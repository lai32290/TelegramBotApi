const https = require('https')
    ;

const config = {
    host: 'api.telegram.org'
    , baseUrl : 'https://api.telegram.org/bot'
    , methods: {
        getUpdates: 'getUpdates'
        , sendMessage: 'sendMessage'
    }
};

function TelegraBotApi() {
    var self = this;
    self.token = undefined;

    self.getUpdates = () => {
        const url = makeUrl(config.methods.getUpdates);
        return new Promise((resolve, reject) => {

            https.get(url, (res) => {
                var data = '';

                res.on('data', d => {
                    data += d;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
        });
    };

    self.sendMessage = (chatId, message, parseMode, disableWebPageView, disableNotification,
                        replyToMessageId, replyMarkup) => {
        const url = makeUrl(config.methods.sendMessage);
        var parametters = [];
        parametters.push('chat_id=' + chatId);
        parametters.push('text=' + message);
        if(parseMode !== undefined) parametters.push('parse_mode=' + parseMode);
        if(disableWebPageView !== undefined) parametters.push('disable_web_page_preview=' + disableWebPageView);
        if(disableNotification !== undefined) parametters.push('disable_notification=' + disableNotification);
        if(replyToMessageId !== undefined) parametters.push('reply_to_message_id=' + replyToMessageId);
        if(replyMarkup !== undefined) parametters.push('reply_markup=' + replyMarkup);

        parametters = parametters.join('&');

        return new Promise((resolve, reject) => {
            https.get(url + '?' + parametters, (res) => {
                var data = '';

                res.on('data', d => {
                    data += d;
                });

                res.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });
        });
    };

    function makeUrl(method) {
        return config.baseUrl + self.token + '/' + method;
    }
}

module.exports = TelegraBotApi;