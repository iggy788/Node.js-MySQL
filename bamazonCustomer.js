var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'bamazon',
});

inquirer
  .prompt([
    {
      name: 'start',
      message: 'Ready to Buy Some Things?',
      type: 'confirm',
      default: true,
    },
  ])
  .then(game => {
    if (game.start) {
      connection.connect(function(err) {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        connection.end();
        });
    }
    buyItems();
  });





function buyItems() {
inquirer
  .prompt([
    {
      name: 'postorbid',
      message: 'What would like to do?',
      type: 'list',
      choices: ['POST AN ITEM', 'BID ON AN ITEM'],
    },
  ])
  .then(function(answer) {
    if (answer.postorbid === 'POST AN ITEM') {
      // console.log('POST AN ITEM');
      inquirer
        .prompt([
          {
            name: 'name',
            message: 'What is your products name?',
            type: 'input',
          },
          {
            name: 'price',
            message: 'How you wanna charge?',
            type: 'input',
          },
        ])
        .then(function(post) {
          console.log('Product Name: ' + post.name);
          console.log('Product Price: ' + post.price);
        });
    } else {
      console.log('BID ON AN ITEM');
    }
  });
}