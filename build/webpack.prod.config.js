
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var style = new ExtractTextPlugin('css/vueditor.min.css');

var pkg = require('../package.json');
var banner = pkg.name + ' v' + pkg.version;
banner += '\nhttps://github.com/hifarer/Vueditor';


module.exports = {

  context: __dirname,

  entry: {
    vueditor: ['../src/js/main.js']
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
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.BannerPlugin(banner),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'production'
      }
    })
  ],

  externals: {
    config: 'VueditorConfig',
    vue: 'Vue',
    vuex: 'Vuex'
  }

};