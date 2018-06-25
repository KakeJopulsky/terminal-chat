const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your username: ', (username) => {
  console.log(`Username is ${username}`);
  rl.close();
});