/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/compile/index.js":
/*!***********************************!*\
  !*** ./src/core/compile/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar compiler = function () {\n  function compiler(el, vm) {\n    _classCallCheck(this, compiler);\n\n    vm.$el = document.querySelector(el);\n    var frag = document.createDocumentFragment();\n    this.replace(vm.$el, vm);\n  }\n\n  _createClass(compiler, [{\n    key: 'replace',\n    value: function replace(frag, vm) {\n      var _this = this;\n\n      Array.from(frag.childNodes).forEach(function (node) {\n        var txt = node.textContent;\n        var reg = /\\{\\{(.*?)\\}\\}/g;\n        if (node.nodeType === 3 && reg.test(txt)) {\n          var arr = RegExp.$1.split('.');\n          var val = vm;\n          arr.forEach(function (key) {\n            val = val[key];\n          });\n          node.textContent = txt.replace(reg, val).trim();\n          vm.$watch(RegExp.$1, function (newVal) {\n            node.textContent = txt.replace(reg, newVal).trim();\n          });\n        }\n        if (node.nodeType === 1) {\n          var nodeAttr = node.attributes;\n          Array.from(nodeAttr).forEach(function (attr) {\n            var name = attr.name;\n            var exp = attr.value;\n            if (name.includes('v-')) {\n              var _arr = exp.split('.');\n              var _val = vm;\n              _arr.forEach(function (key) {\n                _val = _val[key];\n              });\n              node.value = _val;\n            }\n            // 监听变化\n            vm.$watch(exp, function (newVal) {\n              node.value = newVal;\n            });\n\n            node.addEventListener('input', function (e) {\n              var newVal = e.target.value;\n              var arr = exp.split('.');\n              var val = vm;\n              arr.forEach(function (key, i) {\n                if (i === arr.length - 1) {\n                  val[key] = newVal;\n                  return;\n                }\n                val = val[key];\n              });\n            });\n          });\n        }\n        if (node.childNodes && node.childNodes.length) {\n          _this.replace(node, vm);\n        }\n      });\n    }\n  }]);\n\n  return compiler;\n}();\n\nexports.default = compiler;\n\n//# sourceURL=webpack:///./src/core/compile/index.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _proxy = __webpack_require__(/*! ./instance/proxy */ \"./src/core/instance/proxy.js\");\n\nvar _proxy2 = _interopRequireDefault(_proxy);\n\nvar _init = __webpack_require__(/*! ./instance/init */ \"./src/core/instance/init.js\");\n\nvar _init2 = _interopRequireDefault(_init);\n\nvar _compile = __webpack_require__(/*! ./compile */ \"./src/core/compile/index.js\");\n\nvar _compile2 = _interopRequireDefault(_compile);\n\nvar _Watcher = __webpack_require__(/*! ./observer/Watcher */ \"./src/core/observer/Watcher.js\");\n\nvar _Watcher2 = _interopRequireDefault(_Watcher);\n\nvar _lifecycle = __webpack_require__(/*! ./instance/lifecycle */ \"./src/core/instance/lifecycle.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Wue = function Wue(options) {\n  _classCallCheck(this, Wue);\n\n  var vm = this;\n  vm.$options = options;\n  vm._data = vm.$options.data;\n  vm.$watch = function (key, cb) {\n    new _Watcher2.default(vm, key, cb);\n  };\n  (0, _init2.default)(vm);\n  for (var key in vm._data) {\n    (0, _proxy2.default)(vm, '_data', key);\n  }\n  (0, _lifecycle.callHook)(vm, 'created');\n  new _compile2.default(vm.$options.el, vm);\n  (0, _lifecycle.callHook)(vm, 'mounted');\n};\n\nexports.default = Wue;\n\n//# sourceURL=webpack:///./src/core/index.js?");

/***/ }),

/***/ "./src/core/instance/init.js":
/*!***********************************!*\
  !*** ./src/core/instance/init.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = initOptions;\n\nvar _observer = __webpack_require__(/*! ../observer */ \"./src/core/observer/index.js\");\n\nvar _observer2 = _interopRequireDefault(_observer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar LIFECYCLE_HOOKS = ['created', 'mounted'];\nfunction initOptions(vm) {\n  (0, _observer2.default)(vm._data);\n  LIFECYCLE_HOOKS.forEach(function (hook) {\n    vm.$options[hook] = vm.$options[hook] || function () {};\n  });\n}\n\n//# sourceURL=webpack:///./src/core/instance/init.js?");

/***/ }),

/***/ "./src/core/instance/lifecycle.js":
/*!****************************************!*\
  !*** ./src/core/instance/lifecycle.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.callHook = callHook;\nfunction callHook(vm, hook) {\n  var handlers = vm.$options[hook];\n  if (handlers) {\n    handlers.call(vm);\n  }\n}\n\n//# sourceURL=webpack:///./src/core/instance/lifecycle.js?");

/***/ }),

/***/ "./src/core/instance/proxy.js":
/*!************************************!*\
  !*** ./src/core/instance/proxy.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = proxy;\nfunction proxy(target, sourceKey, key) {\n  Object.defineProperty(target, key, {\n    configurable: true,\n    get: function proxyGetter() {\n      return target[sourceKey][key];\n    },\n    set: function proxySetter() {\n      target[sourceKey][key] = newVal;\n    }\n  });\n}\n\n//# sourceURL=webpack:///./src/core/instance/proxy.js?");

/***/ }),

/***/ "./src/core/observer/Watcher.js":
/*!**************************************!*\
  !*** ./src/core/observer/Watcher.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _dep = __webpack_require__(/*! ./dep */ \"./src/core/observer/dep.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Watcher = function () {\n  function Watcher(vm, expression, cb) {\n    _classCallCheck(this, Watcher);\n\n    this.vm = vm;\n    this.cb = cb;\n    this.expression = expression;\n    this.value = this.getVal();\n  }\n\n  _createClass(Watcher, [{\n    key: 'getVal',\n    value: function getVal() {\n      (0, _dep.pushTarget)(this);\n      var val = this.vm;\n      this.expression.split('.').forEach(function (key) {\n        val = val[key];\n      });\n      (0, _dep.popTarget)();\n      return val;\n    }\n  }, {\n    key: 'addDep',\n    value: function addDep(dep) {\n      dep.addSub(this);\n    }\n  }, {\n    key: 'update',\n    value: function update() {\n      var val = this.vm;\n      this.expression.split('.').forEach(function (key) {\n        val = val[key];\n      });\n      this.cb.call(this.vm, val);\n    }\n  }]);\n\n  return Watcher;\n}();\n\nexports.default = Watcher;\n\n//# sourceURL=webpack:///./src/core/observer/Watcher.js?");

/***/ }),

/***/ "./src/core/observer/dep.js":
/*!**********************************!*\
  !*** ./src/core/observer/dep.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.pushTarget = pushTarget;\nexports.popTarget = popTarget;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Dep = function () {\n  function Dep() {\n    _classCallCheck(this, Dep);\n\n    this.sub = [];\n  }\n\n  _createClass(Dep, [{\n    key: \"addDepend\",\n    value: function addDepend() {\n      Dep.target.addDep(this);\n    }\n  }, {\n    key: \"addSub\",\n    value: function addSub(sub) {\n      this.sub.push(sub);\n    }\n  }, {\n    key: \"notify\",\n    value: function notify() {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this.sub[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var sub = _step.value;\n\n          sub.update();\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator.return) {\n            _iterator.return();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }]);\n\n  return Dep;\n}();\n\nexports.default = Dep;\n\n\nDep.target = null;\nvar targetStack = [];\nfunction pushTarget(_target) {\n  // if (Dep.target) targetStack.push(Dep.target)\n  Dep.target = _target;\n}\n\nfunction popTarget() {\n  // Dep.target = targetStack.pop();\n  Dep.target = null;\n}\n\n//# sourceURL=webpack:///./src/core/observer/dep.js?");

/***/ }),

/***/ "./src/core/observer/index.js":
/*!************************************!*\
  !*** ./src/core/observer/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.default = observer;\n\nvar _dep = __webpack_require__(/*! ./dep */ \"./src/core/observer/dep.js\");\n\nvar _dep2 = _interopRequireDefault(_dep);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Observer = function () {\n  function Observer(value) {\n    _classCallCheck(this, Observer);\n\n    this.walk(value);\n  }\n\n  _createClass(Observer, [{\n    key: 'walk',\n    value: function walk(obj) {\n      var _this = this;\n\n      Object.keys(obj).forEach(function (key) {\n        if (_typeof(obj[key]) == 'object') {\n          _this.walk(obj[key]);\n        }\n        defineReactive(obj, key, obj[key]);\n      });\n    }\n  }]);\n\n  return Observer;\n}();\n\nvar defineReactive = function defineReactive(obj, key, value) {\n  var dep = new _dep2.default();\n  Object.defineProperty(obj, key, {\n    set: function set(newVal) {\n      if (newVal === value) {\n        return;\n      }\n      value = newVal;\n      dep.notify();\n    },\n    get: function get() {\n      if (_dep2.default.target) {\n        dep.addDepend();\n      }\n      return value;\n    }\n  });\n};\n\nfunction observer(value) {\n  return new Observer(value);\n}\n\n//# sourceURL=webpack:///./src/core/observer/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _index = __webpack_require__(/*! ./core/index */ \"./src/core/index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nwindow.Wue = _index2.default;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });