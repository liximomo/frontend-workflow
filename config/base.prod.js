const path = require('path');
const AssetsPlugin = require('../modules/assets-webpack-plugin');
const PathRewriterPlugin = require('webpack-path-rewriter');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

const webpack = require('webpack');

const config = require('./config');

const baseCfg = {
  // devtool: 'cheap-module-eval-source-map',

  output: {
    path: config.assetsPath,
    //filename: "js/[name]_[chunkhash].js",
    filename: "js/[name].js",
    publicPath: '/static/'
  },
  
  externals: {
    "jquery": "jQuery"
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        include:[
          config.srcPath,
          config.modulePath
        ],
        loader: 'babel'
      },
      {
        test:   /\.s?css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!resolve-url!sass?sourceMap')
      },
      { 
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /fonts/,
        include:[
          config.srcPath
        ],
        loader: `url?limit=10000&name=[path][name].[ext]&context=${config.srcPath}` 
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
        include: /fonts/,
        loader: 'file?name=fonts/[name].[ext]'
      }
      // {
      //   test: /\.html$/,
      //   loader: PathRewriterPlugin.rewriteAndEmit({
      //     name: '[path][name].html',
      //     context: config.srcPath
      //   })
      // }
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
      config.modulePath,
      `${config.projectPath}/pageShare/style`,
      `${config.projectPath}/node_modules/bootstrap-sass/assets/stylesheets`
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
    //   pathRegExp: /(<script|<link)(.*?)data-rewrite\s*=\s*"(.*?\.[\w\d]{1,6})"(.*?)(src|href)\s*=\s*"(.*?\.[\w\d]{1,6})"/,
    //   pathMatchIndex: 3,
    //   pathReplacer: '[1][2][4][5]="[path]"',
    //   includeHash: true,
    // }),
    new ExtractTextPlugin("css/[name].css"),
    new AssetsPlugin({
      filename: 'assetsMap.json',
      prettyPrint: true,
      update: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        //drop_console: true
      }
    }),
  ]

}

module.exports =  baseCfg;