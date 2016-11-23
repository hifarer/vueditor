
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.config.js');

webpack(webpackConfig, (err, stats) => {
  if(err) throw err;
});