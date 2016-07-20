const Express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const program = require('commander');

const config = require('../config');
const varConfig = require('../config/config');

const clearAssets = require('./tools/clearAssets');
clearAssets(path.join(varConfig.projectPath, 'assetsMap.json'));

// Initialize the Express App
const app = new Express();

function collect(val, memo) {
  if (!/^(js|lib|scss)$/i.test(val)) {
    throw new Error('params must be one of [js lib scss]');
  }
  memo.push(val);
  return memo;
}

// 处理命令行参数
program
  .version('0.0.1')
  .usage('[options] [entry ...]')
  .option('-t, --type <type>', 'select type', collect, [])
  .parse(process.argv);

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