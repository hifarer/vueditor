
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {

  context: __dirname,

  watch: true,

  entry: {
    vueditor: ['webpack-hot-middleware/client?path=/__webpack_hmr', '../src/main.js']
  },

  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].min.js',
    library: 'Vueditor',
    libraryTarget: 'umd',
    umdNamedDefine: true
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

  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue',
    },
    vuex: {
      commonjs: 'vuex',
      commonjs2: 'vuex',
      amd: 'vuex',
      root: 'Vuex',
    }
  }

};