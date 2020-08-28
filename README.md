# guter-block

![guter-block](https://user-images.githubusercontent.com/20719170/91578198-240e7380-e94a-11ea-8a73-e69be4f9a39d.jpg)

![GitHub](https://img.shields.io/github/license/sedeg/guter-block)
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/sedeg/guter-block)
![GitHub top language](https://img.shields.io/github/languages/top/sedeg/guter-block)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sedeg/guter-block)

guter-block is a Node CLI that creates an opinionated boilerplate for building consistent Gutenberg blocks as a wordpress plugin.

⚠️ **Before you start make sure you have Node and NPM installed**

## Getting Started

- Clone this repo in any directory.

- Open a terminal, navigate to your guter-block directory and run `npm link`.  
   This will set a symlink and make the CLI command `guter-block` globally available.
- Navigate to the plugins directory of your wordpress project.  
   Create an new directory with your plugin name e.g. _my-gutenberg-block_ and change into it.
- to create your biolerplate run `guter-block`  
   the Node CLI guides you through the setup and prompt you some options

## Options

| Option                 | Value  | Description                                                                                            |
| ---------------------- | ------ | ------------------------------------------------------------------------------------------------------ |
| prefix                 | string | Used to prefix your custom gutenberg block. Choose an unique one to avoid conflicts with other blocks. |
| block name             | string | Name of your custom gutenberg block.                                                                   |
| name                   | string | Your name. Used for the author field within the package.json.                                          |
| Add default .gitignore | Yes/No | If yes, a default .gitignore is added to your project.                                                 |
| Install npm packages   | Yes/No | If yes, the most common npm packages to build custom gutenberg blocks will be installed.               |

## Boilerplate

guter-block creates an initial boilerplate

```
|-- .babelrc
|-- .eslint
|-- .gitignore (optional)
|-- .prettierrc
|-- YourBlockName.php
|-- package.json
|-- webpack.config.js
|
|-- src
	|-- index.js
	|-- styles
	|	|-- _common.scss
	|	|-- style.scss
	|	|-- editor.scss
	|
	|-- templates
		|-- your-block-name.php
```

## Building your Gutenberg Block

### npm scripts

- `npm start`  
   Start watch mode for for development
- `npm run build`  
   Start optimized compiling for production

### Javascript

- Edit your block logic in `/src/index.js`

### Attributes

- Edit the attributes array within the `register_block_type()` method in `YourBlockName.php` and make your block attributes available

```

register_block_type(
	'prefix/your-block-name,
	[
		'editor_style' => 'prefix-your-block-name-be',
		'editor_script' => 'prefix-your-block-name-js',
		'attributes' => [],
		'render_callback' => [$this, 'renderCallback']
	]
);

```

### Template

- Edit your frontend template in `/templates/your-block-name.php`

### Styles

- Edit your block-editor styles in `/src/styles/editor.scss`
- Edit your block-frontend styles in `/src/styles/style.scss`
- If you need common styles for editor and frontend, use `/src/styles/_common.scss` which is imported by editor.scss and style.scss

### Activate Gutenberg Block

Log in to your wordpress backend, go to plugins and activate your gutenberg block plugins

## What's included

- [prettier - An opinionated code formatter](https://prettier.io/)
  You can adapt the configuration to your needs in the file .prettierrc
- [eslint - Pluggable JavaScript linter](https://eslint.org/)
  You can adapt the configuration to your needs in the file .eslint
- [babel - The compiler for next generation JavaScript](https://babeljs.io/)
  You can adapt the configuration to your needs in the file .babelrc
- [webpack - module bundler](https://webpack.js.org/)
  You can adapt the configuration to your needs in the file webpack.config.js
- [postcss - a tool for transforming CSS with JavaScript](https://postcss.org/)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [wordpress packages](https://developer.wordpress.org/block-editor/packages/)
  - @wordpress/block-editor - to create and use standalone block editors
  - @wordpress/blocks - consistent Wordpress API
  - @wordpress/components - library of generic WordPress components
  - @wordpress/compose - collection of handy Hooks and Higher Order Components
  - @wordpress/data - tools to manage data within and between distinct modules
  - @wordpress/eslint-plugin - eslint configurations and custom rules
  - @wordpress/scripts - collection of reusable scripts

## ✌️happy coding
