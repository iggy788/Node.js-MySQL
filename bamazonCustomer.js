var mysql = require('mysql');
var inquirer = require('inquirer');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: '',
  database: 'bamazon',
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: 'buyOrSell',
      type: 'rawlist',
      message:
        'Would you like to [BUY] something at B-Amazon or [SELL] an item at B-Amazon?',
      choices: ['BUY', 'SELL'],
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.buyOrSell.toUpperCase() === 'BUY') {
        buyItems();
      } else {
        sellItems();
      }
    });
}

function buyItems() {
      connection.query('SELECT * FROM products', function(err, res) {
        // SELECT * is telling you to grab everything from the table
        // the table is FROM products
        // function(err, res) is the call back
        if (err) throw err;
          console.log(res);
        // console.log('\nProduct ID: ' + res.id + '\nProduct Name: ' + res.product_name);
        connection.end();
      });
    // console.log('ALRIGHT WHAT WOULD YOU LIKE TO BUY');
}

function sellItems() {
    console.log('SORRY WE DONT SELL THINGS FOR YOU');
}