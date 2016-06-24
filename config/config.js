const path = require('path');

const projectPath = path.resolve(__dirname, '..');

module.exports = {
  projectPath,
  srcPath: `${projectPath}/src`,
  assetsPath: `${projectPath}/static`,
  libPath: `${projectPath}/src/lib`,
  modulePath: `${projectPath}/src/modules`,
};