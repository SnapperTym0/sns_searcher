const http = require('http');
const url = require('url');

function start(route, handle){

    const port = 8080;

    function onRequest(request, response){
        
        const pathname = url.parse(request.url).pathname.replace('.html', '');
        var postData = '';
        console.log('Request for ' + pathname + ' recieved.');

        request.setEncoding('utf8');

        request.addListener('data', (postDataChunk) => {
            postData += postDataChunk;
        });

        request.addListener('end', () => {
            route(handle, pathname, response, postData);
        });
    }

    http.createServer(onRequest).listen(port);
    console.log('Server has started. port=>' + port);
}

exports.start = start;
