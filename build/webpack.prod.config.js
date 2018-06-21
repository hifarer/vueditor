
const path = require('path')
const webpack = require('webpack')
const VueLoader = require('vue-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const pkg = require('../package.json')
const banner = pkg.name + ' v' + pkg.version + '\n' + pkg.repository.url

module.exports = {

  mode: 'production',
  entry: './src/main.js',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'script/vueditor.min.js',
    library: 'Vueditor',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: true,
            preserveWhitespace: false
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader?modules=true&minimize', 'less-loader']
            })
          },
          {
            use: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader?minimize', 'less-loader']
            })
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('style/vueditor.min.css'),
    new VueLoader.VueLoaderPlugin(),
    new webpack.BannerPlugin(banner)
  ],

  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  }

}
