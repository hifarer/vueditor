
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {

  context: __dirname,

  entry: {
    test: ['../src/js/test.js']
  },

  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].min.js',
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(css|less)$/, loader: 'style!css!less!postcss' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192' }
    ]
  },

  vue: {
    loaders: {
      css: 'style!css!postcss',
      less: 'style!css!less!postcss'
    }
  },

  postcss: function () {
    return [autoprefixer];
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ],

  resolve: {
    alias: {
      'vue': 'vue/dist/vue.min.js',
      'vuex': 'vuex/dist/vuex.min.js'
    }
  }

};