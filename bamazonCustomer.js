var mysql = require('mysql');
var inquirer = require('inquirer');
var chalk = require('chalk');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon',
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt([{
            name: 'userChoice',
            type: 'list',
            message: 'Welcome the Amazon-like Store...!!!!',
            choices: ['BUY ITEMS', 'QUIT'],
        }, ])
        .then(function (answers) {
            if (answers.userChoice === 'BUY ITEMS') {
                buyItems();
            } else {
                console.log('User Has Quit');
                connection.end();
            }
        });
}

function buyItems() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('bAmazon Marketplace');
        for (var i = 0; i < res.length; i++) {
            console.log(
                'Item ID: ' +
                chalk.bold.blue(res[i].item_id) +
                ' || Product: ' +
                chalk.bold.blue(res[i].product_name));
        }
        itemSearch();
    });
}

function itemSearch() {
    inquirer
        .prompt([{
                name: 'item',
                type: 'input',
                message: 'Enter the ID of the Product You Would Like to Buy!',
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How Many Would Like to Buy!',
            },
        ])
        .then(function (answer) {
            var itemId = answer.item;
            var stockNeeded = answer.quantity;
            makePurchase(itemId, stockNeeded);
        });
}

function makePurchase(itemId, stockNeeded) {
    // console.log(itemId);
    // console.log(stockNeeded);
    connection.query(
        'SELECT * FROM products WHERE item_id = ' + itemId,
        function (error, res) {
            if (error) {
                console.log(error);
            }
            if (stockNeeded <= res[0].stock_quantity) {
                var newStock = parseInt(res[0].stock_quantity) - parseInt(stockNeeded);
                var totalPrice = (parseInt(stockNeeded) * parseInt(res[0].price));
                console.log(chalk.bold.green('Placing Your Order!' + '\nTotal Cost for You: $' + totalPrice + '\n*************************'));
                connection.query(
                    'UPDATE products SET stock_quantity = ' + newStock + ' WHERE item_id = ' + itemId,
                    function (error, res) {
                        if (error) {
                            console.log(error);
                        }
                    });
                start();
            } else {
                console.log(chalk.bold.red('Insufficient Quantity!\n*************************'));
                start();
            }
        });
}