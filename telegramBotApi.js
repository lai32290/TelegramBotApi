const https = require('https')
    ;

const config = {
    host: 'api.telegram.org',
    baseUrl : 'https://api.telegram.org/bot'
};

function TelegraBotApi() {
    var self = this;
    self.token = undefined;

    self.getUpdates = () => {
        var url = config.baseUrl + self.token + '/getUpdates';
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
}

module.exports = TelegraBotApi;