const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(3000);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.username = '';
  socket.room = '/';

  socket.on('join', ({ username, room }) => {
    socket.username = username;
    socket.room = room;
    let greeting = `Welcome to cmd-line chat (Room: ${socket.room})`;

    socket.join(room);

    socket.emit('message', { user: 'Admin', msg: greeting });
  });

  socket.on('message', ({ user, msg }) => io.to(socket.room).emit('message', { user: user, msg: msg }));

  socket.on('disconnect', () => console.log('user disconnected'));
});
