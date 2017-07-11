/*!
 * vueditor v0.2.5
 * https://github.com/hifarer/vueditor.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vuex"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define("Vueditor", ["vuex", "vue"], factory);
	else if(typeof exports === 'object')
		exports["Vueditor"] = factory(require("vuex"), require("vue"));
	else
		root["Vueditor"] = factory(root["Vuex"], root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  btns: {

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

    foreColor: { className: 'icon-file-text-o' },
    backColor: { className: 'icon-file-text' },
    link: { className: 'icon-link' },
    unLink: { className: 'icon-unlink', action: 'unLink' },
    markdown: { className: 'icon-markdown', action: 'markdown' },
    picture: { className: 'icon-file-image-o' },
    sourceCode: { className: 'icon-code', action: 'sourceCode' },
    table: { className: 'icon-table' },
    undo: { className: 'icon-undo', action: 'undo' },
    redo: { className: 'icon-repeat', action: 'redo' },
    fullscreen: { className: 'icon-fullscreen', action: 'fullscreen' }
  },

  selects: {
    fontName: { className: 'font-select' },
    fontSize: { className: '' },
    element: { className: '' }
  }

};
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(2);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(6);

var _lang2 = _interopRequireDefault(_lang);

var _index = __webpack_require__(7);

var _index2 = _interopRequireDefault(_index);

var _app = __webpack_require__(8);

var _app2 = _interopRequireDefault(_app);

var _states = __webpack_require__(71);

var _states2 = _interopRequireDefault(_states);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add plugins need app components, toolbar btns, store status
function mixinConfig(opts) {
  var config = opts ? Object.assign({}, _index2.default, opts) : _index2.default;
  !config.lang && (config.lang = _lang2.default);
  var list = ['fontName', 'fontSize', 'element', 'foreColor', 'backColor', 'undo', 'table', 'link', 'picture', 'sourceCode', 'markdown', 'fullscreen'];
  return Object.assign({}, _app2.default, {
    store: new _vuex2.default.Store((0, _states2.default)(config)),
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

var createEditor = function createEditor(el, opts) {
  var Editor = _vue2.default.extend(mixinConfig(opts));
  return new Editor().$mount(el);
};

exports.default = {
  install: install,
  createEditor: createEditor
};
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  app: {},

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

  foreColor: {
    title: 'Text color',
    ok: 'ok',
    colorCode: 'Color code',
    invalidColorCodeMsg: 'Please enter the correct color code'
  },
  backColor: {
    title: 'Background color',
    ok: 'ok',
    colorCode: 'Color code',
    invalidColorCodeMsg: 'Please enter the correct color code'
  },
  fontName: {},
  fontSize: {},
  element: {},
  design: {
    ieMsg: 'You must select a text to use this feature in IE browser'
  },
  link: {
    title: 'Add link',
    ok: 'OK'
  },
  unLink: {
    title: 'unlink'
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
  undo: { title: 'Undo' },
  redo: { title: 'Redo' }
};
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  toolbar: ['removeFormat', 'undo', '|', 'element', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough', 'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'table', '|', 'fullscreen', 'sourceCode', 'markdown'],
  fontName: [{ val: 'arial black' }, { val: 'times new roman' }, { val: 'Courier New' }],
  fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'],
  uploadUrl: ''
};
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(70)
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toolbar = __webpack_require__(10);

var _toolbar2 = _interopRequireDefault(_toolbar);

var _design = __webpack_require__(15);

var _design2 = _interopRequireDefault(_design);

var _color = __webpack_require__(18);

var _color2 = _interopRequireDefault(_color);

var _fontname = __webpack_require__(23);

var _fontname2 = _interopRequireDefault(_fontname);

var _fontsize = __webpack_require__(28);

var _fontsize2 = _interopRequireDefault(_fontsize);

var _sourcecode = __webpack_require__(33);

var _sourcecode2 = _interopRequireDefault(_sourcecode);

var _element = __webpack_require__(38);

var _element2 = _interopRequireDefault(_element);

var _table = __webpack_require__(43);

var _table2 = _interopRequireDefault(_table);

var _undo = __webpack_require__(48);

var _undo2 = _interopRequireDefault(_undo);

var _link = __webpack_require__(50);

var _link2 = _interopRequireDefault(_link);

var _picture = __webpack_require__(55);

var _picture2 = _interopRequireDefault(_picture);

var _markdown = __webpack_require__(60);

var _markdown2 = _interopRequireDefault(_markdown);

var _fullscreen = __webpack_require__(67);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

__webpack_require__(69);

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


exports.default = {
  components: {
    've-toolbar': _toolbar2.default,
    've-design': _design2.default,
    've-sourcecode': _sourcecode2.default,
    've-forecolor': _color2.default,
    've-backcolor': _color2.default,
    've-fontname': _fontname2.default,
    've-fontsize': _fontsize2.default,
    've-element': _element2.default,
    've-table': _table2.default,
    've-link': _link2.default,
    've-undo': _undo2.default,
    've-picture': _picture2.default,
    've-markdown': _markdown2.default,
    've-fullscreen': _fullscreen2.default
  },
  computed: {
    fullscreen: function fullscreen() {
      return this.$store.state.fullscreen;
    }
  },
  methods: {
    setContent: function setContent(content) {
      this.$store.dispatch('updateContent', content);
    },
    getContent: function getContent() {
      return this.$store.state.content;
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(11)

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(14)
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-72fb2d04!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./toolbar.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-72fb2d04!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./toolbar.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-toolbar {\n  display: table;\n  width: 100%;\n  font-size: 0;\n  letter-spacing: -4px;\n  background: #fff;\n  border-bottom: 1px solid #ddd;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.ve-toolbar a {\n  position: relative;\n  display: inline-block;\n  padding: 10px 12px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.ve-toolbar a.ve-divider {\n  width: 0;\n  height: 26px;\n  margin: 5px;\n  padding: 0;\n  border-right: 1px solid #ddd;\n  vertical-align: top;\n}\n.ve-toolbar a.ve-active {\n  background: #eee;\n  color: #000;\n}\n.ve-toolbar a:not(.ve-disabled):hover {\n  background: #eee;\n  color: #000;\n}\n.font-select {\n  width: 100px;\n}\n.font-select span {\n  overflow: hidden;\n  white-space: nowrap;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _btns = __webpack_require__(3);

var json = Object.assign({}, _btns.btns, _btns.selects);
// filter no action btn;
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


var arr = [];
for (var name in _btns.btns) {
  !_btns.btns[name].action && arr.push(name);
}

exports.default = {
  data: function data() {
    return {
      btns: _btns.btns,
      selects: _btns.selects,
      config: this.$parent.config.toolbar,
      lang: this.$parent.config.lang
    };
  },

  computed: {
    states: function states() {
      return this.$store.state.toolbar;
    },
    view: function view() {
      return this.$store.state.view;
    }
  },
  watch: {
    'view': function view(val) {
      var states = {};
      for (var _name in json) {
        if (['sourceCode', 'markdown', 'fullscreen'].indexOf(_name) === -1) {
          states[_name] = val === 'design' ? 'default' : 'disabled';
        }
      }
      this.$store.dispatch('updateButtonStates', states);
    }
  },
  methods: {
    btnHandler: function btnHandler(event, name) {
      if (this.states[name].status === 'disabled') return;
      var btn = this.btns[name];
      if (btn.action) {
        if (btn.native) {
          this.$store.dispatch('execCommand', { name: name, value: null });
        } else {
          this.$store.dispatch('callMethod', { name: name, params: null });
          this.updateStates(name);
        }
      } else {
        this.updateStates(name);
      }
      this.showPopup(name, event.currentTarget);
    },
    selectHandler: function selectHandler(event, name) {
      this.showPopup(name, event.currentTarget);
      this.updateStates(name);
    },
    showPopup: function showPopup(name, obj) {
      if (this.states[name].showPopup !== undefined) {
        this.$store.dispatch('updatePopupDisplay', {
          name: name,
          display: !this.states[name].showPopup
        });
        this.$store.dispatch('updateRect', {
          left: obj.offsetLeft,
          top: obj.offsetTop,
          width: obj.offsetWidth,
          height: obj.offsetHeight + parseInt(getComputedStyle(obj).marginTop) + parseInt(getComputedStyle(obj).marginBottom)
        });
      }
    },
    updateStates: function updateStates(name) {
      var states = {};
      // update no action btn status, no action means click on it will toggle a popover menu;
      if (this.view === 'design') {
        for (var item in json) {
          arr.indexOf(item) !== -1 && (states[item] = 'default');
        }
      }
      if (['sourceCode', 'markdown'].indexOf(name) !== -1) {
        states['sourceCode'] = 'default';
        states['markdown'] = 'default';
      }
      if (this.states[name].status !== undefined) {
        this.states[name].status === 'actived' ? states[name] = 'default' : states[name] = 'actived';
      }
      this.$store.dispatch('updateButtonStates', states);
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    ref: "toolbar",
    staticClass: "ve-toolbar"
  }, [_vm._l((_vm.config), function(item) {
    return [(item in _vm.btns) ? _h('a', {
      class: {
        've-active': _vm.states[item].status == 'actived', 've-disabled': _vm.states[item].status == 'disabled'
      },
      attrs: {
        "href": "javascript:;",
        "title": _vm.lang[item].title,
        "unselectable": "on"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.btnHandler($event, item)
        }
      }
    }, [_h('i', {
      class: [_vm.btns[item].className]
    })]) : _vm._e(), (item in _vm.selects) ? _h('a', {
      class: [{
        've-disabled': _vm.states[item].status == 'disabled'
      }, _vm.selects[item].className, 've-select'],
      attrs: {
        "href": "javascript:;",
        "unselectable": "on"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.selectHandler($event, item)
        }
      }
    }, [_h('span', [_vm._s(_vm.states[item].value)]), _h('i', {
      class: {
        've-triangle-down': !_vm.states[item].display, 've-triangle-up': _vm.states[item].display
      }
    })]) : _vm._e(), (item == 'divider' || item == '|') ? _h('a', {
      staticClass: "ve-divider",
      attrs: {
        "href": "javascript:;"
      }
    }) : _vm._e()]
  })])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-72fb2d04", module.exports)
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(16)

/* template */
var __vue_template__ = __webpack_require__(17)
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
  data: function data() {
    return {
      iframeWin: null,
      iframeDoc: null,
      iframeBody: null,
      timer: null,
      inited: false,
      cache: '',
      lang: this.$parent.config.lang.design
    };
  },


  computed: (0, _vuex.mapState)({
    view: 'view',
    content: 'content',
    command: 'command',
    states: 'toolbar'
  }),

  watch: {
    'view': function view(val) {
      if (val !== 'design') {
        clearTimeout(this.timer);
        this.updateContent(this.iframeBody.innerHTML);
      }
    },
    'content': function content(val) {
      if (this.inited) {
        this.iframeBody.innerHTML !== val && (this.iframeBody.innerHTML = val);
        this.view === 'design' && this.updateStates();
      } else {
        this.cache = val;
      }
    },
    'command': function command(data) {
      this.exec(data.name, data.value);
    }
  },

  methods: Object.assign({}, (0, _vuex.mapActions)(['updateContent', 'updateButtonStates', 'updatePopupDisplay', 'callMethod']), {
    init: function init(event) {
      this.iframeWin = event.target.contentWindow;
      this.iframeDoc = this.iframeWin.document;
      this.iframeBody = this.iframeWin.document.body;
      this.inited = true;
      if (this.cache) {
        this.iframeBody.innerHTML !== this.cache && (this.iframeBody.innerHTML = this.cache);
        this.cache = '';
      }
      this.iframeDoc.designMode = 'on';
      this.iframeBody.style.cssText = 'overflow-x: hidden;';
      this.addEvent();
    },


    // init, selection change
    updateStates: function updateStates() {
      var json = {};
      for (var name in this.states) {
        if (['redo', 'undo'].indexOf(name) === -1) {
          if (this.iframeDoc.queryCommandSupported(name)) {
            json[name] = this.iframeDoc.queryCommandState(name) ? 'actived' : 'default';
          } else if (name !== 'fullscreen') {
            json[name] = 'default';
          }
        }
      }
      this.updateButtonStates(json);
    },
    addEvent: function addEvent() {
      var _this = this;

      var timer = null;
      this.iframeDoc.addEventListener('click', function () {
        // throttle
        clearTimeout(timer);
        timer = setTimeout(function () {
          _this.view === 'design' && _this.updatePopupDisplay();
        }, 200);
        // dispatch selectionchange event in order to throttle
        _this.iframeDoc.dispatchEvent(new Event('selectionchange'));
      }, false);
      this.iframeBody.addEventListener('keydown', this.keydownHandler, false);
      this.iframeBody.addEventListener('keyup', this.keyupHandler, false);
      this.selectionChange();
    },
    keydownHandler: function keydownHandler(event) {
      if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
        event.preventDefault();
        event.keyCode === 89 && this.callMethod({ name: 'redo' });
        event.keyCode === 90 && this.callMethod({ name: 'undo' });
      }
    },
    keyupHandler: function keyupHandler(event) {
      var _this2 = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this2.updateContent(_this2.iframeBody.innerHTML);
      }, 500);
    },
    selectionChange: function selectionChange() {
      var _this3 = this;

      var timer = null;
      this.iframeDoc.addEventListener('selectionchange', function () {
        // throttle
        clearTimeout(timer);
        timer = setTimeout(function () {
          _this3.view === 'design' && _this3.updateStates();
        }, 200);
      }, false);
      if (!'onselectionchange' in document) {
        var oSel = this.iframeWin.getSelection();
        var focusOffset = -1;
        setInterval(function () {
          if (oSel && oSel.rangeCount) {
            if (focusOffset !== oSel.focusOffset) {
              focusOffset = oSel.focusOffset;
              _this3.view === 'design' && _this3.updateStates();
            }
          } else {
            oSel = _this3.iframeWin.getSelection();
          }
        }, 200);
      }
    },
    exec: function exec(name, value) {
      if (document.queryCommandSupported('styleWithCss')) {
        this.iframeDoc.execCommand('styleWithCss', false, true);
      }
      this[name] ? this[name](name, value) : this.iframeDoc.execCommand(name, false, value);
      this.updateContent(this.iframeBody.innerHTML);
    },
    insertHTML: function insertHTML(name, value) {
      var oSel = this.iframeWin.getSelection();
      var oRange = this.getRange();
      if (!oRange) return;
      var node = null;
      var frag = this.iframeDoc.createDocumentFragment();
      var obj = this.iframeDoc.createElement('div');
      obj.innerHTML = value;
      while (obj.firstChild) {
        node = obj.firstChild;
        frag.appendChild(node);
      }
      oRange.insertNode(frag);
      oRange.setStartAfter(node);
      oRange.collapse(true);
      oSel.removeAllRanges();
      oSel.addRange(oRange);
    },
    fontSize: function fontSize(name, value) {
      var _this4 = this;

      var selection = this.iframeWin.getSelection();
      var range = this.getRange();
      if (!range || range.collapsed) {
        return;
      }
      var childNodes = range.cloneContents().childNodes;
      if (childNodes.length === 1 && childNodes[0].nodeType === 1 && childNodes[0].tagName.toLowerCase() === 'span') {
        var span = range.extractContents().childNodes[0];
        span.style.fontSize = value;
        range.insertNode(span);
        range.selectNode(span);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        if (navigator.userAgent.indexOf('Chrome') !== -1 && navigator.userAgent.indexOf('Edge') === -1) {
          if (document.queryCommandSupported('styleWithCss')) {
            this.iframeDoc.execCommand('styleWithCss', false, true);
          }
          this.iframeDoc.execCommand('fontSize', false, 7);
          var container = range.commonAncestorContainer;
          container.nodeType === 3 && (container = container.parentNode);
          container.tagName.toLowerCase() === 'span' && (container = container.parentNode);
          Array.prototype.forEach.call(container.getElementsByTagName('span'), function (span) {
            if (span.style.fontSize.trim() === '-webkit-xxx-large' || span.style.fontSize.trim() === 'xx-large') {
              span.style.fontSize = value;
            }
            span.normalize();
          });
        } else {
          if (document.queryCommandSupported('styleWithCss')) {
            this.iframeDoc.execCommand('styleWithCss', false, false);
          }
          this.iframeDoc.execCommand('fontSize', false, 7);

          var fontList = [],
              spanList = [];
          var _container = range.commonAncestorContainer;
          _container.nodeType === 3 && (_container = _container.parentNode);
          _container.tagName.toLowerCase() === 'font' && (_container = _container.parentNode);
          fontList = _container.getElementsByTagName('font');

          var _loop = function _loop(_i) {
            var font = fontList[_i];
            var span = document.createElement('span');
            Array.prototype.forEach.call(font.attributes, function (attr) {
              attr.nodeName === 'size' ? span.style.fontSize = value : span.setAttribute(attr.nodeName, attr.nodeValue);
            });
            span.innerHTML = font.innerHTML;
            span.querySelectorAll('span').length !== 0 && _this4.formatContent(span, 'span', 'fontSize');
            span.normalize();
            font.parentNode.replaceChild(span, font);
            spanList.push(span);
            _i--;
            i = _i;
          };

          for (var i = 0; i < fontList.length; i++) {
            _loop(i);
          }
          range.setStartBefore(spanList[0]);
          range.setEndAfter(spanList[spanList.length - 1]);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    },
    formatBlock: function formatBlock(name, value) {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)) {
        var range = this.getRange();
        if (!range || range.collapsed) {
          alert(this.lang.ieMsg);
        } else {
          this.iframeDoc.execCommand('formatblock', false, '<' + value.toUpperCase() + '>');
        }
      } else {
        this.iframeDoc.execCommand('formatblock', false, value);
      }
    },
    formatContent: function formatContent(obj, tagName, cssName) {
      var temp = [];
      var pattern = { fontSize: /font\-size:\s?\d+px;/g, verticalAlign: /vertical\-align:\s?(sub|super);/g };
      var nodeList = obj.getElementsByTagName(tagName);
      for (var _i2 = 0; _i2 < nodeList.length; _i2++) {
        var node = nodeList[_i2];
        if (node.attributes.length === 1 && node.style.length !== 0 && node.getAttribute('style').match(pattern[cssName]) != null) {
          if (node.children.length === 0) {
            if (node.style.length === 1) {
              var parent = node.parentNode;
              parent.replaceChild(document.createTextNode(node.innerHTML), node);
              parent.normalize();
              _i2--;
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
    getRange: function getRange() {
      var oSel = void 0,
          oRange = void 0;
      if (this.iframeWin.getSelection) {
        oSel = this.iframeWin.getSelection();
        if (oSel && oSel.rangeCount !== 0) {
          oRange = oSel.getRangeAt(0);
        }
      }
      return oRange;
    },
    setRange: function setRange(range) {
      var oSel = void 0;
      if (this.iframeWin.getSelection) {
        oSel = this.iframeWin.getSelection();
        oSel.removeAllRanges();
        oSel.addRange(range);
      }
    },
    removeRange: function removeRange() {
      var oSel = void 0;
      if (this.iframeWin.getSelection) {
        oSel = this.iframeWin.getSelection();
        oSel.removeAllRanges();
      }
    },
    rangeValid: function rangeValid() {
      var range = this.getRange();
      return range && !range.collapsed;
    },
    unlink: function unlink() {
      var range = this.getRange();
      var container = range.commonAncestorContainer;
      if (container.nodeType === 3) {
        container = container.parentNode;
      }
      if (container.tagName === 'A') {
        var newRange = document.createRange();
        newRange.selectNode(container);
        this.setRange(newRange);
        this.exec('Unlink', null);
        this.removeRange(newRange);
      } else {
        this.exec('Unlink', null);
      }
    }
  })
}; //
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.view === 'design'),
      expression: "view === 'design'"
    }],
    staticClass: "ve-design"
  }, [_h('iframe', {
    attrs: {
      "src": "about:blank",
      "frameborder": "0"
    },
    on: {
      "load": _vm.init
    }
  })])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-221fbb0b", module.exports)
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(19)


/* script */
__vue_exports__ = __webpack_require__(21)

/* template */
var __vue_template__ = __webpack_require__(22)
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4b79cfb4!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./color.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4b79cfb4!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./color.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.BH5VIImEflZEIMp8CUs9a_0 {\n  width: 176px;\n  padding: 10px;\n  position: absolute;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n.BH5VIImEflZEIMp8CUs9a_0 li {\n  margin: 1px;\n  float: left;\n}\n.BH5VIImEflZEIMp8CUs9a_0 li a {\n  display: block;\n  width: 20px;\n  height: 20px;\n}\n._2I3u1DXeoSlgjP3cgM98ux_0 {\n  max-width: calc(100% - 35px);\n}\n.pxqHdCdhgQ9rrysEhrJgk_0 {\n  line-height: 16px;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "BH5VIImEflZEIMp8CUs9a_0",
	"input": "_2I3u1DXeoSlgjP3cgM98ux_0",
	"btn": "pxqHdCdhgQ9rrysEhrJgk_0"
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(103);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    var lang = this.$parent.config.lang[this.tagName];
    return {
      colors: ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF', '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'],
      color: '',
      lang: lang
    };
  },

  computed: {
    showPopup: function showPopup(state) {
      return this.$store.state.toolbar[this.tagName].showPopup;
    }
  },
  methods: {
    updatePopupDisplay: function updatePopupDisplay() {
      this.$store.dispatch('updatePopupDisplay');
    },
    checkValid: function checkValid(color) {
      var sColor = color.replace(/\s+/g, '');
      var hsl3 = /^#[0-9a-f]{3}$/i,
          hsl6 = /^#[0-9a-f]{6}$/i,
          rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/;
      if (hsl3.test(sColor) || hsl6.test(sColor) || rgb.test(sColor)) {
        return true;
      }
    },
    setColor: function setColor(type, color) {
      this.$store.dispatch('execCommand', { name: type, value: color });
    },
    clickHandler: function clickHandler(color) {
      this.setColor(this.tagName, color);
      this.updatePopupDisplay();
    },
    inputHandler: function inputHandler() {
      var color = this.color;
      var valid = this.checkValid(color);
      if (!valid) {
        alert(this.lang.invalidColorCodeMsg);
      } else {
        this.setColor(this.tagName, color);
        this.updatePopupDisplay();
      }
      this.color = '';
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


module.exports = exports['default'];

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPopup),
      expression: "showPopup"
    }],
    staticClass: "ve-color-picker",
    class: _vm.$style.ctn,
    style: (_vm.style)
  }, [_h('div', {
    staticClass: "ve-input-box"
  }, [_h('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.color),
      expression: "color"
    }],
    staticClass: "ve-input",
    class: _vm.$style.input,
    attrs: {
      "type": "text",
      "placeholder": _vm.lang.colorCode
    },
    domProps: {
      "value": _vm._s(_vm.color)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.color = $event.target.value
      }
    }
  }), _h('button', {
    staticClass: "ve-btn",
    class: _vm.$style.input,
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.inputHandler
    }
  }, [_vm._s(_vm.lang.ok)])]), _h('ul', [_vm._l((_vm.colors), function(color, index) {
    return _h('li', {
      key: index,
      on: {
        "click": function($event) {
          _vm.clickHandler(color)
        }
      }
    }, [_h('a', {
      style: ({
        background: color
      }),
      attrs: {
        "href": "javascript:;",
        "title": color
      }
    })])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4b79cfb4", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(24)


/* script */
__vue_exports__ = __webpack_require__(26)

/* template */
var __vue_template__ = __webpack_require__(27)
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-24d9f967!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fontname.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-24d9f967!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fontname.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n._3K88AeqPM5bvUs73oXJS4i_0 li {\n  padding: 6px;\n  border-bottom: 1px solid #ddd;\n}\n._3K88AeqPM5bvUs73oXJS4i_0 li:last-child {\n  border-bottom: none;\n}\n._3K88AeqPM5bvUs73oXJS4i_0 li:hover {\n  background: #d5e1f2;\n  border-color: #a3bde3;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "_3K88AeqPM5bvUs73oXJS4i_0"
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(103);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    var arr = this.$parent.config.fontName;
    return {
      fonts: arr,
      val: arr[0].abbr || arr[0].val
    };
  },

  computed: {
    showPopup: function showPopup() {
      return this.$store.state.toolbar.fontName.showPopup;
    }
  },
  mounted: function mounted() {
    this.$store.dispatch('updateSelectValue', { name: 'fontName', value: this.val });
  },

  methods: {
    clickHandler: function clickHandler(font) {
      this.val = font.abbr || font.val;
      this.$store.dispatch('execCommand', { name: 'fontName', value: font.val + ', sans-serif' });
      this.$store.dispatch('updateSelectValue', { name: 'fontName', value: this.val });
      this.$store.dispatch('updatePopupDisplay');
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


module.exports = exports['default'];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPopup),
      expression: "showPopup"
    }],
    staticClass: "ve-dropdown",
    class: _vm.$style.ctn,
    style: (_vm.style)
  }, [_h('ul', [_vm._l((_vm.fonts), function(font, index) {
    return _h('li', {
      key: index,
      on: {
        "click": function($event) {
          _vm.clickHandler(font)
        }
      }
    }, [_h('a', {
      style: ({
        fontFamily: font.val + ', sans-serif'
      }),
      attrs: {
        "href": "javascript:;"
      }
    }, [_vm._s(font.abbr || font.val)])])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24d9f967", module.exports)
  }
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(29)


/* script */
__vue_exports__ = __webpack_require__(31)

/* template */
var __vue_template__ = __webpack_require__(32)
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
    hotAPI.createRecord("data-v-2cbe9846", __vue_options__)
  } else {
    hotAPI.reload("data-v-2cbe9846", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] fontsize.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2cbe9846!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fontsize.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2cbe9846!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fontsize.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.LgCpYevw8jVsOH4KQwNEX_0 li {\n  padding: 6px;\n  border-bottom: 1px solid #ddd;\n}\n.LgCpYevw8jVsOH4KQwNEX_0 li:last-child {\n  border-bottom: none;\n}\n.LgCpYevw8jVsOH4KQwNEX_0 li:hover {\n  background: #d5e1f2;\n  border-color: #a3bde3;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "LgCpYevw8jVsOH4KQwNEX_0"
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(103);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    var arr = this.$parent.config.fontSize;
    return {
      fontSize: arr,
      val: arr[0]
    };
  },

  computed: {
    showPopup: function showPopup() {
      return this.$store.state.toolbar.fontSize.showPopup;
    }
  },
  mounted: function mounted() {
    this.$store.dispatch('updateSelectValue', { name: 'fontSize', value: this.val });
  },

  methods: {
    clickHandler: function clickHandler(size) {
      this.val = size;
      this.$store.dispatch('execCommand', { name: 'fontSize', value: size });
      this.$store.dispatch('updateSelectValue', { name: 'fontSize', value: size });
      this.$store.dispatch('updatePopupDisplay');
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


module.exports = exports['default'];

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPopup),
      expression: "showPopup"
    }],
    staticClass: "ve-dropdown",
    class: _vm.$style.ctn,
    style: (_vm.style)
  }, [_h('ul', [_vm._l((_vm.fontSize), function(size, index) {
    return _h('li', {
      key: index,
      on: {
        "click": function($event) {
          _vm.clickHandler(size)
        }
      }
    }, [_h('a', {
      attrs: {
        "href": "javascript:;"
      }
    }, [_vm._s(size)])])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2cbe9846", module.exports)
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(34)


/* script */
__vue_exports__ = __webpack_require__(36)

/* template */
var __vue_template__ = __webpack_require__(37)
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.Az9ECxXf2bg0saab-HJuY_0 {\n  /*safari*/\n  position: absolute;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: block;\n  width: 100%;\n  height: 100%;\n  padding: 8px;\n  outline: none;\n  border: none;\n  resize: none;\n  font-size: 14px;\n}\n", ""]);

// exports
exports.locals = {
	"editor": "Az9ECxXf2bg0saab-HJuY_0"
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
  data: function data() {
    return {
      currentView: 'design'
    };
  },

  computed: (0, _vuex.mapState)(['view', 'content', 'callee']),
  watch: {
    'view': function view(val) {
      if (val !== 'sourceCode' && this.currentView === 'sourceCode') {
        this.updateContent(this.$refs.codemirror.value);
      }
      this.currentView = val;
    },
    'callee': function callee(val) {
      if (val.name === 'sourceCode') {
        this.switchView(this.view == 'sourceCode' ? 'design' : 'sourceCode');
        this.updatePopupDisplay();
      }
    }
  },
  methods: (0, _vuex.mapActions)(['switchView', 'updateContent', 'updatePopupDisplay'])
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.view === 'sourceCode'),
      expression: "view === 'sourceCode'"
    }],
    staticClass: "ve-code"
  }, [_h('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.content),
      expression: "content"
    }],
    ref: "codemirror",
    class: _vm.$style.editor,
    domProps: {
      "value": _vm._s(_vm.content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.content = $event.target.value
      }
    }
  })])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-09c93255", module.exports)
  }
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(39)


/* script */
__vue_exports__ = __webpack_require__(41)

/* template */
var __vue_template__ = __webpack_require__(42)
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
    hotAPI.createRecord("data-v-fb1b5702", __vue_options__)
  } else {
    hotAPI.reload("data-v-fb1b5702", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] element.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-fb1b5702!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./element.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-fb1b5702!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./element.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n._3vHBjPXBhHQPBNIroIW5cW_0 a {\n  display: block;\n  padding: 6px;\n  border-bottom: 1px solid #ddd;\n}\n._3vHBjPXBhHQPBNIroIW5cW_0 a:last-child {\n  border-bottom: none;\n}\n._3vHBjPXBhHQPBNIroIW5cW_0 a:hover {\n  background: #d5e1f2;\n  border-color: #a3bde3;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "_3vHBjPXBhHQPBNIroIW5cW_0"
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(103);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    return {
      arr: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      val: 'p'
    };
  },

  computed: {
    showPopup: function showPopup() {
      return this.$store.state.toolbar.element.showPopup;
    }
  },
  mounted: function mounted() {
    this.$store.dispatch('updateSelectValue', { name: 'element', value: this.val });
  },

  methods: {
    selectItem: function selectItem(event) {
      var tagName = event.target.innerHTML.trim();
      this.val = tagName;
      this.$store.dispatch('execCommand', { name: 'formatBlock', value: tagName });
      this.$store.dispatch('updateSelectValue', { name: 'element', value: tagName });
      this.$store.dispatch('updatePopupDisplay');
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPopup),
      expression: "showPopup"
    }],
    staticClass: "ve-dropdown",
    class: _vm.$style.ctn,
    style: (_vm.style),
    on: {
      "click": _vm.selectItem
    }
  }, [_vm._l((_vm.arr), function(item, index) {
    return _h('a', {
      key: index,
      attrs: {
        "href": "javascript:;"
      }
    }, [_vm._s(item)])
  })])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fb1b5702", module.exports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(44)

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-24ac11de!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-24ac11de!../../node_modules/less-loader/dist/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./table.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-table {\n  width: 192px;\n  padding: 10px;\n  position: absolute;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n.ve-table li a {\n  width: 20px;\n  height: 20px;\n  margin: 1px;\n  float: left;\n  border: 1px solid #ddd;\n}\n.ve-table li a.active {\n  background: #F7F7F7;\n}\n", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(103);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    return {
      num: 64,
      x: -1,
      y: -1,
      lang: this.$parent.config.lang.table
    };
  },

  computed: {
    showPopup: function showPopup() {
      return this.$store.state.toolbar.table.showPopup;
    }
  },
  methods: {
    overHandler: function overHandler(index) {
      this.x = index % 8;
      this.y = parseInt(index / 8);
    },
    clickHandler: function clickHandler(index) {
      var html = this.createTable(this.x + 1, this.y + 1);
      this.$store.dispatch('execCommand', { name: 'insertHTML', value: html });
      this.$store.dispatch('updatePopupDisplay');
    },
    createTable: function createTable(rows, cols) {
      var oTable = document.createElement('table');
      var oTbody = document.createElement('tbody');
      oTable.style.cssText = 'border-collapse: collapse;';
      oTable.appendChild(oTbody);
      for (var i = 0; i < rows; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < cols; j++) {
          var td = document.createElement('td');
          td.innerHTML = '<br>';
          td.style.cssText = 'width: 50px; border: 1px #ddd solid;';
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPopup),
      expression: "showPopup"
    }],
    staticClass: "ve-table",
    style: (_vm.style)
  }, [_h('ul', [_vm._l((_vm.num), function(i) {
    return _h('li', {
      key: i,
      on: {
        "mouseover": function($event) {
          _vm.overHandler(i - 1)
        },
        "click": function($event) {
          _vm.clickHandler(i - 1)
        }
      }
    }, [_h('a', {
      class: {
        'active': ((i - 1) % 8 <= _vm.x && parseInt((i - 1) / 8) <= _vm.y)
      },
      attrs: {
        "href": "javascript:;"
      }
    })])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24ac11de", module.exports)
  }
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(49)
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
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/undo.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1234b871", __vue_options__)
  } else {
    hotAPI.reload("data-v-1234b871", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] undo.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(2);

exports.default = {
  render: function render() {
    return '';
  },
  data: function data() {
    return {
      stack: [],
      index: -1
    };
  },

  computed: {
    view: function view() {
      return this.$store.state.view;
    },
    content: function content() {
      return this.$store.state.content;
    },
    callee: function callee() {
      return this.$store.state.callee;
    },
    canUndo: function canUndo() {
      return this.index > 0;
    },
    canRedo: function canRedo() {
      return this.index < this.stack.length - 1;
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
    'callee': function callee(_ref) {
      var name = _ref.name,
          params = _ref.params;

      if (['undo', 'redo'].indexOf(name) !== -1) {
        this[name]();
      }
    }
  },
  methods: Object.assign({}, (0, _vuex.mapActions)(['updateContent', 'updateButtonStates']), {
    undo: function undo() {
      if (!this.canUndo) return;
      this.index--;
      this.updateContent(this.stack[this.index]);
    },
    redo: function redo() {
      if (!this.canRedo) return;
      this.index++;
      this.updateContent(this.stack[this.index]);
    },
    push: function push(content) {
      if (content != this.stack[this.index]) {
        this.stack = this.stack.slice(0, this.index + 1);
        this.stack.push(content);
        this.index++;
      }
      this.updateButtonStates({
        undo: this.canUndo ? 'default' : 'disabled',
        redo: this.canRedo ? 'default' : 'disabled'
      });
    }
  })
}; //


module.exports = exports['default'];

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(51)


/* script */
__vue_exports__ = __webpack_require__(53)

/* template */
var __vue_template__ = __webpack_require__(54)
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(52);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n._2qQIGssouc5rC2EqnMDVyK_0 {\n  width: 240px;\n  height: 90px;\n  margin-left: -102px;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "_2qQIGssouc5rC2EqnMDVyK_0"
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixins = __webpack_require__(103);

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_mixins2.default],
  data: function data() {
    return {
      val: '',
      lang: this.$parent.config.lang.link
    };
  },

  computed: {
    showPopup: function showPopup() {
      return this.$store.state.toolbar.link.showPopup;
    },
    callee: function callee() {
      return this.$store.state.callee;
    }
  },
  watch: {
    'callee': function callee(val) {
      val.name == 'unLink' && this.unLinkHandler();
    }
  },
  methods: {
    checkValid: function checkValid() {
      var href = this.val;
      href.match(/^https?:\/\//igm) === null && (href = 'http://' + href);
      return href;
    },
    linkHandler: function linkHandler() {
      var href = this.checkValid();
      this.$store.dispatch('execCommand', { name: 'createlink', value: href });
      this.$store.dispatch('updatePopupDisplay');
    },
    unLinkHandler: function unLinkHandler() {
      this.$store.dispatch('execCommand', { name: 'unlink', value: null });
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


module.exports = exports['default'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPopup),
      expression: "showPopup"
    }],
    staticClass: "ve-popover",
    class: _vm.$style.ctn,
    style: (_vm.style)
  }, [_h('div', {
    staticClass: "ve-pop-arrow"
  }), _h('div', {
    staticClass: "ve-pop-header"
  }, [_vm._s(_vm.lang.title)]), _h('div', {
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
  }), _h('button', {
    staticClass: "ve-btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.linkHandler
    }
  }, [_vm._s(_vm.lang.ok)])])])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-73a31487", module.exports)
  }
}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(56)


/* script */
__vue_exports__ = __webpack_require__(58)

/* template */
var __vue_template__ = __webpack_require__(59)
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(57);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n._2T9WD2D47RUUwZfCP40fYJ_0 {\n  width: 500px;\n  position: relative;\n  top: 50%;\n  background: #fff;\n  margin: 0 auto;\n  -webkit-transform: translateY(-60%);\n      -ms-transform: translateY(-60%);\n          transform: translateY(-60%);\n}\n", ""]);

// exports
exports.locals = {
	"wrap": "_2T9WD2D47RUUwZfCP40fYJ_0"
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  data: function data() {
    return {
      lang: this.$parent.config.lang.picture
    };
  },

  computed: {
    showPopup: function showPopup() {
      return this.$store.state.toolbar.picture.showPopup;
    }
  },
  watch: {
    'showPopup': function showPopup(val) {
      if (val) {
        document.body.classList.add('ve-fixed');
      } else {
        document.body.classList.remove('ve-fixed');
      }
    }
  },
  methods: {
    hideDialog: function hideDialog() {
      this.$store.dispatch('updatePopupDisplay');
    },
    certainHandler: function certainHandler(event) {
      var _this = this;

      var url = '';
      var obj = this.$refs.file;
      var form = this.$refs.form;
      var fileuploadUrl = this.$parent.config.fileuploadUrl;
      if (navigator.userAgent.indexOf('MSIE') >= 1) {
        // IE
        url = obj.value;
      } else {
        if (obj.files.length != 0 && obj.files.item(0).type.indexOf('image') != -1) {
          url = window.URL.createObjectURL(obj.files.item(0));
        }
      }
      if (url) {
        if (this.$parent.upload) {
          this.$parent.upload(obj).then(function (href) {
            _this.$store.dispatch('execCommand', { name: 'insertHTML', value: '<img src="' + href + '">' });
            _this.hideDialog();
          }, function (err) {
            throw err;
          });
        } else if (fileuploadUrl) {
          var formData = new FormData(form);
          var xhr = new XMLHttpRequest();
          xhr.open('POST', fileuploadUrl);
          xhr.send(formData);
          xhr.onload = function () {
            this.$store.dispatch('execCommand', { name: 'insertHTML', value: '<img src="' + xhr.responseText + '">' });
            this.hideDialog();
          }.bind(this);
          xhr.onerror = function (err) {
            alert(err);
          };
        } else {
          this.$store.dispatch('execCommand', { name: 'insertHTML', value: '<img src="' + url + '">' });
          this.hideDialog();
        }
      } else {
        alert(this.lang.invalidFile);
      }
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showPopup),
      expression: "showPopup"
    }],
    staticClass: "ve-dialog",
    on: {
      "click": _vm.hideDialog
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
  }, ["×"])]), _h('div', {
    staticClass: "ve-dialog-body"
  }, [_h('form', {
    ref: "form"
  }, [_h('input', {
    ref: "file",
    attrs: {
      "type": "file",
      "name": "image"
    }
  })])]), _h('div', {
    staticClass: "ve-dialog-footer"
  }, [_h('div', {
    staticClass: "ve-btn-box"
  }, [_h('button', {
    staticClass: "ve-btn",
    on: {
      "click": _vm.hideDialog
    }
  }, [_vm._s(_vm.lang.cancel)]), _h('button', {
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(61)


/* script */
__vue_exports__ = __webpack_require__(63)

/* template */
var __vue_template__ = __webpack_require__(66)
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
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/markdown.vue"
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
    hotAPI.createRecord("data-v-8f674708", __vue_options__)
  } else {
    hotAPI.reload("data-v-8f674708", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] markdown.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(62);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(1)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8f674708!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./markdown.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8f674708!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./markdown.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-md {\n  position: relative;\n}\n._31sjThh4deXX0g3ehqSZ2p_0 {\n  width: 50%;\n  height: 100%;\n  padding: 8px;\n  position: absolute;\n  outline: none;\n  resize: none;\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow-y: auto;\n  font-size: 14px;\n  border-right: 1px solid #ddd;\n}\n._3ytmOLXduY0FY9-B7Npk6S_0 {\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  right: 0;\n}\n", ""]);

// exports
exports.locals = {
	"editor": "_31sjThh4deXX0g3ehqSZ2p_0",
	"iframe": "_3ytmOLXduY0FY9-B7Npk6S_0"
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _marked = __webpack_require__(64);

var _marked2 = _interopRequireDefault(_marked);

var _vuex = __webpack_require__(2);

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


exports.default = {
  data: function data() {
    return {
      md: '',
      el: null,
      doc: null,
      top: 0,
      currentView: 'design'
    };
  },

  computed: {
    view: function view() {
      return this.$store.state.view;
    },
    content: function content() {
      return this.$store.state.content;
    },
    callee: function callee() {
      return this.$store.state.callee;
    }
  },
  watch: {
    'view': function view(val) {
      if (val !== 'markdown' && this.currentView === 'markdown') {
        this.updateContent(this.doc.body.innerHTML);
      } else {
        this.md = this.content;
        this.update();
      }
      this.currentView = val;
    },
    'callee': function callee(val) {
      if (val.name === 'markdown') {
        this.switchView(this.view == 'markdown' ? 'design' : 'markdown');
        this.updatePopupDisplay();
      }
    }
  },
  methods: Object.assign({}, (0, _vuex.mapActions)(['switchView', 'updateContent', 'updatePopupDisplay']), {
    init: function init(event) {
      this.el = event.target;
      this.doc = event.target.contentDocument;
      this.addEvent();
    },
    update: function update() {
      this.doc.body.innerHTML = (0, _marked2.default)(this.md.trim());
    },
    addEvent: function addEvent() {
      this.doc.addEventListener('scroll', this.scrollHandler.bind(this, 'iframe'), false);
      this.$refs.editor.addEventListener('scroll', this.scrollHandler.bind(this, 'editor'), false);
    },
    scrollHandler: function scrollHandler(type, event) {
      var _this = this;

      if (this.isJsAction) {
        this.isJsAction = false;
        return;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        var editor = _this.$refs.editor,
            body = _this.doc.body;
        var nowLeft = editor.scrollTop;
        var maxLeft = editor.scrollHeight - editor.offsetHeight;
        var maxRight = body.scrollHeight - 1 - _this.el.offsetHeight;
        var nowRight = body.scrollTop;
        if (type == 'editor') {
          body.scrollTop = nowLeft / maxLeft * maxRight;
        } else {
          editor.scrollTop = nowRight / maxRight * maxLeft;
        }
        // next call of this function is caused by js.
        _this.isJsAction = true;
      }, 100);
    }
  }),
  created: function created() {
    var renderer = new _marked2.default.Renderer();
    renderer.heading = function (text, level) {
      return '<h' + level + '>' + text + '</h' + level + '>';
    };
    renderer.paragraph = function (text) {
      var div = document.createElement('div');
      div.innerHTML = text;
      if (div.children.length == 0) {
        return '<p>' + text + '</p>\n';
      }
      return text + '\n';
    };

    _marked2.default.setOptions({
      renderer: renderer,
      gfm: false
    });
    this.isJsAction = false;
    this.timer = null;
  }
};
module.exports = exports['default'];

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function() {

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
  text: /^[^\n]+/
};

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ();

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ();

block.blockquote = replace(block.blockquote)
  ('def', block.def)
  ();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
  (/tag/g, block._tag)
  ();

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('blockquote', block.blockquote)
  ('tag', '<' + block._tag)
  ('def', block.def)
  ();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = replace(block.paragraph)
  ('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  ();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top, bq) {
  var src = src.replace(/^ +$/gm, '')
    , next
    , loose
    , cap
    , bull
    , b
    , item
    , space
    , i
    , l;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top, true);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];

      this.tokens.push({
        type: 'list_start',
        ordered: bull.length > 1
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false, bq);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.links[cap[1].toLowerCase()] = {
        href: cap[2],
        title: cap[3]
      };
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};

inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
  ();

inline.reflink = replace(inline.reflink)
  ('inside', inline._inside)
  ();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~|])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer;
  this.renderer.options = this.options;

  if (!this.links) {
    throw new
      Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2], true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = ''
    , l = text.length
    , i = 0
    , ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';
  return '<' + type + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer;
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options, renderer) {
  var parser = new Parser(options, renderer);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options, this.renderer);
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        this.token.text);
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = ''
        , body = ''
        , i
        , row
        , cell
        , flags
        , j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        flags = { header: true, align: this.token.align[i] };
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      var body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      var body = ''
        , ordered = this.token.ordered;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered);
    }
    case 'list_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      var body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
	// explicitly match decimal, hex, and named HTML entities 
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}


/**
 * Marked
 */

function marked(src, opt, callback) {
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight
      , tokens
      , pending
      , i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occured:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer,
  xhtml: false
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (true) {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  this.marked = marked;
}

}).call(function() {
  return this || (typeof window !== 'undefined' ? window : global);
}());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65)))

/***/ }),
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentView == 'markdown'),
      expression: "currentView == 'markdown'"
    }],
    staticClass: "ve-md"
  }, [_h('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.md),
      expression: "md"
    }],
    ref: "editor",
    class: _vm.$style.editor,
    domProps: {
      "value": _vm._s(_vm.md)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.md = $event.target.value
      }, _vm.update]
    }
  }), _h('iframe', {
    class: _vm.$style.iframe,
    attrs: {
      "src": "about:blank",
      "frameborder": "0"
    },
    on: {
      "load": _vm.init
    }
  })])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8f674708", module.exports)
  }
}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(68)
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
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/fullscreen.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ed1b67f0", __vue_options__)
  } else {
    hotAPI.reload("data-v-ed1b67f0", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] fullscreen.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//

exports.default = {
  render: function render() {
    return '';
  },
  computed: {
    callee: function callee() {
      return this.$store.state.callee;
    },
    fullscreen: function fullscreen() {
      return this.$store.state.fullscreen;
    }
  },
  watch: {
    'callee': function callee(val) {
      if (val.name === 'fullscreen') {
        this.$store.dispatch('setFullScreen', !this.fullscreen);
      }
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 69 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 70 */
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
  }, [_h('ve-toolbar'), _h('ve-design'), _vm._l((_vm.list), function(item) {
    return [(_vm.config.toolbar.indexOf(item) !== -1) ? _h('ve-' + item.toLowerCase(), {
      tag: "component",
      attrs: {
        "tagName": item
      }
    }) : _vm._e()]
  })])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7cf07ab8", module.exports)
  }
}

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {

  var toolbar = {};

  config.toolbar.forEach(function (name) {
    if (name !== 'divider' && name !== '|') {
      toolbar[name] = {};
      if (name in _btns.selects) {
        toolbar[name].value = '';
        toolbar[name].showPopup = false;
      } else {
        if (_btns.btns[name] && _btns.btns[name].action === undefined) {
          toolbar[name].showPopup = false;
        }
        toolbar[name].status = ''; // default disabled actived
      }
    }
  });

  return {
    state: {
      view: 'design',
      content: '',
      toolbar: toolbar,
      fullscreen: false,
      rect: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      command: {
        name: '',
        value: ''
      },
      callee: {
        name: '',
        params: ''
      }
    },
    actions: actions,
    mutations: _mutations2.default
  };
};

var _actions = __webpack_require__(72);

var actions = _interopRequireWildcard(_actions);

var _mutations = __webpack_require__(73);

var _mutations2 = _interopRequireDefault(_mutations);

var _btns = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var updateSelectValue = exports.updateSelectValue = function updateSelectValue(_ref, data) {
  var commit = _ref.commit;

  commit('UPDATE_SELECT_VALUE', data);
};

var updateButtonStates = exports.updateButtonStates = function updateButtonStates(_ref2, data) {
  var commit = _ref2.commit;

  commit('UPDATE_BUTTON_STATES', data);
};

var updatePopupDisplay = exports.updatePopupDisplay = function updatePopupDisplay(_ref3, data) {
  var commit = _ref3.commit;

  commit('UPDATE_POPUP_DISPLAY', data);
};

var updateRect = exports.updateRect = function updateRect(_ref4, data) {
  var commit = _ref4.commit;

  commit('UPDATE_RECT', data);
};

var updateContent = exports.updateContent = function updateContent(_ref5, data) {
  var commit = _ref5.commit;

  commit('UPDATE_CONTENT', data);
};

var switchView = exports.switchView = function switchView(_ref6, data) {
  var commit = _ref6.commit;

  commit('SWITCH_VIEW', data);
};

var setFullScreen = exports.setFullScreen = function setFullScreen(_ref7, data) {
  var commit = _ref7.commit;

  commit('SET_FULL_SCREEN', data);
};

var callMethod = exports.callMethod = function callMethod(_ref8, data) {
  var commit = _ref8.commit;

  commit('CALL_METHOD', data);
};

var execCommand = exports.execCommand = function execCommand(_ref9, data) {
  var commit = _ref9.commit;

  commit('EXEC_COMMAND', data);
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  UPDATE_SELECT_VALUE: function UPDATE_SELECT_VALUE(_ref, _ref2) {
    var toolbar = _ref.toolbar;
    var name = _ref2.name,
        value = _ref2.value;

    toolbar[name].value = value;
  },
  UPDATE_BUTTON_STATES: function UPDATE_BUTTON_STATES(_ref3, data) {
    var toolbar = _ref3.toolbar;

    for (var name in data) {
      toolbar[name].status = data[name];
    }
  },
  UPDATE_POPUP_DISPLAY: function UPDATE_POPUP_DISPLAY(_ref4, data) {
    var toolbar = _ref4.toolbar;

    for (var name in toolbar) {
      if (toolbar[name].showPopup === undefined) continue;
      if (data && data.name === name) {
        toolbar[name].showPopup = data.display;
      } else if (toolbar[name].showPopup !== false) {
        toolbar[name].showPopup = false;
      }
    }
  },
  UPDATE_RECT: function UPDATE_RECT(state, data) {
    state.rect = data;
  },
  UPDATE_CONTENT: function UPDATE_CONTENT(state, data) {
    state.content = data;
  },
  SWITCH_VIEW: function SWITCH_VIEW(state, data) {
    state.view = data;
  },
  SET_FULL_SCREEN: function SET_FULL_SCREEN(state, data) {
    state.fullscreen = data;
  },
  CALL_METHOD: function CALL_METHOD(state, data) {
    state.callee = data;
  },
  EXEC_COMMAND: function EXEC_COMMAND(state, data) {
    state.command = data;
  }
};
module.exports = exports["default"];

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ['tagName'],
  computed: {
    // rect belong to the clicked toolbar button
    rect: function rect() {
      return this.$store.state.rect;
    },
    style: function style() {
      if (!this.showPopup) {
        return { left: 0, top: 0 };
      }
      var _rect = this.rect,
          left = _rect.left,
          top = _rect.top,
          width = _rect.width,
          height = _rect.height;

      var offsetLeft = left;
      if (this.$el) {
        this.$el.style.display = 'block';
        // > 0 means the popover menu's right part is not totally visible
        if (left + this.$el.offsetWidth - document.documentElement.clientWidth > 0) {
          offsetLeft = left - this.$el.offsetWidth + width;
          if (offsetLeft < 0) {
            offsetLeft = left + width / 2 - this.$el.offsetWidth / 2;
          }
        }
        this.$el.style.display = 'none';
      }
      return { left: offsetLeft + 'px', top: top + height + 'px' };
    }
  }
};
module.exports = exports['default'];

/***/ })
/******/ ]);
});