/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	(function (doc, win) {
	  var docEle = doc.documentElement;
	  var evt = "onorientationchange" in window ? "orientationchange" : "resize",
	      fn = function fn() {
	    var width = Math.max(docEle.clientWidth, window.innerWidth || 0);
	    if (width) {
	      width = Math.min(width, 640);
	      docEle.style.fontSize = 20 * (width / 320) + "px";
	    }
	  };

	  win.addEventListener(evt, fn, false);
	  doc.addEventListener("DOMContentLoaded", fn, false);
	})(document, window);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(1);

	console.log('hello word!'); // 导入 进入点的宿主 html 和 style 依赖

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports) {

	
	module.exports = "/static/mobileBoilerplate/index.html" // content hash: 2a69c6e7a6f0f97154240e07158c38d0

/***/ }
/******/ ]);