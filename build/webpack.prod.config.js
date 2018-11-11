
const path = require('path')
const webpack = require('webpack')
const VueLoader = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pkg = require('../package.json')
const banner = pkg.name + ' v' + pkg.version + '\n' + pkg.repository.url

module.exports = {

  mode: 'production',
  entry: './src/main.js',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'vueditor.min.js',
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
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader?modules=true&minimize',
              'less-loader',
              'postcss-loader'
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader?minimize',
              'less-loader',
              'postcss-loader'
            ]
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
    new CopyWebpackPlugin([
      { from: './src/lang', to: './lang' }
    ]),
    new MiniCssExtractPlugin({
      filename: 'vueditor.min.css'
    }),
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
