const readline = require('readline');
const socketio = require('socket.io-client');
const color = require('ansi-colors');

const rl = readline.createInterface(process.stdin, process.stdout);

const Client = function() {
  this.username = '';
  this.room = '';
  this.color = '';

  this.socket = socketio.connect(`http://localhost:3000/`);
  this.socket.on('message', ({ user, msg, room }) => this.console_out(user, msg, room));
}

Client.prototype.init = function() {
  rl.question(`Enter your ${color.cyan('username')}: `, (username) => {
    this.username = username;
    rl.question(`Enter a ${color.red('room')}: `, (room) => {
      this.room = room;
      this.connect();
    });
  })
}

Client.prototype.console_out = function(user, msg, room = this.room) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  switch (user) {
    case 'Admin':
      console.log(`(${color.yellow(user)}): ${color.yellow(msg)} (${color.yellow('Room')}: ${color.red(room)})`);
      break;

    default:
      console.log(`(${color.green(user)}): ${color.green(msg)}`);
  }
  rl.prompt(true);
}

Client.prototype.connect = function() {
  this.socket.emit('join', { username: this.username, room: this.room });
  this.promptInput();
}

Client.prototype.promptInput = function() {
  rl.question(`(${color.cyan(this.username)}): `, (input) => {
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


/*

console.log('Which color would you like?');
      console.log(`${color.green('green')} / ${color.yellow('yellow')} / ${color.blue('blue')} / ${color.magenta('magenta')} / ${color.cyan('cyan')} / ${color.white('white')}`);
      rl.question('> ', (color) => {
        this.color = color;
        this.connect();
      });

*/