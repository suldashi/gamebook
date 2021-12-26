/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mainloop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mainloop.js */ \"../node_modules/mainloop.js/build/mainloop.min.js\");\n/* harmony import */ var mainloop_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mainloop_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vec2 */ \"./src/vec2.js\");\nconst PIXI = window.PIXI;\r\n\r\n\r\n\r\nlet gravity = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0,500);\r\nlet velocity = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](150,0);\r\nlet position = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](100,0);\r\n\r\nconst gameWidth = 640;\r\nconst gameHeight = 360;\r\n\r\nconst rectWidth = 200;\r\nconst rectHeight = 100;\r\nlet rectColor = randomColor();\r\nconst app = new PIXI.Application({ width: gameWidth, height: gameHeight });\r\ndocument.getElementById(\"pixi-root\").appendChild(app.view);\r\nconst obj = new PIXI.Graphics();\r\napp.stage.addChild(obj);\r\n\r\nmainloop_js__WEBPACK_IMPORTED_MODULE_0__.setUpdate((delta) => {\r\n    const deltaInSecs = delta / 1000;\r\n    velocity = velocity.add(gravity.scale(deltaInSecs));\r\n    position = position.add(velocity.scale(deltaInSecs));\r\n    if(position.x + rectWidth >= gameWidth) {\r\n        /*\r\n            If the right side of the body moves past the right side of the game area,\r\n            move it back and reverse its horizontal direction of movement\r\n        */\r\n        let diff = position.x + rectWidth - gameWidth;\r\n        position = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](position.x - diff, position.y);\r\n        velocity = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](-velocity.x, velocity.y);\r\n        rectColor = randomColor();\r\n    }\r\n    if(position.x <= 0) {\r\n        /* \r\n            If the left side of the body moves past the left side of the game area,\r\n            move it back and reverse its horizontal direction of movement\r\n        */\r\n        let diff = position.x;\r\n        position = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](position.x + diff, position.y);\r\n        velocity = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](-velocity.x, velocity.y);\r\n        rectColor = randomColor();\r\n    }\r\n    if(position.y + rectHeight > gameHeight) {\r\n        /*\r\n            If the bottom side of the body moves below the bottom of the game area,\r\n            move it back and change its vertical direction of movement\r\n        */\r\n        let diff = position.y + rectHeight - gameHeight;\r\n        position = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](position.x, position.y - 2 * diff);\r\n        velocity = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](velocity.x, -velocity.y);\r\n        rectColor = randomColor();\r\n    }\r\n    obj.clear();\r\n    obj.beginFill(rectColor);\r\n    obj.drawRect(position.x, position.y, rectWidth, rectHeight);\r\n});\r\n\r\nmainloop_js__WEBPACK_IMPORTED_MODULE_0__.start();\r\n\r\nfunction randomColor() {\r\n    let red = Math.floor(Math.random()*256);\r\n    let green = Math.floor(Math.random()*256);\r\n    let blue = Math.floor(Math.random()*256);\r\n    return (red << 16) + (green << 8) + blue;\r\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/vec2.js":
/*!*********************!*\
  !*** ./src/vec2.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Vec2)\n/* harmony export */ });\nclass Vec2 {\r\n    constructor(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n        Object.freeze(this);\r\n    }\r\n\r\n    add(otherVec) {\r\n        return new Vec2(this.x + otherVec.x, this.y + otherVec.y);\r\n    }\r\n\r\n    subtract(otherVec) {\r\n        return new Vec2(this.x - otherVec.x, this.y - otherVec.y);\r\n    }\r\n\r\n    scale(scalar) {\r\n        return new Vec2(scalar * this.x, scalar * this.y);\r\n    }\r\n\r\n    magnitude() {\r\n        return Math.sqrt((this.x * this.x) + (this.y * this.y));\r\n        // return Math.sqrt(this.dot(this));    // equivalent to the line above\r\n    }\r\n\r\n    normalize() {\r\n        let magnitude = this.magnitude();\r\n        return new Vec2(this.x / magnitude, this.y / magnitude);\r\n    }\r\n\r\n    dot(otherVector) {\r\n        return this.x * otherVector.x + this.y * otherVector.y;\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack:///./src/vec2.js?");

/***/ }),

/***/ "../node_modules/mainloop.js/build/mainloop.min.js":
/*!*********************************************************!*\
  !*** ../node_modules/mainloop.js/build/mainloop.min.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**\n * mainloop.js 1.0.3-20170529\n *\n * @author Isaac Sukin (http://www.isaacsukin.com/)\n * @license MIT\n */\n\n!function(a){function b(a){if(x=q(b),!(a<e+l)){for(d+=a-e,e=a,t(a,d),a>i+h&&(f=g*j*1e3/(a-i)+(1-g)*f,i=a,j=0),j++,k=0;d>=c;)if(u(c),d-=c,++k>=240){o=!0;break}v(d/c),w(f,o),o=!1}}var c=1e3/60,d=0,e=0,f=60,g=.9,h=1e3,i=0,j=0,k=0,l=0,m=!1,n=!1,o=!1,p=\"object\"==typeof window?window:a,q=p.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),r=p.cancelAnimationFrame||clearTimeout,s=function(){},t=s,u=s,v=s,w=s,x;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/l},setMaxAllowedFPS:function(a){return\"undefined\"==typeof a&&(a=1/0),0===a?this.stop():l=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return t=a||t,this},setUpdate:function(a){return u=a||u,this},setDraw:function(a){return v=a||v,this},setEnd:function(a){return w=a||w,this},start:function(){return n||(n=!0,x=q(function(a){v(1),m=!0,e=a,i=a,j=0,x=q(b)})),this},stop:function(){return m=!1,n=!1,r(x),this},isRunning:function(){return m}}, true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (a.MainLoop),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :\n\t\t__WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}(this);\n//# sourceMappingURL=mainloop.min.js.map\n\n//# sourceURL=webpack:///../node_modules/mainloop.js/build/mainloop.min.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;