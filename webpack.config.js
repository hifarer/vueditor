/**
 * Created by wboll on 2016/5/26.
 */

var path = require('path');

module.exports = {

  entry: './build/entry.js',

  output: {
    publicPath: '',
    path: path.join(__dirname, './dist'),
    filename: 'vueditor.js'
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css!autoprefixer' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },

  vue: {
    loaders: {
      css: 'style!css!autoprefixer'
    }
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }

};