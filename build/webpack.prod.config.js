
const path = require('path')
const webpack = require('webpack')
const VueLoader = require('vue-loader')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
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
              'css-loader',
              'less-loader',
              'postcss-loader'
            ]
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'less-loader',
              'postcss-loader'
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

  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()]
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
