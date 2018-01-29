const server = require('./server');
const router = require('./route');
const handlers = require('./handler');

var handle = {};
handle['/'] = handlers.start;
handle['/top'] = handlers.start;
handle['/search'] = handlers.search;

server.start(router.route, handle);
