
var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.dev.config.js');

var compiler = webpack(webpackConfig);

var app = express();

app.use(express.static(path.join(__dirname, '../')));

app.use(webpackDevMiddleware(compiler, {
  // public path should be the same with webpack config
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

app.use(webpackHotMiddleware(compiler));

app.listen(8888);