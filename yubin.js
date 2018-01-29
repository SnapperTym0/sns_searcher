function Yubin(request){
    this.request = request;
}
Yubin.prototype.get = function(code, callback){
    const headers = {'Content-Type': 'application/json'};
    const options = {
        url: `http://zipcloud.ibsnet.co.jp/api/search?zipcode=${code}`,
        method: 'GET',
        headers: headers,
        json: true,
    };
    this.request(options, callback);
}

module.exports = Yubin;
