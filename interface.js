const readline = require('readline');
const socketio = require('socket.io-client');
const color = require('ansi-colors');

var socket = socketio.connect('http://localhost:3000');

// let username = '';

const rl = readline.createInterface(process.stdin, process.stdout);

// Use this function to log to console
const console_out = (msg) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(msg);
  rl.prompt(true);
};

// Set username
// const setUsername = () => {
//   rl.question('Enter your username: ', (username) => {
//     let msg = `${username} has connected!`;
//     socket.emit('send', { type: 'notice', message: msg });
//     rl.prompt(true);
//   });
// }

// rl.on('line', (line) => {
//   socket.emit('send', { type: 'chat', line: line, username: username});
//   rl.prompt(true);
// });

// socket.on('message', (data) => {
//     console.log(data);
//     // if (data.type === 'chat') {
//     //   console_out(`${data.username}: ${data.message}`);
//     // }
// });

// socket.on('welcome', ({ message }) => {
//   console_out('/////////////////');
//   console_out(message);
//   console_out('/////////////////');
//   // setUsername();
//   // socket.emit('my other event', { my: 'data' });
// });

const Client = function() {
  this.username = "Anonymous";
  this.room = "lobby";
}

Client.prototype.connect = function() {
  socket.on('welcome', (data) => {
    console_out('/////////////////');
    console_out(data.message);
    console_out('/////////////////');
    this.setUsername();
  });
}

Client.prototype.setUsername = function() {
  rl.question('Enter your username: ', (username) => {
    socket.emit('change_username', { username: username });
    this.username = username;
    this.setRoom();
  });
}

Client.prototype.setRoom = function() {
  rl.question('Room: ', (room) => {
    socket.emit('change_room', { room: room });
    this.room = room;
    rl.prompt(true);
  });
}

let newConnection = new Client();
newConnection.connect();