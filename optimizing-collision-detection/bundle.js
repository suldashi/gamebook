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

/***/ "./src/collision/collisionComponent.js":
/*!*********************************************!*\
  !*** ./src/collision/collisionComponent.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CollisionComponent)\n/* harmony export */ });\n/* harmony import */ var _ecs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/component */ \"./src/ecs/component.js\");\n\n\nclass CollisionComponent extends _ecs_component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(bodyComponent, collisionTag) {\n        super();\n        this.bodyComponent = bodyComponent;\n        this.collisionTag = collisionTag;\n        this.collisionCallbacks = {}\n        this.cells = [];\n    }\n\n    setCollisionCallback(targetCollisionTag, callback) {\n        this.collisionCallbacks[targetCollisionTag] = callback;\n    }\n\n    clearCells() {\n        this.cells = [];\n    }\n\n    addCell(cellKey) {\n        this.cells.push(cellKey);\n    }\n}\n\n//# sourceURL=webpack:///./src/collision/collisionComponent.js?");

/***/ }),

/***/ "./src/collision/collisionSystem.js":
/*!******************************************!*\
  !*** ./src/collision/collisionSystem.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CollisionSystem)\n/* harmony export */ });\n/* harmony import */ var _ecs_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/system */ \"./src/ecs/system.js\");\n/* harmony import */ var _collisionComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collisionComponent */ \"./src/collision/collisionComponent.js\");\n\n\n\nclass CollisionSystem extends _ecs_system__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super();\n    }\n\n    update() {\n        const cells = {};\n        const checkedPairs = {};\n        const collisions = [];\n\n        for(let i = 0; i < this.components.length; i++) {\n            this.components[i].clearCells();\n            let collisionCells = calculateCells(this.components[i].bodyComponent);\n            for(let cellKey of collisionCells) {\n                if(!cells[cellKey]) {\n                    cells[cellKey] = [];\n                }\n                cells[cellKey].push(this.components[i]);\n                this.components[i].addCell(cellKey);\n            }\n        }\n        \n        // iterate over all cells, then check for collisions between each pair within that cell\n        for(let cell of Object.values(cells)) {\n            for(let i = 0; i < cell.length - 1; i++) {\n                for(let j = i + 1; j < cell.length; j++) {\n                    // only check if we haven't checked this pair already\n                    if(!(checkedPairs[`${cell[i].id}|${cell[j].id}]`])) {\n                        if(checkOverlap(cell[i].bodyComponent, cell[j].bodyComponent)) {\n\n                            /*  Add this pair to the checkedPairs array so we don't check it again.\n                                Both orientations need to be added to the array so that we don't\n                                miss collisions between the same pair of bodies caused by differences\n                                in the order of bodies in a cell. */\n                            checkedPairs[`${cell[i].id}|${cell[j].id}`] = checkedPairs[`${cell[j].id}|${cell[i].id}`] = true;\n    \n                            if(cell[i].collisionCallbacks[cell[j].collisionTag]) {\n                                collisions.push(cell[i].collisionCallbacks[cell[j].collisionTag]);\n                            }\n                            if(cell[j].collisionCallbacks[cell[i].collisionTag]) {\n                                collisions.push(cell[j].collisionCallbacks[cell[i].collisionTag]);\n                            }\n                        }\n                    }\n                }\n            }\n        }\n\n        for(let collisionInstance of collisions) {\n            collisionInstance();\n        }\n    }\n\n    createCollisionComponent(bodyComponent, collisionTag) {\n        let collisionComponent = new _collisionComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](bodyComponent, collisionTag);\n        this.components.push(collisionComponent);\n        return collisionComponent;\n    }\n}\n\nfunction calculateCells(bodyComponent) {\n    const cellSize = 150;\n    const xCells = [];\n    const yCells = [];\n    const calculatedCells = [];\n\n    let maxX = Math.ceil((bodyComponent.position.x + bodyComponent.width)/cellSize)*cellSize;\n    let maxY = Math.ceil((bodyComponent.position.y + bodyComponent.height)/cellSize)*cellSize;\n\n    for(let x = bodyComponent.position.x; x <= maxX; x+=cellSize) {\n        xCells.push(Math.floor(x/cellSize)*cellSize);\n    }\n\n    for(let y = bodyComponent.position.y; y <= maxY; y+=cellSize) {\n        yCells.push(Math.floor(y/cellSize)*cellSize);\n    }\n    \n    for(let i = 0;i<xCells.length;i++) {\n        for(let j = 0;j<yCells.length;j++) {\n            calculatedCells.push(`${xCells[i]}|${yCells[j]}`);\n        }\n    }\n\n    return calculatedCells;\n}\n\nfunction checkOverlap(b1, b2) {\n    if (b1.position.x + b1.width < b2.position.x ||\n        b1.position.x > b2.position.x + b2.width ||\n        b1.position.y + b1.height < b2.position.y ||\n        b1.position.y > b2.position.y + b2.height) {\n        return false;\n    }\n    return true;\n}\n\n//# sourceURL=webpack:///./src/collision/collisionSystem.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst config = {\n    width: 640,\n    height: 360,\n    rootElementId: 'pixi-root'\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/ecs/component.js":
/*!******************************!*\
  !*** ./src/ecs/component.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Component)\n/* harmony export */ });\nclass Component {\n    constructor() {\n        this.id = crypto.randomUUID();\n        this.isDeleted = false;\n    }\n\n    delete() {\n        this.isDeleted = true;\n    }\n}\n\n//# sourceURL=webpack:///./src/ecs/component.js?");

/***/ }),

/***/ "./src/ecs/entity.js":
/*!***************************!*\
  !*** ./src/ecs/entity.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Entity)\n/* harmony export */ });\nclass Entity {\n    constructor() {\n        this.id = crypto.randomUUID();\n        this.components = [];\n    }\n\n    attachComponents(...components) {\n        this.components = [...this.components, ...components];\n    }\n\n    deleteComponents() {\n        for(const component of this.components) {\n            component.delete();\n        }\n        this.components = [];\n    }\n}\n\n//# sourceURL=webpack:///./src/ecs/entity.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BodyGraphicsComponent)\n/* harmony export */ });\n/* harmony import */ var _ecs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/component */ \"./src/ecs/component.js\");\n\n\nclass BodyGraphicsComponent extends _ecs_component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(bodyComponent) {\n        super();\n        this.bodyComponent = bodyComponent;\n        this.setRandomColor();\n    }\n\n    setColor(red, green, blue) {\n        this.color = rgb(red, green, blue);\n    }\n\n    setRandomColor() {\n        this.color = randomColor();\n    }\n}\n\nfunction randomColor() {\n    let red = Math.floor(Math.random()*256);\n    let green = Math.floor(Math.random()*256);\n    let blue = Math.floor(Math.random()*256);\n    return rgb(red, green, blue);\n}\n\nfunction rgb(red, green, blue) {\n    return (red << 16) + (green << 8) + blue;\n}\n\n//# sourceURL=webpack:///./src/graphics/bodyGraphicsComponent.js?");

/***/ }),

/***/ "./src/graphics/collisionCellRenderingComponent.js":
/*!*********************************************************!*\
  !*** ./src/graphics/collisionCellRenderingComponent.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CollisionCellRenderingComponent)\n/* harmony export */ });\n/* harmony import */ var _ecs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/component */ \"./src/ecs/component.js\");\n\n\nclass CollisionCellRenderingComponent extends _ecs_component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(collisionComponent) {\n        super();\n        this.collisionComponent = collisionComponent;\n    }\n}\n\n//# sourceURL=webpack:///./src/graphics/collisionCellRenderingComponent.js?");

/***/ }),

/***/ "./src/graphics/graphicsSystem.js":
/*!****************************************!*\
  !*** ./src/graphics/graphicsSystem.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GraphicsSystem)\n/* harmony export */ });\n/* harmony import */ var _ecs_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/system */ \"./src/ecs/system.js\");\n/* harmony import */ var _bodyGraphicsComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bodyGraphicsComponent */ \"./src/graphics/bodyGraphicsComponent.js\");\n/* harmony import */ var _collisionCellRenderingComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./collisionCellRenderingComponent */ \"./src/graphics/collisionCellRenderingComponent.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ \"./src/config.js\");\nconst PIXI = window.PIXI;\n//import * as PIXI from \"pixi.js\";\n\n\n\n\n\nconst textPool = [];\nconst poolSize = 32;\n\nfor(var i=0;i<poolSize;i++) {\n    textPool.push(new PIXI.Text(\"TEMP\",{\n        fill: \"0xffffff\",\n        fontSize: 36\n    }));\n}\n\nclass GraphicsSystem extends _ecs_system__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super();\n        this.parentElement = document.getElementById(_config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].rootElementId);\n        this.width = _config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].width;\n        this.height = _config__WEBPACK_IMPORTED_MODULE_3__[\"default\"].height;\n        this.app = new PIXI.Application({width: this.width, height: this.height});\n        this.parentElement.appendChild(this.app.view);\n        this.graphics = new PIXI.Graphics();\n        this.textContainer = new PIXI.Container();\n        this.app.stage.addChild(this.graphics);\n        this.app.stage.addChild(this.textContainer);\n    }\n\n    update() {\n        let cells = {};\n        this.graphics.clear();\n        this.textContainer.removeChildren();\n        for(const component of this.components) {\n            if(component instanceof _bodyGraphicsComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"]) {\n                this.graphics.beginFill(component.color);\n                this.graphics.drawRect(component.bodyComponent.position.x, component.bodyComponent.position.y, component.bodyComponent.width, component.bodyComponent.height);\n            }\n            else if(component instanceof _collisionCellRenderingComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"]) {\n                for(let cell of component.collisionComponent.cells) {\n                    if(!cells[cell]) {\n                        cells[cell] = 0;\n                    }\n                    cells[cell]++;\n                }\n            }\n        }\n        const cellDimension = 150;\n        let poolIndex = 0;\n        for(const cellKey of Object.keys(cells)) {\n            if(poolIndex < poolSize) {\n                const [x,y] = cellKey.split(\"|\").map(val => parseInt(val));\n                const text = textPool[poolIndex++];\n                text.text = cells[cellKey];\n                text.x = x + cellDimension/2;\n                text.y = y + cellDimension/2;\n                text.anchor.set(0.5);\n                this.graphics.beginFill(\"0xffffff\", 0.3);\n                this.graphics.drawRect(x, y, cellDimension, cellDimension);\n                this.textContainer.addChild(text);\n            }\n        }\n    }\n\n    createGraphicsComponent(bodyComponent) {\n        let graphicsComponent = new _bodyGraphicsComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](bodyComponent);\n        this.components.push(graphicsComponent);\n        return graphicsComponent;\n    }\n\n    createCollisionCellRenderingComponent(collisionComponent) {\n        let graphicsComponent = new _collisionCellRenderingComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"](collisionComponent);\n        this.components.push(graphicsComponent);\n        return graphicsComponent;\n    }\n}\n\n\n//# sourceURL=webpack:///./src/graphics/graphicsSystem.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mainloop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mainloop.js */ \"../node_modules/mainloop.js/build/mainloop.min.js\");\n/* harmony import */ var mainloop_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mainloop_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _input_keyboardInputSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input/keyboardInputSystem */ \"./src/input/keyboardInputSystem.js\");\n/* harmony import */ var _physics_physicsSystem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./physics/physicsSystem */ \"./src/physics/physicsSystem.js\");\n/* harmony import */ var _graphics_graphicsSystem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphics/graphicsSystem */ \"./src/graphics/graphicsSystem.js\");\n/* harmony import */ var _collision_collisionSystem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./collision/collisionSystem */ \"./src/collision/collisionSystem.js\");\n/* harmony import */ var _ecs_entity__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ecs/entity */ \"./src/ecs/entity.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n/* harmony import */ var _vec2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./vec2 */ \"./src/vec2.js\");\n\n\n\n\n\n\n\n\n\n\nlet keyboardInputSystem = new _input_keyboardInputSystem__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nlet physicsSystem = new _physics_physicsSystem__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\nlet graphicsSystem = new _graphics_graphicsSystem__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nlet collisionSystem = new _collision_collisionSystem__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\n\ncreateFoodRectangle(randomInt(0, _config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].width), randomInt(0, _config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].height));\ncreatePoisonRectangle(randomInt(0, _config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].width), randomInt(0, _config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].height));\ncreatePlayerRectangle(_config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].width / 2, _config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].height / 2);\n\n\nmainloop_js__WEBPACK_IMPORTED_MODULE_0__.setUpdate((delta) => {\n    const deltaInSecs = delta / 1000;\n    keyboardInputSystem.update();\n    physicsSystem.update(deltaInSecs);\n    collisionSystem.update(deltaInSecs);\n\n    keyboardInputSystem.deleteStaleComponents();\n    physicsSystem.deleteStaleComponents();\n    collisionSystem.deleteStaleComponents();\n}).setDraw(() => {\n    graphicsSystem.update();\n    \n    graphicsSystem.deleteStaleComponents();\n});\n\nmainloop_js__WEBPACK_IMPORTED_MODULE_0__.start();\n\nfunction createPlayerRectangle(posX, posY) {\n    let entity = new _ecs_entity__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n    let bodyComponent = physicsSystem.createBodyComponent(posX, posY);\n    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);\n    let keyboardInputComponent = keyboardInputSystem.createKeyboardInputComponent(bodyComponent);\n    let collisionComponent = collisionSystem.createCollisionComponent(bodyComponent, \"player\");\n    let cellRenderComponent = graphicsSystem.createCollisionCellRenderingComponent(collisionComponent);\n    collisionComponent.setCollisionCallback(\"food\", () => {\n        bodyComponent.width += 20;\n        bodyComponent.height += 20;\n        bodyComponent.position = new _vec2__WEBPACK_IMPORTED_MODULE_7__[\"default\"](bodyComponent.position.x - 10, bodyComponent.position.y - 10);\n    });\n    collisionComponent.setCollisionCallback(\"poison\", () => {\n        bodyComponent.width -= 20;\n        bodyComponent.height -= 20;\n        bodyComponent.position = new _vec2__WEBPACK_IMPORTED_MODULE_7__[\"default\"](bodyComponent.position.x + 10, bodyComponent.position.y + 10);\n    });\n    graphicsComponent.setColor(255, 0, 0);\n    entity.attachComponents(bodyComponent, graphicsComponent, keyboardInputComponent, collisionComponent, cellRenderComponent);\n}\n\nfunction createFoodRectangle(posX, posY) {\n    let entity = new _ecs_entity__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n    let bodyComponent = physicsSystem.createBodyComponent(posX, posY);\n    bodyComponent.width = 30;\n    bodyComponent.height = 30;\n    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);\n    let collisionComponent = collisionSystem.createCollisionComponent(bodyComponent, \"food\");\n    let cellRenderComponent = graphicsSystem.createCollisionCellRenderingComponent(collisionComponent);\n    collisionComponent.setCollisionCallback(\"player\", () => {\n        bodyComponent.position = new _vec2__WEBPACK_IMPORTED_MODULE_7__[\"default\"](randomInt(0,_config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].width), randomInt(0,_config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].height));\n    });\n    graphicsComponent.setColor(0, 255, 0);\n    entity.attachComponents(bodyComponent, graphicsComponent, collisionComponent, cellRenderComponent);\n}\n\nfunction createPoisonRectangle(posX, posY) {\n    let entity = new _ecs_entity__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n    let bodyComponent = physicsSystem.createBodyComponent(posX, posY);\n    bodyComponent.width = 30;\n    bodyComponent.height = 30;\n    let graphicsComponent = graphicsSystem.createGraphicsComponent(bodyComponent);\n    let collisionComponent = collisionSystem.createCollisionComponent(bodyComponent, \"poison\");\n    let cellRenderComponent = graphicsSystem.createCollisionCellRenderingComponent(collisionComponent);\n    collisionComponent.setCollisionCallback(\"player\", () => {\n        bodyComponent.position = new _vec2__WEBPACK_IMPORTED_MODULE_7__[\"default\"](randomInt(0,_config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].width), randomInt(0,_config__WEBPACK_IMPORTED_MODULE_6__[\"default\"].height));\n    });\n    graphicsComponent.setColor(255, 255, 0);\n    entity.attachComponents(bodyComponent, graphicsComponent, collisionComponent, cellRenderComponent);\n}\n\nfunction randomInt(lowerBoundInclusive = 0, upperBoundInclusive = 100) {\n    return Math.floor(lowerBoundInclusive + Math.random() * (upperBoundInclusive + 1 - lowerBoundInclusive));\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/input/keyboardInputComponent.js":
/*!*********************************************!*\
  !*** ./src/input/keyboardInputComponent.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ KeyboardInputComponent)\n/* harmony export */ });\n/* harmony import */ var _ecs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/component */ \"./src/ecs/component.js\");\n\n\nclass KeyboardInputComponent extends _ecs_component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(bodyComponent) {\n        super();\n        this.bodyComponent = bodyComponent;\n    }\n}\n\n//# sourceURL=webpack:///./src/input/keyboardInputComponent.js?");

/***/ }),

/***/ "./src/input/keyboardInputSystem.js":
/*!******************************************!*\
  !*** ./src/input/keyboardInputSystem.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ KeyboardInputSystem)\n/* harmony export */ });\n/* harmony import */ var _ecs_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/system */ \"./src/ecs/system.js\");\n/* harmony import */ var _vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vec2 */ \"./src/vec2.js\");\n/* harmony import */ var _keyboardInputComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keyboardInputComponent */ \"./src/input/keyboardInputComponent.js\");\n\n\n\n\nclass KeyboardInputSystem extends _ecs_system__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super();\n        this.up = false;\n        this.down = false;\n        this.left = false;\n        this.right = false;\n        window.onkeydown = (event) => {\n            if(event.code === \"KeyW\") {\n                this.up = true;\n            }\n            else if(event.code === \"KeyS\") {\n                this.down = true;\n            }\n            else if(event.code === \"KeyA\") {\n                this.left = true;\n            }\n            else if(event.code === \"KeyD\") {\n                this.right = true;\n            }\n        };\n        window.onkeyup = (event) => {\n            if(event.code === \"KeyW\") {\n                this.up = false;\n            }\n            else if(event.code === \"KeyS\") {\n                this.down = false;\n            }\n            else if(event.code === \"KeyA\") {\n                this.left = false;\n            }\n            else if(event.code === \"KeyD\") {\n                this.right = false;\n            }\n        };\n    }\n\n    update() {\n        for(const component of this.components) {\n            let horVelocity = 0;\n            let verVelocity = 0;\n            let velocityValue = 200;\n            if(this.left && !this.right) {\n                horVelocity = -velocityValue;\n            }\n            else if(!this.left && this.right) {\n                horVelocity = velocityValue;\n            }\n            if(this.up && !this.down) {\n                verVelocity = -velocityValue;\n            }\n            else if(!this.up && this.down) {\n                verVelocity = velocityValue;\n            }\n            component.bodyComponent.velocity = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](horVelocity, verVelocity);\n        }\n    }\n\n    createKeyboardInputComponent(bodyComponent) {\n        const component = new _keyboardInputComponent__WEBPACK_IMPORTED_MODULE_2__[\"default\"](bodyComponent);\n        this.components.push(component);\n        return component;\n    }\n}\n\n//# sourceURL=webpack:///./src/input/keyboardInputSystem.js?");

/***/ }),

/***/ "./src/physics/bodyComponent.js":
/*!**************************************!*\
  !*** ./src/physics/bodyComponent.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BodyComponent)\n/* harmony export */ });\n/* harmony import */ var _ecs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/component */ \"./src/ecs/component.js\");\n/* harmony import */ var _vec2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vec2 */ \"./src/vec2.js\");\n\n\n\nclass BodyComponent extends _ecs_component__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(posX, posY) {\n        super();\n        this.position = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](posX, posY);\n        this.velocity = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0, 0);\n        this.acceleration = new _vec2__WEBPACK_IMPORTED_MODULE_1__[\"default\"](0, 0);\n        this.width = 100;\n        this.height = 100;\n    }\n}\n\n//# sourceURL=webpack:///./src/physics/bodyComponent.js?");

/***/ }),

/***/ "./src/physics/physicsSystem.js":
/*!**************************************!*\
  !*** ./src/physics/physicsSystem.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PhysicsSystem)\n/* harmony export */ });\n/* harmony import */ var _ecs_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ecs/system */ \"./src/ecs/system.js\");\n/* harmony import */ var _bodyComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bodyComponent */ \"./src/physics/bodyComponent.js\");\n\n\n\nclass PhysicsSystem extends _ecs_system__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor() {\n        super();\n    }\n\n    update(delta) {\n        for(const component of this.components) {\n            component.prevPosition = component.position;\n            component.velocity = component.velocity.add(component.acceleration.scale(delta));\n            component.position = component.position.add(component.velocity.scale(delta));\n        }\n    }\n\n    createBodyComponent(posX, posY) {\n        const component = new _bodyComponent__WEBPACK_IMPORTED_MODULE_1__[\"default\"](posX, posY);\n        this.components.push(component);\n        return component;\n    }\n}\n\n//# sourceURL=webpack:///./src/physics/physicsSystem.js?");

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