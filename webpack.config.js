require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const dev = process.env.NODE_ENV !== 'production';

const libraryName = 'MiniOwm';

module.exports = {
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.json'],
  },
  entry: path.join(__dirname, 'src/MiniOwm.ts'),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `${libraryName}.js`,
    library: libraryName,
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  mode: dev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'babel-loader',
      }
    ]
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
