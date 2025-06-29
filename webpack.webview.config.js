const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// Import the extension config object, not the array
const extensionConfig = require('./webpack.config.js')[0];

module.exports = [
  extensionConfig,
  {
    name: 'webview-ui',
    target: 'web',
    mode: 'none',
    entry: './src/webview-ui/index.tsx',
    output: {
      path: path.resolve(__dirname, 'media'),
      filename: 'main.js',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/webview-ui/index.html',
        filename: 'index.html',
        inject: 'body',
      }),
      new webpack.DefinePlugin({
        'process.env': '{}',
        'process': '{}',
      }),
    ],
    devtool: 'source-map',
  },
];
