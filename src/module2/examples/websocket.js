const io = require('socket.io')(80);
const Twitter = require('node-tweet-stream');

const tw = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
});

tw.track('socket.io');
tw.track('javascript');
tw.stream.on('tweet', function (tweet) {
    io.emit('tweet', tweet);
});