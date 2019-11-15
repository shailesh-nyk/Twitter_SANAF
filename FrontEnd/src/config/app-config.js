import openSocket from 'socket.io-client';

const config = {
    api_host: 'http://localhost:8000/api',
    base: 'http://localhost:8000/',
    socket: openSocket('http://localhost:8000/'),
    listen: function (socket,callback) {
        socket.on('private', function (data) {
            callback(data.message);
        });
    }
}



export default config;