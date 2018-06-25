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
  socket.room = 'lobby'

  socket.emit('welcome', { message: 'Welcome to terminal chat' });

  socket.on('change_username', ({ username }) => {
    socket.username = username;
  });

  socket.on('change_room', ({ room }) => {
    socket.room = room;
  });

  socket.on('disconnect', () => console.log('user disconnected'));
});
