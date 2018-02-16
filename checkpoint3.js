var inquirer = require('inquirer');
var Admin = require('/admin');

inquirer
  .prompt([
    {
      name: 'userChoice',
      type: 'list',
      message: 'Welcome to Student Admin 6400. Please make a selection',
      choices: ['Add Student', 'Display Roster', 'QUIT'],
    },
  ])
  .then(function(answers) {
    if (answers.userChoice === 'Add Student') {
      console.log('add');
      start();
    } else if (answers.userChoice === 'Display Roster') {
      console.log('display');
      start();
    } else {
      console.log('quit');
    }
  });

start();

function addStudent() {
  inquirer
    .prompt([
      {
        name: 'StudentName',
        type: 'input',
        message: 'Enter Student Name',
      },
      {
        name: 'studentGrade',
        type: 'input',
        message: 'Enter Student Grade',
      },
    ])
    .then(function(answers) {
      admin.addStudent(answers.addStudent);
    });
}

function displayStudent() {}
