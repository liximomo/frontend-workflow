const Express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
const varConfig = require('../config/config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// Initialize the Express App
const app = new Express();

// var jsonServer = require('json-server')
// var router = jsonServer.router('./mock/db.json');
//var middlewares = jsonServer.defaults();
//app.use(middlewares);
//app.use('/api', router);


// function startApp(cb) {
//   app.listen(8080, '0.0.0.0', (error) => {
//     cb(error, 8080);
//   });
// };

// export default startApp;

// parse command line params

let entryNames = null;
let params = process.argv.slice(2);
if (params.length > 0) {
  entryNames = params;
}

const webpackConfig = config(entryNames);

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'production') {
  compiler.run(function(err, stats) {
    if(err) throw new Error("webpack", err);
    console.log("[webpack]", stats.toString({
      colors: true
    }));
  });
  console.log()
  app.use(webpackConfig.output.publicPath, Express.static(varConfig.assetsPath));
} else {
  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/page', Express.static(path.resolve('src')));

app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error;
  }

  console.log('app is running on 0.0.0.0:8080');
});