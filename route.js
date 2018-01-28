function route(handle, pathname, response){

    if(typeof handle[pathname] === 'function'){
        return handle[pathname](response);
    }else{
        console.error('No request handler found for ' + pathname);
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write('404 Not found');
        response.end();
    }
}

exports.route = route;
