const http = require('http')
    ;

const config = {
    host: 'api.telegram.org',
    baseUrl : 'https://api.telegram.org/bot'
};

function TelegraBotApi() {
    var self = this;
    self.token = undefined;

    self.getUpdates = () => {
        return new Promise((resolve, reject) => {
            http.request({
                method: 'GET'
                , host: config.host
                , path: '/bot' + self.token + '/getUpdates'
            }, (res) => {
                resolve(res);
            }).end();
        });
    };
}

module.exports = TelegraBotApi;