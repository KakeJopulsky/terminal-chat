const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Listen on port 3000
http.listen(3000);

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

io.on('connection', (socket) => {
  console.log('a user connected');

  // Default username
  socket.username = 'Anonymous';
  socket.room = '/';

  socket.emit('welcome', { message: 'Welcome to terminal chat' });

  socket.on('chat message', (msg) => io.emit('chat message', msg));

  socket.on('change_username', ({ username }) => {
    socket.username = username;
  });

  // socket.on('change_room', ({ room }) => {
  //   socket.room = room;
  //   socket.createRoom();
  // });

  // socket.createRoom = () => {
  //   console.log('in createRoom!');
  //   var nsp = io.of(`/${socket.room}`);
  //   nsp.on('connection', (socket) => {
  //     console.log(`someone connected to ${socket}`);
  //   });
  //   nsp.emit('hi', 'everyone!');
  // }

  socket.on('disconnect', () => console.log('user disconnected'));
});
