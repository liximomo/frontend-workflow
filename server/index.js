const Express = require('express');
const path = require('path');
const webpack = require('webpack');
const config = require('../config');
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
const compiler = webpack(config);

if (process.env.NODE_ENV === 'production') {
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
} else {
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/page', Express.static(path.resolve('src')));

app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error;
  }

  console.log('app is running on 0.0.0.0:8080');
});