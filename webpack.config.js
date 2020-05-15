const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.jsx',
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		publicPath: '',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			}, {
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
						},
					},
				],
				include: /\.module\.css$/,
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
				exclude: /\.module\.css$/,
			}, {
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif|ttf)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
		new CopyPlugin([
			{
				from: '**/*.php',
				// to: 'dist/',
				context: 'src/',
				transformPath(targetPath) {
					return targetPath.toLocaleLowerCase();
				},
			},
		]),
	],
	devtool: 'sourcemap',
	optimization: {
		usedExports: true,
		splitChunks: {
			chunks: 'all',
		},
	},
	mode: 'development',
	devServer: {
		hot: true,
		host: '0.0.0.0',
		// port: 8080,
		disableHostCheck: true,
		proxy: [{
			context: ['**'],
			target: 'http://jswm.jswm-webpack.dev.lan/',
			changeOrigin: true,
		}],
	},
};
