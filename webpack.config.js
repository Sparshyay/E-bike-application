const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('typescript');

  webpack.chainWebpack((config) => {
    // Additional webpack configurations if needed
    config.resolve.alias.set('@', resolve(__dirname, 'app'));
  });

  return webpack.resolveConfig();
};