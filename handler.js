const fs = require('fs');
const request = require('request');
const Yubin = require('./yubin');
const Twitter = require('./twitter');

function start(response){

    const filename = './top.html';
    
    fs.readFile(filename, (err, data) => {
        if(err){
            response.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            response.write(`
                <div class="main">
                  <p class="sorry">ごめんなさい。サーバーの調査が悪いようです。。。</p>
                </div>`);
            return response.end();
        }
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(data);
        response.end();
    });
}
function search(response){
    const twitter = new Twitter(request, fs);
    twitter.get((res) => {
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.forEach((current, index) => {
            response.write('<div>' + index + '===>' + JSON.stringify(current) + '</div>');
        });
        response.end();
    });
}

exports.start = start;
exports.search = search;
