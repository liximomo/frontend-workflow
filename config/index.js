const glob = require('glob');
const merge = require('lodash/merge');
const path = require('path');
const config = require('./config');

let cfg = {};
let inculdes = [];

if (process.env.NODE_ENV === 'production') {
  cfg = require('./base.prod');
} else {
  cfg= require('./base.dev');
  inculdes = ['webpack-hot-middleware/client?reload=true'];
}



module.exports = function webpackCfg(names = null) {
  const globPattern = names 
    ? `${config.srcPath}/**/+(${names.join('|')}).entry.js` 
    : `${config.srcPath}/**/*.entry.js`;

  const entryFiles = glob.sync(globPattern);

  const entry = entryFiles.reduce((entries, filePath) => {
    const entryName = filePath.substring(
      filePath.lastIndexOf(path.sep)+1, 
      filePath.lastIndexOf('.') - '.entry'.length
    );
    entries[entryName] = inculdes.concat(filePath);
    return entries;
  }, {});

  const webpackCfg = merge(cfg, { entry });

  return webpackCfg;
};
