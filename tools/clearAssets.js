/**
 * 清除上次的编译输出文件
 */

const fs = require('fs');
const path = require('path');
const config = require('../configs/config');

function rmFile(filePath) {
  try {
    fs.accessSync(filePath, fs.F_OK);
    fs.unlinkSync(path.join(config.projectPath, filePath));
  } catch (e) {
    // do nothing
  }
};

function clearAssets(assetsMap) {
  let data;
  try {
    data = require(assetsMap);
  } catch (e) {
    return;
  }

  const entries = data["entries"];
  const assets = data["assets"];

  // del js, css
  Object.keys(entries).forEach(key => {
    rmFile(entries[key]["js"]);
    rmFile(entries[key]["css"]);
  });

  // del assets
  assets.forEach(asset => rmFile(asset.path));

}

module.exports = clearAssets;

if (!module.parent) {
  clearAssets(path.join(config.projectPath, 'assetsMap.json'));
}