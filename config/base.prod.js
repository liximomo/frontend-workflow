const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
//const PathRewriterPlugin = require('webpack-path-rewriter');
const webpack = require('webpack');

const config = require('./config');

const baseCfg = {
  // devtool: 'cheap-module-eval-source-map',

  output: {
    path: config.assetsPath,
    filename: "[name]_[hash].js",
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
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

  postcss: function () {
    return [autoprefixer({ browsers: ['> 0% in CN', 'IE 8'], outputStyle: 'expanded'})];
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // new PathRewriterPlugin({
    //   pathRegExp: /(src|href)\s*=\s*"(.*?\.[\w\d]{1,6})"/,
    //   pathMatchIndex: 2,
    //   pathReplacer: '[1]="[path]"',
    //   includeHash: true,
    // }),
    new AssetsPlugin({
      filename: 'assetsMap.json',
      prettyPrint: true
    }),
  ]

}

module.exports =  baseCfg;