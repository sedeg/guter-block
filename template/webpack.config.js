const defaultConfig = require('./node_modules/@wordpress/scripts/config/webpack.config.js');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = () => ({
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), 'src', 'index.js'),
		style: path.resolve(process.cwd(), 'src/styles', 'style.scss'),
		editor: path.resolve(process.cwd(), 'src/styles', 'editor.scss')
	},

	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer()]
						}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		...defaultConfig.plugins,
		new IgnoreEmitPlugin(['editor.js', 'style.js']),
		new MiniCssExtractPlugin({ filename: '[name].css' })
	]
});
