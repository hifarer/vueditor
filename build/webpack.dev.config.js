
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
    rules: [
      {
        test: /\.vue$/, 
        loader: 'vue-loader', 
        exclude: /node_modules/, 
        options: {
          extractCSS: true,
          preserveWhitespace: false,
          postcss: [
            autoprefixer({
              browsers: ['last 3 versions']
            })
          ]
        }
      },
      {
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/, 
        loader: ExtractTextPlugin.extract({
          use: 'css-loader!less-loader!postcss-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/, 
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
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