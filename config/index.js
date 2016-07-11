const glob = require('glob');
const merge = require('lodash/merge');
const assign = require('lodash/assign');
const last = require('lodash/last');
const path = require('path');
const fs = require('fs');

const config = require('./config');

let cfg = {};
let inculdes = [];
let constructMode = 'dev'; 

if (process.env.NODE_ENV === 'production') {
  cfg = require('./base.prod');
  constructMode = 'prod';
} else {
  cfg= require('./base.dev');
  inculdes = ['webpack-hot-middleware/client?reload=true'];
}

function addToSet(aSet, value) {
  const values = [].concat(value);
  values.forEach(v => {
    aSet.add(v);
  });
}

function getEntry(globPattern) {
  const entryFiles = glob.sync(globPattern);
  const entry = entryFiles.reduce((entries, filePath) => {
    const basename = path.basename(filePath);
    const entryName = basename.split('.')[0];
    entries[entryName] = inculdes.concat(filePath);
    return entries;
  }, {});
  return entry;
}

function genConfig(custom) {
  return assign({}, cfg, custom);
}

function getLibConfig(names) {
  const globPattern = names 
    ? `${config.srcPath}/**/+(${names.join('|')}).lib.js` 
    : `${config.srcPath}/**/*.lib.js`;

  const entry = getEntry(globPattern);
  return Object.keys(entry).reduce((cfgs, key) => {
    const output = {
      path: config.libPath,
      libraryTarget: 'var',
      filename: "[name].js",
      chunkFilename: '[name].chunk.js?[chunkhash]'
    }
    // 大写字母开头，有输出模块
    if (key[0] === key[0].toUpperCase()) {
      output.library = key;
    }

    const entryName = `${key[0].toLowerCase()}${key.slice(1)}`;

    cfgs.push(assign(
      {},
      require('./base.lib'),
      {
        entry: {
          [entryName]: entry[key]
        },
        output
      }
    ));
    return cfgs;
  }, []);
}


function getScssConfig(names) {
  const scssGlob = names 
    ? `${config.srcPath}/**/+(${names.join('|')}).entry.scss` 
    : `${config.srcPath}/**/*.entry.scss`;
  const entry = getEntry(scssGlob);
  return Object.keys(entry).reduce((cfgs, key) => {
    cfgs.push(assign(
      {},
      require('./base.scss'),
      {
        entry: {
          [key]: entry[key]
        }
      }
    ));
    return cfgs;
  }, []);
}

function getJsConfig(names) {
   const globPattern = names 
    ? `${config.srcPath}/**/+(${names.join('|')}).entry.js` 
    : `${config.srcPath}/**/*.entry.js`;
    return getConfig(getEntry(globPattern));
}

function getConfig(entry) {
  const configs = [];
  const customCfgs = [];
  const normalEntries = {};
  const delegated = new Set();

  // 处理进入点
  Object.keys(entry).forEach(key => {
    // 被委托， 不处理
    if (delegated.has(key)) {
      return;
    }

    // 最后一个作为进入点文件
    const entryPath = last(entry[key]);
    const customCfgFilePath = `${path.dirname(entryPath)}/webpack.config.${constructMode}.js`;
    if (isFileExist(customCfgFilePath)) {
      const customCfg = require(customCfgFilePath);
      
      // 被委托的进入点，忽略后续同名进入点的配置文件
      const delegetadEntry = customCfg.delegated || [];
      addToSet(delegated, delegetadEntry);

      // 定制插件
      if (customCfg.extraPlugins) {
        customCfg.plugins = cfg.plugins.concat(customCfg.extraPlugins);
        delete customCfg.extraPlugins;
      }

      customCfgs.push(assign(
        {},
        cfg,
        { 
          entry: {
            [key]: entry[key]
          }
        },
        customCfg
      ));
    } else {
      normalEntries[key] = entry[key];
    }
  });

  // 为没有定制配置的进入点配置一个 webpakc 实例
  if (Object.keys(normalEntries).length > 0) {
    customCfgs.unshift(genConfig({ entry: normalEntries }));
  }

  return customCfgs;
}

function isFileExist(filepath) {
  let isExist = true;
  try {
    // Query the entry
    stats = fs.lstatSync(filepath);
  } catch (e) {
    isExist = false;
  }
  return isExist;
}

const typeMap = {
  'scss': getScssConfig,
  'js': getJsConfig,
  'lib': getLibConfig
};

module.exports = function webpackCfg(names = null, types) {
  const _types = types.length ? types : ['js'];

  let cfgs = _types.reduce((cfgs, type) => {
    console.log('type: ', type, 'names: ', names);
    return cfgs.concat(typeMap[type](names));
  }, []);
  return cfgs;
};
