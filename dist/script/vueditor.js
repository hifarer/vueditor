(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("vuex"));
	else if(typeof define === 'function' && define.amd)
		define(["vue", "vuex"], factory);
	else if(typeof exports === 'object')
		exports["Vueditor"] = factory(require("vue"), require("vuex"));
	else
		root["Vueditor"] = factory(root["Vue"], root["Vuex"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  beforeCreate: function beforeCreate() {
    var name = this.$parent.namespace || this.$parent.$parent.namespace;
    this.mstates = name ? this.$store.state[name] : this.$store.state;
    this.mpath = name ? name + '/' : '';
  }
};
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultLang = {

  app: {
    noStore: 'Vueditor can not been initialized without Vuex store when using as a component, Please check your Vue Instance!'
  },

  removeFormat: { title: 'Remove format' },

  bold: { title: 'Bold' },
  italic: { title: 'Italic' },
  underline: { title: 'Underline' },
  strikeThrough: { title: 'Strike through' },

  superscript: { title: 'Superscript' },
  subscript: { title: 'Subscript' },
  indent: { title: 'Indent' },
  outdent: { title: 'Outdent' },

  justifyLeft: { title: 'Justify left' },
  justifyCenter: { title: 'Justify center' },
  justifyRight: { title: 'Justify right' },
  justifyFull: { title: 'Justify full' },

  insertOrderedList: { title: 'Insert ordered list' },
  insertUnorderedList: { title: 'Insert unordered list' },

  color: {
    foreColor: 'Text color',
    backColor: 'Background color',
    ok: 'ok',
    colorCode: 'Color code',
    invalidColorCodeMsg: 'Please enter the correct color code'
  },
  fontName: {},
  fontSize: {},
  element: {},
  codeSnippet: {},
  design: {
    ieMsg: 'You must select a text to use this feature in IE browser'
  },
  link: {
    addLink: 'Add link',
    clearLink: 'Clear link',
    ok: 'OK'
  },
  markdown: {
    title: 'markdown'
  },
  picture: {
    title: 'Insert Picture',
    ok: 'OK',
    cancel: 'Cancel',
    invalidFile: 'No file selected or selected file is not a picture'
  },
  sourceCode: {
    title: 'Source Code'
  },
  fullscreen: {
    title: 'Fullscreen'
  },
  table: { title: 'Table' },
  undoRedo: {
    undo: 'Undo',
    redo: 'Redo'
  },
  emoji: {
    title: 'emoji'
  }
};

var lang = JSON.parse(JSON.stringify(defaultLang));

exports.default = {
  setLang: function setLang(data) {
    data && (lang = data);
  },
  getLang: function getLang(name) {
    return name ? lang[name] : lang;
  },
  getDefaultLang: function getDefaultLang() {
    return defaultLang;
  }
};
module.exports = exports['default'];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultConf = {
  spellcheck: false,
  noFormatPaste: true,
  uploadOnPaste: false,
  toolbar: ['removeFormat', 'undo', 'redo', '|', 'element', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough', 'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'table', '|', 'codeSnippet', 'fullscreen', 'sourceCode', 'markdown'],
  fontName: [{ val: 'arial black' }, { val: 'times new roman' }, { val: 'Courier New' }],
  fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'],
  codeSnippet: {
    lang: ['bash', 'clike', 'css', 'html', 'java', 'javascript', 'php', 'python', 'sql'],
    pattern: {
      attr: 'class',
      value: 'language-#lang#'
    }
  }
};

var config = JSON.parse(JSON.stringify(defaultConf));

exports.default = {
  setConfig: function setConfig(data) {
    config = data;
  },
  getConfig: function getConfig(name) {
    return name ? config[name] : config;
  },
  getDefaultConf: function getDefaultConf() {
    return defaultConf;
  }
};
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  computed: {
    show: function show() {
      return this.mstates.activeComponent === this.$options.name;
    },
    position: function position() {
      if (!this.mstates.activeComponent || this.mstates.activeComponent !== this.$options.name) {
        return { left: 0, top: 0 };
      }
      var _rect = this.rect,
          left = _rect.left,
          top = _rect.top,
          width = _rect.width,
          height = _rect.height;

      var offsetLeft = left;
      if (this.$refs.popup) {
        // by default, the popup menu's left edge is intend to align with the the clicked toolbar element's left edge
        // > 0 means the popup menu's right edge is not totally visible, so we try to align the popup menu's right edge with the clicked toolbar element's right edge
        if (left + this.$el.offsetWidth - document.documentElement.clientWidth > 0) {
          offsetLeft = left + width - this.$el.offsetWidth;
          // check if the popup menu's left edge is totally visible or not
          if (offsetLeft < 0) {
            // align center
            offsetLeft = left + width / 2 - this.$el.offsetWidth / 2;
          }
        }
      }
      return { left: offsetLeft + 'px', top: top + height + 'px' };
    }
  },
  methods: {
    togglePopup: function togglePopup(event) {
      if (this.mstates.view !== 'design' && this.$options.name !== 'codeSnippet') {
        return;
      }
      var obj = event.currentTarget;
      this.rect = {
        left: obj.offsetLeft,
        top: obj.offsetTop,
        width: obj.offsetWidth,
        height: obj.offsetHeight + parseInt(window.getComputedStyle(obj).marginBottom)
      };
      if (this.mstates.activeComponent !== this.$options.name) {
        this.setActiveComponent(this.$options.name);
      } else {
        this.setActiveComponent();
      }
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    namespaced: true,
    state: (0, _states2.default)(),
    actions: actions,
    mutations: _mutations2.default
  };
};

var _actions = __webpack_require__(64);

var actions = _interopRequireWildcard(_actions);

var _mutations = __webpack_require__(65);

var _mutations2 = _interopRequireDefault(_mutations);

var _states = __webpack_require__(66);

var _states2 = _interopRequireDefault(_states);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
// config 重购， vuex依赖移除， markdown 功能

var _vue = __webpack_require__(8);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(9);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(1);

var _index = __webpack_require__(3);

var _app = __webpack_require__(10);

var _app2 = _interopRequireDefault(_app);

var _index2 = __webpack_require__(6);

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkConfig(config) {
  var proto = {
    toolbar: 'array.string',
    fontName: 'array.object',
    fontSize: 'array.string',
    uploadUrl: 'string',
    lang: 'object',
    id: 'string',
    classList: 'array.string'
  };
  var retData = { valid: true, info: '' };
  for (var name in config) {
    var types = '';
    if (Array.isArray(config[name])) {
      types += 'array';
      _typeof(config[name][0]) === 'object' ? types += '.object' : types += '.string';
    } else if (_typeof(config[name]) === 'object') {
      types = 'object';
    } else {
      types = 'string';
    }
    if (proto[name] && proto[name] !== types) {
      retData = {
        valid: false,
        info: 'invalid configuration, the ' + name + ' attribute requires type ' + proto[name] + ' but received ' + types
      };
      break;
    }
  }
  return retData;
}

function mixinConfig(opts) {
  var defaultConf = (0, _index.getDefaultConf)();
  var config = opts ? Object.assign({}, defaultConf, opts) : defaultConf;
  var lang = config.lang || (0, _lang.getDefaultLang)();
  var list = ['sourceCode', 'picture'];
  // type check for config
  var typeInfo = checkConfig(config);
  if (!typeInfo.valid) {
    throw new Error(typeInfo.info);
  }
  // todo toolbar 去重

  (0, _index.setConfig)(config);
  (0, _lang.setLang)(lang);

  return Object.assign({}, _app2.default, {
    data: function data() {
      return {
        list: list,
        config: config
      };
    }
  });
}

var install = function install(Vue, opts) {
  Vue.component('Vueditor', mixinConfig(opts));
};

var getVuexModule = function getVuexModule() {
  return (0, _index3.default)();
};

// Create a 'subclass' of the base Vue constructor
var createEditor = function createEditor(el, opts) {
  var obj = mixinConfig(opts);
  obj.created = function () {};
  obj.store = new _vuex2.default.Store((0, _index3.default)());
  var Editor = _vue2.default.extend(obj);
  return new Editor().$mount(el);
};

exports.default = {
  install: install,
  getVuexModule: getVuexModule,
  createEditor: createEditor
};


_vue2.default.config.devtools = true;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(98)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/app.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7cf07ab8", __vue_options__)
  } else {
    hotAPI.reload("data-v-7cf07ab8", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] app.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toolbar = __webpack_require__(12);

var _toolbar2 = _interopRequireDefault(_toolbar);

var _design = __webpack_require__(49);

var _design2 = _interopRequireDefault(_design);

var _sourcecode = __webpack_require__(54);

var _sourcecode2 = _interopRequireDefault(_sourcecode);

var _picture = __webpack_require__(59);

var _picture2 = _interopRequireDefault(_picture);

var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

var _util = __webpack_require__(67);

var _lang = __webpack_require__(1);

__webpack_require__(68);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  components: {
    've-toolbar': _toolbar2.default,
    've-design': _design2.default,
    've-sourcecode': _sourcecode2.default,
    've-picture': _picture2.default
  },
  computed: {
    content: function content() {
      var states = this.namespace ? this.$store.state[this.namespace] : this.$store.state;
      return states.content;
    },
    fullscreen: function fullscreen() {
      var states = this.namespace ? this.$store.state[this.namespace] : this.$store.state;
      return states.fullscreen;
    }
  },
  methods: {
    setContent: function setContent(content) {
      var path = this.namespace ? this.namespace + '/setContent' : 'setContent';
      this.$store.dispatch(path, content);
    },
    getContent: function getContent() {
      return this.content;
    }
  },
  created: function created() {
    var lang = (0, _lang.getLang)('app');
    if (!this.$store) {
      throw new Error(lang.noStore);
    } else {
      this.namespace = (0, _util.createNonceStr)();
      this.$store.registerModule(this.namespace, (0, _index2.default)());
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(13)

/* script */
__vue_exports__ = __webpack_require__(15)

/* template */
var __vue_template__ = __webpack_require__(48)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/toolbar.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72fb2d04", __vue_options__)
  } else {
    hotAPI.reload("data-v-72fb2d04", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] toolbar.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-72fb2d04!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./toolbar.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-72fb2d04!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./toolbar.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-toolbar {\n  display: table-caption;\n  width: 100%;\n  font-size: 0;\n  background: #fff;\n  border: 1px solid #ddd;\n  border-bottom: none;\n  user-select: none;\n}\n.ve-toolbar > div {\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n}\n.ve-toolbar div.ve-icon,\n.ve-toolbar div.ve-select {\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  padding: 10px 12px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.ve-toolbar div.ve-icon:not(.ve-disabled):hover {\n  background: #eee;\n}\n.ve-toolbar div.ve-active {\n  background: #eee;\n  color: #000;\n}\n.ve-toolbar div.ve-disabled {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.6);\n}\n.ve-toolbar div.ve-divider {\n  display: inline-block;\n  width: 0;\n  height: 26px;\n  margin: 5px;\n  padding: 0;\n  border-right: 1px solid #ddd;\n  vertical-align: top;\n}\n.lang-select {\n  width: 80px;\n}\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(1);

var _index = __webpack_require__(3);

var _fontsize = __webpack_require__(16);

var _fontsize2 = _interopRequireDefault(_fontsize);

var _fontname = __webpack_require__(19);

var _fontname2 = _interopRequireDefault(_fontname);

var _element = __webpack_require__(24);

var _element2 = _interopRequireDefault(_element);

var _color = __webpack_require__(27);

var _color2 = _interopRequireDefault(_color);

var _link = __webpack_require__(32);

var _link2 = _interopRequireDefault(_link);

var _table = __webpack_require__(37);

var _table2 = _interopRequireDefault(_table);

var _undoredo = __webpack_require__(42);

var _undoredo2 = _interopRequireDefault(_undoredo);

var _codesnippet = __webpack_require__(45);

var _codesnippet2 = _interopRequireDefault(_codesnippet);

var _emoji = __webpack_require__(99);

var _emoji2 = _interopRequireDefault(_emoji);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  name: 'toolbar',
  data: function data() {
    return {
      lang: (0, _lang.getLang)(),
      config: (0, _index.getConfig)('toolbar')
    };
  },

  mixins: [_vuex2.default],
  components: {
    've-fontsize': _fontsize2.default,
    've-fontname': _fontname2.default,
    've-element': _element2.default,
    've-color': _color2.default,
    've-link': _link2.default,
    've-table': _table2.default,
    've-undoredo': _undoredo2.default,
    've-codesnippet': _codesnippet2.default,
    've-emoji': _emoji2.default
  },
  computed: {
    view: function view() {
      return this.mstates.view;
    },
    toolbar: function toolbar() {
      return this.mstates.toolbar;
    },
    fullscreen: function fullscreen() {
      return this.mstates.fullscreen;
    },
    componentList: function componentList() {
      // 'undo', 'redo'
      // 'foreColor', 'backColor'
      // 'link', 'unLink'
      // 'table'
      // 'fontSize'
      // 'fontName'
      // 'element'
      // 'codeSnippet'
      var arr = [];
      for (var i = 0, item = ''; i < this.config.length; i++) {
        item = this.config[i];
        if (item in this.btns || item == 'divider' || item == '|') {
          continue;
        }
        if (arr.indexOf(item) === -1) {
          arr.push(item);
        }
      }
      arr.indexOf('undo') !== -1 && arr.indexOf('redo') !== -1 && arr.splice(arr.indexOf('redo'), 1);
      arr.indexOf('foreColor') !== -1 && arr.indexOf('backColor') !== -1 && arr.splice(arr.indexOf('backColor'), 1);
      arr.indexOf('link') !== -1 && arr.indexOf('unLink') !== -1 && arr.splice(arr.indexOf('unLink'), 1);
      return arr;
    }
  },
  watch: {
    'view': function view(val) {
      var states = {};
      var exArr = ['sourceCode', 'markdown', 'fullscreen', 'divider', '|'];
      this.config.forEach(function (item) {
        if (exArr.indexOf(item) === -1) {
          states[item] = val === 'design' ? 'default' : 'disabled';
        }
      });
      if (val === 'codesnippet') {
        states.codeSnippet !== undefined && (states.codeSnippet = 'default');
      }
      this.setButtonStates(states);
    }
  },
  beforeCreate: function beforeCreate() {
    this.btns = {

      removeFormat: { className: 'icon-eraser', action: 'removeFormat', native: true },

      bold: { className: 'icon-bold', action: 'bold', native: true },
      italic: { className: 'icon-italic', action: 'italic', native: true },
      underline: { className: 'icon-underline', action: 'underline', native: true },
      strikeThrough: { className: 'icon-strikethrough', action: 'strikeThrough', native: true },

      superscript: { className: 'icon-superscript', action: 'superscript', native: true },
      subscript: { className: 'icon-subscript', action: 'subscript', native: true },
      indent: { className: 'icon-indent', action: 'indent', native: true },
      outdent: { className: 'icon-outdent', action: 'outdent', native: true },

      justifyLeft: { className: 'icon-align-left', action: 'justifyLeft', native: true },
      justifyCenter: { className: 'icon-align-center', action: 'justifyCenter', native: true },
      justifyRight: { className: 'icon-align-right', action: 'justifyRight', native: true },
      justifyFull: { className: 'icon-align-justify', action: 'justifyFull', native: true },

      insertOrderedList: { className: 'icon-list-ol', action: 'insertOrderedList', native: true },
      insertUnorderedList: { className: 'icon-list-ul', action: 'insertUnorderedList', native: true },

      sourceCode: { className: 'icon-code', action: 'sourceCode' },
      markdown: { className: 'icon-markdown', action: 'markdown' },
      fullscreen: { className: 'icon-fullscreen', action: 'fullscreen' },
      picture: { className: 'icon-file-image-o', action: 'picture' }
    };
  },

  methods: {
    setButtonStates: function setButtonStates(data) {
      this.$store.dispatch(this.mpath + 'setButtonStates', data);
    },
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    setFullScreen: function setFullScreen(bool) {
      this.$store.dispatch(this.mpath + 'setFullScreen', bool);
    },
    setView: function setView(data) {
      this.$store.dispatch(this.mpath + 'setView', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    action: function action(name) {
      switch (name) {
        case 'picture':
          this.setActiveComponent(name);
          break;
        case 'fullscreen':
          this.setFullScreen(!this.fullscreen);
          break;
        case 'sourceCode':
        case 'markdown':
          this.setView(this.view === name ? 'design' : name);
          this.setActiveComponent();
      }
    },
    btnHandler: function btnHandler(event, name) {
      if (this.toolbar[name] === 'disabled') return;
      if (this.btns[name].native) {
        this.execCommand({ name: name, value: null });
        this.setActiveComponent();
      } else {
        this.action(name);
      }
      var states = {};
      this.toolbar[name] === 'actived' ? states[name] = 'default' : states[name] = 'actived';
      this.setButtonStates(states);
    },
    getComponentName: function getComponentName(name) {
      switch (name) {
        case 'undo':
        case 'redo':
          return 've-undoredo';
        case 'foreColor':
        case 'backColor':
          return 've-color';
        case 'link':
        case 'unLink':
          return 've-link';
        default:
          return 've-' + name.toLowerCase();
      }
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(17)

/* template */
var __vue_template__ = __webpack_require__(18)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/fontsize.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2cbe9846", __vue_options__)
  } else {
    hotAPI.reload("data-v-2cbe9846", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] fontsize.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _rect = __webpack_require__(5);

var _rect2 = _interopRequireDefault(_rect);

var _config = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'fontSize',
  data: function data() {
    var arr = (0, _config.getConfig)('fontSize');
    return {
      list: arr,
      val: arr[0]
    };
  },

  mixins: [_vuex2.default, _rect2.default],
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    clickHandler: function clickHandler(event) {
      this.togglePopup(event);
    },
    selectHandler: function selectHandler(size) {
      this.val = size;
      this.setFontSize(size);
      this.setActiveComponent();
    },
    replaceFontWithSpan: function replaceFontWithSpan(element) {
      if (element.nodeType !== 1) return;
      var span = document.createElement('span');
      Array.prototype.forEach.call(element.attributes, function (attr) {
        attr.nodeName !== 'size' && span.setAttribute(attr.nodeName, attr.nodeValue);
      });
      span.innerHTML = element.innerHTML;
      element.parentNode.replaceChild(span, element);
      return span;
    },
    setFontSize: function setFontSize(size) {
      var _this = this;

      var comp = this.$parent.$parent.$refs.design;
      var range = comp.getRange();
      if (!range || range.collapsed) {
        return;
      }
      var container = range.commonAncestorContainer;
      if (container.childNodes.length === 1) {
        container.childNodes[0].nodeType === 1 ? container.childNodes[0].style.fontSize = size : container.style.fontSize = size;
      } else {
        comp.exec('fontSize', 7);
        container = range.commonAncestorContainer;
        container.nodeType === 3 && (container = container.parentNode);
        container = container.parentNode;
        var fontList = Array.from(container.getElementsByTagName('font'));
        var spanList = Array.from(container.getElementsByTagName('span'));
        var startNode = void 0,
            endNode = void 0;
        if (fontList.length !== 0) {
          fontList.forEach(function (font, index) {
            var span = _this.replaceFontWithSpan(font);
            span.style.fontSize = size;
            span.normalize();
            index === 0 && (startNode = span);
            index === fontList.length - 1 && (endNode = span);
          });
        }
        if (spanList.length !== 0) {
          spanList.forEach(function (span, index) {
            if (span.style.fontSize.indexOf('xx-large') !== -1) {
              span.style.fontSize = size;
              span.normalize();
              !startNode && (startNode = span);
              endNode = span;
            }
          });
        }
        if (startNode && endNode) {
          range.setStartBefore(startNode);
          range.setEndAfter(endNode);
        }
      }
      comp.iframeDoc.dispatchEvent(new window.Event('selectionchange'));
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-fontsize"
  }, [_h('div', {
    class: ['ve-select', {
      've-disabled': _vm.mstates.view !== 'design'
    }],
    on: {
      "click": _vm.clickHandler
    }
  }, [_h('span', [_vm._s(_vm.val)]), _h('i', {
    class: {
      've-triangle-down': !_vm.show, 've-triangle-up': _vm.show
    }
  })]), " ", _h('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "popup",
    staticClass: "ve-dropdown",
    style: (_vm.position)
  }, [_vm._l((_vm.list), function(size, index) {
    return _h('li', {
      key: index,
      on: {
        "click": function($event) {
          _vm.selectHandler(size)
        }
      }
    }, [_vm._s(size)])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2cbe9846", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(20)


/* script */
__vue_exports__ = __webpack_require__(22)

/* template */
var __vue_template__ = __webpack_require__(23)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/fontname.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24d9f967", __vue_options__)
  } else {
    hotAPI.reload("data-v-24d9f967", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] fontname.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-24d9f967!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fontname.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-24d9f967!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fontname.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n._1YvgPeBxSyH4vrCUbOnfgb_0 {\n  width: 100px;\n}\n._1YvgPeBxSyH4vrCUbOnfgb_0 span {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n", ""]);

// exports
exports.locals = {
	"select": "_1YvgPeBxSyH4vrCUbOnfgb_0"
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _rect = __webpack_require__(5);

var _rect2 = _interopRequireDefault(_rect);

var _config = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'fontName',
  data: function data() {
    var arr = (0, _config.getConfig)('fontName');
    return {
      list: arr,
      val: arr[0].abbr || arr[0].val
    };
  },

  mixins: [_vuex2.default, _rect2.default],
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    clickHandler: function clickHandler() {
      this.togglePopup(event);
    },
    selectHandler: function selectHandler(font) {
      this.val = font.abbr || font.val;
      this.execCommand({ name: 'fontName', value: font.val + ', sans-serif' });
      this.setActiveComponent();
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-fontname"
  }, [_h('div', {
    class: ['ve-select', _vm.$style.select, {
      've-disabled': _vm.mstates.view !== 'design'
    }],
    on: {
      "click": _vm.clickHandler
    }
  }, [_h('span', [_vm._s(_vm.val)]), _h('i', {
    class: {
      've-triangle-down': !_vm.show, 've-triangle-up': _vm.show
    }
  })]), " ", _h('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "popup",
    staticClass: "ve-dropdown",
    style: (_vm.style)
  }, [_vm._l((_vm.list), function(item, index) {
    return _h('li', {
      key: index,
      style: ({
        fontFamily: item.val + ', sans-serif'
      }),
      on: {
        "click": function($event) {
          _vm.selectHandler(item)
        }
      }
    }, [_vm._s(item.abbr || item.val)])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24d9f967", module.exports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(25)

/* template */
var __vue_template__ = __webpack_require__(26)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/element.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fb1b5702", __vue_options__)
  } else {
    hotAPI.reload("data-v-fb1b5702", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] element.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _rect = __webpack_require__(5);

var _rect2 = _interopRequireDefault(_rect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//


exports.default = {
  name: 'element',
  data: function data() {
    return {
      list: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      val: 'p',
      rect: {}
    };
  },

  mixins: [_vuex2.default, _rect2.default],
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    clickHandler: function clickHandler() {
      this.togglePopup(event);
    },
    selectHandler: function selectHandler(event) {
      var tagName = event.target.innerHTML.trim();
      this.val = tagName;
      this.execCommand({ name: 'formatBlock', value: tagName });
      this.setActiveComponent();
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-element"
  }, [_h('div', {
    class: ['ve-select', {
      've-disabled': _vm.mstates.view !== 'design'
    }],
    on: {
      "click": _vm.clickHandler
    }
  }, [_h('span', [_vm._s(_vm.val)]), _h('i', {
    class: {
      've-triangle-down': !_vm.show, 've-triangle-up': _vm.show
    }
  })]), " ", _h('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "popup",
    staticClass: "ve-dropdown",
    style: (_vm.position),
    on: {
      "click": _vm.selectHandler
    }
  }, [_vm._l((_vm.list), function(item, index) {
    return _h('li', {
      key: index
    }, [_vm._s(item)])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fb1b5702", module.exports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(28)


/* script */
__vue_exports__ = __webpack_require__(30)

/* template */
var __vue_template__ = __webpack_require__(31)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/color.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b79cfb4", __vue_options__)
  } else {
    hotAPI.reload("data-v-4b79cfb4", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] color.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4b79cfb4!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./color.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4b79cfb4!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./color.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.BH5VIImEflZEIMp8CUs9a_0 {\n  width: 176px;\n  padding: 10px;\n  position: absolute;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n._2Hn3MXNhh5aAdduMWlMYj0_0 {\n  overflow: hidden;\n}\n._2Hn3MXNhh5aAdduMWlMYj0_0 span {\n  width: 20px;\n  height: 20px;\n  margin: 1px;\n  float: left;\n  cursor: pointer;\n}\n._2I3u1DXeoSlgjP3cgM98ux_0 {\n  max-width: calc(100% - 35px);\n}\n.pxqHdCdhgQ9rrysEhrJgk_0 {\n  line-height: 16px;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "BH5VIImEflZEIMp8CUs9a_0",
	"list": "_2Hn3MXNhh5aAdduMWlMYj0_0",
	"input": "_2I3u1DXeoSlgjP3cgM98ux_0",
	"btn": "pxqHdCdhgQ9rrysEhrJgk_0"
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lang = __webpack_require__(1);

var _rect = __webpack_require__(5);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'color',
  data: function data() {
    return {
      colors: ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF', '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'],
      key: '',
      val: '',
      rect: {},
      lang: (0, _lang.getLang)('color')
    };
  },

  mixins: [_rect2.default, _vuex2.default],
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    clickHandler: function clickHandler(type, event) {
      if (this.mstates.view !== 'design') {
        return;
      }
      var obj = event.currentTarget;
      this.rect = {
        left: obj.offsetLeft,
        top: obj.offsetTop,
        width: obj.offsetWidth,
        height: obj.offsetHeight + parseInt(window.getComputedStyle(obj).marginBottom)
      };
      if (this.key === type && this.mstates.activeComponent === 'color') {
        this.setActiveComponent();
      } else {
        this.setActiveComponent('color');
      }
      this.key = type;
    },
    setColor: function setColor(val) {
      this.execCommand({ name: this.key, value: val });
      this.setActiveComponent();
    },
    inputHandler: function inputHandler() {
      var color = this.val;
      var valid = this.checkValid(color);
      if (!valid) {
        window.alert(this.lang.invalidColorCodeMsg);
      } else {
        this.setColor(color);
      }
    },
    checkValid: function checkValid(val) {
      var sColor = val.replace(/\s+/g, '');
      var hsl3 = /^#[0-9a-f]{3}$/i;
      var hsl6 = /^#[0-9a-f]{6}$/i;
      var rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/;
      if (hsl3.test(sColor) || hsl6.test(sColor) || rgb.test(sColor)) {
        return true;
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-color"
  }, [_h('div', {
    class: ['ve-icon', {
      've-active': _vm.show && _vm.key === 'foreColor',
      've-disabled': _vm.mstates.view !== 'design'
    }],
    attrs: {
      "title": _vm.lang.foreColor
    },
    on: {
      "click": function($event) {
        _vm.clickHandler('foreColor', $event)
      }
    }
  }, [_vm._m(0)]), " ", _h('div', {
    class: ['ve-icon', {
      've-active': _vm.show && _vm.key === 'backColor',
      've-disabled': _vm.mstates.view !== 'design'
    }],
    attrs: {
      "title": _vm.lang.backColor
    },
    on: {
      "click": function($event) {
        _vm.clickHandler('backColor', $event)
      }
    }
  }, [_vm._m(1)]), " ", _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "menu",
    class: _vm.$style.ctn,
    style: (_vm.position)
  }, [_h('div', {
    staticClass: "ve-input-box"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.val),
      expression: "val"
    }],
    staticClass: "ve-input",
    class: _vm.$style.input,
    attrs: {
      "type": "text",
      "placeholder": _vm.lang.colorCode
    },
    domProps: {
      "value": _vm._s(_vm.val)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.val = $event.target.value
      }
    }
  }), " ", _h('button', {
    staticClass: "ve-btn",
    class: _vm.$style.input,
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.inputHandler
    }
  }, [_vm._s(_vm.lang.ok)])]), " ", _h('div', {
    class: _vm.$style.list
  }, [_vm._l((_vm.colors), function(item, index) {
    return _h('span', {
      key: index,
      style: ({
        background: item
      }),
      attrs: {
        "title": item
      },
      on: {
        "click": function($event) {
          _vm.setColor(item)
        }
      }
    })
  })])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('i', {
    staticClass: "icon-file-text-o"
  })
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('i', {
    staticClass: "icon-file-text"
  })
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4b79cfb4", module.exports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(33)


/* script */
__vue_exports__ = __webpack_require__(35)

/* template */
var __vue_template__ = __webpack_require__(36)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/link.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-73a31487", __vue_options__)
  } else {
    hotAPI.reload("data-v-73a31487", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] link.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-73a31487!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./link.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-73a31487!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./link.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n._2qQIGssouc5rC2EqnMDVyK_0 {\n  width: 240px;\n  height: 90px;\n  margin-left: -102px;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "_2qQIGssouc5rC2EqnMDVyK_0"
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _rect = __webpack_require__(5);

var _rect2 = _interopRequireDefault(_rect);

var _lang = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'link',
  data: function data() {
    return {
      val: '',
      rect: {},
      lang: (0, _lang.getLang)('link')
    };
  },

  mixins: [_vuex2.default, _rect2.default],
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    checkValid: function checkValid() {
      var href = this.val;
      href.match(/^https?:\/\//igm) === null && (href = 'http://' + href);
      return href;
    },
    clickHandler: function clickHandler() {
      this.togglePopup(event);
    },
    addLink: function addLink() {
      var href = this.checkValid();
      this.execCommand({ name: 'createlink', value: href });
      this.setActiveComponent();
    },
    clearLink: function clearLink() {
      var comp = this.$parent.$parent.$refs.design;
      var container = comp.getRangeContainerElement();
      if (!container) return;
      while (container.tagName && container.tagName.toLowerCase() !== 'a') {
        container = container.parentNode;
      }
      if (container.tagName && container.tagName.toLowerCase() === 'a') {
        comp.setRangeAtNode(container);
        comp.exec('unlink', null);
      }
      this.setActiveComponent();
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-link"
  }, [_h('div', {
    class: ['ve-icon', {
      've-active': _vm.show,
      've-disabled': _vm.mstates.view !== 'design'
    }],
    attrs: {
      "title": _vm.lang.addLink
    },
    on: {
      "click": _vm.clickHandler
    }
  }, [_vm._m(0)]), " ", _h('div', {
    class: ['ve-icon', {
      've-disabled': _vm.mstates.view !== 'design'
    }],
    attrs: {
      "title": _vm.lang.clearLink
    },
    on: {
      "click": _vm.clearLink
    }
  }, [_vm._m(1)]), " ", _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "popup",
    class: ['ve-popover', _vm.$style.ctn],
    style: (_vm.position)
  }, [_vm._m(2), " ", _h('div', {
    staticClass: "ve-pop-header"
  }, [_vm._s(_vm.lang.addLink)]), " ", _h('div', {
    staticClass: "ve-pop-body"
  }, [_h('div', {
    staticClass: "ve-input-box"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.val),
      expression: "val"
    }],
    staticClass: "ve-input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm._s(_vm.val)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.val = $event.target.value
      }
    }
  }), " ", _h('button', {
    staticClass: "ve-btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.addLink
    }
  }, [_vm._s(_vm.lang.ok)])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('i', {
    staticClass: "icon-link"
  })
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('i', {
    staticClass: "icon-unlink"
  })
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-pop-arrow"
  })
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-73a31487", module.exports)
  }
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(38)

/* script */
__vue_exports__ = __webpack_require__(40)

/* template */
var __vue_template__ = __webpack_require__(41)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/table.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-24ac11de", __vue_options__)
  } else {
    hotAPI.reload("data-v-24ac11de", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] table.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-24ac11de!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-24ac11de!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-table .ve-wrap {\n  width: 192px;\n  padding: 10px;\n  position: absolute;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n.ve-table .ve-wrap span {\n  width: 20px;\n  height: 20px;\n  margin: 1px;\n  float: left;\n  border: 1px solid #ddd;\n}\n.ve-table .ve-wrap span.active {\n  background: #F7F7F7;\n}\n", ""]);

// exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lang = __webpack_require__(1);

var _rect = __webpack_require__(5);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'table',
  data: function data() {
    return {
      num: 64,
      x: -1,
      y: -1,
      rect: {},
      lang: (0, _lang.getLang)('table')
    };
  },

  mixins: [_vuex2.default, _rect2.default],
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    clickHandler: function clickHandler(event) {
      this.togglePopup(event);
    },
    overHandler: function overHandler(index) {
      this.x = index % 8;
      this.y = parseInt(index / 8);
    },
    insertTable: function insertTable() {
      var html = this.createTable(this.y + 1, this.x + 1);
      this.execCommand({ name: 'insertHTML', value: html });
      this.setActiveComponent();
    },
    createTable: function createTable(rows, cols) {
      var oTable = document.createElement('table');
      var oTbody = document.createElement('tbody');
      oTable.style.cssText = 'border-collapse: collapse; width: ' + cols * 50 + 'px';
      oTable.setAttribute('border', '1');
      oTable.appendChild(oTbody);
      for (var i = 0; i < rows; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < cols; j++) {
          var td = document.createElement('td');
          td.innerHTML = '<br>';
          tr.appendChild(td);
        }
        oTbody.appendChild(tr);
      }
      return oTable.outerHTML;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-table"
  }, [_h('div', {
    class: ['ve-icon', {
      've-active': _vm.show,
      've-disabled': _vm.mstates.view !== 'design'
    }],
    attrs: {
      "title": _vm.lang.title
    },
    on: {
      "click": _vm.clickHandler
    }
  }, [_vm._m(0)]), " ", _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "popup",
    staticClass: "ve-wrap",
    style: (_vm.position)
  }, [_vm._l((_vm.num), function(i) {
    return _h('span', {
      key: i,
      class: {
        'active': ((i - 1) % 8 <= _vm.x && parseInt((i - 1) / 8) <= _vm.y)
      },
      on: {
        "mouseover": function($event) {
          _vm.overHandler(i - 1)
        },
        "click": _vm.insertTable
      }
    })
  })])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('i', {
    staticClass: "icon-table"
  })
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24ac11de", module.exports)
  }
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(43)

/* template */
var __vue_template__ = __webpack_require__(44)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/undoredo.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-110f6222", __vue_options__)
  } else {
    hotAPI.reload("data-v-110f6222", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] undoredo.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//


exports.default = {
  name: 'undoRedo',
  data: function data() {
    return {
      stack: [],
      index: -1,
      lang: (0, _lang.getLang)('undoRedo')
    };
  },

  mixins: [_vuex2.default],
  computed: {
    content: function content() {
      return this.mstates.content;
    },
    view: function view() {
      return this.mstates.view;
    },

    canUndo: function canUndo() {
      return this.view === 'design' && this.index > 0;
    },
    canRedo: function canRedo() {
      return this.view === 'design' && this.index < this.stack.length - 1;
    }
  },
  watch: {
    'content': function content(val) {
      if (this.view === 'design') {
        this.push(val);
      }
    },
    'view': function view(val) {
      if (val === 'design') {
        this.stack = [];
        this.index = -1;
        this.push(this.content);
      }
    },
    'event': function event(_ref) {
      var name = _ref.name,
          params = _ref.params;

      if (['undo', 'redo'].indexOf(name) !== -1) {
        this[name]();
      }
    }
  },
  methods: {
    setContent: function setContent(data) {
      this.$store.dispatch(this.mpath + 'setContent', data);
    },
    undo: function undo() {
      if (!this.canUndo) return;
      this.index--;
      this.setContent(this.stack[this.index]);
    },
    redo: function redo() {
      if (!this.canRedo) return;
      this.index++;
      this.setContent(this.stack[this.index]);
    },
    push: function push(content) {
      if (content !== this.stack[this.index]) {
        this.stack = this.stack.slice(0, this.index + 1);
        this.stack.push(content);
        this.index++;
      }
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-undoredo"
  }, [_h('div', {
    class: ['ve-icon', {
      've-disabled': !_vm.canUndo
    }],
    attrs: {
      "title": _vm.lang.undo
    },
    on: {
      "click": _vm.undo
    }
  }, [_vm._m(0)]), " ", _h('div', {
    class: ['ve-icon', {
      've-disabled': !_vm.canRedo
    }],
    attrs: {
      "title": _vm.lang.redo
    },
    on: {
      "click": _vm.redo
    }
  }, [_vm._m(1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('i', {
    staticClass: "icon-undo"
  })
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('i', {
    staticClass: "icon-repeat"
  })
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-110f6222", module.exports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(46)

/* template */
var __vue_template__ = __webpack_require__(47)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/codesnippet.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c863e6da", __vue_options__)
  } else {
    hotAPI.reload("data-v-c863e6da", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] codesnippet.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _rect = __webpack_require__(5);

var _rect2 = _interopRequireDefault(_rect);

var _config = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'codeSnippet',
  data: function data() {
    var _getConfig = (0, _config.getConfig)('codeSnippet'),
        lang = _getConfig.lang,
        pattern = _getConfig.pattern;

    return {
      list: lang,
      val: lang[0],
      pattern: pattern,
      rect: {}
    };
  },

  mixins: [_vuex2.default, _rect2.default],
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    clickHandler: function clickHandler() {
      this.togglePopup(event);
    },
    selectHandler: function selectHandler(lang) {
      this.val = lang;
      this.insertCodeBlock(lang);
      this.setActiveComponent();
    },
    insertCodeBlock: function insertCodeBlock(lang) {
      var comp = this.$parent.$parent.$refs.design;
      var container = comp.getRangeContainerElement();
      if (!container) return;
      var _pattern = this.pattern,
          attr = _pattern.attr,
          value = _pattern.value;

      var tempDiv = document.createElement('div');
      var html = ('<pre><code ' + attr + '="' + value + '"><br></code></pre>').replace(/#lang#/igm, lang);
      tempDiv.innerHTML = html;
      // if the range inside code element
      if (container.tagName.toLowerCase() === 'code') {
        container.setAttribute(attr, lang);
      } else if (container.tagName.toLowerCase() === 'pre') {
        comp.insertHTML(name, tempDiv.getElementsByTagName('code')[0].outerHTML);
      } else {
        comp.insertHTML(name, html);
      }
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-codesnippet"
  }, [_h('div', {
    class: ['ve-select', {
      've-disabled': _vm.mstates.view !== 'design' && _vm.mstates.view !== 'codesnippet'
    }],
    on: {
      "click": _vm.clickHandler
    }
  }, [_h('span', [_vm._s(_vm.val)]), _h('i', {
    class: {
      've-triangle-down': !_vm.show, 've-triangle-up': _vm.show
    }
  })]), " ", _h('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    ref: "popup",
    staticClass: "ve-dropdown",
    style: (_vm.position)
  }, [_vm._l((_vm.list), function(type, index) {
    return _h('li', {
      key: index,
      on: {
        "click": function($event) {
          _vm.selectHandler(type)
        }
      }
    }, [_vm._s(type)])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c863e6da", module.exports)
  }
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    ref: "toolbar",
    staticClass: "ve-toolbar"
  }, [_vm._l((_vm.config), function(item) {
    return [(item in _vm.btns) ? _h('div', {
      class: ['ve-icon', {
        've-active': _vm.toolbar[item] === 'actived',
        've-disabled': _vm.toolbar[item] === 'disabled'
      }],
      attrs: {
        "title": _vm.lang[item].title
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          _vm.btnHandler($event, item)
        }
      }
    }, [_h('i', {
      class: [_vm.btns[item].className]
    })]) : _vm._e(), " ", (item == 'divider' || item == '|') ? _h('div', {
      staticClass: "ve-divider"
    }) : _vm._e(), " ", (_vm.componentList.indexOf(item) !== -1) ? _h(_vm.getComponentName(item), {
      tag: "component"
    }) : _vm._e()]
  }), " "])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-72fb2d04", module.exports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(50)


/* script */
__vue_exports__ = __webpack_require__(52)

/* template */
var __vue_template__ = __webpack_require__(53)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/design.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-221fbb0b", __vue_options__)
  } else {
    hotAPI.reload("data-v-221fbb0b", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] design.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-221fbb0b!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./design.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-221fbb0b!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./design.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-design {\n  display: block;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow-y: auto;\n}\n._4WDIlCssKO273IR_agiNU_0 {\n  width: 50%;\n  float: left;\n}\n", ""]);

// exports
exports.locals = {
	"half": "_4WDIlCssKO273IR_agiNU_0"
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lang = __webpack_require__(1);

var _config = __webpack_require__(3);

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'design',
  data: function data() {
    return {
      iframeWin: null,
      iframeDoc: null,
      iframeBody: null,
      timer: null,
      lang: (0, _lang.getLang)('design'),
      config: (0, _config.getConfig)()
    };
  },


  mixins: [_vuex2.default],

  computed: {
    view: function view() {
      return this.mstates.view;
    },
    content: function content() {
      return this.mstates.content;
    },
    command: function command() {
      return this.mstates.command;
    },
    toolbar: function toolbar() {
      return this.mstates.toolbar;
    }
  },

  watch: {
    'view': function view(val) {
      if (val !== 'design') {
        clearTimeout(this.timer);
        this.setContent(this.iframeBody.innerHTML);
      }
    },
    'content': function content(val) {
      if (this.iframeBody && this.iframeBody.innerHTML !== val) {
        this.iframeBody.innerHTML = val;
      }
    },
    'command': function command(data) {
      this.exec(data.name, data.value);
    }
  },

  methods: {
    setContent: function setContent(data) {
      this.$store.dispatch(this.mpath + 'setContent', data);
    },
    setSelectValue: function setSelectValue(data) {
      // this.$store.dispatch(this.mpath + 'setSelectValue', data)
    },
    setButtonStates: function setButtonStates(data) {
      this.$store.dispatch(this.mpath + 'setButtonStates', data);
    },
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    triggerEvent: function triggerEvent(data) {
      this.$store.dispatch(this.mpath + 'triggerEvent', data);
    },
    setView: function setView(data) {
      this.$store.dispatch(this.mpath + 'setView', data);
    },
    init: function init(event) {
      this.iframeWin = event.target.contentWindow;
      this.iframeDoc = this.iframeWin.document;
      this.iframeBody = this.iframeWin.document.body;
      if (this.content) {
        this.iframeBody.innerHTML !== this.content && (this.iframeBody.innerHTML = this.content);
      }
      this.iframeDoc.designMode = 'on';
      this.iframeBody.spellcheck = this.config.spellcheck;
      this.iframeBody.style.cssText = 'overflow-x: hidden; margin: 0; padding: 8px;';
      this.iframeDoc.head.insertAdjacentHTML('beforeEnd', '<style>pre {margin: 0; padding: 0.5rem; background: #f5f2f0; line-height: 1.6;}</style>');
      this.addEvent();
    },


    // init, selection change
    updateStates: function updateStates() {
      var json = {};
      for (var name in this.toolbar) {
        if (this.iframeDoc.queryCommandSupported(name) && ['redo', 'undo'].indexOf(name) === -1) {
          json[name] = this.iframeDoc.queryCommandState(name) ? 'actived' : 'default';
        }
      }
      this.setButtonStates(json);
    },
    addEvent: function addEvent() {
      var _this = this;

      var timer = null;
      this.iframeDoc.addEventListener('click', function () {
        // throttle
        clearTimeout(timer);
        timer = setTimeout(function () {
          _this.view === 'design' && _this.setActiveComponent();
        }, 200);
        // dispatch selectionchange event for throttling
        _this.iframeDoc.dispatchEvent(new window.Event('selectionchange'));
      }, false);
      this.iframeBody.addEventListener('keydown', this.keydownHandler, false);
      this.iframeBody.addEventListener('keyup', this.keyupHandler, false);
      this.config.noFormatPaste && this.iframeBody.addEventListener('paste', this.pasteHandler, false);
      this.selectionChange();
    },
    keydownHandler: function keydownHandler(event) {
      if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
        event.preventDefault();
        event.keyCode === 89 && this.triggerEvent({ name: 'redo' });
        event.keyCode === 90 && this.triggerEvent({ name: 'undo' });
      }
      if (event.keyCode === 13 && this.getRange()) {
        var container = this.getRange().commonAncestorContainer;
        container.nodeType === 3 && (container = container.parentNode);
        if (['code', 'td', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(container.tagName.toLowerCase()) !== -1) {
          event.preventDefault();
          this.enterHandler();
        }
      }
    },
    enterHandler: function enterHandler() {
      var range = this.getRange();
      if (!range) return;
      var container = range.commonAncestorContainer;
      container.nodeType === 3 && (container = container.parentNode);
      var excludeTags = ['code', 'td'];
      var includeTags = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      var bool = false;
      var arr = [];
      var child = container;
      var tagName = child.tagName.toLowerCase();
      arr.push(tagName);
      while (tagName !== 'body' && this.iframeBody.contains(container)) {
        container = container.parentNode;
        tagName = container.tagName.toLowerCase();
        arr.push(tagName);
      }
      // 路径中包括excludeTags也不行, 但如果是 td 包括 p 是可以的
      var includeIndex = -1;
      var excludeIndex = -1;
      arr.forEach(function (tag, i) {
        if (includeTags.indexOf(tag) !== -1 && includeIndex === -1) {
          includeIndex = i;
        }
        if (excludeTags.indexOf(tag) !== -1 && excludeIndex === -1) {
          excludeIndex = i;
        }
      });
      if (excludeIndex !== -1) {
        if (includeIndex === -1 || includeIndex !== -1 && includeIndex > excludeIndex) {
          bool = true;
        }
      }
      if (bool) {
        var br = this.iframeDoc.createElement('br');
        range.insertNode(br);
        br.insertAdjacentHTML('afterend', '&#8203;');
        range.setStartAfter(br.nextSibling);
      } else {
        if (!range.collapsed) {
          range.deleteContents();
        }
        // 如果后面没有文本内容了，生成新的p，如果有截断当前的元素
        range.setEndAfter(child);
        if (range.toString() !== '') {
          // if child.nextElementSibling === null insertBefore equals appendChild
          child.parentNode.insertBefore(range.extractContents(), child.nextElementSibling);
          child.innerHTML === '' && (child.innerHTML = '<br>');
        } else {
          child.insertAdjacentHTML('afterend', '<p><br></p>');
        }
        range.setStart(child.nextElementSibling, 0);
      }
      range.collapse(true);
    },
    keyupHandler: function keyupHandler(event) {
      var _this2 = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this2.setContent(_this2.iframeBody.innerHTML);
      }, 500);
    },


    // 无格式粘贴
    pasteHandler: function pasteHandler(event) {
      var _this3 = this;

      event.preventDefault();
      var range = this.getRange();
      if (!range) return;
      var container = range.commonAncestorContainer;
      container.nodeType === 3 && (container = container.parentNode);

      var clipboardData = event.clipboardData || window.clipboardData;
      var text = clipboardData.getData('text/plain') || clipboardData.getData('Text');
      var arr = text.replace(/(<|>)/igm, function (data) {
        return data.replace('<', '&lt;').replace('>', '&gt;');
      }).split('\n');

      this.insertHTML('', arr.shift());
      arr.forEach(function (item) {
        if (item.match(/\S/mg) !== null) {
          _this3.insertHTML('', '<br>' + item);
        }
      });

      if (this.config.uploadOnPaste && clipboardData.items) {
        // this.pasteUpload(clipboardData.items)
      }
    },
    selectionChange: function selectionChange() {
      var _this4 = this;

      var timer = null;
      this.iframeDoc.addEventListener('selectionchange', function () {
        // throttle
        clearTimeout(timer);
        timer = setTimeout(function () {
          _this4.checkElement();
          _this4.view === 'design' && _this4.updateStates();
        }, 200);
      }, false);
      if (!('onselectionchange' in document)) {
        var sel = this.getSelection();
        var focusOffset = -1;
        setInterval(function () {
          if (sel && sel.rangeCount) {
            if (focusOffset !== sel.focusOffset) {
              focusOffset = sel.focusOffset;
              _this4.view === 'design' && _this4.updateStates();
              _this4.checkElement();
            }
          } else {
            sel = _this4.getSelection();
          }
        }, 200);
      }
    },
    checkElement: function checkElement() {
      var range = this.getRange();
      if (!range) return;
      var tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table'];
      var container = range.commonAncestorContainer;
      container.nodeType === 3 && (container = container.parentNode);
      var pattern = this.config.codeSnippet.pattern;

      if (container.tagName.toLowerCase() === 'code') {
        var value = pattern.value.replace(/#type#/, '');
        value = (container.getAttribute(pattern.attr) || '').replace(value, '');
        this.setSelectValue({ name: 'code', value: value || '--' });
        this.view === 'design' && this.setView('codesnippet');
      } else if (container.tagName.toLowerCase() === 'pre') {
        // 解决文字直接写到pre里
        if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
          this.wrapTextNode(range, 'code');
        }
        this.view === 'design' && this.setView('codesnippet');
      } else {
        // tagname fontsize fontfamily
        var style = window.getComputedStyle(container);
        var unit = this.config.fontSize[0].match(/[a-z]+/ig)[0];
        var fontName = style['fontFamily'].replace(', sans-serif', '').replace(/"/g, '');
        var tagName = container.tagName.toLowerCase();

        if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
          // 解决文字直接写到body里
          if (tagName === 'body') {
            this.wrapTextNode(range, 'p');
            tagName = 'p';
          }
        }

        if (this.config.toolbar.indexOf('element') !== -1) {
          while (this.iframeBody.contains(container) && tagName !== 'body' && tags.indexOf(tagName) === -1) {
            container = container.parentNode;
            tagName = container.tagName.toLowerCase();
          }
          tags.indexOf(tagName) !== -1 && this.setSelectValue({ name: 'element', value: tagName });
        }
        if (this.config.toolbar.indexOf('fontName') !== -1) {
          this.config.fontName.filter(function (item) {
            return item.val === fontName;
          }).length !== 0 && this.setSelectValue({ name: 'fontName', value: fontName });
        }
        if (this.config.toolbar.indexOf('fontSize') !== -1) {
          if (unit === 'px') {
            this.config.fontSize.indexOf(style['fontSize']) !== -1 && this.setSelectValue({ name: 'fontSize', value: style['fontSize'] });
          }
          if (unit === 'rem') {
            var rootFontSize = parseInt(window.getComputedStyle(document.documentElement)['fontSize']);
            var remFontSize = (parseInt(style['fontSize']) / rootFontSize).toFixed(1) + 'rem';
            this.config.fontSize.indexOf(remFontSize) !== -1 && this.setSelectValue({ name: 'fontSize', value: remFontSize });
          }
        }
        this.view !== 'design' && this.setView('design');
      }
    },
    wrapTextNode: function wrapTextNode(range, tagName) {
      var offset = range.startOffset;
      var obj = this.iframeDoc.createElement(tagName);
      obj.innerText = range.startContainer.nodeValue;
      range.startContainer.parentNode.replaceChild(obj, range.startContainer);
      range.setStart(obj.childNodes[0], offset);
      range.collapse(true);
    },
    exec: function exec(name, value) {
      if (this[name]) {
        this[name](name, value);
      } else {
        var range = this.getRange();
        if (!range) return;
        if (document.queryCommandSupported('styleWithCss')) {
          this.iframeDoc.execCommand('styleWithCss', false, true);
        }
        this.iframeDoc.execCommand(name, false, value);
        this.iframeDoc.dispatchEvent(new window.Event('selectionchange'));
      }
      this.iframeBody.focus();
      // this.setContent(this.iframeBody.innerHTML)
    },
    insertHTML: function insertHTML(name, value) {
      var range = this.getRange();
      if (!range || !value) return;
      range.deleteContents();
      var node = null;
      var frag = this.iframeDoc.createDocumentFragment();
      var obj = this.iframeDoc.createElement('div');
      obj.innerHTML = value;
      while (obj.firstChild) {
        node = obj.firstChild;
        frag.appendChild(node);
      }
      range.insertNode(frag);
      if (node.hasChildNodes() && node.childNodes[0].nodeType === 1) {
        while (node.hasChildNodes() && node.childNodes[0].nodeType === 1) {
          node = node.childNodes[0];
        }
        node.tagName.toLowerCase() === 'br' ? range.selectNode(node) : range.setStart(node, 0);
      } else {
        range.setStartAfter(node);
        range.collapse(true);
      }
    },
    formatBlock: function formatBlock(name, value) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)) {
        var range = this.getRange();
        if (!range || range.collapsed) {
          window.alert(this.lang.ieMsg);
        } else {
          this.iframeDoc.execCommand('formatblock', false, '<' + value.toUpperCase() + '>');
        }
      } else {
        this.iframeDoc.execCommand('formatblock', false, value);
      }
    },
    formatContent: function formatContent(obj, tagName, cssName) {
      var temp = [];
      var pattern = { fontSize: /font-size:\s?\d+px;/g, verticalAlign: /vertical-align:\s?(sub|super);/g };
      var nodeList = obj.getElementsByTagName(tagName);
      for (var i = 0; i < nodeList.length; i++) {
        var node = nodeList[i];
        if (node.attributes.length === 1 && node.style.length !== 0 && node.getAttribute('style').match(pattern[cssName]) != null) {
          if (node.children.length === 0) {
            if (node.style.length === 1) {
              var parent = node.parentNode;
              parent.replaceChild(document.createTextNode(node.innerHTML), node);
              parent.normalize();
              i--;
            } else {
              node.style[cssName] = '';
            }
          } else {
            temp.push(node);
          }
        }
      }
      if (temp.length !== 0) {
        this.formatContent(obj, tagName, cssName);
      }
    },
    removeFormat: function removeFormat(name, value) {
      this.iframeDoc.execCommand(name, false, value);
      var range = this.getRange();
      if (!range) return;
      var container = range.commonAncestorContainer;
      container.nodeType === 3 && (container = container.parentNode);
      container.tagName.toLowerCase() === 'span' && (container = container.parentNode);
      this.formatContent(container, 'span', 'verticalAlign');
      container.normalize();
    },
    getSelection: function getSelection() {
      if (this.iframeWin && this.iframeWin.getSelection) {
        return this.iframeWin.getSelection();
      }
    },
    getRange: function getRange() {
      var sel = this.getSelection();
      var range = void 0;
      if (sel && sel.rangeCount !== 0) {
        range = sel.getRangeAt(0);
      }
      return range;
    },
    getRangeContainerElement: function getRangeContainerElement() {
      var range = this.getRange();
      if (!range) return;
      var container = range.commonAncestorContainer;
      if (container.nodeType === 3) {
        container = container.parentNode;
      }
      return container;
    },
    setRange: function setRange(startContainer, startOffset, endContainer, endOffset) {
      var range = this.getRange();
      range.setStart(startContainer, startOffset);
      range.setEnd(endContainer, endOffset);
    },
    setRangeAtNode: function setRangeAtNode(node) {
      var range = this.getRange();
      range.selectNode(node);
    },
    setRangeAtNodeContent: function setRangeAtNodeContent(node) {
      var range = this.getRange();
      range.selectNodeContents(node);
    },
    removeRange: function removeRange() {
      var sel = this.getSelection();
      sel && sel.removeAllRanges();
    },
    rangeValid: function rangeValid() {
      var range = this.getRange();
      return range && !range.collapsed;
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('iframe', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.view !== 'sourceCode'),
      expression: "view !== 'sourceCode'"
    }],
    class: ['ve-design', _vm.view === 'markdown' ? _vm.$style.half : ''],
    attrs: {
      "src": "about:blank",
      "frameborder": "0"
    },
    on: {
      "load": _vm.init
    }
  })
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-221fbb0b", module.exports)
  }
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(55)


/* script */
__vue_exports__ = __webpack_require__(57)

/* template */
var __vue_template__ = __webpack_require__(58)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/sourcecode.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09c93255", __vue_options__)
  } else {
    hotAPI.reload("data-v-09c93255", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] sourcecode.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(56);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-09c93255!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sourcecode.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-09c93255!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./sourcecode.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-sourcecode {\n  display: block;\n  width: 100%;\n  height: 100%;\n  padding: 8px;\n  box-sizing: border-box;\n  outline: none;\n  border: none;\n  resize: none;\n  font-size: 14px;\n}\n.x3KKw9wufcTePmJHvAHPW_0 {\n  width: 50%;\n  float: left;\n  border-right: 1px solid #ddd;\n}\n", ""]);

// exports
exports.locals = {
	"half": "x3KKw9wufcTePmJHvAHPW_0"
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'sourceCode',
  data: function data() {
    return {
      code: ''
    };
  },

  mixins: [_vuex2.default],
  computed: {
    view: function view() {
      return this.mstates.view;
    },
    content: function content() {
      return this.mstates.content;
    }
  },
  watch: {
    'content': function content(val) {
      this.code = val;
    },
    'code': function code(val) {
      this.setContent(val);
    }
  },
  methods: {
    setContent: function setContent(data) {
      this.$store.dispatch(this.mpath + 'setContent', data);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('textarea', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.view === 'sourceCode' || _vm.view === 'markdown'),
      expression: "view === 'sourceCode' || view === 'markdown'"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.code),
      expression: "code"
    }],
    class: ['ve-sourcecode', _vm.view === 'markdown' ? _vm.$style.half : ''],
    domProps: {
      "value": _vm._s(_vm.code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.code = $event.target.value
      }
    }
  })
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-09c93255", module.exports)
  }
}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(60)


/* script */
__vue_exports__ = __webpack_require__(62)

/* template */
var __vue_template__ = __webpack_require__(63)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/picture.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
if (!__vue_options__.computed) __vue_options__.computed = {}
Object.keys(__vue_styles__).forEach(function (key) {
var module = __vue_styles__[key]
__vue_options__.computed[key] = function () { return module }
})

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e6cc181", __vue_options__)
  } else {
    hotAPI.reload("data-v-0e6cc181", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] picture.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(61);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0e6cc181!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./picture.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0e6cc181!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./picture.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n._2T9WD2D47RUUwZfCP40fYJ_0 {\n  width: 500px;\n  position: relative;\n  top: 50%;\n  background: #fff;\n  margin: 0 auto;\n  transform: translateY(-60%);\n}\n", ""]);

// exports
exports.locals = {
	"wrap": "_2T9WD2D47RUUwZfCP40fYJ_0"
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(1);

var _config = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'picture',
  data: function data() {
    return {
      url: '',
      lang: (0, _lang.getLang)('picture'),
      uploadUrl: (0, _config.getConfig)('uploadUrl')
    };
  },

  mixins: [_vuex2.default],
  computed: {
    event: function event() {
      return this.mstates.event;
    },
    show: function show() {
      return this.mstates.activeComponent === this.$options.name;
    }
  },
  watch: {
    'event': function event(val) {
      if (val.name === 'picture') {
        this.show = true;
      }
    },
    'show': function show(val) {
      if (val) {
        document.body.classList.add('ve-fixed');
      } else {
        document.body.classList.remove('ve-fixed');
      }
    }
  },
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    setButtonStates: function setButtonStates(data) {
      this.$store.dispatch(this.mpath + 'setButtonStates', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    hideDialog: function hideDialog() {
      this.setButtonStates({ picture: 'default' });
      this.setActiveComponent();
    },
    changeHandler: function changeHandler() {
      this.preview(this.$refs.file);
    },
    pasteHandler: function pasteHandler(arr) {
      var _this = this;

      Array.prototype.forEach.call(arr, function (item) {
        if (item.getAsFile() && item.kind === 'file' && item.type.match(/^image\//i)) {
          if (_this.uploadUrl) {
            _this.upload(item.file[0]);
          } else {
            _this.preview(item);
            _this.execCommand({ name: 'insertHTML', value: '<img src="' + _this.url + '">' });
            _this.hideDialog();
          }
        }
      });
    },
    certainHandler: function certainHandler(event) {
      var _this2 = this;

      var obj = this.$refs.file;
      if (this.url) {
        if (this.$parent.upload) {
          this.$parent.upload(obj, function (href) {
            _this2.execCommand({ name: 'insertHTML', value: '<img src="' + href + '">' });
            _this2.hideDialog();
          });
        } else if (this.uploadUrl) {
          this.upload(obj.file[0]);
        } else {
          this.execCommand({ name: 'insertHTML', value: '<img src="' + this.url + '">' });
          this.hideDialog();
        }
      } else {
        window.alert(this.lang.invalidFile);
      }
    },
    preview: function preview(obj) {
      if (navigator.userAgent.indexOf('MSIE') >= 1) {
        // IE
        this.url = obj.value;
      } else {
        if (obj.files.length !== 0 && obj.files.item(0).type.indexOf('image') !== -1) {
          this.url = window.URL.createObjectURL(obj.files.item(0));
        }
      }
    },
    upload: function upload(file) {
      var _this3 = this;

      var formData = new window.FormData();
      var xhr = new window.XMLHttpRequest();
      formData.append('test', file);
      xhr.open('POST', this.uploadUrl);
      xhr.send(formData);
      xhr.onload = function () {
        _this3.execCommand({ name: 'insertHTML', value: '<img src="' + xhr.responseText + '">' });
        _this3.hideDialog();
      };
      xhr.onerror = function (err) {
        window.alert(err);
      };
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "ve-picture ve-dialog",
    on: {
      "click": function($event) {
        if ($event.target !== $event.currentTarget) { return; }
        _vm.hideDialog($event)
      }
    }
  }, [_h('div', {
    class: _vm.$style.wrap
  }, [_h('div', {
    staticClass: "ve-dialog-header"
  }, [_vm._s(_vm.lang.title), _h('a', {
    staticClass: "ve-close",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": _vm.hideDialog
    }
  }, ["×"])]), " ", _h('div', {
    staticClass: "ve-dialog-body"
  }, [_h('form', [_h('input', {
    ref: "file",
    attrs: {
      "type": "file",
      "name": "image"
    },
    on: {
      "change": _vm.changeHandler
    }
  })]), " ", (_vm.url) ? _h('div', {
    staticClass: "ve-preview"
  }, [_h('img', {
    attrs: {
      "src": _vm.url
    }
  })]) : _vm._e()]), " ", _h('div', {
    staticClass: "ve-dialog-footer"
  }, [_h('div', {
    staticClass: "ve-btn-box"
  }, [_h('button', {
    staticClass: "ve-btn",
    on: {
      "click": _vm.hideDialog
    }
  }, [_vm._s(_vm.lang.cancel)]), " ", _h('button', {
    staticClass: "ve-btn",
    on: {
      "click": _vm.certainHandler
    }
  }, [_vm._s(_vm.lang.ok)])])])])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0e6cc181", module.exports)
  }
}

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var setButtonStates = exports.setButtonStates = function setButtonStates(_ref, data) {
  var commit = _ref.commit;

  commit('SET_BUTTON_STATES', data);
};

var setActiveComponent = exports.setActiveComponent = function setActiveComponent(_ref2, data) {
  var commit = _ref2.commit;

  commit('SET_ACTIVE_COMPONENT', data);
};

var setFullScreen = exports.setFullScreen = function setFullScreen(_ref3, data) {
  var commit = _ref3.commit;

  commit('SET_FULL_SCREEN', data);
};

var setContent = exports.setContent = function setContent(_ref4, data) {
  var commit = _ref4.commit;

  commit('SET_CONTENT', data);
};

var setView = exports.setView = function setView(_ref5, data) {
  var commit = _ref5.commit;

  commit('SET_VIEW', data);
};

var execCommand = exports.execCommand = function execCommand(_ref6, data) {
  var commit = _ref6.commit;

  commit('EXEC_COMMAND', data);
};

var triggerEvent = exports.triggerEvent = function triggerEvent(_ref7, data) {
  var commit = _ref7.commit;

  commit('TRIGGER_EVENT', data);
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  SET_BUTTON_STATES: function SET_BUTTON_STATES(_ref, data) {
    var toolbar = _ref.toolbar;

    // console.log(data)
    for (var name in data) {
      if (typeof toolbar[name] !== 'undefined') {
        toolbar[name] = data[name];
      }
    }
  },
  SET_ACTIVE_COMPONENT: function SET_ACTIVE_COMPONENT(state, data) {
    state.activeComponent = data;
  },
  SET_FULL_SCREEN: function SET_FULL_SCREEN(state, data) {
    state.fullscreen = data;
  },
  SET_CONTENT: function SET_CONTENT(state, data) {
    state.content = data;
  },
  SET_VIEW: function SET_VIEW(state, data) {
    state.view = data;
  },
  EXEC_COMMAND: function EXEC_COMMAND(state, data) {
    state.command = data;
  },
  TRIGGER_EVENT: function TRIGGER_EVENT(state, data) {
    state.event = data;
  }
};
module.exports = exports['default'];

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var toolbar = {};
  var config = (0, _index.getConfig)('toolbar');

  config.forEach(function (name) {
    if (name !== 'divider' && name !== '|') {
      toolbar[name] = ''; // default disabled actived
    }
  });

  return {
    toolbar: toolbar,

    activeComponent: '',
    fullscreen: false,
    content: '',
    view: 'design',

    command: {
      name: '',
      value: ''
    },
    event: {
      name: '',
      params: ''
    }
  };
};

var _index = __webpack_require__(3);

module.exports = exports['default'];

// 每一个按钮都有一个状态
// 每一个下拉菜单、对话框都有一个显示状态

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNonceStr = createNonceStr;
exports.getBrowser = getBrowser;
function createNonceStr() {
  var str = '1234567890ABCDEFGHIJKLOMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var name = '';
  for (var i = 0; i < 10; i++) {
    name += str.charAt(Math.round(Math.random() * (str.length - 1)));
  }
  return name;
}

function getBrowser() {
  var browser = '';
  var ua = window.navigator.userAgent;
  if (ua.indexOf('Chrome') !== -1) {
    browser = ua.indexOf('Edge') !== -1 ? 'Edge' : 'Chrome';
  } else if (ua.indexOf('MSIE') !== -1) {
    browser = 'IE';
  } else if (ua.indexOf('Firefox') !== -1) {
    browser = 'Firefox';
  }
  return browser;
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(96)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./style.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".vueditor html {\n  font-size: 16px;\n}\n.vueditor h1,\n.vueditor h2,\n.vueditor h3,\n.vueditor h4,\n.vueditor h5,\n.vueditor p {\n  margin: 0;\n  padding: 0;\n}\n.vueditor ul,\n.vueditor ol {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.vueditor a {\n  color: black;\n  text-decoration: none;\n}\n.vueditor hr {\n  margin: 10px 0;\n}\n.vueditor label {\n  font-weight: normal;\n}\n.vueditor img {\n  max-width: 100%;\n}\n.vueditor {\n  min-width: 300px;\n  min-height: 150px;\n  width: 100%;\n  height: 100%;\n  display: table;\n  border: 1px solid #ddd;\n  background: #fff;\n  box-sizing: border-box;\n  position: relative;\n}\n.ve-fullscreen {\n  width: 100%!important;\n  height: 100%!important;\n  margin: 0!important;\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 10;\n}\n.ve-container {\n  display: table-row;\n}\n[class^=ve-triangle] {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  vertical-align: middle;\n  border-top: 4px solid;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n  transition: 200ms;\n}\n.ve-triangle-down {\n  transform: rotate(0deg);\n}\n.ve-triangle-up {\n  transform: rotate(-180deg);\n}\n.ve-btn-box {\n  float: right;\n  font-size: 0;\n}\n.ve-btn-box .ve-btn:not(:last-child) {\n  border-right: none;\n}\n.ve-input-box {\n  display: flex;\n  margin-bottom: 10px;\n}\n.ve-input-box .ve-input {\n  flex: 1;\n}\n.ve-input-box .ve-btn {\n  border-left: none;\n}\n.ve-btn {\n  display: inline-block;\n  margin: 0;\n  padding: 5px 15px;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  border: 1px solid #ccc;\n  color: #333;\n  outline: none;\n  background-color: #fff;\n  user-select: none;\n  line-height: 20px;\n  transition: all 500ms;\n}\n.ve-btn:hover {\n  color: #fff;\n  background: #42b983;\n  border-color: #42b983;\n}\n.ve-btn:hover + .ve-btn {\n  border-left-color: #42b983;\n}\n.ve-input {\n  display: block;\n  width: 100%;\n  height: 32px;\n  padding: 5px 10px;\n  color: #555;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  outline: none;\n  box-sizing: border-box;\n}\n.ve-select {\n  position: relative;\n  min-width: 60px;\n  line-height: 26px;\n  margin: 5px 5px 5px 0;\n  padding: 0 20px 0 10px!important;\n  border-right: 1px solid #ddd;\n  vertical-align: top;\n}\n.ve-select span {\n  display: inline-block;\n  width: 100%;\n  vertical-align: middle;\n  font-size: 16px;\n  line-height: 26px;\n  letter-spacing: initial;\n}\n.ve-select i {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  margin-top: -2px;\n}\n.ve-select:hover {\n  background: transparent!important;\n  color: #000;\n}\n.ve-dropdown {\n  width: 176px;\n  padding: 5px 10px!important;\n  position: absolute;\n  top: 36px;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n.ve-dropdown li {\n  display: block;\n  cursor: pointer;\n  padding: 6px;\n  border-bottom: 1px solid #ddd;\n  font-size: 16px;\n  top: 26px;\n  letter-spacing: initial;\n}\n.ve-dropdown li:last-child {\n  border-bottom: none;\n}\n.ve-dropdown li:hover {\n  background: #d5e1f2;\n  border-color: #a3bde3;\n}\n.ve-disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.ve-popover {\n  font-size: 14px;\n  position: absolute;\n  top: 36px;\n  z-index: 1000;\n  background-color: #fff;\n  padding: 1px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n}\n.ve-pop-arrow {\n  position: absolute;\n  left: 50%;\n  top: -10px;\n  margin-left: -10px;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid rgba(0, 0, 0, 0.25);\n}\n.ve-pop-arrow:after {\n  position: absolute;\n  left: -10px;\n  top: 1px;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  content: \"\";\n  border-bottom: 10px solid #fff;\n}\n.ve-pop-header {\n  background: #f7f7f7;\n  padding: 8px 14px;\n  border-bottom: 1px solid #ebebeb;\n}\n.ve-pop-body {\n  padding: 8px;\n}\n.ve-fixed {\n  overflow: hidden;\n}\n.ve-dialog {\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1000;\n}\n.ve-dialog-header {\n  background: #f7f7f7;\n  padding: 10px;\n}\n.ve-close {\n  float: right;\n}\n.ve-dialog-body {\n  padding: 10px;\n}\n.ve-dialog-footer {\n  padding: 10px;\n  overflow: hidden;\n}\n.ve-preview {\n  margin-top: 10px;\n  text-align: center;\n  font-size: 0;\n}\n.ve-preview img {\n  max-height: 300px;\n}\n.ve-grid {\n  width: 50%;\n  height: 100%;\n  float: left;\n}\n.vueditor .icon-align-center {\n  background: url(" + __webpack_require__(70) + ") no-repeat;\n}\n.vueditor .icon-align-justify {\n  background: url(" + __webpack_require__(71) + ") no-repeat;\n}\n.vueditor .icon-align-left {\n  background: url(" + __webpack_require__(72) + ") no-repeat;\n}\n.vueditor .icon-align-right {\n  background: url(" + __webpack_require__(73) + ") no-repeat;\n}\n.vueditor .icon-bold {\n  background: url(" + __webpack_require__(74) + ") no-repeat;\n}\n.vueditor .icon-code {\n  background: url(" + __webpack_require__(75) + ") no-repeat;\n}\n.vueditor .icon-eraser {\n  background: url(" + __webpack_require__(76) + ") no-repeat;\n}\n.vueditor .icon-file-image-o {\n  background: url(" + __webpack_require__(77) + ") no-repeat;\n}\n.vueditor .icon-file-text-o {\n  background: url(" + __webpack_require__(78) + ") no-repeat;\n}\n.vueditor .icon-file-text {\n  background: url(" + __webpack_require__(79) + ") no-repeat;\n}\n.vueditor .icon-indent {\n  background: url(" + __webpack_require__(80) + ") no-repeat;\n}\n.vueditor .icon-italic {\n  background: url(" + __webpack_require__(81) + ") no-repeat;\n}\n.vueditor .icon-link {\n  background: url(" + __webpack_require__(82) + ") no-repeat;\n}\n.vueditor .icon-list-ol {\n  background: url(" + __webpack_require__(83) + ") no-repeat;\n}\n.vueditor .icon-list-ul {\n  background: url(" + __webpack_require__(84) + ") no-repeat;\n}\n.vueditor .icon-outdent {\n  background: url(" + __webpack_require__(85) + ") no-repeat;\n}\n.vueditor .icon-repeat {\n  background: url(" + __webpack_require__(86) + ") no-repeat;\n}\n.vueditor .icon-strikethrough {\n  background: url(" + __webpack_require__(87) + ") no-repeat;\n}\n.vueditor .icon-subscript {\n  background: url(" + __webpack_require__(88) + ") no-repeat;\n}\n.vueditor .icon-superscript {\n  background: url(" + __webpack_require__(89) + ") no-repeat;\n}\n.vueditor .icon-table {\n  background: url(" + __webpack_require__(90) + ") no-repeat;\n}\n.vueditor .icon-underline {\n  background: url(" + __webpack_require__(91) + ") no-repeat;\n}\n.vueditor .icon-undo {\n  background: url(" + __webpack_require__(92) + ") no-repeat;\n}\n.vueditor .icon-unlink {\n  background: url(" + __webpack_require__(93) + ") no-repeat;\n}\n.vueditor .icon-markdown {\n  background: url(" + __webpack_require__(94) + ") no-repeat;\n}\n.vueditor .icon-fullscreen {\n  background: url(" + __webpack_require__(95) + ") no-repeat;\n}\n.vueditor [class^=icon] {\n  width: 16px;\n  height: 16px;\n  display: inline-block;\n  background-size: contain;\n  vertical-align: bottom;\n  opacity: 0.8;\n}\n", ""]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlB4vuQPAAAAMnRSTlMAAgMFBwsMDg8QERIUFRYXGBkaJiotLjg6UFFSVVZofoKDqK+3ub7BxcrM0dnk6Pf5+4oUqqUAAAEkSURBVGje7djbUsJQDIXhUFFosSBnioBaKGo57v3+D+eVNx1nSNJm48X6X+Cb6TTJtEQIIfTbU39ws/5jLaJdeFa7dg3kyzP71BtDz+5FjUz5yFSNzPjIDAgQWRM+MlEjHT7S0Y/8B9d4q7MhX48c4rjEuUL/oOih0aI/iFHpG64cVY3Y+ca7xtoFIum9ghQWSFFB9hbIHgiQYK9wkGFMDNaKi++xIMOseoRC1dqc5INx2rREyFY3f1uJMdZO+ViAZFokEyBrLbIGAuRWKy2yEiBzLTKXfHSddcZZdHOTg8Y4JMI93B2I6+J6ofv87ug9G9aLiIiWzpvmMqKFN29BpT3yTT5AQIAYIld740K5PZJT6qwNlxKluekTu+QpDh1CqOl+ACYrEC2lLhvkAAAAAElFTkSuQmCC"

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAWlBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlC+y02GAAAAHXRSTlMAAwQFEhQVFyUmLS46OzxQUVVWqLq8ysze9/n7/bGqpTcAAADCSURBVGje7ZkJDoMwDAQHCunFUZoepIH/f7OvWEtVdz4wUpSsHRuMMX9F0x+F9A3Afdul1AXGXc7IWy95sQdgiSVCyUfvKGS9JJOq2lETpCw9sZKTC50R0x6EtABcV+1bXC9w1sfKiade8qDqJdWV0RKhJOQKhzzGkFgJCciYqDdGR8pF3nCHfB1CPkFFLymujJb8uiRkPDjpJZN+ZLstUcNnY5T7k64X0jUAN3EnUWcY9LEyeH9iiSXen3h/YowxfAF9I35eWqqeiAAAAABJRU5ErkJggg=="

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlD5L8M5AAAAM3RSTlMAAgMEBQcLDg8QERIUFRYXGBomKi0uODo7PFBRVVZofoKor7e5vL7ByszR2d7k6Pf5+/1nKpp+AAABHklEQVRo3u3Z21LCMBDG8bUeEaKCIshJo6LiqS37/u/mTeowQyZcdL9wwfd/gd9Mp93MpiKMsYOq6F236+pspzFfa+teTtPGWC16TyMrE0RvkoiNoXc5kCERIttVNshtEvE2yHkScbWF8bhjQDrf+ol9TXmWsX12fIKo2CSG34pp1f83Bgqr6jTIEofoU4PUQOTV+DyJ9kbkwJEsr3CWjxE4VupO1gGZZ9Qzhsv50ujD+FkcQVeH0DN2CQoN4khpikygi2loToQIDJlBrwdD93HkwdL4LYBXtqHPS9zlc9MFjzS2n/8n3R6wbiEiMkWuQapaT0RGCm9kPCCjfYhmiAgRIFLhjdJ4dYjmbZeg+PByJv9Pks/KOx50jDHr/gDKzMKMu2GFWQAAAABJRU5ErkJggg=="

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlD5L8M5AAAAM3RSTlMAAgMEBQcMDg8QERIUFRYXGRolJiotLjg6OzxQUVJVVmiDqK+5ur7FyszR2d7k6Pf5+/3jauRDAAABG0lEQVRo3u3Zy1ICMRCF4TaoXEfwwkVBlIAKokDs9383V2OxSbKYPtl4/hf4qlKTnklGhDHG6q5vhs0auBxxtdHGhWUG+VCLHpPGyMTQbRIZ2yCaRCZEiMCQBxvjmETaNohPj5WVhRGqzPB63jdeK58zGDPKXSJqnRO3O8X0Nf4zukFh3ZkOkEhvNbIBIqFG3oGIEvnnSJFHuMhm7JUYK0UGZJlRz1ipLl6/jbZJ4oN7bTm6Isq96Z6PHILmpkjkOPeCeZ8QISIiyxLI1NSIXA+6gyXyFJldvU8z4idxZdsZ2pS/fGasYa4/ANZ3IiIL4KFBVTXMRWYKbyY7PLIVLRARIkDkhDeO4vGIlyqgjVCJVB66Yvx/whgD9As3HcK8Wc6lewAAAABJRU5ErkJggg=="

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABWVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlBnrqOTAAAAcnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGhweICEiJCYoKSotLzIzNDc4OTw9P0JERUlLTlFVV1xeYmZpbG1xdHh8gIWJjJGVmpueo6aoqq2wtbm6vsHFyMrMz9HV2drc3uDi5Obo6evt7/Hz9ff5+/3yYEsPAAACzklEQVRo3u3Y2VsSYRQG8IMpJQhMpZQtpm2222b7npXtq1hWhplQSaDz/1+EvTPODH7b+Wbmqjl3zHnhxzzDM8BLlE022WTzH83on86zqXLKyGt3Y26mamz7Z7jtVJEJIK9SRe4DuZAqsgIk1Su/C0Y91RO5DOROqsg7IGNpGv0w1vrivlBl/pMj2x0F8nzzQHHuy4iF4TRd9+dOyfIhkHP+46Fl123tsTLkyi8gxZBhocDoKttF2xEsv/pXaBmPmYpvuO6kaH3Fjdwdx/0wSwmMlQHRfg7L/f7NctFCCRkl0T6PZSfnHxj8xlZ0Bh3HdjY4wla0Bj3C+jRZK3qDWtgPkq1iYOzFfiF6lKEYGHQNgetkqZgY9BGJUbJTjIwd3gvlSKFU4xl0EpHHgpWBYmbQE2ROkI1iaOTaCAnvnDrF0KB9CNUka6ViatANpK4SXzE26DNi8g+pVDE3Coj9VkQCZbVqZdAZ5GaIqzAMeorgMWIqHCO3huQA8RSOQQeQ/KDL9ShljkG3EJ0mhjJMVOMY5P1k2E0MZTGENCv6Zw55UYO3U/weQkoNhjKF5AOOsbpx2hWG8gLBIxxjGD/fjZW+deT62QZDOYTUWwvDXLmL0CWNURAZxor3ZMfK6CpNA6WCxA9jo/fPl4lyEYF7toaR8gb7cWsjrDQqqs5mXfWXt7CkNPTKYSxfxjG0itfZnI9l6BSvsynFM9SKtrMJGVV1DREoZXFnczu2oVK8zuZgfEOuaDqbwGjpDamypbOJY8iU3s4mniFRejobmWFTSTTy4s4mer+pxyxXJsWdTWTsCpxAaebFnU20LFyyMjZLNUfW2US/0+1KNa8edOSdzRbFwuh+xmrzjqqziSrvF2yKTn1nk/SIO5uER9LZJDuyzibJkXc2Cc4peWeT3Kg6m8SmrupskpppZWeT1BTOzrY7Y5T+5CibbLLJJpuk5y+zUKCeS7gPWgAAAABJRU5ErkJggg=="

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABiVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlDqUIP+AAAAgnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESFBUZGhscHh8gISIjJCcoKSowMTM0ODs8PT5AQkNFRkdJSlJUVVZXX2FiY2RmZ2lrbG1vdXl7fIWGiImLjo+RkpSVl5ibnaCio6aoqqutr7W3uby+wMHDxcjKzM7R1dfZ2tze4Obo7e/x8/X3+fv9eQZEnwAAAi9JREFUGBntwXk3VXEYBeB9zu1eFLoiDTcqmgyleUIDKtKMSqPQIJEhUw6u/clbee8H2L/3n9ZqnedBKpVKpVL/Rl33q/EJzbu+g/CIBhnkdYxg0XsGms4g1BMGG0CgbjpUIUg7Pc4iRANdOhGgJqHLDejKlunTDFn8nT5JDNlbOnVANkCnh5Bdp9OHCKrTdJrJQHWgSJ+VcqiqftNnsxaq7AKdjkEVTdLpPGQjdOqF7B6dXkB2mU7jEVTNdJrbBVXdFn3W9kBVsUqf4n6oMrN0OgFV9IlOVyB7TKcHkHXRaRSyNjp9i6FqoNNSDqqahD7JXqjKlumzXYAqnqJTC2Rv6HQTsn46DUJ2jU4fI6hO0WkmA1V9kT4rFVBVrtFnsxaq7DydjkMVTdL0QNPOkguQDdMMQ1NgSS9kfTSfI0iq12mGILtE8ysHSXaBZiKCqokmyUMSTdLMZaGq26RphOY5zVolVBWrNOeguUVTrIcqM0vTC00bS05CFY3RjEBzeJvmKmSPaL7EkFSv0/RD1kWzlIMku0AzClkbTZKHJJqgmYqhOsKSRmie0SzloMonNB3QdNMkeajKlmn6oGlhSQGqeIrmJTSHtmlaIRui+RpDUrVO0wlZgWYpB0l2nmYQukHu2KiBJBqnGYugW+SOo9A8pZnJIMAG/1q8qxmmWa1AiGk6bNYiyG06NCFM+QaDXUSoVobqQbgz2wzSCY/dd35sUVP8eX8fUqlUKpX6f/0Bl2O/cU+zSuAAAAAASUVORK5CYII="

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABa1BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCat1vqAAAAeHRSTlMAAQIDBAUGCQoLDA0OERITFBUWHyAkJyosLzAxNDY3PD0/QEJDREVGR0lKS0xNTk9QUVJUVVZXX2RmaGlrbG9wcXN0dXd4eXt8foCCg4aIiYuMjo+RkpSdnqCio6WtsLK1t7m8wMHDz9na3N7g4uTm6O3z9ff5+/0N1+4LAAACq0lEQVRo3u3ZWVvTQBQG4JOJtVTL5obFDVGrshVcUKmiKJtrwQUpWhW0UqlYLdicn+9FSEyTSTPJnAkX9LvLM5l5nyST5EwCYKXjccXAsPmznj8O4jm5ixFTG2WCRiqygYi102LIE5RKXgj5IYfgrAhiYAwKYgzK3p6HmWhmzA4ft0Moezsy4SmfNzuc0e6IK5ERgOu2MqcOgSFRRQaBYUFFChFV5BAYsZV5dQiMiiiyiJAijcBYsCKPQM5WFtQhwQoFAuMBCgkCE60VGgRu2Mq0OsShZNQhcNNCfjN1CNyylJxCxFZqKhGrCU+oRLSa2XafCpk+xUnRbNugQlpW49LIXYFSTBq5EgeSigOBB3EgME+F6MmEv3Ls3sp7bj6EQPoKdUQ01gY0CBcmjPSW7cP+2a8IOd9wnt0pJUjGdQ2nFCDpv+6Z0k+PFD3TcVujRro5k36AGpnkIGvUSImDGNRIhfeQSBAjdR6SJEY2eYhOjKxyjDr1NclykAI1kuQgfZ6xHl6Qu+NnPUbZM9Qj3xtUEElUXUaj191jBhHxotRTuMv1ufCcz6e+Qan3SZfzWHY9iw37fA5KvRkTc7ZRTLt3/9+Gl2QQgGR2dbNeKU12e0ZZcJ7Jy1KIbxabr1dWBfLUPb2v0iPPvDfqNWrkOe/hOUSLvOBXpMOUyEu/uneEDnnlX12PRUbYctP7sNCqhs9FRFgJtxzKUuuVwngkhH1CxGqHtfk6aD0yEQFhn82aPmVuvgleWp0NjbAvVoV6BADgrcAi8XZYRF+3+/46Cto7VIDoG86fVj0rqADRv0b5URMO0b+hcuRQGdUj3zEGBNtIG2kjBwiRTBtpI/uG0GZfkKoCYytwsUmQRTeSNsiNhucTA2SoFYPzXxY6l3cIiZ2lTp/5rdGladx/Xh+3LuObBs4AAAAASUVORK5CYII="

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA9lBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlBBA0bsAAAAUXRSTlMAAQIEBgcJCgsMDQ4QERIVGR0fICEiIyQnLC0uLzAzOkJKTU9kZmlrbW90dXd4eXt8foOFi4yPkZKaqLe5z9HT2drc3uDk5ujr7e/z9ff5+/30iNzRAAABlElEQVRo3u3ZWVPCMBQF4NNaFQXcFZcqrrjv4r6gSEEF2vz/P+NDlxkR6KVJ6oP3vDbJ99KcSSZAmNGDiicGzcdDaQb0FFoiYZxNk2hkEhtCCGeJhhwKqZRIyKscIo4oiCdSUIRIQQlGWiY1ZX/CXW0AJRhokn/5S3/CnLFNVxIjwEakHOtDsE5VZBAUiYoUgjWaIodgOdpnJ/oQLLoERRbBfDtekUYw3YpV5BFMfYXKqT4Ek58xigoEE43+ihIEuXpfRQ2C8aiU9/UhyFRDxdaHYKQSLFU39SEYfg7W2tKIwHoKDko6EeSCxWZ1Irjxv+2qQvrlURq5IJzGpZE9wlFMGrHTQIyXFBCMvaeAYGinph8BYHQ/J1tKkR4xGWGEgBi0yCDFNvFSem8kRxrkq28hOUK/X68wAjhkZCE5YhMV99rgHc8ItzC38P9C6mm08CpRcW+5hRnhFuYW5hbmFmaEEUYYYYSAqM2fIFUNxlsncq4BOetEsp5yw83+ftlRrXhd3mWRLzcVEs2rfK/nEHX5se433aBNZmw1zKwAAAAASUVORK5CYII="

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA0lBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCLwGkMAAAARXRSTlMAAQIDBAUGBwgJCgsNDxESGhscHR4fICIjJCUmJygpKissLS4wMTg+P0pNUFRdZ3h5ho+RlKWmur7Ays/Z5Obv8/f5+/2SdDsAAAABVUlEQVRo3u3a2VbCQBAE0CQogjsBwX3HXXEXNIrJTP3/L/nigyegTCaTEqXrA3Ifku5TmTOe95nyE7LFy57gGXbITAbkDJZIv2WO9GwRYN8Yie0R7JkiyIHoXQICvUNAoLcJCPQWAYHeJCDQGwTERMmPQK8TEKg1AgK1SkBGKW4QqBYBgWoSECRNAvKT4g5BskJAkDQICJI6AUFcJyCIQwIyXHGN4H3BIdL9LrcOkSwZUyRgICEDeWQguGIgeKgFxSMj0xZEkN9FouVps1Q79six8Zj59shBzmGeMOSIgXRNz5n8cxlGQSYWeW0YbuHZG3vk1HjgS7Ig/xNCefGUT1jWiiB/HOlVTCvRxZiXO9nCmZATxk9QVCubZa4jwyiIIIIIIkhhyGEKeSsCSV81uCsCqaaQsADjfqAKXDo3XqYGC0c7ckqo69LQXlNZXHKWef/Lgz8AEq4GpDAt4LEAAAAASUVORK5CYII="

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAh1BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlDQuOtUAAAALHRSTlMAAgMEBQYICwwOERMUFx0jOz9GSlFSX2JjbG17hYiJi4ydqLnR3uDt8/X7/RuUh+AAAAEkSURBVGje7dnbToNAFIXhpdVKFUWt4hlUkFKd938+72WYqdmHaLr+a5IvEzIzmwAwxvap1blxK+A+mHeHrT0yIjhEhAiRv4IM9saAylwZKl517L9Xfbwf556pR+E+GULoM0oh3vEhZJVS54BMK0pIWtFCkooaklL0kISiiMwrmsisoorMKbrIjKKMxJVToTH5PokqnQypJ3NXfC2loALT4a7Pnvy/b7q6fuGAhFsP5NIBeXV4JwYGdjFO1jeCrg6wg3G4kW3Gtx9IG1vsmfBY+ULeUD4gW4f7pHW4GVuHO75xmFYah7mrcZggG4dZ+MVhqk8bCkiXNXD0KTM6LB+usyf1xdOzoMclGDOsKI0rgDqYV2O0R/j/hAiR/UL4/4QxxuJ9A9+JZ3IGueJhAAAAAElFTkSuQmCC"

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABsFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCRaBZ7AAAAj3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGhsdHh8gISIjJicoKSssLS4wMzQ1Njc4OTs8Pj9CQ0RFSktNTlBRUlRVVlhZXF5fYWRobG1vcHFzdHV3eHx/goWGiImLkZKUl5iam52go6irra+wsrS1ubq8wMHDxcfIys7R19na3N7k5ujp6+3v8fP19/n7/Vr3HEQAAAKCSURBVBgZrcH5N1QBAAXg+55Z0kSUGpUMWrVTKS1SlDaR9rRo075rR1OI0XD/5Tqnnzp3HOa534eFOP87+/HZves9XW0tu7fUr1lZVpqIhUGAv4KwJJYoXZ7ObGk6dKqnf/DdaL4UkbxiEfKIJs8ivEYkKRbjNCLZwGJkEEkHi/ClBJHsffBhjAsxPdBcisWILcu0DuQ4txdt6QAOQRMLGu9rCOHDAh6tgxcLSMIrpHoJsxTVEZjVUlXD7ABVCLPLFF/h9oaiH24zFMdglqLaDLNNVJUw66QKYfaQYhhuExS3YJakOgyzOqoamLVRJWA2QPETbmMUd2CWpDoKswxVDczaqeIwu0+Rhdsvin6YLaE6CLMGqmqYnaQKYfaY4hPcchS9MEtR7YDZVqpymJ2lmIbbS4rHMAtmKDpgVkGVgdkuqjjMeimG4faB4irMQqommKWpKmDWQpGH2w2KJ3DLUnTCLE5VB7NaqjjM2ilG4PaQ4hrcpiiaYZaiWgGzRoqZAGbnKJ7D7S1FF8wCqgaYVVElYbaf4gfcrlPchtsoRSvM4lTVMMtQhTA7QfEZboMUfXDLUeyB2TKqCphto5iGWzfFINyGKI7BLKSqgVmaKgazFopvcLtJcQVuWYo9MEtQVcAsQzEbwOw4xXu4PaLog9s0RTPMqqhWwewMVQxewQ+KHMz2UQ3BKzlJ9QJOiY4JFvC1BC5Lm59wLt/vdjZWhlic5NaLI5xX9l7X9kpEU9s9zAV7gEiCWRbhAiKpZDEOIZKdLEYdIunmf/KT4xO/pnJ5FpZEJG/JiaH7lzr2bkyXJUL8JwjCWNn6fReeTvKfcUSTigeYX0n52vr1q8uTWJA/hGHnz5A/HK0AAAAASUVORK5CYII="

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABfVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAcffURAAAAfnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQXGRoeHyAhIiUmKCkqLS4vMDE1Nzg+QURFRklKTU5PUFFSVFZXWFlbXmJnaGxtb3N3eX5/g4WGiImOj5GSl5ianZ6gpaaoqquwsre5ury+wMHHyMzO09fa3N7g4uTo6evt7/Hz9ff5+/2+M7R2AAACj0lEQVRo3u3Z+VPTQBQH8JeUEEtqBVEUULxb6gWK1gMFEbwQ8VYqh6Ki5RKkSAu0+7c7yW5Ca6DOyPtG6+T9tPuYyYc02euFSIU+Juy4T8CIvBdwpP6rgCMN8wKO7Psu4MjBHwKOtG0IPJIQASB0zr76MPrBXxNiSoO/wv0TOuEHo0YBIPQ3kcYDu4/G3yBjgiMyVZE9gieqIlZNIlqI/EtIlx1XZH/a6RxlRzR/djhE/gAxgkCoZ42ByPdQGGH8F6GduPc5V5h7fSmGM7pXvaHzwsQQ5seKAdoOMRYqp4HNFgAy/etkM6dhTifOHXhKgh2pG3UufDdKWqookaeA3+tkToiU07ohkVn3L715hql+TU71xrM78qItMl0g9kWrLI7I5DxsL2xHRiZHkMgDlTyGQ4wJlZvBHR2O51RqPY5CIo/cTLEdteE+tOQmCq2oXf1Vr//BQh0d+r3BeZZQR4e023liEAppLqm3Kmmvw4ft2Mt+xP4iW0vxrX9+UN3KOxZjnKhDNZvJj7CVPUak8ZK2Q7hiZZsb5EZ0EQBiBIFoQSC0GARyqssfreHpIIwaCv+8afIXn/1j8ZZrTLIVn3dGGFfGnRGr5pFuELIct6JmLOu0JzUQsmAvLXJzsmgQEHnjtDb2IzZ3lh1RogGZOYP8tHFaJvqQtXqr4PRfIT8IaDOq5NFbj0OGvEzxQvXt0i6Q62W5rcfCXHyuWy9Ld6BWlcvjU8sukkUuX9aoUpqgq+QniSShiHr+FxE/k9fqk0gnvxHbHNBVXeKbRNoglc6VdJNORmJWGqUIu3HTN3ye82+7fEbRYkdu+5AU4N06X6oscHdCBkfDwzLjrYUag2bycTYvxGomHUd/Q4Fd+Se9zbVMYAMuWgAAAABJRU5ErkJggg=="

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABFFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCdUZl6AAAAW3RSTlMAAQIDBwgJCwwREhMUFRcYGRobHB8gISMnKCorLi8xMz0+SUpLTlBUVVldXl9hYmNnaICDhYaIi4yRlZeborCytLe5ur7DxcfKzM7P0dPZ3N7p6+3v8fP19/n7hn7oSQAAAdJJREFUaN7tmN03AlEUxU/TiCgzUYqK8lUkhISQQRKDhKL7//8fHkxfM1cvc+61Ws5+3D38VmtmztlnA5BIpH8nNVW+/3ip7OjiEN79DrNkaIIYUyYb0KoYxjsb0nb/p4nEsntFAcBrMpuSPUabYegIoOAwXxULEkdhsC9QO043Y0ESOBAGKY5pYkPOeK4PGVLnuRoypMVzY8iQBs8NI0OueK4fGbLLMdseZEiIY5awX2G4dpoBdIjm8I67syuEw3gAgHWbd6f0pvDmpeFe534AgNwQo6qK2VrJZp9RVETtXyX79PPuloJCo4RPX4z4PRSpSGMrnxYLi32FlYxpfYwBYQwZY0XGgLSP+mr/v2SNW/e6mOYtrWKXMYeztB4BDAnrV5cRJPIyIlFFRriTElOlBG4pp0NZxhGUlnHOSTlMOSd2szu8lrBO7FFlgYpTFhxyao/cQHm0lHCvBU6BsyaqiiqIr6IAQE2X661GJa9ToiKRqHwWWj6jTOHI6PJZbaHsk4OR5TPaZqTymcrnMS+f9/6qfD5Bz8I3TjOIDgn9evwi3vGwYfNqAhoJsD37mqDyeeVt4KELK5+9W8+MMcY+T2eFRonJ+Xh0hspnEok0HvoGC+ShTC/TNBUAAAAASUVORK5CYII="

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlDbLQvCAAAAK3RSTlMAAgMFCAsMDhETFBUXHSAhIiMtLi8/SlFSX2JjZm1ze4KFnbng6O3z9fv9whZhOgAAAStJREFUaN7t2V1PAjEQheFBYYEVgcUPXL9AWai1////aQRkW+ZuOI2R817OzRNC2k6yIoyxc6o/AtcXeQrwHuUDjzgJGSJChMhfQRq80UgFV5qKTx37fz2sl8mkdqc+J8/f83E0KcwnXjPCTTQqzXeXZoCRrYFFdgYU2RtI5NcAIgcDh7QMGNI2UEhkgJDYSJCB0XCqkSCysiG1aqSIDEpDhW4cIfbqgEcuQwak4zIgMvUZEKl8BuRYSZDe/dzQXUdXYuRiYzuM7/pviZGh8Vr51P991FUfKbBHq63gnt+WAlwkJj4DclCgy91ewa6pOwW8cI99BmSrzMDIjzKMnzVvM1bKnXz1eptMrhdvhl66whiwogRXqEvqqavF4RF+PyFC5LwQfj9hjDG9L/DQVRC18NMlAAAAAElFTkSuQmCC"

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABv1BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAhme5xAAAAlHRSTlMAAQIDBAUGBwgJCgsMDhAREhMUFRYXGBkaHB0eHyAhIiMlJicoKissMDEyMzQ1Nzg5OzxCQ0VGR0lKS0xNUFFVVldYWVtdX2FjZ2hrbXBxdHV3eHx/gIKDhomMjo+RkpSVmJqdnqCio6WmqquvsLK0t7q8vsDBw8XHyMrMzs/R09XZ2tze4uTm6Onr7e/x8/X3+fv92eXofwAAAzRJREFUGBntwf1DE3UABvDne9tgA8w5IjMwBCMTTQw1Z0VkJALpEmpiVpSQ0RuUSwtdvkC2Bm66secPtrG72+3lbve93fGL+3zQ0vJCEYFg556uoAJvBF5/bz6xRVXu9vULx3v8cNO+C3+ynvXPj4XgCuX0PVp4MHVAoEkimmYj2bhAM3qStGMfmvAR7XkHjokvabA89lrQB4hQ38TfrBKDU2KRumeTIRi8fIMVVuHUAnUrIVTpe0SDp3BokrorqKV8R4MAHBmkLo66Zlm2F074UtTcF6jvGnWH4MQV6vpgQiSpOQkHOqh7CFOvUDMOB+aoOw9z16iKQZ6So24A5kJULUDecZZFYCHOkhXIu86yPbAQZkkS8jIs64WVVe74F9I6aBCFlWHuyEBaHw3+ghUlx6JNSBuh0auw8gWLEpD2Lo3WYCXQP3z6/KVjkPYhK8zAC2dZ6RQ8cIJVzsJ9B1ntKz/c1s4amTMCLttkrdQZH1w1x3pylyNwUT9NJD/ohFvEFk2tjUfgjo9pJR3rhQvaCrSWntmLpn3KhhInBJrj22JjmakgmjJCOwpzQTTja9pSmPbBOd+oTW8JtLhpKEWPpYaQoudS4C4AdwG4C5Ch557gHD13DlACHlPQ4g/XJeCqyNUCa4XhsuDlbVYbhOtCC6xyEh4YzrPCKXjhQJ5G78MTQzSKwhvTNBiFDF+gPdTZBRvEBsuOQsYSizphwyjLeiFjiUXTsMFXoK4DMm6yKKvAhl+pE5DxO3eMwIYYNQlIuccdd2DDJDWTkPKIJd1obJaafkhZZ8ksGvuRqpwCKQ9YkvOhEbFNVRxy1qi6iEYGqDkIObeoCaOBFaqSkLRKzX0Flg5T8yYk/UzdIqz4U1QtQ9ZPLJuHOfELVek2yFqmwbcCJsQ3VOX3Q9pNGt19CXUFb1G1PQh537PSTAA1lLE8Ven9cGCJVfKxCCqEZ7LU/NYOJxZZa33qjQ6B/4muI5f+YdkncGaMJrKPN7KscDcCpw4t0ZZMVKAJ/iPxJ2zg6UU/mtY9/gfNPYz64I62o/P/sY7bE91wVWgg+tmNxMZmrvBs6/GdH65OvN2joKXlhfEcTA1TnELds/EAAAAASUVORK5CYII="

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA81BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlDKM9ljAAAAUHRSTlMAAQIDBAUHCQwPEBUWFx0eHyAhIiorLS84OjtAR0lMTU9QUlRcZGZoaWtsb3Fzd3iDhYaJjJGSl5qbnaCjpbS+wdHT1dfa5Ovv8fP19/n7/YwhIscAAAGzSURBVGje7ZpJU8JQEIQ7QRQUZXFfEHeDJBgBRcQtxF2D+f+/xgN5oYqMqRwYS3H62nn5Lm9mOlMBRKIJkaaPWaOA6crtmz92PbVWtSHjwPOZ1CsGCP3aZ9TWANL1WbUGAHu8DL+fAdLvzBD/Atj02ZVGhx+yApcfUkGfH3IEfoZvCOQXQ3aymYiyu8rt5qJuJhd21v1Zwp6/GYVc0pOsExYtpXTgXiHWDiEG/ZwR2N9M0/jDEIhABPKfISb9mJkIYiaEOBqZ9J3AXiBfUlCJV4+1h63eMY2IzJ5yPTvqGnaY012LsBt9Gb8CmTCIVyDLSV31KlVuek19TC0izg4hNt0Y7MAm+wH0wD1DrC2tXiACEcgPRyIrEcRKCHHJVKOrzUuRfEkp9nBoD+eJW69FVH8IN2PNqFtrhnuZx1PCbkkkEsjERaI8VU559XFwTMUVraoOk7Wqn0gkEohABPKnIR5/JDpEsKPp0VsitcEhezSK8ZFI2dto82+JlrDBP7SmkHrlZjQAlJkZHzMAcM4LWR5cIU7K55q6a+UXLsbd3PBGp9bbztj/Lni+t0ry64lIlFRfrJk1hGnKZcAAAAAASUVORK5CYII="

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABMlBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCgtID3AAAAZXRSTlMAAQIDBAYHCAsMDg8QExQXGBkcHyAjJCYoKSssLTEyNDc4OkBCRUlKS01OUFFWWVtcXWFiY2Roa21zdHh5gIOFhouUlZqiqKqvsLK0ubzFx8jKzM7P0dPV2tzk6Ovt7/P19/n7/UKwaqAAAAIQSURBVGje7dlrU9NAGAXg07QFLGi5KAUURUBAUItKW0XFgiIXlZulUqTaEs7//wt+aMJsk92aOL7FGfZ8S862TyYzuewGsLGxsbGxsbmK9BX2mxSIe7x6yzeeUDCvW0aRotkAgDEKZwFARRr55SBD8eSQk0fmMCmP5C3yvyNDSh6HBm+rtVq8MBVapO22+S4w9qxHbdVm0lT8GXEO28fegQCCzLnavYQIgodKtQshBGuXTb1HDHG++c0oxBD0u62iAEEE0yTJzxBFUCZZ7xVGnAqZgzCCAbcIcQSjiS4g+ljk+iK1qpdxtfB3VhsRkHuh/50KIEsdj6L3ZwQkXwxdlcGzcrMTsh3ldOU50fajZJVBpOKYjaeMhjT61O0PDCF8YzSyjIhwXznSRWoQjhmM5ElkhO8vt4apRc7SemSd0RHOeBvpH3qEm1pjinGQC2/2ukMDwke62XQzFsJaCgBKNCJuf8hIfGU8hJsA7tKMcC/0uCkwLsJnuNHohLAUMEYYH+H9A3ZEeLvNSJ3+DaKvld2nKbX4SBGktejgZZZCCKdDr5wCSNO/yyUOKYbwi7d3lYIIn8O8GBRAskrWwqPVOtgNAkjXhafYJw7wSXweX8ZSFxYLXl2HZY8uLKrNY0AeGQdq0oabBB5II8u61aB/nK3W43lF0ij7rwCZ0pHIB4GL728H7ecWGxsbGxubK8lvwLSCdxTXckYAAAAASUVORK5CYII="

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAdVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlBBOUZoAAAAJnRSTlMAAwQFDxIUISIjJTRCQ0p0dXd4iYudoKK5usXHzM7Z2vHz9ff7/axzRNIAAAC8SURBVGje7dZJDoJAFIThYrQBxREHcGDs+x/RBdHEDXHRZdTUf4FvV+8BSv1+SWlJlcnDWFliy9HYWWpbAMgtuRzwGzbS+FhYenMc+MgeNz5yxcBHBtgPJESIECFChAiZQGI3z3UsRIgQIUKECBEiRIgQIUKECBHyPpIGTkonEU5CvhCp+UaNio9U2PCRNQwfMcCJbRwBhC3XaEMAMB3T6GbjZkYXnnGOntOcFT1D6Ivs9QR4gfM8KPUf3QHmuxw5jd/C9wAAAABJRU5ErkJggg=="

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(97);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 97 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "vueditor",
    class: [{
      've-fullscreen': _vm.fullscreen
    }].concat(_vm.config.classList),
    attrs: {
      "id": _vm.config.id
    }
  }, [_h('ve-toolbar'), " ", _h('div', {
    staticClass: "ve-container"
  }, [_h('ve-sourcecode'), " ", _h('ve-design', {
    ref: "design"
  })]), " ", _h('ve-picture')])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7cf07ab8", module.exports)
  }
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(100)

/* script */
__vue_exports__ = __webpack_require__(103)

/* template */
var __vue_template__ = __webpack_require__(106)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/emoji.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e9580ee", __vue_options__)
  } else {
    hotAPI.reload("data-v-6e9580ee", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] emoji.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(101);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(4)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6e9580ee!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./emoji.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6e9580ee!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./emoji.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.emoji {\n  width: 276px;\n  margin-left: -120px;\n}\n.emoji .ve-pop-body {\n  max-height: 350px;\n  overflow: auto;\n}\n.emoji .wrap a {\n  float: left;\n  width: 30px;\n  height: 30px;\n  padding: 1px;\n}\n/*icon for toolbar button*/\n.icon-smile-o {\n  background: url(" + __webpack_require__(102) + ") no-repeat;\n}\n", ""]);

// exports


/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twemoji = __webpack_require__(104);

var _twemoji2 = _interopRequireDefault(_twemoji);

var _lang = __webpack_require__(1);

var _rect = __webpack_require__(5);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// To get emoji list for Vueditor, open http://unicode.org/emoji/charts/full-emoji-list.html
// and run the following code in console panel.
// var arr = [];
// [].forEach.call(document.querySelectorAll('.code'), function(node){
//   arr.push(node.children[0].getAttribute('name'))
// });
// console.log(arr);

exports.default = {
  name: 'emoji',
  data: function data() {
    return {
      arr: ['1f600', '1f601', '1f602', '1f923', '1f603', '1f604', '1f605', '1f606', '1f609', '1f60a', '1f60b', '1f60e', '1f60d', '1f618', '1f617', '1f619', '1f61a', '263a', '1f642', '1f917', '1f914', '1f610', '1f611', '1f636', '1f644', '1f60f', '1f623', '1f625', '1f62e', '1f910', '1f62f', '1f62a', '1f62b', '1f634', '1f60c', '1f913', '1f61b', '1f61c', '1f61d', '1f924', '1f612', '1f613', '1f614', '1f615', '1f643', '1f911', '1f632', '2639', '1f641', '1f616', '1f61e', '1f61f', '1f624', '1f622', '1f62d', '1f626', '1f627', '1f628', '1f629', '1f62c', '1f630', '1f631', '1f633', '1f635', '1f621', '1f620', '1f607', '1f920', '1f921', '1f925', '1f637', '1f912', '1f915', '1f922', '1f927'],
      lang: (0, _lang.getLang)('emoji')
    };
  },

  mixins: [_vuex2.default, _rect2.default],
  methods: {
    setActiveComponent: function setActiveComponent(data) {
      this.$store.dispatch(this.mpath + 'setActiveComponent', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    convert: function convert(code) {
      return _twemoji2.default.convert.fromCodePoint(code);
    },
    parseSrc: function parseSrc(str) {
      var div = document.createElement('div');
      div.innerHTML = _twemoji2.default.parse(_twemoji2.default.convert.fromCodePoint(str));
      return div.children[0].src;
    },
    clickHandler: function clickHandler() {
      this.togglePopup(event);
    },
    insertItem: function insertItem(event) {
      var obj = event.target;
      if (obj.tagName.toLowerCase() === 'a') {
        obj = obj.children[0];
      }
      this.execCommand({ name: 'insertHTML', value: obj.outerHTML });
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var location = global.location || {};
/*jslint indent: 2, browser: true, bitwise: true, plusplus: true */
var twemoji = (function (
  /*! Copyright Twitter Inc. and other contributors. Licensed under MIT *//*
    https://github.com/twitter/twemoji/blob/gh-pages/LICENSE
  */

  // WARNING:   this file is generated automatically via
  //            `node twemoji-generator.js`
  //            please update its `createTwemoji` function
  //            at the bottom of the same file instead.

) {
  'use strict';

  /*jshint maxparams:4 */

  var
    // the exported module object
    twemoji = {


    /////////////////////////
    //      properties     //
    /////////////////////////

      // default assets url, by default will be Twitter Inc. CDN
      base: 'https://twemoji.maxcdn.com/2/',

      // default assets file extensions, by default '.png'
      ext: '.png',

      // default assets/folder size, by default "72x72"
      // available via Twitter CDN: 72
      size: '72x72',

      // default class name, by default 'emoji'
      className: 'emoji',

      // basic utilities / helpers to convert code points
      // to JavaScript surrogates and vice versa
      convert: {

        /**
         * Given an HEX codepoint, returns UTF16 surrogate pairs.
         *
         * @param   string  generic codepoint, i.e. '1F4A9'
         * @return  string  codepoint transformed into utf16 surrogates pair,
         *          i.e. \uD83D\uDCA9
         *
         * @example
         *  twemoji.convert.fromCodePoint('1f1e8');
         *  // "\ud83c\udde8"
         *
         *  '1f1e8-1f1f3'.split('-').map(twemoji.convert.fromCodePoint).join('')
         *  // "\ud83c\udde8\ud83c\uddf3"
         */
        fromCodePoint: fromCodePoint,

        /**
         * Given UTF16 surrogate pairs, returns the equivalent HEX codepoint.
         *
         * @param   string  generic utf16 surrogates pair, i.e. \uD83D\uDCA9
         * @param   string  optional separator for double code points, default='-'
         * @return  string  utf16 transformed into codepoint, i.e. '1F4A9'
         *
         * @example
         *  twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3');
         *  // "1f1e8-1f1f3"
         *
         *  twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3', '~');
         *  // "1f1e8~1f1f3"
         */
        toCodePoint: toCodePoint
      },


    /////////////////////////
    //       methods       //
    /////////////////////////

      /**
       * User first: used to remove missing images
       * preserving the original text intent when
       * a fallback for network problems is desired.
       * Automatically added to Image nodes via DOM
       * It could be recycled for string operations via:
       *  $('img.emoji').on('error', twemoji.onerror)
       */
      onerror: function onerror() {
        if (this.parentNode) {
          this.parentNode.replaceChild(createText(this.alt), this);
        }
      },

      /**
       * Main method/logic to generate either <img> tags or HTMLImage nodes.
       *  "emojify" a generic text or DOM Element.
       *
       * @overloads
       *
       * String replacement for `innerHTML` or server side operations
       *  twemoji.parse(string);
       *  twemoji.parse(string, Function);
       *  twemoji.parse(string, Object);
       *
       * HTMLElement tree parsing for safer operations over existing DOM
       *  twemoji.parse(HTMLElement);
       *  twemoji.parse(HTMLElement, Function);
       *  twemoji.parse(HTMLElement, Object);
       *
       * @param   string|HTMLElement  the source to parse and enrich with emoji.
       *
       *          string              replace emoji matches with <img> tags.
       *                              Mainly used to inject emoji via `innerHTML`
       *                              It does **not** parse the string or validate it,
       *                              it simply replaces found emoji with a tag.
       *                              NOTE: be sure this won't affect security.
       *
       *          HTMLElement         walk through the DOM tree and find emoji
       *                              that are inside **text node only** (nodeType === 3)
       *                              Mainly used to put emoji in already generated DOM
       *                              without compromising surrounding nodes and
       *                              **avoiding** the usage of `innerHTML`.
       *                              NOTE: Using DOM elements instead of strings should
       *                              improve security without compromising too much
       *                              performance compared with a less safe `innerHTML`.
       *
       * @param   Function|Object  [optional]
       *                              either the callback that will be invoked or an object
       *                              with all properties to use per each found emoji.
       *
       *          Function            if specified, this will be invoked per each emoji
       *                              that has been found through the RegExp except
       *                              those follwed by the invariant \uFE0E ("as text").
       *                              Once invoked, parameters will be:
       *
       *                                iconId:string     the lower case HEX code point
       *                                                  i.e. "1f4a9"
       *
       *                                options:Object    all info for this parsing operation
       *
       *                                variant:char      the optional \uFE0F ("as image")
       *                                                  variant, in case this info
       *                                                  is anyhow meaningful.
       *                                                  By default this is ignored.
       *
       *                              If such callback will return a falsy value instead
       *                              of a valid `src` to use for the image, nothing will
       *                              actually change for that specific emoji.
       *
       *
       *          Object              if specified, an object containing the following properties
       *
       *            callback   Function  the callback to invoke per each found emoji.
       *            base       string    the base url, by default twemoji.base
       *            ext        string    the image extension, by default twemoji.ext
       *            size       string    the assets size, by default twemoji.size
       *
       * @example
       *
       *  twemoji.parse("I \u2764\uFE0F emoji!");
       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
       *
       *
       *  twemoji.parse("I \u2764\uFE0F emoji!", function(iconId, options) {
       *    return '/assets/' + iconId + '.gif';
       *  });
       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
       *
       *
       * twemoji.parse("I \u2764\uFE0F emoji!", {
       *   size: 72,
       *   callback: function(iconId, options) {
       *     return '/assets/' + options.size + '/' + iconId + options.ext;
       *   }
       * });
       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/72x72/2764.png"/> emoji!
       *
       */
      parse: parse,

      /**
       * Given a string, invokes the callback argument
       *  per each emoji found in such string.
       * This is the most raw version used by
       *  the .parse(string) method itself.
       *
       * @param   string    generic string to parse
       * @param   Function  a generic callback that will be
       *                    invoked to replace the content.
       *                    This calback wil receive standard
       *                    String.prototype.replace(str, callback)
       *                    arguments such:
       *  callback(
       *    rawText,  // the emoji match
       *  );
       *
       *                    and others commonly received via replace.
       */
      replace: replace,

      /**
       * Simplify string tests against emoji.
       *
       * @param   string  some text that might contain emoji
       * @return  boolean true if any emoji was found, false otherwise.
       *
       * @example
       *
       *  if (twemoji.test(someContent)) {
       *    console.log("emoji All The Things!");
       *  }
       */
      test: test
    },

    // used to escape HTML special chars in attributes
    escaper = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    },

    // RegExp based on emoji's official Unicode standards
    // http://www.unicode.org/Public/UNIDATA/EmojiSources.txt
    re = /\ud83d[\udc68-\udc69](?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92])|(?:\ud83c[\udfcb\udfcc]|\ud83d\udd75|\u26f9)(?:\ufe0f|\ud83c[\udffb-\udfff])\u200d[\u2640\u2642]\ufe0f|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd37-\udd39\udd3d\udd3e\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|(?:[\u0023\u002a\u0030-\u0039])\ufe0f?\u20e3|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddd1-\udddd]|[\u270a\u270b])(?:\ud83c[\udffb-\udfff]|)|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud800\udc00|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\udeeb\udeec\udef4-\udef8]|\ud83e[\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd40-\udd45\udd47-\udd4c\udd50-\udd6b\udd80-\udd97\uddc0\uddd0\uddde-\udde6]|[\u23e9-\u23ec\u23f0\u23f3\u2640\u2642\u2695\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a]|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u00a9\u00ae\u203c\u2049\u2122\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2694\u2696\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))/g,

    // avoid runtime RegExp creation for not so smart,
    // not JIT based, and old browsers / engines
    UFE0Fg = /\uFE0F/g,

    // avoid using a string literal like '\u200D' here because minifiers expand it inline
    U200D = String.fromCharCode(0x200D),

    // used to find HTML special chars in attributes
    rescaper = /[&<>'"]/g,

    // nodes with type 1 which should **not** be parsed
    shouldntBeParsed = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,

    // just a private shortcut
    fromCharCode = String.fromCharCode;

  return twemoji;


  /////////////////////////
  //  private functions  //
  //     declaration     //
  /////////////////////////

  /**
   * Shortcut to create text nodes
   * @param   string  text used to create DOM text node
   * @return  Node  a DOM node with that text
   */
  function createText(text) {
    return document.createTextNode(text);
  }

  /**
   * Utility function to escape html attribute text
   * @param   string  text use in HTML attribute
   * @return  string  text encoded to use in HTML attribute
   */
  function escapeHTML(s) {
    return s.replace(rescaper, replacer);
  }

  /**
   * Default callback used to generate emoji src
   *  based on Twitter CDN
   * @param   string    the emoji codepoint string
   * @param   string    the default size to use, i.e. "36x36"
   * @return  string    the image source to use
   */
  function defaultImageSrcGenerator(icon, options) {
    return ''.concat(options.base, options.size, '/', icon, options.ext);
  }

  /**
   * Given a generic DOM nodeType 1, walk through all children
   * and store every nodeType 3 (#text) found in the tree.
   * @param   Element a DOM Element with probably some text in it
   * @param   Array the list of previously discovered text nodes
   * @return  Array same list with new discovered nodes, if any
   */
  function grabAllTextNodes(node, allText) {
    var
      childNodes = node.childNodes,
      length = childNodes.length,
      subnode,
      nodeType;
    while (length--) {
      subnode = childNodes[length];
      nodeType = subnode.nodeType;
      // parse emoji only in text nodes
      if (nodeType === 3) {
        // collect them to process emoji later
        allText.push(subnode);
      }
      // ignore all nodes that are not type 1, that are svg, or that
      // should not be parsed as script, style, and others
      else if (nodeType === 1 && !('ownerSVGElement' in subnode) &&
          !shouldntBeParsed.test(subnode.nodeName.toLowerCase())) {
        grabAllTextNodes(subnode, allText);
      }
    }
    return allText;
  }

  /**
   * Used to both remove the possible variant
   *  and to convert utf16 into code points.
   *  If there is a zero-width-joiner (U+200D), leave the variants in.
   * @param   string    the raw text of the emoji match
   * @return  string    the code point
   */
  function grabTheRightIcon(rawText) {
    // if variant is present as \uFE0F
    return toCodePoint(rawText.indexOf(U200D) < 0 ?
      rawText.replace(UFE0Fg, '') :
      rawText
    );
  }

  /**
   * DOM version of the same logic / parser:
   *  emojify all found sub-text nodes placing images node instead.
   * @param   Element   generic DOM node with some text in some child node
   * @param   Object    options  containing info about how to parse
    *
    *            .callback   Function  the callback to invoke per each found emoji.
    *            .base       string    the base url, by default twemoji.base
    *            .ext        string    the image extension, by default twemoji.ext
    *            .size       string    the assets size, by default twemoji.size
    *
   * @return  Element same generic node with emoji in place, if any.
   */
  function parseNode(node, options) {
    var
      allText = grabAllTextNodes(node, []),
      length = allText.length,
      attrib,
      attrname,
      modified,
      fragment,
      subnode,
      text,
      match,
      i,
      index,
      img,
      rawText,
      iconId,
      src;
    while (length--) {
      modified = false;
      fragment = document.createDocumentFragment();
      subnode = allText[length];
      text = subnode.nodeValue;
      i = 0;
      while ((match = re.exec(text))) {
        index = match.index;
        if (index !== i) {
          fragment.appendChild(
            createText(text.slice(i, index))
          );
        }
        rawText = match[0];
        iconId = grabTheRightIcon(rawText);
        i = index + rawText.length;
        src = options.callback(iconId, options);
        if (src) {
          img = new Image();
          img.onerror = options.onerror;
          img.setAttribute('draggable', 'false');
          attrib = options.attributes(rawText, iconId);
          for (attrname in attrib) {
            if (
              attrib.hasOwnProperty(attrname) &&
              // don't allow any handlers to be set + don't allow overrides
              attrname.indexOf('on') !== 0 &&
              !img.hasAttribute(attrname)
            ) {
              img.setAttribute(attrname, attrib[attrname]);
            }
          }
          img.className = options.className;
          img.alt = rawText;
          img.src = src;
          modified = true;
          fragment.appendChild(img);
        }
        if (!img) fragment.appendChild(createText(rawText));
        img = null;
      }
      // is there actually anything to replace in here ?
      if (modified) {
        // any text left to be added ?
        if (i < text.length) {
          fragment.appendChild(
            createText(text.slice(i))
          );
        }
        // replace the text node only, leave intact
        // anything else surrounding such text
        subnode.parentNode.replaceChild(fragment, subnode);
      }
    }
    return node;
  }

  /**
   * String/HTML version of the same logic / parser:
   *  emojify a generic text placing images tags instead of surrogates pair.
   * @param   string    generic string with possibly some emoji in it
   * @param   Object    options  containing info about how to parse
   *
   *            .callback   Function  the callback to invoke per each found emoji.
   *            .base       string    the base url, by default twemoji.base
   *            .ext        string    the image extension, by default twemoji.ext
   *            .size       string    the assets size, by default twemoji.size
   *
   * @return  the string with <img tags> replacing all found and parsed emoji
   */
  function parseString(str, options) {
    return replace(str, function (rawText) {
      var
        ret = rawText,
        iconId = grabTheRightIcon(rawText),
        src = options.callback(iconId, options),
        attrib,
        attrname;
      if (src) {
        // recycle the match string replacing the emoji
        // with its image counter part
        ret = '<img '.concat(
          'class="', options.className, '" ',
          'draggable="false" ',
          // needs to preserve user original intent
          // when variants should be copied and pasted too
          'alt="',
          rawText,
          '"',
          ' src="',
          src,
          '"'
        );
        attrib = options.attributes(rawText, iconId);
        for (attrname in attrib) {
          if (
            attrib.hasOwnProperty(attrname) &&
            // don't allow any handlers to be set + don't allow overrides
            attrname.indexOf('on') !== 0 &&
            ret.indexOf(' ' + attrname + '=') === -1
          ) {
            ret = ret.concat(' ', attrname, '="', escapeHTML(attrib[attrname]), '"');
          }
        }
        ret = ret.concat('/>');
      }
      return ret;
    });
  }

  /**
   * Function used to actually replace HTML special chars
   * @param   string  HTML special char
   * @return  string  encoded HTML special char
   */
  function replacer(m) {
    return escaper[m];
  }

  /**
   * Default options.attribute callback
   * @return  null
   */
  function returnNull() {
    return null;
  }

  /**
   * Given a generic value, creates its squared counterpart if it's a number.
   *  As example, number 36 will return '36x36'.
   * @param   any     a generic value.
   * @return  any     a string representing asset size, i.e. "36x36"
   *                  only in case the value was a number.
   *                  Returns initial value otherwise.
   */
  function toSizeSquaredAsset(value) {
    return typeof value === 'number' ?
      value + 'x' + value :
      value;
  }


  /////////////////////////
  //  exported functions //
  //     declaration     //
  /////////////////////////

  function fromCodePoint(codepoint) {
    var code = typeof codepoint === 'string' ?
          parseInt(codepoint, 16) : codepoint;
    if (code < 0x10000) {
      return fromCharCode(code);
    }
    code -= 0x10000;
    return fromCharCode(
      0xD800 + (code >> 10),
      0xDC00 + (code & 0x3FF)
    );
  }

  function parse(what, how) {
    if (!how || typeof how === 'function') {
      how = {callback: how};
    }
    // if first argument is string, inject html <img> tags
    // otherwise use the DOM tree and parse text nodes only
    return (typeof what === 'string' ? parseString : parseNode)(what, {
      callback:   how.callback || defaultImageSrcGenerator,
      attributes: typeof how.attributes === 'function' ? how.attributes : returnNull,
      base:       typeof how.base === 'string' ? how.base : twemoji.base,
      ext:        how.ext || twemoji.ext,
      size:       how.folder || toSizeSquaredAsset(how.size || twemoji.size),
      className:  how.className || twemoji.className,
      onerror:    how.onerror || twemoji.onerror
    });
  }

  function replace(text, callback) {
    return String(text).replace(re, callback);
  }

  function test(text) {
    // IE6 needs a reset before too
    re.lastIndex = 0;
    var result = re.test(text);
    re.lastIndex = 0;
    return result;
  }

  function toCodePoint(unicodeSurrogates, sep) {
    var
      r = [],
      c = 0,
      p = 0,
      i = 0;
    while (i < unicodeSurrogates.length) {
      c = unicodeSurrogates.charCodeAt(i++);
      if (p) {
        r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
        p = 0;
      } else if (0xD800 <= c && c <= 0xDBFF) {
        p = c;
      } else {
        r.push(c.toString(16));
      }
    }
    return r.join(sep || '-');
  }

}());
if (!location.protocol) {
  twemoji.base = twemoji.base.replace(/^http:/, "");
}
module.exports = twemoji;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)))

/***/ }),
/* 105 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-emoji"
  }, [_h('div', {
    class: ['ve-icon', {
      've-active': _vm.show,
      've-disabled': _vm.mstates.view !== 'design'
    }],
    attrs: {
      "title": _vm.lang.title
    },
    on: {
      "click": _vm.clickHandler
    }
  }, [_vm._m(0)]), " ", _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    staticClass: "ve-popover emoji",
    style: (_vm.position)
  }, [_vm._m(1), " ", _vm._m(2), " ", _h('div', {
    staticClass: "ve-pop-body"
  }, [_h('div', {
    staticClass: "wrap",
    on: {
      "click": _vm.insertItem
    }
  }, [_vm._l((_vm.arr), function(item) {
    return _h('a', {
      attrs: {
        "href": "javascript:;",
        "draggable": "false"
      }
    }, [_h('img', {
      attrs: {
        "src": _vm.parseSrc(item),
        "alt": _vm.convert(item)
      }
    })])
  })])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('i', {
    staticClass: "icon-smile-o"
  })
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-pop-arrow"
  })
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    staticClass: "ve-pop-header"
  }, ["Insert Emoji"])
}]}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6e9580ee", module.exports)
  }
}

/***/ })
/******/ ]);
});