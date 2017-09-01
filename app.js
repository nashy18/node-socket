var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

let usersOnline = 0;

io.on('connection', function(socket){	
	//console.log('a user connected');
	usersOnline ++;
	let response = {};
	response.onlineUsers = usersOnline;
	response.message = "Welcome to chat club";
	socket.emit('chatLoaded', response);	
	socket.on('chatMessage', function(response){
		//console.log(msg);
		io.emit('chatMessage', response);
	});
  
  socket.on('disconnect', function(){
    //console.log('user disconnected');
	if(usersOnline!==0) -- usersOnline;
	let response = {};
	response.onlineUsers = usersOnline;
	response.message = "Welcome to chat club";
	socket.emit('chatLoaded', response);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});


// //sending to sender-client only
// socket.emit('message', "this is a test");

// // sending to all clients, include sender
// io.emit('message', "this is a test");

// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");

// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');

// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');

// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');

// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');

// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');
	
