const TelegramBotApi = require('./telegramBotApi')
    , telegram = new TelegramBotApi()
    ;


var token = '211911623:AAEuHcSha5kRxuEY6u_t7HpJcaf3PJnJ2Ww';

telegram.token = token;

telegram.getUpdates()
    .then(res => {
        res.result.forEach(item => {
            console.log(item);
        });
    });