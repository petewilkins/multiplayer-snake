var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'public')));


var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var square = require('./calculatePosition')


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connect', function(socket){
  var position = {x: 300, y:300};
  // var key = 1;
  // setInterval(function(){
  //   io.emit('update position', square.calculatePosition(position,key));
  // }, 1000);


  console.log('new connection ' + socket.id)

  socket.on('keypress', function(key){
    console.log("this one" + key);
    io.emit('update position', square.calculatePosition(position,key));
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
