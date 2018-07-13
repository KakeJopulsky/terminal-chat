const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

http.listen(process.env.PORT || 3000);
console.log('WE ARE ALIVE');

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.username = '';
  socket.room = '/';

  socket.on('join', ({ username, room }) => {
    socket.username = username;
    socket.room = room;
    let greeting = 'Welcome to cmd-line chat';

    socket.join(room);
    socket.emit('message', { user: 'Admin', msg: greeting, room: socket.room });
    socket.broadcast.to(room).emit('message', { user: 'Admin', msg: `${username} has joined` }); 
  });

  socket.on('message', ({ user, msg }) => socket.to(socket.room).emit('message', { user: user, msg: msg }));

  socket.on('disconnect', () => console.log('user disconnected'));
});
