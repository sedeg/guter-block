import inquirer from 'inquirer';

export default function promptOption() {
  const questions = [
    {
      type: 'input',
      name: 'prefix',
      message: 'Enter your block prefix?',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your block prefix.';
        }
      }
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter your block name?',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your block name.';
        }
      }
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter your name?',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter author name.';
        }
      }
    },
    {
      type: 'confirm',
      name: 'gitignore',
      message: 'Add default .gitignore?'
    },
    {
      type: 'confirm',
      name: 'pckgs',
      message: 'Install npm packages?'
    }
  ];
  return inquirer.prompt(questions);
}
