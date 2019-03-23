
//var express = require('express');
//var app = express();
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path');

//var app = express();
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/'));

app.get('/', function (req, res) {
   //res.sendFile(__dirname + '/index.html');
   res.sendFile(path.join(__dirname+'/dist/index.html'));
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(process.env.PORT || 3000, function () {
    console.log('listening on *:3000')
});