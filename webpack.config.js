const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config.json');

let plugins = [];
let entryPoints = {
	frontend: [
		'./assets/src/frontend/main.js',
		'./assets/src/scss/frontend.scss',
	],
};

plugins.push(new MiniCssExtractPlugin({
	filename: "../css/[name].css"
}));

plugins.push(new BrowserSyncPlugin({
	proxy: config.proxyURL
}));

plugins.push(new VueLoaderPlugin());

module.exports = (env, argv) => {
	let isDevelopment = argv.mode !== 'production';

	return {
		entry: entryPoints,
		output: {
			"path": path.resolve(__dirname, 'assets/js'),
			"filename": '[name].js'
		},
		devtool: isDevelopment ? 'eval-source-map' : false,
		module: {
			"rules": [
				{
					"test": /\.js$/,
					"exclude": /node_modules/,
					"use": {
						"loader": "babel-loader",
						"options": {
							presets: ['@babel/preset-env']
						}
					}
				},
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					"test": /\.scss$/,
					"use": [
						{
							loader: isDevelopment ? "vue-style-loader" : MiniCssExtractPlugin.loader
						},
						{
							loader: "css-loader",
							options: {
								sourceMap: isDevelopment,
								importLoaders: 1
							}
						},
						{
							loader: "postcss-loader",
							options: {
								sourceMap: isDevelopment,
								plugins: () => [autoprefixer()],
							},
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: isDevelopment,
								includePaths: ['./node_modules'],
							},
						}
					]
				},
				{
					test: /\.(png|je?pg|gif|svg|eot|ttf|woff|woff2)$/,
					use: [{loader: 'file-loader'}],
				},
			]
		},
		optimization: {
			minimizer: [
				new TerserPlugin(),
				new OptimizeCSSAssetsPlugin({})
			]
		},
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@': path.resolve('./assets/src/'),
			},
			modules: [
				path.resolve('./node_modules'),
				path.resolve(path.join(__dirname, 'assets/src/')),
			],
			extensions: ['*', '.js', '.vue', '.json']
		},
		"plugins": plugins
	}
};
