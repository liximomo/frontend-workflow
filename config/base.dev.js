const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const config = require('./config');

const baseCfg = {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: config.assetsPath,
    filename: "[name].js",
    publicPath: '/static/'
  },
  
  module: {
    loaders: [
      {
        test: /\.js?$/,
        include: /src/,
        loader: 'babel'
      },
      {
        test:   /\.s?css$/,
        loader: ('style-loader!css-loader!sass-loader')
      },
      {
        test: /\.html$/,
        loader: ''
      }
    ]
  },

  resolve: {
    root: [
      // 模块路径 待定
      config.modulePath
    ]
  },

  sassLoader: {
    includePaths: [
      //path.resolve(__dirname, "./node_modules/bootstrap-sass/assets/stylesheets")
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    }),

    // enable hot module replacement
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin({
      filename: 'assetsMap.json',
      prettyPrint: true
    }),
    // function() {
    //   this.plugin("done", function(stats) {
    //     require("fs").writeFileSync(
    //       path.join(__dirname, '..', "stats.json"),
    //       JSON.stringify(stats.toJson()));
    //   });
    // }
  ]

}

module.exports =  baseCfg;