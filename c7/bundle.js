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

/***/ "./src/ecs/component.js":
/*!******************************!*\
  !*** ./src/ecs/component.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Component)\n/* harmony export */ });\nclass Component {\n    constructor() {\n        this.isDeleted = false;\n    }\n\n    delete() {\n        this.isDeleted = true;\n    }\n}\n\n//# sourceURL=webpack:///./src/ecs/component.js?");

/***/ }),

/***/ "./src/ecs/entity.js":
/*!***************************!*\
  !*** ./src/ecs/entity.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Entity)\n/* harmony export */ });\nclass Entity {\n    constructor() {\n        this.components = [];\n    }\n\n    attachComponents(...components) {\n        this.components = [...this.components, ...components];\n    }\n\n    deleteComponents() {\n        for(const component of this.components) {\n            component.delete();\n        }\n        this.components = [];\n    }\n}\n\n//# sourceURL=webpack:///./src/ecs/entity.js?");

/***/ }),

/***/ "./src/ecs/system.js":
/*!***************************!*\
  !*** ./src/ecs/system.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ System)\n/* harmony export */ });\nclass System {\n    constructor() {\n        this.components = [];\n    }\n\n    update() {\n        // nothing here for now\n    }\n\n    deleteStaleComponents() {\n        this.components = this.components.filter(x => !x.isDeleted);\n    }\n}\n\n//# sourceURL=webpack:///./src/ecs/system.js?");

/***/ }),

/***/ "./src/graphics/bodyGraphicsComponent.js":
/*!***********************************************!*\
  !*** ./src/graphics/bodyGraphicsComponent.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BodyGraphicsComponent)\n/* harmony export */ });\n/* harmony import */ var _ecs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/component */ \"./src/ecs/component.js\");\n\n\nclass BodyGraphicsComponent extends _ecs_component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(bodyComponent, initialColor) {\n        super();\n        this.bodyComponent = bodyComponent;\n        this.color = initialColor;\n    }\n}\n\n//# sourceURL=webpack:///./src/graphics/bodyGraphicsComponent.js?");

/***/ }),

/***/ "./src/graphics/graphicsSystem.js":
/*!****************************************!*\
  !*** ./src/graphics/graphicsSystem.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GraphicsSystem)\n/* harmony export */ });\n/* harmony import */ var _ecs_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/system */ \"./src/ecs/system.js\");\n/* harmony import */ var _bodyGraphicsComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bodyGraphicsComponent */ \"./src/graphics/bodyGraphicsComponent.js\");\n\n\nconst PIXI = window.PIXI;\n//import * as PIXI from \"pixi.js\";\n\nclass GraphicsSystem extends _ecs_system__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super();\n        this.parentElement = document.getElementById(\"pixi-root\");\n        this.width = 640;\n        this.height = 360;\n        this.app = new PIXI.Application({width: this.width, height: this.height});\n        this.parentElement.appendChild(this.app.view);\n        this.graphics = new PIXI.Graphics();\n        this.app.stage.addChild(this.graphics);\n    }\n\n    update() {\n        this.graphics.clear();\n        for(const component of this.components) {\n            this.graphics.beginFill(component.color);\n            this.graphics.drawCircle(component.bodyComponent.position.x, component.bodyComponent.position.y, component.bodyComponent.radius);\n        }\n    }\n\n    createGraphicsComponent(bodyComponent) {\n        let graphicsComponent = new _bodyGraphicsComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](bodyComponent, randomColor());\n        this.components.push(graphicsComponent);\n        return graphicsComponent;\n    }\n}\n\n\n\nfunction randomColor() {\n    let red = Math.floor(Math.random()*256);\n    let green = Math.floor(Math.random()*256);\n    let blue = Math.floor(Math.random()*256);\n    return (red << 16) + (green << 8) + blue;\n}\n\n\n//# sourceURL=webpack:///./src/graphics/graphicsSystem.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mainloop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mainloop.js */ \"../node_modules/mainloop.js/build/mainloop.min.js\");\n/* harmony import */ var mainloop_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mainloop_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _physics_physicsSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./physics/physicsSystem */ \"./src/physics/physicsSystem.js\");\n/* harmony import */ var _graphics_graphicsSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphics/graphicsSystem */ \"./src/graphics/graphicsSystem.js\");\n/* harmony import */ var _ecs_entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ecs/entity */ \"./src/ecs/entity.js\");\n\n\n\n\n\nlet physicsSystem = new _physics_physicsSystem__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nlet graphicsSystem = new _graphics_graphicsSystem__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\ncreateBouncingBall();\n\n\nmainloop_js__WEBPACK_IMPORTED_MODULE_0__.setUpdate((delta) => {\n    const deltaInSecs = delta / 1000;\n    physicsSystem.update(deltaInSecs);\n    graphicsSystem.update();\n    physicsSystem.deleteStaleComponents();\n    graphicsSystem.deleteStaleComponents();\n});\n\nmainloop_js__WEBPACK_IMPORTED_MODULE_0__.start();\n\nfunction createBouncingBall() {\n    let entity = new _ecs_entity__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n    let bodyComponent = physicsSystem.createBodyComponent(50,50);\n    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);\n    entity.attachComponents(bodyComponent, graphicsComponent);\n    window.foo = entity;\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/physics/bodyComponent.js":
/*!**************************************!*\
  !*** ./src/physics/bodyComponent.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BodyComponent)\n/* harmony export */ });\n/* harmony import */ var _ecs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/component */ \"./src/ecs/component.js\");\n/* harmony import */ var _vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vec2 */ \"./src/vec2.js\");\n\n\n\nclass BodyComponent extends _ecs_component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(posX, posY) {\n        super();\n        this.position = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](posX, posY);\n        this.velocity = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](200, 0);\n        this.acceleration = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0, 500);\n        this.radius = 50;\n    }\n}\n\n//# sourceURL=webpack:///./src/physics/bodyComponent.js?");

/***/ }),

/***/ "./src/physics/physicsSystem.js":
/*!**************************************!*\
  !*** ./src/physics/physicsSystem.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PhysicsSystem)\n/* harmony export */ });\n/* harmony import */ var _ecs_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/system */ \"./src/ecs/system.js\");\n/* harmony import */ var _bodyComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bodyComponent */ \"./src/physics/bodyComponent.js\");\n\n\n\nclass PhysicsSystem extends _ecs_system__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super();\n    }\n\n    update(delta) {\n        for(const component of this.components) {\n            component.velocity = component.velocity.add(component.acceleration.scale(delta));\n            component.position = component.position.add(component.velocity.scale(delta));\n        }\n    }\n\n    createBodyComponent(posX, posY) {\n        const component = new _bodyComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](posX, posY);\n        this.components.push(component);\n        return component;\n    }\n}\n\n//# sourceURL=webpack:///./src/physics/physicsSystem.js?");

/***/ }),

/***/ "./src/vec2.js":
/*!*********************!*\
  !*** ./src/vec2.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Vec2)\n/* harmony export */ });\nclass Vec2 {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n        Object.freeze(this);\n    }\n\n    add(otherVec) {\n        return new Vec2(this.x + otherVec.x, this.y + otherVec.y);\n    }\n\n    subtract(otherVec) {\n        return new Vec2(this.x - otherVec.x, this.y - otherVec.y);\n    }\n\n    scale(scalar) {\n        return new Vec2(scalar * this.x, scalar * this.y);\n    }\n\n    magnitude() {\n        return Math.sqrt((this.x * this.x) + (this.y * this.y));\n        // return Math.sqrt(this.dot(this));    // equivalent to the line above\n    }\n\n    normalize() {\n        let magnitude = this.magnitude();\n        return new Vec2(this.x / magnitude, this.y / magnitude);\n    }\n\n    dot(otherVector) {\n        return this.x * otherVector.x + this.y * otherVector.y;\n    }\n\n}\n\n//# sourceURL=webpack:///./src/vec2.js?");

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