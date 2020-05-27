require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const dev = process.env.NODE_ENV !== 'production';

const libraryName = 'miniOwm';

const sharedConfig = {
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.json'],
  },
  entry: path.join(__dirname, 'src/index.ts'),
  devtool: 'source-map',
  mode: dev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
      }
    ]
  }
};

module.exports = {
  ...sharedConfig,
  output: {
    path: path.join(__dirname, 'lib'),
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  plugins: dev
    ? [
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        inject: 'head',
        templateParameters: {
          'apiKey': process.env.API_KEY
        }
      })
    ]
    : []
};
