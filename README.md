# 基于 webpack 的前端 workflow

## 目录结构

```
.
+-- src    // 页面源码
|   +-- <pageName>    // 页面
|   |   +--js
|   |   +--style
|   |   +--index.html
|   |   +--<name>.entry.js    // 脚本入口文件  
|   |   +--style.scss    // scss 入口文件
|   +-- <pageName1>
|   +-- <pageName...>
|   +-- <pageNameN>
+-- server    // 本地服务器
+-- config    // 项目配置
+-- modules    // 私有模块
+-- node_modules    // npm 模块
+-- static    // 构建输出
```
## 使用

```bash
  // 开发
  npm start [-- [<name>...]] 

  // 构建
  npm run build [-- [<name>...]]
```


