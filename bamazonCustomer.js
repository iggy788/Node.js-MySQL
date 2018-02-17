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
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    console.log('we are connected');
    buyItems();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: 'buyOrSell',
            type: 'rawlist',
            message: 'Would you like to [BUY] something at B-Amazon or [SELL] an item at B-Amazon?',
            choices: ['BUY', 'SELL'],
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.buyOrSell.toUpperCase() === 'BUY') {
                buyItems();
            } else {
                sellItems();
            }
        });
}

function buyItems() {
    connection.query('SELECT item_id, product_name FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].item_id + ' || Product: ' + res[i].product_name);
            // connection.end();
        }
        itemSearch();
    });
}

function itemSearch() {
    inquirer
        .prompt({
            name: 'item',
            type: 'input',
            message: 'Enter the ID of the Product You Would Like to Buy!',
        })
        .then(function (answer) {
            var query = 'SELECT product_name, department_name FROM products WHERE ?';
            connection.query(query, {
                item_id: answer.item
            }, function (err, res) {
                // console.log(answer.item);
                for (var i = 0; i < res.length; i++) {
                    console.log(
                        'Product: ' +
                        res[i].product_name +
                        ' || Department: ' +
                        res[i].department_name
                    );
                }
                quantitySearch();
            });
        });
}

function quantitySearch() {
    inquirer
        .prompt({
            name: 'quantity',
            type: 'input',
            message: 'Enter Desired Quantity: ',
                    validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
            }
        }).then(function (answer) {
            if (answer.quantity === parseInt(4)) {
                console.log('Placing Your Order!');
            } else {
                console.log('Insufficient Quantity!');
            }
        });
}

// var query = 'SELECT stock_quantity FROM products WHERE ?';
// connection.query(
//   query,
//   {
//     stock_quantity: data.quantity,
//   },
//   function(err, res) {
//     // console.log(answer.item);
//     // for (var i = 0;i < res.length; i++) {
//       console.log(res.stock_quantity);
//     // }
//   }
// );