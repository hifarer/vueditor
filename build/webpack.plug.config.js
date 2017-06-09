
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const pkg = require('../package.json');
const banner = pkg.name + ' v' + pkg.version + '\n' + pkg.repository.url;

module.exports = {

  context: __dirname,

  watch: true,

  entry: '../src/plugins/emoji.vue',

  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: 'js/emoji.min.js',
    library: 'emoji',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.(css|less)$/, loader: 'stylecss!less!postcss' },
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
    return [autoprefixer({remove: false})];
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.BannerPlugin(banner),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
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