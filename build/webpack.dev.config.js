
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var style = new ExtractTextPlugin('css/vueditor.min.css');

module.exports = {

  context: __dirname,

  entry: {
    vueditor: ['webpack-hot-middleware/client?path=/__webpack_hmr', '../src/js/main.js']
  },

  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].min.js',
    library: 'Vueditor',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(css|less)$/, loader: style.extract('style-loader', 'css!less!postcss') },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },

  vue: {
    loaders: {
      css: style.extract('style-loader', 'css!postcss'),
      less: style.extract('style-loader', 'css!less!postcss')
    }
  },

  postcss: function () {
    return [autoprefixer];
  },

  plugins: [
    style,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'develop'
      }
    })
  ],

  externals: {
    config: 'VueditorConfig',
    vue: 'Vue',
    vuex: 'Vuex'
  }

};