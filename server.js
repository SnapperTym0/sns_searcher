const http = require('http');
const url = require('url');

function start(route, handle){

    const port = 8080;

    function onRequest(request, response){
        
        const parse = url.parse(request.url, true);
        const pathname = parse.pathname.replace('.html', '');
        const parameters = parse.query;
        var postData = '';
        console.log('Request for ' + pathname + ' recieved.');
        console.log('Parameters for ' + parameters.year + ' recieved.');

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
