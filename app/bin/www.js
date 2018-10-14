require('babel-register')
const http = require('http');


const app = require('../index');

// server listen
const server = http.createServer(app.callback());
server.listen(3000)

server.on('error', (e) => {
    console.log(e)
});
server.on('listening', () => {
    console.log('server is listening on port 3000')
});
