import openSocket from 'socket.io-client';

const config = {
    api_host: 'http://localhost:8000/api',
    base: 'http://localhost:8000/',
    image_server : 'http://54.172.121.236:3000/',
    socket: openSocket("http://54.172.121.236:3000/"),
    listen: function (socket,callback) {
        socket.on('private', function (data) {
            callback(data.message);
        });
    },
    listenNewsfeed: function (socket,callback) {
        socket.on('newsfeed', function (data) {
            callback();
        });
    },
}



export default config;