const fs = require('fs');

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
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();

    });
}

exports.start = start;
