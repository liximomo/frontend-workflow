const Express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const program = require('commander');

const config = require('../config');
const varConfig = require('../config/config');

// Initialize the Express App
const app = new Express();

// 处理命令行参数
program
  .version('0.0.1')
  .usage('[options] [entry ...]')
  .option('-t, --type <type>', 'select type', /^(bundle|lib)$/i, 'bundle')
  .parse(process.argv);

// console.log("type: %j", program.type);
// console.log('args: %j', program.args);

let entryNames = null;
if (program.args.length > 0) {
  entryNames = program.args;
}

const webpackConfig = config(entryNames, program.type);

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'production') {
  compiler.run(function(err, stats) {
    if(err) throw new Error("webpack", err);
    console.log("[webpack]", stats.toString({
      colors: true
    }));
  });
  //app.use(varConfig.publicPath, Express.static(varConfig.assetsPath));
} else {
  app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: varConfig.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(varConfig.publicPath, Express.static(varConfig.assetsPath));
app.use('/page', Express.static(path.resolve('src')));

app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error;
  }

  console.log('app is running on 0.0.0.0:8080');
});