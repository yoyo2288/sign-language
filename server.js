
// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}
// var server = app.listen(3000, '172.16.133.65', function() {
//   console.log('Listening to port:  ' + 3000);
// });

app.use(express.static('public'));


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile('/home/rajath/Downloads/Node/public/' + '/index.html');
});

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new cllient: " + socket.id);

    // fs.readFile('/home/rajath/Downloads/Node/public' + 'myCanvas.jpg', function(err, buf){
    //   // it's possible to embed binary data
    //   // within arbitrarily-complex objects
    //   socket.emit('image', { image: true, buffer: buf.toString('base64') })
    //   console.log('image file is initialized');
  
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('string',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'string' " + data);
      
        // Send it to all other clients
        socket.broadcast.emit('string', data);
        
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );
    
    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
