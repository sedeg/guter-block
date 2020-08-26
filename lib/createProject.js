import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import replace from 'replace-in-file';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

export default async function createProject(options) {
  const getCases = name => {
    const parts = name.split(' ');
    let camel = '';

    for (const part of parts) {
      camel += part.charAt(0).toUpperCase() + part.slice(1);
    }

    const names = {
      default:
        name
          .trim()
          .charAt(0)
          .toUpperCase() + name.slice(1),
      kebab: name
        .toLowerCase()
        .split(' ')
        .join('-'),
      camel: camel
    };
    return names;
  };

  const copyTemplateFiles = async options => {
    return copy(options.templateDirectory, options.targetDirectory, {
      clobber: false
    });
  };

  const copyGitIgnore = async options => {
    return copy(options.gitIgnorePath, options.targetDirectory, {
      clobber: false
    });
  };

  const replacePlaceholders = async options => {
    const names = getCases(options.name);
    const renameFiles = [
      {
        type: 'camel',
        path: options.targetDirectory + '/',
        name: 'Block',
        ext: '.php'
      },
      {
        type: 'kebab',
        path: options.targetDirectory + '/templates/',
        name: 'block',
        ext: '.php'
      }
    ];

    const replaceOptions = {
      files: [
        options.targetDirectory + '/src/index.js',
        options.targetDirectory + '/templates/block.php',
        options.targetDirectory + '/Block.php',
        options.targetDirectory + '/package.json'
      ],
      from: [
        /###prefix###/g,
        /###name###/g,
        /###nameK###/g,
        /###nameC###/g,
        /###author###/g
      ],
      to: [
        options.prefix,
        names.default,
        names.kebab,
        names.camel,
        options.author
      ]
    };

    try {
      const results = await replace(replaceOptions);
      for (const file of renameFiles) {
        const name = file.type === 'camel' ? names.camel : names.kebab;
        fs.rename(
          `${file.path}${file.name}${file.ext}`,
          `${file.path}${name}${file.ext}`,
          error => {
            if (error) console.log('Error occurred: %s', chalk.red.bold(error));
          }
        );
      }
    } catch (error) {
      console.log('Error occurred: %s', chalk.red.bold(error));
    }
  };

  const tasks = new Listr([
    {
      title: 'Create boilerplate',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Set block parameter',
      task: () => replacePlaceholders(options)
    },
    {
      title: 'add .gitignore',
      task: () => copyGitIgnore(options),
      enabled: () => options.gitignore
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory
        }),
      enabled: () => options.pckgs
    }
  ]);

  options = {
    ...options,
    targetDirectory: process.cwd()
  };

  const currentFileUrl = import.meta.url;

  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../template'
  );

  const gitIgnorePath = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../git/.gitignore'
  );

  options.templateDirectory = templateDir;
  options.gitIgnorePath = gitIgnorePath;

  await tasks.run();
  console.log('%s happy coding', chalk.green.bold('DONE'));
  return true;
}
