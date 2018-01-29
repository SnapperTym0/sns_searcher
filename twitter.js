function Twitter(request, fs){
    if(request === null || fs === null){
        throw 'argument error';
    }
    this.request = request;
    this.fs = fs;
    this.bearerRequestURL = 'https://api.twitter.com/oauth2/token';
    this.credentialFile = './credential.json';
}

Twitter.prototype.readKey = function(){
    const api = {};
    const credential = this.fs.readFileSync(this.credentialFile, {
        encoding: 'utf-8'
    });
    api.key = JSON.parse(credential)['api_key'];
    api.secret = JSON.parse(credential)['api_secret'];
    return api;
}
Twitter.prototype.getToken = function(callback){
    const api = this.readKey();
    const credential = new Buffer(api.key + ':' + api.secret).toString();
    this.request.post(this.bearerRequestURL, {
        form: {
            grant_type: 'client_credentials',
            client_id: api.key,
            client_secret: api.secret
        },
        json: true
    }, (err, response, body) => {
        if(!err){
            callback(body['access_token']);
        }else{
            console.error(err);
        }
    });
}
Twitter.prototype.search = function(url, token, callback){
    const auth = 'Bearer ' + token;
    this.request.get({
        url: url,
        headers: {Authorization: auth},
        json: true
    }, (err, response, body) => {
        if(!err){
            callback(body);
        }else{
            console.error(err);
        }
    });
}
Twitter.prototype.get = function(callback){
    const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=arayutw&count=10';
    var promise = new Promise((resolve, reject) => {
        this.getToken(resolve);
    }).then((token) => {
        this.search(url, token, callback);
    });
}

module.exports = Twitter;
