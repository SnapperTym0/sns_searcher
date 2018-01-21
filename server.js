const http = require('http');
const url = require('url');
const PORT = 8080;
const exec = require('child_process').exec;

function onRequest(request, response){

    exec('cat ./credential.json',
    (error, stdout, stderr) => {
    var body = stdout;
    request.setEncoding('utf8');
    response.writeHead(200, {'Content-Type':'text/html'});
    response.write('<div>'+body+'</div>');
    response.end();
    })

}

http.createServer(onRequest).listen(PORT);
console.log('Server has started PORT:' + PORT);
