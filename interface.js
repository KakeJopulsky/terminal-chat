const readline = require('readline');
const socketio = require('socket.io-client');
const color = require('ansi-colors');

const rl = readline.createInterface(process.stdin, process.stdout);

// Use this function to log to console
const console_out = (msg) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(msg);
  rl.prompt(true);
};

const Client = function() {
  this.username = 'Anonymous';
  this.room = '';
  this.socket = socketio.connect(`http://localhost:3000/${this.room}`);
  this.connected = false;

  this.socket.on('chat message', (msg) => console_out(msg));

  // rl.on('line', (input) => {
  //   if (this.connected) {
  //     this.chat(input);
  //   }
  //   rl.prompt(true);
  // });
}

Client.prototype.connect = function() {
  this.socket.on('welcome', (data) => {
    console_out('/////////////////');
    console_out(data.message);
    console_out('/////////////////');
    this.setUsername();
  });
}

Client.prototype.setUsername = function() {
  rl.question('Enter your username: ', (username) => {
    this.socket.emit('change_username', { username: username });
    this.username = username;
    this.promptInput();
    // this.connected = true;
    // this.setRoom();
    // this.chat();
    rl.prompt(true);
  });
}

Client.prototype.setRoom = function() {
  rl.question('Room: ', (room) => {
    this.socket.emit('change_room', { room: room });
    this.room = room;
    // rl.prompt(true);
  });
}

Client.prototype.promptInput = function() {
  rl.question(`(${this.username}): `, (input) => {
    this.send(input);
    rl.prompt(true);
  })
}

Client.prototype.send = function(msg) {
  this.socket.emit('chat message', msg);
  this.promptInput();
}

let newConnection = new Client();
newConnection.connect();


// socket.on('message', (data) => {
//     console.log(data);
//     // if (data.type === 'chat') {
//     //   console_out(`${data.username}: ${data.message}`);
//     // }
// });