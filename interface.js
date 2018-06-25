const readline = require('readline');
const socketio = require('socket.io-client');
const color = require('ansi-colors');

const rl = readline.createInterface(process.stdin, process.stdout);

const Client = function() {
  this.username = '';
  this.room = '';

  this.socket = socketio.connect(`http://localhost:3000/`);
  this.socket.on('message', (message) => this.console_out(message));
}

Client.prototype.init = function() {
  rl.question('Enter your username: ', (username) => {
    this.username = username;
    rl.question('Enter a room: ', (room) => {
      this.room = room;
      this.connect();
    });
  })
}

Client.prototype.console_out = function({ user, msg }) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(`(${user}): ${msg}`);
  rl.prompt(true);
}

Client.prototype.connect = function() {
  this.socket.emit('join', { username: this.username, room: this.room });
  this.promptInput();
}

Client.prototype.promptInput = function() {
  rl.question(`(${this.username}): `, (input) => {
    this.sendMessage(input);
    rl.prompt(true);
  })
}

Client.prototype.sendMessage = function(msg) {
  this.socket.emit('message', { user: this.username, msg: msg });
  this.promptInput();
}

let newConnection = new Client();
newConnection.init();
