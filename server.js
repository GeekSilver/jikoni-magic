const http = require('http');

const app = require('./app');

const normalizePort = val => {
    const port = parseInt(val,10);

    if(isNaN(val)) {
        return val;
    }
    if(port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

const errorHandler = (error) => {
    if(error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'String' ? 'pipe ' + address : ' port:' + address;
    switch(error.code) {
        case 'EACCESS':
            console.log( bind+' requires elevated priveleges.');
            process.exit();
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use');
            process.exit();
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);

server.on('listening',() => {
    const address = server.address();
    const bind = typeof address === 'String' ? 'pipe ' + address : ' port:' + address;
    console.log('Server is listening on '+ bind);
})

server.listen(port);