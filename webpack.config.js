/**
 * Created by wboll on 2016/5/26.
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const components = new ExtractTextPlugin('components.css', {allChunks: true});
const common = new ExtractTextPlugin('style.css');

module.exports = {

  entry: {
    vueditor: './src/js/main.js',
    style: './src/less/style.less'
  },

  output: {
    publicPath: '',
    path: path.join(__dirname, './build'),
    filename: '[name].js',
    chunkFilename: 'asdf.js'
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css!autoprefixer' },
      { test: /\.less$/, loader: common.extract('style-loader', 'css!less') },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },

  vue: {
    loaders: {
      css: components.extract('style!css!autoprefixer'),
      less: components.extract('style-loader', 'css!less!autoprefixer')
    }
  },

  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },

  plugins: [
    components,
    common
  ]

};