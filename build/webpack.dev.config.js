
const path = require('path')
const webpack = require('webpack')
const VueLoader = require('vue-loader')
const HtmlwebpackPlugin = require('html-webpack-plugin')

module.exports = {

  mode: 'development',
  devtool: 'eval-source-map',
  entry: './src/main.js',

  output: {
    library: 'Vueditor',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
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
              'vue-style-loader',
              'css-loader?modules=true',
              'less-loader'
            ]
          },
          {
            use: [
              'vue-style-loader',
              'css-loader',
              'less-loader'
            ]
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      }
    ]
  },

  plugins: [
    new VueLoader.VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      inject: 'head',
      title: 'Vueditor',
      template: './src/template.html'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, '..'),
    disableHostCheck: true,
    compress: true,
    noInfo: true,
    hot: true,
    port: 9999
  },

  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  }

}
