
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('../package.json');
const banner = pkg.name + ' v' + pkg.version + '\n' + pkg.repository.url;

module.exports = {

  context: __dirname,

  watch: true,

  entry: '../src/main.js',

  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: 'script/vueditor.min.js',
    library: 'Vueditor',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    rules: [
      {
        test: /\.vue$/, 
        use: [{
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            preserveWhitespace: false,
            postcss: [
              autoprefixer({
                browsers: ['last 3 versions']
              })
            ]
          }
        }], 
        exclude: /node_modules/
      },
      {
        test: /\.js$/, 
        use: 'babel-loader', 
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/, 
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader!postcss-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/, 
        use: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('style/vueditor.min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
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