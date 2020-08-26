import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import promptOptions from './lib/inquirer';
import createProject from './lib/createProject';

clear();

console.log(
  chalk.yellow(figlet.textSync('guter Block', { horizontalLayout: 'full' }))
);

module.exports = {
  run: async () => {
    const options = await promptOptions();
    await createProject(options);
  }
};
