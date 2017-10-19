/**
 * @file webpack config
 * @author zdying
 */
'use strict';

var path = require('path');
var WebpackCopyPlugin = require('webpack-copy-plugin');

module.exports = {
  entry: {
    index: './src/scripts/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [
              require.resolve('babel-plugin-add-module-exports'),
              require.resolve('babel-plugin-transform-decorators-legacy'),
              require.resolve('babel-plugin-transform-object-rest-spread')
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new WebpackCopyPlugin({
      dirs: [
          { from: 'src/web/views', to: 'dist' }
      ],
      options: {}
    })
  ]
};
