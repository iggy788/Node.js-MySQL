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
            message: 'Welcome to Student Admin 6400. Please make a selection',
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

// item_id, product_name, price, stock_quantity
function buyItems() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('bAmazon Marketplace');
        for (var i = 0; i < res.length; i++) {
            console.log(
                'Item ID: ' +
                chalk.blue(res[i].item_id) +
                ' || Product: ' +
                res[i].product_name +
                ' || Price: $' +
                res[i].price +
                ' || Quantity Left: ' +
                res[i].stock_quantity);
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
            connection.query('SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?',
                {
                item_id: answer.item,
                },
                function (err, res) {
                // console.log(answer.item);
                for (var i = 0; i < res.length; i++) {
                    var stock = res[i].stock_quantity;
                    console.log(
                        'Product: ' +
                        res[i].product_name +
                        ' || Department: ' +
                        res[i].department_name +
                        ' || Quantity Left: ' + stock
                        // res[i].stock_quantity
                    );
                }
                inquirer
                    .prompt({
                        name: 'quantity',
                        type: 'input',
                        message: 'Enter Desired Quantity: ',
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }).then(function (data) {
                        console.log(chalk.magenta('>> Quantity Wanting to Buy: ' + data.quantity));
                        console.log(chalk.magenta('>> Quantity Left: ' + stock));
                        console.log(chalk.cyanBright('>> Item ID: ' + answer.item));
                        if (data.quantity < stock) {
                            connection.query('UPDATE products SET ? WHERE ?',
                                [
                                    {
                                        stock_quantity: data.quantity,
                                    },
                                    {
                                        item_id: answer.item,
                                    },
                                ],
                                function (err, res) {
                                    // if (error) throw err;
                                    // console.log(answer.item);
                                    console.log(chalk.bold.green('Placing Your Order!'));
                                    console.log(chalk.bold.magenta('>> Quantity Left: ' + stock));
                                    console.log(chalk.bold.green('****************'));
                                    start();
                                }
                            );
                        } else {
                            console.log(chalk.bold.red('Insufficient Quantity!'));
                            console.log(chalk.yellow('>> Quantity Left: ' + stock));
                            console.log(chalk.bold.red('****************'));
                            start();
                        }
                    });
            });
        });
}

// function quantitySearch() {
//     inquirer
//         .prompt({
//             name: 'quantity',
//             type: 'input',
//             message: 'Enter Desired Quantity: ',
//             validate: function (value) {
//                 if (isNaN(value) === false) {
//                     return true;
//                 }
//                 return false;
//             }
//         }).then(function (answer) {
//             if (answer.quantity <= res[i].stock_quantity) {
//                 var query = 'UPDATE products, SET ? WHERE ?';
//                 connection.query(
//                     query, [{
//                             stock_quantity: answer.quantity,
//                         },
//                         {
//                             item_id: answer.item,
//                         },
//                     ],
//                     function (err, res) {
//                         if (error) throw err;
//                         console.log(answer.item);
//                         console.log(chalk.green('Placing Your Order!'));
//                         console.log('****************');
//                         start();
//                     }
//                 );
//             } else {
//                 console.log(chalk.red('Insufficient Quantity!'));
//                 console.log('****************');
//                 start();
//             }
//         });
// }

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