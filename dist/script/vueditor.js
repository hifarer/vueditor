(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vuex"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vuex", "vue"], factory);
	else if(typeof exports === 'object')
		exports["Vueditor"] = factory(require("vuex"), require("vue"));
	else
		root["Vueditor"] = factory(root["Vuex"], root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_10__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  beforeCreate: function beforeCreate() {
    var name = this.$parent.namespace;
    this.mstates = name ? this.$store.state[name] : this.$store.state;
    this.mpath = name ? name + '/' : '';
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultConf = {
  spellcheck: false,
  noFormatPaste: true,
  pasteUpload: false,
  toolbar: ['removeFormat', 'undo', 'redo', '|', 'element', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough', 'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'table', '|', 'code', 'fullscreen', 'sourceCode', 'markdown'],
  fontName: [{ val: 'arial black' }, { val: 'times new roman' }, { val: 'Courier New' }],
  fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'],
  code: {
    type: ['bash', 'clike', 'css', 'html', 'java', 'javascript', 'php', 'python', 'sql'],
    pattern: {
      attr: 'class',
      value: 'language-#type#'
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultLang = {

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
  code: {},
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  props: ['tagName'],
  computed: {
    // rect belong to the clicked toolbar element
    rect: function rect() {
      return this.mstates.rect;
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
        // by default, the popover menu's left edge is intend to align with the the clicked toolbar element's left edge
        // > 0 means the popover menu's right edge is not totally visible, so we try to align the popover menu's right edge with the clicked toolbar element's right edge
        if (left + this.$el.offsetWidth - document.documentElement.clientWidth > 0) {
          offsetLeft = left + width - this.$el.offsetWidth;
          // check if the popover menu's left edge is totally visible or not
          if (offsetLeft < 0) {
            // align center
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultToolbar = {

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
    element: { className: '' },
    code: { className: 'code-select' }
  }

};

var toolbar = JSON.parse(JSON.stringify(defaultToolbar));

exports.default = {
  resetToolbar: function resetToolbar() {
    toolbar = JSON.parse(JSON.stringify(defaultToolbar));
  },
  modifyToolbar: function modifyToolbar(name, element) {
    if (element.type === 'button') {
      toolbar.btns[name] = {
        className: element.className
      };
      element.action && (toolbar.btns[name].action = element.action);
    } else {
      toolbar.selects[name] = {
        className: element.className
      };
    }
  },
  getToolbar: function getToolbar() {
    return toolbar;
  }
};
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var toolbar = {};

  var _getToolbar = (0, _toolbar.getToolbar)(),
      btns = _getToolbar.btns,
      selects = _getToolbar.selects;

  var config = (0, _index.getConfig)('toolbar');

  config.forEach(function (name) {
    if (name !== 'divider' && name !== '|') {
      toolbar[name] = {};
      if (name in selects) {
        toolbar[name].value = '';
        toolbar[name].showPopup = false;
      } else {
        if (btns[name] && btns[name].action === undefined) {
          toolbar[name].showPopup = false;
        }
      }
      toolbar[name].status = ''; // default disabled actived
    }
  });

  return {
    namespaced: true,
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

var _actions = __webpack_require__(77);

var actions = _interopRequireWildcard(_actions);

var _mutations = __webpack_require__(78);

var _mutations2 = _interopRequireDefault(_mutations);

var _toolbar = __webpack_require__(7);

var _index = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(10);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(5);

var _toolbar = __webpack_require__(7);

var _index = __webpack_require__(4);

var _app = __webpack_require__(11);

var _app2 = _interopRequireDefault(_app);

var _states = __webpack_require__(8);

var _states2 = _interopRequireDefault(_states);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function checkConfig(config) {
  var proto = {
    toolbar: 'array.string',
    fontName: 'array.object',
    fontSize: 'array.string',
    uploadUrl: 'string',
    lang: 'object',
    id: 'string',
    classList: 'array.string',
    plugins: 'array.object'
  };
  var retData = { valid: true, info: '' };
  for (var name in config) {
    var types = '';
    if (isArray(config[name])) {
      types += 'array';
      isObject(config[name][0]) ? types += '.object' : types += '.string';
    } else if (isObject(config[name])) {
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
  var list = ['fontName', 'fontSize', 'element', 'foreColor', 'backColor', 'undo', 'table', 'link', 'code', 'picture', 'sourceCode', 'markdown', 'fullscreen'];
  // type check for config
  var typeInfo = checkConfig(config);
  if (!typeInfo.valid) {
    throw new Error(typeInfo.info);
  }

  (0, _toolbar.resetToolbar)();

  config.plugins && config.plugins.forEach(function (_ref) {
    var name = _ref.name,
        element = _ref.element,
        component = _ref.component;

    list.push(name);
    _app2.default.components['ve-' + name] = component;
    config.toolbar.indexOf(name) === -1 && config.toolbar.push(name);
    lang[name] = element.lang;
    (0, _toolbar.modifyToolbar)(name, element);
  });

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
  return (0, _states2.default)();
};

// Create a 'subclass' of the base Vue constructor
var createEditor = function createEditor(el, opts) {
  var obj = mixinConfig(opts);
  obj.created = function () {};
  obj.store = new _vuex2.default.Store((0, _states2.default)());
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
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(12)

/* template */
var __vue_template__ = __webpack_require__(109)
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toolbar = __webpack_require__(13);

var _toolbar2 = _interopRequireDefault(_toolbar);

var _design = __webpack_require__(18);

var _design2 = _interopRequireDefault(_design);

var _color = __webpack_require__(21);

var _color2 = _interopRequireDefault(_color);

var _fontname = __webpack_require__(26);

var _fontname2 = _interopRequireDefault(_fontname);

var _fontsize = __webpack_require__(31);

var _fontsize2 = _interopRequireDefault(_fontsize);

var _sourcecode = __webpack_require__(36);

var _sourcecode2 = _interopRequireDefault(_sourcecode);

var _code = __webpack_require__(41);

var _code2 = _interopRequireDefault(_code);

var _element = __webpack_require__(46);

var _element2 = _interopRequireDefault(_element);

var _table = __webpack_require__(51);

var _table2 = _interopRequireDefault(_table);

var _undo = __webpack_require__(56);

var _undo2 = _interopRequireDefault(_undo);

var _link = __webpack_require__(58);

var _link2 = _interopRequireDefault(_link);

var _picture = __webpack_require__(63);

var _picture2 = _interopRequireDefault(_picture);

var _markdown = __webpack_require__(68);

var _markdown2 = _interopRequireDefault(_markdown);

var _fullscreen = __webpack_require__(75);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _states = __webpack_require__(8);

var _states2 = _interopRequireDefault(_states);

var _util = __webpack_require__(111);

__webpack_require__(79);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    've-toolbar': _toolbar2.default,
    've-design': _design2.default,
    've-sourcecode': _sourcecode2.default,
    've-code': _code2.default,
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
      var path = this.namespace ? this.namespace + '/updateContent' : 'updateContent';
      this.$store.dispatch(path, content);
    },
    getContent: function getContent() {
      return this.content;
    }
  },
  created: function created() {
    this.namespace = (0, _util.createNonceStr)();
    this.$store.registerModule(this.namespace, (0, _states2.default)());
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


module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(14)

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-toolbar {\n  display: table;\n  width: 100%;\n  font-size: 0;\n  letter-spacing: -4px;\n  background: #fff;\n  border-bottom: 1px solid #ddd;\n  user-select: none;\n}\n.ve-toolbar div {\n  cursor: pointer;\n  position: relative;\n  display: inline-block;\n  padding: 10px 12px;\n  color: rgba(0, 0, 0, 0.6);\n}\n.ve-toolbar div.ve-divider {\n  width: 0;\n  height: 26px;\n  margin: 5px;\n  padding: 0;\n  border-right: 1px solid #ddd;\n  vertical-align: top;\n}\n.ve-toolbar div.ve-active {\n  background: #eee;\n  color: #000;\n}\n.ve-toolbar div:hover {\n  background: #eee;\n}\n.ve-toolbar div.ve-disabled {\n  background: transparent;\n  color: rgba(0, 0, 0, 0.6);\n}\n.font-select {\n  width: 100px;\n}\n.font-select span {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.code-select {\n  width: 80px;\n}\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(5);

var _index = __webpack_require__(4);

var _toolbar = __webpack_require__(7);

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


exports.default = {
  data: function data() {
    var _getToolbar = (0, _toolbar.getToolbar)(),
        btns = _getToolbar.btns,
        selects = _getToolbar.selects;

    return {
      btns: btns,
      selects: selects,
      lang: (0, _lang.getLang)(),
      config: (0, _index.getConfig)('toolbar')
    };
  },

  mixins: [_vuex2.default],
  computed: {
    toolbar: function toolbar() {
      return this.mstates.toolbar;
    },
    view: function view() {
      return this.mstates.view;
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
        states.code !== undefined && (states.code = 'default');
      }
      this.updateButtonStates(states);
    }
  },
  methods: {
    updateButtonStates: function updateButtonStates(data) {
      this.$store.dispatch(this.mpath + 'updateButtonStates', data);
    },
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    callMethod: function callMethod(data) {
      this.$store.dispatch(this.mpath + 'callMethod', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    updateRect: function updateRect(data) {
      this.$store.dispatch(this.mpath + 'updateRect', data);
    },
    btnHandler: function btnHandler(event, name) {
      if (this.toolbar[name].status === 'disabled') return;
      var btn = this.btns[name];
      if (btn.action) {
        if (btn.native) {
          this.execCommand({ name: name, value: null });
        } else {
          this.callMethod({ name: name, params: null });
        }
      }
      this.updateStates(name);
      this.showPopup(name, event.currentTarget);
    },
    selectHandler: function selectHandler(event, name) {
      if (this.toolbar[name].status === 'disabled') return;
      this.updateStates(name);
      this.showPopup(name, event.currentTarget);
    },
    showPopup: function showPopup(name, obj) {
      this.updatePopupDisplay(this.toolbar[name].showPopup !== undefined ? { name: name, display: !this.toolbar[name].showPopup } : {});
      if (!this.btns[name].action) {
        this.updateRect({
          left: obj.offsetLeft,
          top: obj.offsetTop,
          width: obj.offsetWidth,
          height: obj.offsetHeight + parseInt(window.getComputedStyle(obj).marginBottom)
        });
      }
    },
    updateStates: function updateStates(name) {
      var states = {};
      // update no action btn status, no action means click on it will toggle a popover menu;
      if (this.view === 'design') {
        for (var item in this.btns) {
          if (!this.btns[item].action && this.toolbar[item] && this.toolbar[item].status === 'actived') {
            states[item] = 'default';
          }
        }
      }
      if (['sourceCode', 'markdown'].indexOf(name) !== -1) {
        this.toolbar['sourceCode'] && (states['sourceCode'] = 'default');
        this.toolbar['markdown'] && (states['markdown'] = 'default');
      }
      this.toolbar[name].status === 'actived' ? states[name] = 'default' : states[name] = 'actived';
      this.updateButtonStates(states);
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    ref: "toolbar",
    staticClass: "ve-toolbar"
  }, [_vm._l((_vm.config), function(item) {
    return [(item in _vm.btns) ? _h('div', {
      class: {
        've-active': _vm.toolbar[item].status == 'actived', 've-disabled': _vm.toolbar[item].status == 'disabled'
      },
      attrs: {
        "title": _vm.lang[item].title,
        "unselectable": "on"
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
    })]) : _vm._e(), " ", (item in _vm.selects) ? _h('div', {
      class: [{
        've-disabled': _vm.toolbar[item].status == 'disabled'
      }, _vm.selects[item].className, 've-select'],
      attrs: {
        "unselectable": "on"
      },
      on: {
        "click": function($event) {
          $event.stopPropagation();
          $event.preventDefault();
          _vm.selectHandler($event, item)
        }
      }
    }, [_h('span', [_vm._s(_vm.toolbar[item].value)]), _h('i', {
      class: {
        've-triangle-down': !_vm.toolbar[item].display, 've-triangle-up': _vm.toolbar[item].display
      }
    })]) : _vm._e(), " ", (item == 'divider' || item == '|') ? _h('div', {
      staticClass: "ve-divider"
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(19)

/* template */
var __vue_template__ = __webpack_require__(20)
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lang = __webpack_require__(5);

var _config = __webpack_require__(4);

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      iframeWin: null,
      iframeDoc: null,
      iframeBody: null,
      timer: null,
      inited: false,
      cache: '',
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
    states: function states() {
      return this.mstates.states;
    }
  },

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

  methods: {
    updateContent: function updateContent(data) {
      this.$store.dispatch(this.mpath + 'updateContent', data);
    },
    updateSelectValue: function updateSelectValue(data) {
      this.$store.dispatch(this.mpath + 'updateSelectValue', data);
    },
    updateButtonStates: function updateButtonStates(data) {
      this.$store.dispatch(this.mpath + 'updateButtonStates', data);
    },
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    callMethod: function callMethod(data) {
      this.$store.dispatch(this.mpath + 'callMethod', data);
    },
    switchView: function switchView(data) {
      this.$store.dispatch(this.mpath + 'switchView', data);
    },
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
      this.iframeBody.spellcheck = this.config.spellcheck;
      this.iframeBody.style.cssText = 'overflow-x: hidden;';
      this.iframeDoc.head.insertAdjacentHTML('beforeEnd', '<style>pre {margin: 0; padding: 0.5rem; background: #f5f2f0;}</style>');
      this.addEvent();
    },


    // init, selection change
    updateStates: function updateStates() {
      var json = {};
      for (var name in this.states) {
        if (['redo', 'undo', 'fullscreen'].indexOf(name) === -1) {
          if (this.iframeDoc.queryCommandSupported(name)) {
            json[name] = this.iframeDoc.queryCommandState(name) ? 'actived' : 'default';
          }
        }
      }
      this.updateButtonStates(json);
    },
    addEvent: function addEvent() {
      var _this2 = this;

      var timer = null;
      this.iframeDoc.addEventListener('click', function () {
        // throttle
        clearTimeout(timer);
        timer = setTimeout(function () {
          _this2.view === 'design' && _this2.updatePopupDisplay();
        }, 200);
        // dispatch selectionchange event for throttling
        _this2.iframeDoc.dispatchEvent(new window.Event('selectionchange'));
      }, false);
      this.iframeBody.addEventListener('keydown', this.keydownHandler, false);
      this.iframeBody.addEventListener('keyup', this.keyupHandler, false);
      this.config.noFormatPaste && this.iframeBody.addEventListener('paste', this.pasteHandler, false);
      this.selectionChange();
    },
    keydownHandler: function keydownHandler(event) {
      if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
        event.preventDefault();
        event.keyCode === 89 && this.callMethod({ name: 'redo' });
        event.keyCode === 90 && this.callMethod({ name: 'undo' });
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
      var _this3 = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        _this3.updateContent(_this3.iframeBody.innerHTML);
      }, 500);
    },


    // 无格式粘贴
    pasteHandler: function pasteHandler(event) {
      var _this4 = this;

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
          _this4.insertHTML('', '<br>' + item);
        }
      });

      if (this.config.pasteUpload && clipboardData.items) {
        this.pasteUpload(clipboardData.items);
      }
    },
    pasteUpload: function pasteUpload(arr) {
      var _this = this;
      Array.prototype.forEach.call(arr, function (item) {
        if (item.getAsFile() && item.kind === 'file' && item.type.match(/^image\//i)) {
          var reader = new window.FileReader();
          reader.readAsDataURL(item.getAsFile());
          reader.onload = function (e) {
            var base64Str = e.target.result.replace('+', '%2B');
            var xhr = new window.XMLHttpRequest();
            xhr.open('POST', _this.config.uploadUrl);
            xhr.send({ imageData: base64Str });
            xhr.onload = function () {
              _this.insertHTML('', '<img src="' + xhr.responseText + '">');
            };
          };
        }
      });
    },
    selectionChange: function selectionChange() {
      var _this5 = this;

      var timer = null;
      this.iframeDoc.addEventListener('selectionchange', function () {
        // throttle
        clearTimeout(timer);
        timer = setTimeout(function () {
          _this5.checkElement();
          _this5.view === 'design' && _this5.updateStates();
        }, 200);
      }, false);
      if (!('onselectionchange' in document)) {
        var sel = this.getSelection();
        var focusOffset = -1;
        setInterval(function () {
          if (sel && sel.rangeCount) {
            if (focusOffset !== sel.focusOffset) {
              focusOffset = sel.focusOffset;
              _this5.view === 'design' && _this5.updateStates();
              _this5.checkElement();
            }
          } else {
            sel = _this5.getSelection();
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
      var pattern = this.config.code.pattern;

      if (container.tagName.toLowerCase() === 'code') {
        var value = pattern.value.replace(/#type#/, '');
        value = (container.getAttribute(pattern.attr) || '').replace(value, '');
        this.updateSelectValue({ name: 'code', value: value || '--' });
        this.view === 'design' && this.switchView('codesnippet');
      } else if (container.tagName.toLowerCase() === 'pre') {
        // 解决文字直接写到pre里
        if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
          this.wrapTextNode(range, 'code');
        }
        this.view === 'design' && this.switchView('codesnippet');
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
          tags.indexOf(tagName) !== -1 && this.updateSelectValue({ name: 'element', value: tagName });
        }
        if (this.config.toolbar.indexOf('fontName') !== -1) {
          this.config.fontName.filter(function (item) {
            return item.val === fontName;
          }).length !== 0 && this.updateSelectValue({ name: 'fontName', value: fontName });
        }
        if (this.config.toolbar.indexOf('fontSize') !== -1) {
          if (unit === 'px') {
            this.config.fontSize.indexOf(style['fontSize']) !== -1 && this.updateSelectValue({ name: 'fontSize', value: style['fontSize'] });
          }
          if (unit === 'rem') {
            var rootFontSize = parseInt(window.getComputedStyle(document.documentElement)['fontSize']);
            var remFontSize = (parseInt(style['fontSize']) / rootFontSize).toFixed(1) + 'rem';
            this.config.fontSize.indexOf(remFontSize) !== -1 && this.updateSelectValue({ name: 'fontSize', value: remFontSize });
          }
        }
        this.view !== 'design' && this.switchView('design');
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
        var sel = this.getSelection();
        var range = this.getRange();
        if (!sel || !range) return;
        if (document.queryCommandSupported('styleWithCss')) {
          this.iframeDoc.execCommand('styleWithCss', false, true);
        }
        this.iframeDoc.execCommand(name, false, value);
        this.iframeDoc.dispatchEvent(new window.Event('selectionchange'));
      }
      this.iframeBody.focus();
      this.updateContent(this.iframeBody.innerHTML);
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
    fontSize: function fontSize(name, value) {
      var _this6 = this;

      var selection = this.getSelection();
      var range = this.getRange();
      if (!selection || !range || range.collapsed) {
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

          var fontList = [];
          var spanList = [];
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
            span.querySelectorAll('span').length !== 0 && _this6.formatContent(span, 'span', 'fontSize');
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
      this.iframeDoc.dispatchEvent(new window.Event('selectionchange'));
    },
    insertCodeBlock: function insertCodeBlock(name, value) {
      var range = this.getRange();
      if (!range) return;
      var pattern = this.config.code.pattern;

      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = value;
      var attrValue = tempDiv.getElementsByTagName('code')[0].getAttribute(pattern.attr);
      var container = range.commonAncestorContainer;
      container.nodeType === 3 && (container = container.parentNode);
      if (container.tagName.toLowerCase() === 'code') {
        container.setAttribute(pattern.attr, attrValue);
      } else if (container.tagName.toLowerCase() === 'pre') {
        this.insertHTML(name, tempDiv.getElementsByTagName('code')[0].outerHTML);
      } else {
        this.insertHTML(name, value);
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
    setRange: function setRange(range) {
      var sel = this.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    },
    removeRange: function removeRange() {
      var sel = this.getSelection();
      sel && sel.removeAllRanges();
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
  }
}; //
//
//
//
//
//
//


module.exports = exports['default'];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _h('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.view === 'design' || _vm.view === 'codesnippet'),
      expression: "view === 'design' || view === 'codesnippet'"
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(22)


/* script */
__vue_exports__ = __webpack_require__(24)

/* template */
var __vue_template__ = __webpack_require__(25)
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.BH5VIImEflZEIMp8CUs9a_0 {\n  width: 176px;\n  padding: 10px;\n  position: absolute;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n.BH5VIImEflZEIMp8CUs9a_0 li {\n  margin: 1px;\n  float: left;\n}\n.BH5VIImEflZEIMp8CUs9a_0 li span {\n  display: block;\n  cursor: pointer;\n  width: 20px;\n  height: 20px;\n}\n._2I3u1DXeoSlgjP3cgM98ux_0 {\n  max-width: calc(100% - 35px);\n}\n.pxqHdCdhgQ9rrysEhrJgk_0 {\n  line-height: 16px;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "BH5VIImEflZEIMp8CUs9a_0",
	"input": "_2I3u1DXeoSlgjP3cgM98ux_0",
	"btn": "pxqHdCdhgQ9rrysEhrJgk_0"
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lang = __webpack_require__(5);

var _rect = __webpack_require__(6);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      colors: ['#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF', '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF', '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE', '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD', '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5', '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B', '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842', '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'],
      color: '',
      lang: (0, _lang.getLang)(this.tagName)
    };
  },

  mixins: [_rect2.default, _vuex2.default],
  computed: {
    showPopup: function showPopup() {
      return this.mstates.toolbar[this.tagName].showPopup;
    }
  },
  methods: {
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    checkValid: function checkValid(color) {
      var sColor = color.replace(/\s+/g, '');
      var hsl3 = /^#[0-9a-f]{3}$/i;
      var hsl6 = /^#[0-9a-f]{6}$/i;
      var rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/;
      if (hsl3.test(sColor) || hsl6.test(sColor) || rgb.test(sColor)) {
        return true;
      }
    },
    setColor: function setColor(type, color) {
      this.execCommand({ name: type, value: color });
    },
    clickHandler: function clickHandler(color) {
      this.setColor(this.tagName, color);
      this.updatePopupDisplay();
    },
    inputHandler: function inputHandler() {
      var color = this.color;
      var valid = this.checkValid(color);
      if (!valid) {
        window.alert(this.lang.invalidColorCodeMsg);
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
//


module.exports = exports['default'];

/***/ }),
/* 25 */
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
  }), " ", _h('button', {
    staticClass: "ve-btn",
    class: _vm.$style.input,
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.inputHandler
    }
  }, [_vm._s(_vm.lang.ok)])]), " ", _h('ul', [_vm._l((_vm.colors), function(color, index) {
    return _h('li', {
      key: index,
      on: {
        "click": function($event) {
          _vm.clickHandler(color)
        }
      }
    }, [_h('span', {
      style: ({
        background: color
      }),
      attrs: {
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(27)


/* script */
__vue_exports__ = __webpack_require__(29)

/* template */
var __vue_template__ = __webpack_require__(30)
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n._3K88AeqPM5bvUs73oXJS4i_0 li {\n  cursor: pointer;\n  padding: 6px;\n  border-bottom: 1px solid #ddd;\n}\n._3K88AeqPM5bvUs73oXJS4i_0 li:last-child {\n  border-bottom: none;\n}\n._3K88AeqPM5bvUs73oXJS4i_0 li:hover {\n  background: #d5e1f2;\n  border-color: #a3bde3;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "_3K88AeqPM5bvUs73oXJS4i_0"
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rect = __webpack_require__(6);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

var _config = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    var arr = (0, _config.getConfig)('fontName');
    return {
      fonts: arr,
      val: arr[0].abbr || arr[0].val
    };
  },

  mixins: [_rect2.default, _vuex2.default],
  computed: {
    showPopup: function showPopup() {
      return this.mstates.toolbar.fontName.showPopup;
    }
  },
  mounted: function mounted() {
    this.updateSelectValue({ name: 'fontName', value: this.val });
  },

  methods: {
    updateSelectValue: function updateSelectValue(data) {
      this.$store.dispatch(this.mpath + 'updateSelectValue', data);
    },
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    clickHandler: function clickHandler(font) {
      this.val = font.abbr || font.val;
      this.execCommand({ name: 'fontName', value: font.val + ', sans-serif' });
      this.updateSelectValue({ name: 'fontName', value: this.val });
      this.updatePopupDisplay();
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


module.exports = exports['default'];

/***/ }),
/* 30 */
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
      style: ({
        fontFamily: font.val + ', sans-serif'
      }),
      on: {
        "click": function($event) {
          _vm.clickHandler(font)
        }
      }
    }, [_vm._s(font.abbr || font.val)])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24d9f967", module.exports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(32)


/* script */
__vue_exports__ = __webpack_require__(34)

/* template */
var __vue_template__ = __webpack_require__(35)
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2cbe9846!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fontsize.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2cbe9846!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./fontsize.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.LgCpYevw8jVsOH4KQwNEX_0 li {\n  cursor: pointer;\n  padding: 6px;\n  border-bottom: 1px solid #ddd;\n}\n.LgCpYevw8jVsOH4KQwNEX_0 li:last-child {\n  border-bottom: none;\n}\n.LgCpYevw8jVsOH4KQwNEX_0 li:hover {\n  background: #d5e1f2;\n  border-color: #a3bde3;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "LgCpYevw8jVsOH4KQwNEX_0"
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rect = __webpack_require__(6);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

var _config = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    var arr = (0, _config.getConfig)('fontSize');
    return {
      fontSize: arr,
      val: arr[0]
    };
  },

  mixins: [_rect2.default, _vuex2.default],
  computed: {
    showPopup: function showPopup() {
      return this.mstates.toolbar.fontSize.showPopup;
    }
  },
  mounted: function mounted() {
    this.updateSelectValue({ name: 'fontSize', value: this.val });
  },

  methods: {
    updateSelectValue: function updateSelectValue(data) {
      this.$store.dispatch(this.mpath + 'updateSelectValue', data);
    },
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    clickHandler: function clickHandler(size) {
      this.val = size;
      this.execCommand({ name: 'fontSize', value: size });
      this.updateSelectValue({ name: 'fontSize', value: size });
      this.updatePopupDisplay();
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


module.exports = exports['default'];

/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(37)


/* script */
__vue_exports__ = __webpack_require__(39)

/* template */
var __vue_template__ = __webpack_require__(40)
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.Az9ECxXf2bg0saab-HJuY_0 {\n  /*safari*/\n  position: absolute;\n  box-sizing: border-box;\n  display: block;\n  width: 100%;\n  height: 100%;\n  padding: 8px;\n  outline: none;\n  border: none;\n  resize: none;\n  font-size: 14px;\n}\n", ""]);

// exports
exports.locals = {
	"editor": "Az9ECxXf2bg0saab-HJuY_0"
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
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
    },
    callee: function callee() {
      return this.mstates.callee;
    }
  },
  watch: {
    'view': function view(val) {
      if (val === 'sourceCode') {
        this.code = this.content;
      }
    },
    'code': function code(val) {
      this.updateContent(val);
    },
    'content': function content(val) {
      this.updateContent(val);
    },
    'callee': function callee(val) {
      if (val.name === 'sourceCode') {
        this.switchView(this.view === 'sourceCode' ? 'design' : 'sourceCode');
        this.updatePopupDisplay();
      }
    }
  },
  methods: {
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    updateContent: function updateContent(data) {
      this.$store.dispatch(this.mpath + 'updateContent', data);
    },
    switchView: function switchView(data) {
      this.$store.dispatch(this.mpath + 'switchView', data);
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
/* 40 */
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
      value: (_vm.code),
      expression: "code"
    }],
    class: _vm.$style.editor,
    domProps: {
      "value": _vm._s(_vm.code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.code = $event.target.value
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(42)


/* script */
__vue_exports__ = __webpack_require__(44)

/* template */
var __vue_template__ = __webpack_require__(45)
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
__vue_options__.__file = "/Users/jiang/work/vueditor/src/components/code.vue"
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
    hotAPI.createRecord("data-v-0e8e3e0c", __vue_options__)
  } else {
    hotAPI.reload("data-v-0e8e3e0c", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] code.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0e8e3e0c!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./code.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0e8e3e0c!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./code.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n._11zDJpEjs3eaX8-ywZ83rs_0 li {\n  padding: 6px;\n  border-bottom: 1px solid #ddd;\n  cursor: pointer;\n}\n._11zDJpEjs3eaX8-ywZ83rs_0 li:last-child {\n  border-bottom: none;\n}\n._11zDJpEjs3eaX8-ywZ83rs_0 li:hover {\n  background: #d5e1f2;\n  border-color: #a3bde3;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "_11zDJpEjs3eaX8-ywZ83rs_0"
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rect = __webpack_require__(6);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

var _config = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    var _getConfig = (0, _config.getConfig)('code'),
        type = _getConfig.type,
        pattern = _getConfig.pattern;

    return {
      code: type,
      val: type[0],
      tpl: '<pre><code ' + pattern.attr + '="' + pattern.value + '"><br></code></pre>'
    };
  },

  mixins: [_rect2.default, _vuex2.default],
  computed: {
    showPopup: function showPopup() {
      return this.mstates.toolbar.code.showPopup;
    }
  },
  mounted: function mounted() {
    this.$store.dispatch(this.mpath + 'updateSelectValue', { name: 'code', value: this.val });
  },

  methods: {
    clickHandler: function clickHandler(type) {
      this.val = type;
      this.$store.dispatch(this.mpath + 'execCommand', { name: 'insertCodeBlock', value: this.tpl.replace(/#type#/igm, type) });
      this.$store.dispatch(this.mpath + 'updateSelectValue', { name: 'code', value: type });
      this.$store.dispatch(this.mpath + 'updatePopupDisplay');
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


module.exports = exports['default'];

/***/ }),
/* 45 */
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
  }, [_h('ul', [_vm._l((_vm.code), function(type, index) {
    return _h('li', {
      key: index,
      on: {
        "click": function($event) {
          _vm.clickHandler(type)
        }
      }
    }, [_vm._s(type)])
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0e8e3e0c", module.exports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(47)


/* script */
__vue_exports__ = __webpack_require__(49)

/* template */
var __vue_template__ = __webpack_require__(50)
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(48);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-fb1b5702!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./element.vue", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?{\"localIdentName\":\"[hash:base64]_0\",\"modules\":true,\"importLoaders\":true}!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-fb1b5702!../../node_modules/less-loader/dist/cjs.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./element.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n._3vHBjPXBhHQPBNIroIW5cW_0 li {\n  display: block;\n  cursor: pointer;\n  padding: 6px;\n  border-bottom: 1px solid #ddd;\n}\n._3vHBjPXBhHQPBNIroIW5cW_0 li:last-child {\n  border-bottom: none;\n}\n._3vHBjPXBhHQPBNIroIW5cW_0 li:hover {\n  background: #d5e1f2;\n  border-color: #a3bde3;\n}\n", ""]);

// exports
exports.locals = {
	"ctn": "_3vHBjPXBhHQPBNIroIW5cW_0"
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rect = __webpack_require__(6);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(1);

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


exports.default = {
  data: function data() {
    return {
      arr: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      val: 'p'
    };
  },

  mixins: [_rect2.default, _vuex2.default],
  computed: {
    showPopup: function showPopup() {
      return this.mstates.toolbar.element.showPopup;
    }
  },
  mounted: function mounted() {
    this.updateSelectValue({ name: 'element', value: this.val });
  },

  methods: {
    updateSelectValue: function updateSelectValue(data) {
      this.$store.dispatch(this.mpath + 'updateSelectValue', data);
    },
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    selectItem: function selectItem(event) {
      var tagName = event.target.innerHTML.trim();
      this.val = tagName;
      this.execCommand({ name: 'formatBlock', value: tagName });
      this.updateSelectValue({ name: 'element', value: tagName });
      this.updatePopupDisplay();
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 50 */
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
  }, [_h('ul', [_vm._l((_vm.arr), function(item, index) {
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(52)

/* script */
__vue_exports__ = __webpack_require__(54)

/* template */
var __vue_template__ = __webpack_require__(55)
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-table {\n  width: 192px;\n  padding: 10px;\n  position: absolute;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n.ve-table li {\n  width: 20px;\n  height: 20px;\n  margin: 1px;\n  float: left;\n  border: 1px solid #ddd;\n}\n.ve-table li.active {\n  background: #F7F7F7;\n}\n", ""]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lang = __webpack_require__(5);

var _rect = __webpack_require__(6);

var _rect2 = _interopRequireDefault(_rect);

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      num: 64,
      x: -1,
      y: -1,
      lang: (0, _lang.getLang)('table')
    };
  },

  mixins: [_rect2.default, _vuex2.default],
  computed: {
    showPopup: function showPopup() {
      return this.mstates.toolbar.table.showPopup;
    }
  },
  methods: {
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    overHandler: function overHandler(index) {
      this.x = index % 8;
      this.y = parseInt(index / 8);
    },
    clickHandler: function clickHandler() {
      var html = this.createTable(this.y + 1, this.x + 1);
      this.execCommand({ name: 'insertHTML', value: html });
      this.updatePopupDisplay();
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


module.exports = exports['default'];

/***/ }),
/* 55 */
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
      class: {
        'active': ((i - 1) % 8 <= _vm.x && parseInt((i - 1) / 8) <= _vm.y)
      },
      on: {
        "mouseover": function($event) {
          _vm.overHandler(i - 1)
        },
        "click": _vm.clickHandler
      }
    })
  })])])
},staticRenderFns: []}
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-24ac11de", module.exports)
  }
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(57)
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  mixins: [_vuex2.default],
  computed: {
    content: function content() {
      return this.mstates.content;
    },
    callee: function callee() {
      return this.mstates.callee;
    },
    view: function view() {
      return this.mstates.view;
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
  methods: {
    updateButtonStates: function updateButtonStates(data) {
      this.$store.dispatch(this.mpath + 'updateButtonStates', data);
    },
    updateContent: function updateContent(data) {
      this.$store.dispatch(this.mpath + 'updateContent', data);
    },
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
      if (content !== this.stack[this.index]) {
        this.stack = this.stack.slice(0, this.index + 1);
        this.stack.push(content);
        this.index++;
      }
      this.updateButtonStates({
        undo: this.canUndo ? 'default' : 'disabled',
        redo: this.canRedo ? 'default' : 'disabled'
      });
    }
  }
}; //


module.exports = exports['default'];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(59)


/* script */
__vue_exports__ = __webpack_require__(61)

/* template */
var __vue_template__ = __webpack_require__(62)
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(60);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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
/* 60 */
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(5);

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


exports.default = {
  mixins: [_vuex2.default],
  data: function data() {
    return {
      val: '',
      lang: (0, _lang.getLang)('link')
    };
  },

  computed: {
    rect: function rect() {
      return this.mstates.rect;
    },
    callee: function callee() {
      return this.mstates.callee;
    },
    showPopup: function showPopup() {
      return this.mstates.toolbar.link.showPopup;
    }
  },
  watch: {
    'callee': function callee(val) {
      val.name === 'unLink' && this.unLinkHandler();
    }
  },
  methods: {
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    checkValid: function checkValid() {
      var href = this.val;
      href.match(/^https?:\/\//igm) === null && (href = 'http://' + href);
      return href;
    },
    linkHandler: function linkHandler() {
      var href = this.checkValid();
      this.execCommand({ name: 'createlink', value: href });
      this.updatePopupDisplay();
    },
    unLinkHandler: function unLinkHandler() {
      this.execCommand({ name: 'unlink', value: null });
    }
  }
};
module.exports = exports['default'];

/***/ }),
/* 62 */
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
    style: ({
      left: _vm.rect.left + 'px',
      top: (_vm.rect.top + _vm.rect.height) + 'px'
    })
  }, [_vm._m(0), " ", _h('div', {
    staticClass: "ve-pop-header"
  }, [_vm._s(_vm.lang.title)]), " ", _h('div', {
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
      "click": _vm.linkHandler
    }
  }, [_vm._s(_vm.lang.ok)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(64)


/* script */
__vue_exports__ = __webpack_require__(66)

/* template */
var __vue_template__ = __webpack_require__(67)
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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
/* 65 */
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

var _lang = __webpack_require__(5);

var _config = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  data: function data() {
    return {
      url: '',
      lang: (0, _lang.getLang)('picture'),
      uploadUrl: (0, _config.getConfig)('uploadUrl')
    };
  },

  mixins: [_vuex2.default],
  computed: {
    showPopup: function showPopup() {
      return this.mstates.toolbar.picture.showPopup;
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
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    execCommand: function execCommand(data) {
      this.$store.dispatch(this.mpath + 'execCommand', data);
    },
    hideDialog: function hideDialog() {
      this.updatePopupDisplay();
    },
    changeHandler: function changeHandler() {
      var obj = this.$refs.file;
      if (navigator.userAgent.indexOf('MSIE') >= 1) {
        // IE
        this.url = obj.value;
      } else {
        if (obj.files.length !== 0 && obj.files.item(0).type.indexOf('image') !== -1) {
          this.url = window.URL.createObjectURL(obj.files.item(0));
        }
      }
    },
    certainHandler: function certainHandler(event) {
      var _this = this;

      var obj = this.$refs.file;
      var form = this.$refs.form;
      var uploadUrl = this.uploadUrl;
      if (this.url) {
        if (this.$parent.upload) {
          this.$parent.upload(obj, function (href) {
            _this.execCommand({ name: 'insertHTML', value: '<img src="' + href + '">' });
            _this.hideDialog();
          });
        } else if (uploadUrl) {
          var formData = new window.FormData(form);
          var xhr = new window.XMLHttpRequest();
          xhr.open('POST', uploadUrl);
          xhr.send(formData);
          xhr.onload = function () {
            this.execCommand({ name: 'insertHTML', value: '<img src="' + xhr.responseText + '">' });
            this.hideDialog();
          }.bind(this);
          xhr.onerror = function (err) {
            window.alert(err);
          };
        } else {
          this.execCommand({ name: 'insertHTML', value: '<img src="' + this.url + '">' });
          this.hideDialog();
        }
      } else {
        window.alert(this.lang.invalidFile);
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


module.exports = exports['default'];

/***/ }),
/* 67 */
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
  }, [_h('form', {
    ref: "form"
  }, [_h('input', {
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__vue_styles__["$style"] = __webpack_require__(69)


/* script */
__vue_exports__ = __webpack_require__(71)

/* template */
var __vue_template__ = __webpack_require__(74)
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(70);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.ve-md {\n  position: relative;\n}\n._31sjThh4deXX0g3ehqSZ2p_0 {\n  width: 50%;\n  height: 100%;\n  padding: 8px;\n  position: absolute;\n  outline: none;\n  resize: none;\n  border: none;\n  box-sizing: border-box;\n  overflow-y: auto;\n  font-size: 14px;\n  border-right: 1px solid #ddd;\n}\n._3ytmOLXduY0FY9-B7Npk6S_0 {\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  right: 0;\n}\n", ""]);

// exports
exports.locals = {
	"editor": "_31sjThh4deXX0g3ehqSZ2p_0",
	"iframe": "_3ytmOLXduY0FY9-B7Npk6S_0"
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _marked = __webpack_require__(72);

var _marked2 = _interopRequireDefault(_marked);

var _vuex = __webpack_require__(1);

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


exports.default = {
  mixins: [_vuex2.default],
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
      return this.mstates.view;
    },
    content: function content() {
      return this.mstates.content;
    },
    callee: function callee() {
      return this.mstates.callee;
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
        this.switchView(this.view === 'markdown' ? 'design' : 'markdown');
        this.updatePopupDisplay();
      }
    }
  },
  methods: {
    updatePopupDisplay: function updatePopupDisplay(data) {
      this.$store.dispatch(this.mpath + 'updatePopupDisplay', data);
    },
    updateContent: function updateContent(data) {
      this.$store.dispatch(this.mpath + 'updateContent', data);
    },
    switchView: function switchView(data) {
      this.$store.dispatch(this.mpath + 'switchView', data);
    },
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
        var editor = _this.$refs.editor;
        var body = _this.doc.body;
        var nowLeft = editor.scrollTop;
        var maxLeft = editor.scrollHeight - editor.offsetHeight;
        var maxRight = body.scrollHeight - 1 - _this.el.offsetHeight;
        var nowRight = body.scrollTop;
        if (type === 'editor') {
          body.scrollTop = nowLeft / maxLeft * maxRight;
        } else {
          editor.scrollTop = nowRight / maxRight * maxLeft;
        }
        // next call of this function is caused by js.
        _this.isJsAction = true;
      }, 100);
    }
  },
  created: function created() {
    var renderer = new _marked2.default.Renderer();
    renderer.heading = function (text, level) {
      return '<h' + level + '>' + text + '</h' + level + '>';
    };
    renderer.paragraph = function (text) {
      var div = document.createElement('div');
      div.innerHTML = text;
      if (div.children.length === 0) {
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
/* 72 */
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
  code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
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
        text = escape(
          cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1])
        );
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
      out += this.renderer.codespan(escape(cap[2].trim(), true));
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
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return '';
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
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
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
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

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[^]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[^]*/, '$1') + href;
  } else {
    return base + href;
  }
}
baseUrls = {};
originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

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
  xhtml: false,
  baseUrl: null
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(73)))

/***/ }),
/* 73 */
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
/* 74 */
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
  }), " ", _h('iframe', {
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(76)
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_vuex2.default],
  render: function render() {
    return '';
  },

  computed: {
    fullscreen: function fullscreen() {
      return this.mstates.fullscreen;
    },
    callee: function callee() {
      return this.mstates.callee;
    }
  },
  watch: {
    'callee': function callee(val) {
      if (val.name === 'fullscreen') {
        this.setFullScreen(!this.fullscreen);
      }
    }
  },
  methods: {
    setFullScreen: function setFullScreen(bool) {
      this.$store.dispatch(this.mpath + 'setFullScreen', bool);
    }
  }
}; //


module.exports = exports['default'];

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var updateSelectValue = exports.updateSelectValue = function updateSelectValue(context, data) {
  context.commit('UPDATE_SELECT_VALUE', data);
};

var updateButtonStates = exports.updateButtonStates = function updateButtonStates(_ref, data) {
  var commit = _ref.commit;

  commit('UPDATE_BUTTON_STATES', data);
};

var updatePopupDisplay = exports.updatePopupDisplay = function updatePopupDisplay(_ref2, data) {
  var commit = _ref2.commit;

  commit('UPDATE_POPUP_DISPLAY', data);
};

var updateRect = exports.updateRect = function updateRect(_ref3, data) {
  var commit = _ref3.commit;

  commit('UPDATE_RECT', data);
};

var updateContent = exports.updateContent = function updateContent(_ref4, data) {
  var commit = _ref4.commit;

  commit('UPDATE_CONTENT', data);
};

var switchView = exports.switchView = function switchView(_ref5, data) {
  var commit = _ref5.commit;

  commit('SWITCH_VIEW', data);
};

var setFullScreen = exports.setFullScreen = function setFullScreen(_ref6, data) {
  var commit = _ref6.commit;

  commit('SET_FULL_SCREEN', data);
};

var callMethod = exports.callMethod = function callMethod(_ref7, data) {
  var commit = _ref7.commit;

  commit('CALL_METHOD', data);
};

var execCommand = exports.execCommand = function execCommand(_ref8, data) {
  var commit = _ref8.commit;

  commit('EXEC_COMMAND', data);
};

/***/ }),
/* 78 */
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
      if (toolbar[name]) {
        toolbar[name].status = data[name];
      }
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
    console.log(data);
    state.callee = data;
  },
  EXEC_COMMAND: function EXEC_COMMAND(state, data) {
    state.command = data;
  }
};
module.exports = exports["default"];

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(107)(content, options);
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".vueditor html {\n  font-size: 16px;\n}\n.vueditor h1,\n.vueditor h2,\n.vueditor h3,\n.vueditor h4,\n.vueditor h5,\n.vueditor p {\n  margin: 0;\n  padding: 0;\n}\n.vueditor ul,\n.vueditor ol {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.vueditor a {\n  color: black;\n  text-decoration: none;\n}\n.vueditor hr {\n  margin: 10px 0;\n}\n.vueditor label {\n  font-weight: normal;\n}\n.vueditor img {\n  max-width: 100%;\n}\n.vueditor {\n  min-width: 300px;\n  min-height: 150px;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  border: 1px solid #ddd;\n  background: #fff;\n  box-sizing: border-box;\n  position: relative;\n}\n.ve-fullscreen {\n  position: fixed;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  z-index: 10;\n  margin: 0!important;\n}\n.ve-design,\n.ve-code,\n.ve-md {\n  flex: 1;\n  overflow: hidden;\n}\n.ve-design {\n  position: relative;\n}\n.ve-design iframe {\n  width: 100%;\n  height: 100%;\n  display: block;\n  position: absolute;\n}\n.ve-code {\n  /*safari*/\n  position: relative;\n  overflow-y: auto;\n}\n[class^=ve-triangle] {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  vertical-align: middle;\n  border-top: 4px solid;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n  transition: 200ms;\n}\n.ve-triangle-down {\n  transform: rotate(0deg);\n}\n.ve-triangle-up {\n  transform: rotate(-180deg);\n}\n.ve-btn-box {\n  float: right;\n  font-size: 0;\n}\n.ve-btn-box .ve-btn:not(:last-child) {\n  border-right: none;\n}\n.ve-input-box {\n  display: flex;\n  margin-bottom: 10px;\n}\n.ve-input-box .ve-input {\n  flex: 1;\n}\n.ve-input-box .ve-btn {\n  border-left: none;\n}\n.ve-btn {\n  display: inline-block;\n  margin: 0;\n  padding: 5px 15px;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  border: 1px solid #ccc;\n  color: #333;\n  outline: none;\n  background-color: #fff;\n  user-select: none;\n  line-height: 20px;\n  transition: all 500ms;\n}\n.ve-btn:hover {\n  color: #fff;\n  background: #42b983;\n  border-color: #42b983;\n}\n.ve-btn:hover + .ve-btn {\n  border-left-color: #42b983;\n}\n.ve-input {\n  display: block;\n  width: 100%;\n  height: 32px;\n  padding: 5px 10px;\n  color: #555;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  outline: none;\n  box-sizing: border-box;\n}\n.ve-select {\n  position: relative;\n  min-width: 60px;\n  line-height: 26px;\n  margin: 5px 5px 5px 0;\n  padding: 0 20px 0 10px!important;\n  border-right: 1px solid #ddd;\n  vertical-align: top;\n}\n.ve-select span {\n  display: inline-block;\n  width: 100%;\n  vertical-align: middle;\n  font-size: 16px;\n  line-height: 26px;\n  letter-spacing: initial;\n}\n.ve-select i {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  margin-top: -2px;\n}\n.ve-select:hover {\n  background: transparent!important;\n  color: #000;\n}\n.ve-dropdown {\n  width: 176px;\n  padding: 5px 10px;\n  position: absolute;\n  top: 36px;\n  z-index: 1000;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n.ve-disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.ve-popover {\n  font-size: 14px;\n  position: absolute;\n  z-index: 1000;\n  background-color: #fff;\n  padding: 1px;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);\n  box-sizing: border-box;\n}\n.ve-pop-arrow {\n  position: absolute;\n  left: 50%;\n  top: -10px;\n  margin-left: -10px;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid rgba(0, 0, 0, 0.25);\n}\n.ve-pop-arrow:after {\n  position: absolute;\n  left: -10px;\n  top: 1px;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  content: \"\";\n  border-bottom: 10px solid #fff;\n}\n.ve-pop-header {\n  background: #f7f7f7;\n  padding: 8px 14px;\n  border-bottom: 1px solid #ebebeb;\n}\n.ve-pop-body {\n  padding: 8px;\n}\n.ve-fixed {\n  overflow: hidden;\n}\n.ve-dialog {\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1000;\n}\n.ve-dialog-header {\n  background: #f7f7f7;\n  padding: 10px;\n}\n.ve-close {\n  float: right;\n}\n.ve-dialog-body {\n  padding: 10px;\n}\n.ve-dialog-footer {\n  padding: 10px;\n  overflow: hidden;\n}\n.ve-preview {\n  margin-top: 10px;\n  text-align: center;\n  font-size: 0;\n}\n.ve-preview img {\n  max-height: 300px;\n}\n.vueditor .icon-align-center {\n  background: url(" + __webpack_require__(81) + ") no-repeat;\n}\n.vueditor .icon-align-justify {\n  background: url(" + __webpack_require__(82) + ") no-repeat;\n}\n.vueditor .icon-align-left {\n  background: url(" + __webpack_require__(83) + ") no-repeat;\n}\n.vueditor .icon-align-right {\n  background: url(" + __webpack_require__(84) + ") no-repeat;\n}\n.vueditor .icon-bold {\n  background: url(" + __webpack_require__(85) + ") no-repeat;\n}\n.vueditor .icon-code {\n  background: url(" + __webpack_require__(86) + ") no-repeat;\n}\n.vueditor .icon-eraser {\n  background: url(" + __webpack_require__(87) + ") no-repeat;\n}\n.vueditor .icon-file-image-o {\n  background: url(" + __webpack_require__(88) + ") no-repeat;\n}\n.vueditor .icon-file-text-o {\n  background: url(" + __webpack_require__(89) + ") no-repeat;\n}\n.vueditor .icon-file-text {\n  background: url(" + __webpack_require__(90) + ") no-repeat;\n}\n.vueditor .icon-indent {\n  background: url(" + __webpack_require__(91) + ") no-repeat;\n}\n.vueditor .icon-italic {\n  background: url(" + __webpack_require__(92) + ") no-repeat;\n}\n.vueditor .icon-link {\n  background: url(" + __webpack_require__(93) + ") no-repeat;\n}\n.vueditor .icon-list-ol {\n  background: url(" + __webpack_require__(94) + ") no-repeat;\n}\n.vueditor .icon-list-ul {\n  background: url(" + __webpack_require__(95) + ") no-repeat;\n}\n.vueditor .icon-outdent {\n  background: url(" + __webpack_require__(96) + ") no-repeat;\n}\n.vueditor .icon-repeat {\n  background: url(" + __webpack_require__(97) + ") no-repeat;\n}\n.vueditor .icon-strikethrough {\n  background: url(" + __webpack_require__(98) + ") no-repeat;\n}\n.vueditor .icon-subscript {\n  background: url(" + __webpack_require__(99) + ") no-repeat;\n}\n.vueditor .icon-superscript {\n  background: url(" + __webpack_require__(100) + ") no-repeat;\n}\n.vueditor .icon-table {\n  background: url(" + __webpack_require__(101) + ") no-repeat;\n}\n.vueditor .icon-underline {\n  background: url(" + __webpack_require__(102) + ") no-repeat;\n}\n.vueditor .icon-undo {\n  background: url(" + __webpack_require__(103) + ") no-repeat;\n}\n.vueditor .icon-unlink {\n  background: url(" + __webpack_require__(104) + ") no-repeat;\n}\n.vueditor .icon-markdown {\n  background: url(" + __webpack_require__(105) + ") no-repeat;\n}\n.vueditor .icon-fullscreen {\n  background: url(" + __webpack_require__(106) + ") no-repeat;\n}\n.vueditor [class^=icon] {\n  width: 16px;\n  height: 16px;\n  display: inline-block;\n  background-size: contain;\n  vertical-align: bottom;\n  opacity: 0.8;\n}\n", ""]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAmVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlB4vuQPAAAAMnRSTlMAAgMFBwsMDg8QERIUFRYXGBkaJiotLjg6UFFSVVZofoKDqK+3ub7BxcrM0dnk6Pf5+4oUqqUAAAEkSURBVGje7djbUsJQDIXhUFFosSBnioBaKGo57v3+D+eVNx1nSNJm48X6X+Cb6TTJtEQIIfTbU39ws/5jLaJdeFa7dg3kyzP71BtDz+5FjUz5yFSNzPjIDAgQWRM+MlEjHT7S0Y/8B9d4q7MhX48c4rjEuUL/oOih0aI/iFHpG64cVY3Y+ca7xtoFIum9ghQWSFFB9hbIHgiQYK9wkGFMDNaKi++xIMOseoRC1dqc5INx2rREyFY3f1uJMdZO+ViAZFokEyBrLbIGAuRWKy2yEiBzLTKXfHSddcZZdHOTg8Y4JMI93B2I6+J6ofv87ug9G9aLiIiWzpvmMqKFN29BpT3yTT5AQIAYIld740K5PZJT6qwNlxKluekTu+QpDh1CqOl+ACYrEC2lLhvkAAAAAElFTkSuQmCC"

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAWlBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlC+y02GAAAAHXRSTlMAAwQFEhQVFyUmLS46OzxQUVVWqLq8ysze9/n7/bGqpTcAAADCSURBVGje7ZkJDoMwDAQHCunFUZoepIH/f7OvWEtVdz4wUpSsHRuMMX9F0x+F9A3Afdul1AXGXc7IWy95sQdgiSVCyUfvKGS9JJOq2lETpCw9sZKTC50R0x6EtABcV+1bXC9w1sfKiade8qDqJdWV0RKhJOQKhzzGkFgJCciYqDdGR8pF3nCHfB1CPkFFLymujJb8uiRkPDjpJZN+ZLstUcNnY5T7k64X0jUAN3EnUWcY9LEyeH9iiSXen3h/YowxfAF9I35eWqqeiAAAAABJRU5ErkJggg=="

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlD5L8M5AAAAM3RSTlMAAgMEBQcLDg8QERIUFRYXGBomKi0uODo7PFBRVVZofoKor7e5vL7ByszR2d7k6Pf5+/1nKpp+AAABHklEQVRo3u3Z21LCMBDG8bUeEaKCIshJo6LiqS37/u/mTeowQyZcdL9wwfd/gd9Mp93MpiKMsYOq6F236+pspzFfa+teTtPGWC16TyMrE0RvkoiNoXc5kCERIttVNshtEvE2yHkScbWF8bhjQDrf+ol9TXmWsX12fIKo2CSG34pp1f83Bgqr6jTIEofoU4PUQOTV+DyJ9kbkwJEsr3CWjxE4VupO1gGZZ9Qzhsv50ujD+FkcQVeH0DN2CQoN4khpikygi2loToQIDJlBrwdD93HkwdL4LYBXtqHPS9zlc9MFjzS2n/8n3R6wbiEiMkWuQapaT0RGCm9kPCCjfYhmiAgRIFLhjdJ4dYjmbZeg+PByJv9Pks/KOx50jDHr/gDKzMKMu2GFWQAAAABJRU5ErkJggg=="

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlD5L8M5AAAAM3RSTlMAAgMEBQcMDg8QERIUFRYXGRolJiotLjg6OzxQUVJVVmiDqK+5ur7FyszR2d7k6Pf5+/3jauRDAAABG0lEQVRo3u3Zy1ICMRCF4TaoXEfwwkVBlIAKokDs9383V2OxSbKYPtl4/hf4qlKTnklGhDHG6q5vhs0auBxxtdHGhWUG+VCLHpPGyMTQbRIZ2yCaRCZEiMCQBxvjmETaNohPj5WVhRGqzPB63jdeK58zGDPKXSJqnRO3O8X0Nf4zukFh3ZkOkEhvNbIBIqFG3oGIEvnnSJFHuMhm7JUYK0UGZJlRz1ipLl6/jbZJ4oN7bTm6Isq96Z6PHILmpkjkOPeCeZ8QISIiyxLI1NSIXA+6gyXyFJldvU8z4idxZdsZ2pS/fGasYa4/ANZ3IiIL4KFBVTXMRWYKbyY7PLIVLRARIkDkhDeO4vGIlyqgjVCJVB66Yvx/whgD9As3HcK8Wc6lewAAAABJRU5ErkJggg=="

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABWVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlBnrqOTAAAAcnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGhweICEiJCYoKSotLzIzNDc4OTw9P0JERUlLTlFVV1xeYmZpbG1xdHh8gIWJjJGVmpueo6aoqq2wtbm6vsHFyMrMz9HV2drc3uDi5Obo6evt7/Hz9ff5+/3yYEsPAAACzklEQVRo3u3Y2VsSYRQG8IMpJQhMpZQtpm2222b7npXtq1hWhplQSaDz/1+EvTPODH7b+Wbmqjl3zHnhxzzDM8BLlE022WTzH83on86zqXLKyGt3Y26mamz7Z7jtVJEJIK9SRe4DuZAqsgIk1Su/C0Y91RO5DOROqsg7IGNpGv0w1vrivlBl/pMj2x0F8nzzQHHuy4iF4TRd9+dOyfIhkHP+46Fl123tsTLkyi8gxZBhocDoKttF2xEsv/pXaBmPmYpvuO6kaH3Fjdwdx/0wSwmMlQHRfg7L/f7NctFCCRkl0T6PZSfnHxj8xlZ0Bh3HdjY4wla0Bj3C+jRZK3qDWtgPkq1iYOzFfiF6lKEYGHQNgetkqZgY9BGJUbJTjIwd3gvlSKFU4xl0EpHHgpWBYmbQE2ROkI1iaOTaCAnvnDrF0KB9CNUka6ViatANpK4SXzE26DNi8g+pVDE3Coj9VkQCZbVqZdAZ5GaIqzAMeorgMWIqHCO3huQA8RSOQQeQ/KDL9ShljkG3EJ0mhjJMVOMY5P1k2E0MZTGENCv6Zw55UYO3U/weQkoNhjKF5AOOsbpx2hWG8gLBIxxjGD/fjZW+deT62QZDOYTUWwvDXLmL0CWNURAZxor3ZMfK6CpNA6WCxA9jo/fPl4lyEYF7toaR8gb7cWsjrDQqqs5mXfWXt7CkNPTKYSxfxjG0itfZnI9l6BSvsynFM9SKtrMJGVV1DREoZXFnczu2oVK8zuZgfEOuaDqbwGjpDamypbOJY8iU3s4mniFRejobmWFTSTTy4s4mer+pxyxXJsWdTWTsCpxAaebFnU20LFyyMjZLNUfW2US/0+1KNa8edOSdzRbFwuh+xmrzjqqziSrvF2yKTn1nk/SIO5uER9LZJDuyzibJkXc2Cc4peWeT3Kg6m8SmrupskpppZWeT1BTOzrY7Y5T+5CibbLLJJpuk5y+zUKCeS7gPWgAAAABJRU5ErkJggg=="

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABiVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlDqUIP+AAAAgnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESFBUZGhscHh8gISIjJCcoKSowMTM0ODs8PT5AQkNFRkdJSlJUVVZXX2FiY2RmZ2lrbG1vdXl7fIWGiImLjo+RkpSVl5ibnaCio6aoqqutr7W3uby+wMHDxcjKzM7R1dfZ2tze4Obo7e/x8/X3+fv9eQZEnwAAAi9JREFUGBntwXk3VXEYBeB9zu1eFLoiDTcqmgyleUIDKtKMSqPQIJEhUw6u/clbee8H2L/3n9ZqnedBKpVKpVL/Rl33q/EJzbu+g/CIBhnkdYxg0XsGms4g1BMGG0CgbjpUIUg7Pc4iRANdOhGgJqHLDejKlunTDFn8nT5JDNlbOnVANkCnh5Bdp9OHCKrTdJrJQHWgSJ+VcqiqftNnsxaq7AKdjkEVTdLpPGQjdOqF7B6dXkB2mU7jEVTNdJrbBVXdFn3W9kBVsUqf4n6oMrN0OgFV9IlOVyB7TKcHkHXRaRSyNjp9i6FqoNNSDqqahD7JXqjKlumzXYAqnqJTC2Rv6HQTsn46DUJ2jU4fI6hO0WkmA1V9kT4rFVBVrtFnsxaq7DydjkMVTdL0QNPOkguQDdMMQ1NgSS9kfTSfI0iq12mGILtE8ysHSXaBZiKCqokmyUMSTdLMZaGq26RphOY5zVolVBWrNOeguUVTrIcqM0vTC00bS05CFY3RjEBzeJvmKmSPaL7EkFSv0/RD1kWzlIMku0AzClkbTZKHJJqgmYqhOsKSRmie0SzloMonNB3QdNMkeajKlmn6oGlhSQGqeIrmJTSHtmlaIRui+RpDUrVO0wlZgWYpB0l2nmYQukHu2KiBJBqnGYugW+SOo9A8pZnJIMAG/1q8qxmmWa1AiGk6bNYiyG06NCFM+QaDXUSoVobqQbgz2wzSCY/dd35sUVP8eX8fUqlUKpX6f/0Bl2O/cU+zSuAAAAAASUVORK5CYII="

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABa1BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCat1vqAAAAeHRSTlMAAQIDBAUGCQoLDA0OERITFBUWHyAkJyosLzAxNDY3PD0/QEJDREVGR0lKS0xNTk9QUVJUVVZXX2RmaGlrbG9wcXN0dXd4eXt8foCCg4aIiYuMjo+RkpSdnqCio6WtsLK1t7m8wMHDz9na3N7g4uTm6O3z9ff5+/0N1+4LAAACq0lEQVRo3u3ZWVvTQBQG4JOJtVTL5obFDVGrshVcUKmiKJtrwQUpWhW0UqlYLdicn+9FSEyTSTPJnAkX9LvLM5l5nyST5EwCYKXjccXAsPmznj8O4jm5ixFTG2WCRiqygYi102LIE5RKXgj5IYfgrAhiYAwKYgzK3p6HmWhmzA4ft0Moezsy4SmfNzuc0e6IK5ERgOu2MqcOgSFRRQaBYUFFChFV5BAYsZV5dQiMiiiyiJAijcBYsCKPQM5WFtQhwQoFAuMBCgkCE60VGgRu2Mq0OsShZNQhcNNCfjN1CNyylJxCxFZqKhGrCU+oRLSa2XafCpk+xUnRbNugQlpW49LIXYFSTBq5EgeSigOBB3EgME+F6MmEv3Ls3sp7bj6EQPoKdUQ01gY0CBcmjPSW7cP+2a8IOd9wnt0pJUjGdQ2nFCDpv+6Z0k+PFD3TcVujRro5k36AGpnkIGvUSImDGNRIhfeQSBAjdR6SJEY2eYhOjKxyjDr1NclykAI1kuQgfZ6xHl6Qu+NnPUbZM9Qj3xtUEElUXUaj191jBhHxotRTuMv1ufCcz6e+Qan3SZfzWHY9iw37fA5KvRkTc7ZRTLt3/9+Gl2QQgGR2dbNeKU12e0ZZcJ7Jy1KIbxabr1dWBfLUPb2v0iPPvDfqNWrkOe/hOUSLvOBXpMOUyEu/uneEDnnlX12PRUbYctP7sNCqhs9FRFgJtxzKUuuVwngkhH1CxGqHtfk6aD0yEQFhn82aPmVuvgleWp0NjbAvVoV6BADgrcAi8XZYRF+3+/46Cto7VIDoG86fVj0rqADRv0b5URMO0b+hcuRQGdUj3zEGBNtIG2kjBwiRTBtpI/uG0GZfkKoCYytwsUmQRTeSNsiNhucTA2SoFYPzXxY6l3cIiZ2lTp/5rdGladx/Xh+3LuObBs4AAAAASUVORK5CYII="

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA9lBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlBBA0bsAAAAUXRSTlMAAQIEBgcJCgsMDQ4QERIVGR0fICEiIyQnLC0uLzAzOkJKTU9kZmlrbW90dXd4eXt8foOFi4yPkZKaqLe5z9HT2drc3uDk5ujr7e/z9ff5+/30iNzRAAABlElEQVRo3u3ZWVPCMBQF4NNaFQXcFZcqrrjv4r6gSEEF2vz/P+NDlxkR6KVJ6oP3vDbJ99KcSSZAmNGDiicGzcdDaQb0FFoiYZxNk2hkEhtCCGeJhhwKqZRIyKscIo4oiCdSUIRIQQlGWiY1ZX/CXW0AJRhokn/5S3/CnLFNVxIjwEakHOtDsE5VZBAUiYoUgjWaIodgOdpnJ/oQLLoERRbBfDtekUYw3YpV5BFMfYXKqT4Ek58xigoEE43+ihIEuXpfRQ2C8aiU9/UhyFRDxdaHYKQSLFU39SEYfg7W2tKIwHoKDko6EeSCxWZ1Irjxv+2qQvrlURq5IJzGpZE9wlFMGrHTQIyXFBCMvaeAYGinph8BYHQ/J1tKkR4xGWGEgBi0yCDFNvFSem8kRxrkq28hOUK/X68wAjhkZCE5YhMV99rgHc8ItzC38P9C6mm08CpRcW+5hRnhFuYW5hbmFmaEEUYYYYSAqM2fIFUNxlsncq4BOetEsp5yw83+ftlRrXhd3mWRLzcVEs2rfK/nEHX5se433aBNZmw1zKwAAAAASUVORK5CYII="

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA0lBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCLwGkMAAAARXRSTlMAAQIDBAUGBwgJCgsNDxESGhscHR4fICIjJCUmJygpKissLS4wMTg+P0pNUFRdZ3h5ho+RlKWmur7Ays/Z5Obv8/f5+/2SdDsAAAABVUlEQVRo3u3a2VbCQBAE0CQogjsBwX3HXXEXNIrJTP3/L/nigyegTCaTEqXrA3Ifku5TmTOe95nyE7LFy57gGXbITAbkDJZIv2WO9GwRYN8Yie0R7JkiyIHoXQICvUNAoLcJCPQWAYHeJCDQGwTERMmPQK8TEKg1AgK1SkBGKW4QqBYBgWoSECRNAvKT4g5BskJAkDQICJI6AUFcJyCIQwIyXHGN4H3BIdL9LrcOkSwZUyRgICEDeWQguGIgeKgFxSMj0xZEkN9FouVps1Q79six8Zj59shBzmGeMOSIgXRNz5n8cxlGQSYWeW0YbuHZG3vk1HjgS7Ig/xNCefGUT1jWiiB/HOlVTCvRxZiXO9nCmZATxk9QVCubZa4jwyiIIIIIIkhhyGEKeSsCSV81uCsCqaaQsADjfqAKXDo3XqYGC0c7ckqo69LQXlNZXHKWef/Lgz8AEq4GpDAt4LEAAAAASUVORK5CYII="

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAh1BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlDQuOtUAAAALHRSTlMAAgMEBQYICwwOERMUFx0jOz9GSlFSX2JjbG17hYiJi4ydqLnR3uDt8/X7/RuUh+AAAAEkSURBVGje7dnbToNAFIXhpdVKFUWt4hlUkFKd938+72WYqdmHaLr+a5IvEzIzmwAwxvap1blxK+A+mHeHrT0yIjhEhAiRv4IM9saAylwZKl517L9Xfbwf556pR+E+GULoM0oh3vEhZJVS54BMK0pIWtFCkooaklL0kISiiMwrmsisoorMKbrIjKKMxJVToTH5PokqnQypJ3NXfC2loALT4a7Pnvy/b7q6fuGAhFsP5NIBeXV4JwYGdjFO1jeCrg6wg3G4kW3Gtx9IG1vsmfBY+ULeUD4gW4f7pHW4GVuHO75xmFYah7mrcZggG4dZ+MVhqk8bCkiXNXD0KTM6LB+usyf1xdOzoMclGDOsKI0rgDqYV2O0R/j/hAiR/UL4/4QxxuJ9A9+JZ3IGueJhAAAAAElFTkSuQmCC"

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABsFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCRaBZ7AAAAj3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGhsdHh8gISIjJicoKSssLS4wMzQ1Njc4OTs8Pj9CQ0RFSktNTlBRUlRVVlhZXF5fYWRobG1vcHFzdHV3eHx/goWGiImLkZKUl5iam52go6irra+wsrS1ubq8wMHDxcfIys7R19na3N7k5ujp6+3v8fP19/n7/Vr3HEQAAAKCSURBVBgZrcH5N1QBAAXg+55Z0kSUGpUMWrVTKS1SlDaR9rRo075rR1OI0XD/5Tqnnzp3HOa534eFOP87+/HZves9XW0tu7fUr1lZVpqIhUGAv4KwJJYoXZ7ObGk6dKqnf/DdaL4UkbxiEfKIJs8ivEYkKRbjNCLZwGJkEEkHi/ClBJHsffBhjAsxPdBcisWILcu0DuQ4txdt6QAOQRMLGu9rCOHDAh6tgxcLSMIrpHoJsxTVEZjVUlXD7ABVCLPLFF/h9oaiH24zFMdglqLaDLNNVJUw66QKYfaQYhhuExS3YJakOgyzOqoamLVRJWA2QPETbmMUd2CWpDoKswxVDczaqeIwu0+Rhdsvin6YLaE6CLMGqmqYnaQKYfaY4hPcchS9MEtR7YDZVqpymJ2lmIbbS4rHMAtmKDpgVkGVgdkuqjjMeimG4faB4irMQqommKWpKmDWQpGH2w2KJ3DLUnTCLE5VB7NaqjjM2ilG4PaQ4hrcpiiaYZaiWgGzRoqZAGbnKJ7D7S1FF8wCqgaYVVElYbaf4gfcrlPchtsoRSvM4lTVMMtQhTA7QfEZboMUfXDLUeyB2TKqCphto5iGWzfFINyGKI7BLKSqgVmaKgazFopvcLtJcQVuWYo9MEtQVcAsQzEbwOw4xXu4PaLog9s0RTPMqqhWwewMVQxewQ+KHMz2UQ3BKzlJ9QJOiY4JFvC1BC5Lm59wLt/vdjZWhlic5NaLI5xX9l7X9kpEU9s9zAV7gEiCWRbhAiKpZDEOIZKdLEYdIunmf/KT4xO/pnJ5FpZEJG/JiaH7lzr2bkyXJUL8JwjCWNn6fReeTvKfcUSTigeYX0n52vr1q8uTWJA/hGHnz5A/HK0AAAAASUVORK5CYII="

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABfVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAcffURAAAAfnRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQXGRoeHyAhIiUmKCkqLS4vMDE1Nzg+QURFRklKTU5PUFFSVFZXWFlbXmJnaGxtb3N3eX5/g4WGiImOj5GSl5ianZ6gpaaoqquwsre5ury+wMHHyMzO09fa3N7g4uTo6evt7/Hz9ff5+/2+M7R2AAACj0lEQVRo3u3Z+VPTQBQH8JeUEEtqBVEUULxb6gWK1gMFEbwQ8VYqh6Ki5RKkSAu0+7c7yW5Ca6DOyPtG6+T9tPuYyYc02euFSIU+Juy4T8CIvBdwpP6rgCMN8wKO7Psu4MjBHwKOtG0IPJIQASB0zr76MPrBXxNiSoO/wv0TOuEHo0YBIPQ3kcYDu4/G3yBjgiMyVZE9gieqIlZNIlqI/EtIlx1XZH/a6RxlRzR/djhE/gAxgkCoZ42ByPdQGGH8F6GduPc5V5h7fSmGM7pXvaHzwsQQ5seKAdoOMRYqp4HNFgAy/etkM6dhTifOHXhKgh2pG3UufDdKWqookaeA3+tkToiU07ohkVn3L715hql+TU71xrM78qItMl0g9kWrLI7I5DxsL2xHRiZHkMgDlTyGQ4wJlZvBHR2O51RqPY5CIo/cTLEdteE+tOQmCq2oXf1Vr//BQh0d+r3BeZZQR4e023liEAppLqm3Kmmvw4ft2Mt+xP4iW0vxrX9+UN3KOxZjnKhDNZvJj7CVPUak8ZK2Q7hiZZsb5EZ0EQBiBIFoQSC0GARyqssfreHpIIwaCv+8afIXn/1j8ZZrTLIVn3dGGFfGnRGr5pFuELIct6JmLOu0JzUQsmAvLXJzsmgQEHnjtDb2IzZ3lh1RogGZOYP8tHFaJvqQtXqr4PRfIT8IaDOq5NFbj0OGvEzxQvXt0i6Q62W5rcfCXHyuWy9Ld6BWlcvjU8sukkUuX9aoUpqgq+QniSShiHr+FxE/k9fqk0gnvxHbHNBVXeKbRNoglc6VdJNORmJWGqUIu3HTN3ye82+7fEbRYkdu+5AU4N06X6oscHdCBkfDwzLjrYUag2bycTYvxGomHUd/Q4Fd+Se9zbVMYAMuWgAAAABJRU5ErkJggg=="

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABFFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCdUZl6AAAAW3RSTlMAAQIDBwgJCwwREhMUFRcYGRobHB8gISMnKCorLi8xMz0+SUpLTlBUVVldXl9hYmNnaICDhYaIi4yRlZeborCytLe5ur7DxcfKzM7P0dPZ3N7p6+3v8fP19/n7hn7oSQAAAdJJREFUaN7tmN03AlEUxU/TiCgzUYqK8lUkhISQQRKDhKL7//8fHkxfM1cvc+61Ws5+3D38VmtmztlnA5BIpH8nNVW+/3ip7OjiEN79DrNkaIIYUyYb0KoYxjsb0nb/p4nEsntFAcBrMpuSPUabYegIoOAwXxULEkdhsC9QO043Y0ESOBAGKY5pYkPOeK4PGVLnuRoypMVzY8iQBs8NI0OueK4fGbLLMdseZEiIY5awX2G4dpoBdIjm8I67syuEw3gAgHWbd6f0pvDmpeFe534AgNwQo6qK2VrJZp9RVETtXyX79PPuloJCo4RPX4z4PRSpSGMrnxYLi32FlYxpfYwBYQwZY0XGgLSP+mr/v2SNW/e6mOYtrWKXMYeztB4BDAnrV5cRJPIyIlFFRriTElOlBG4pp0NZxhGUlnHOSTlMOSd2szu8lrBO7FFlgYpTFhxyao/cQHm0lHCvBU6BsyaqiiqIr6IAQE2X661GJa9ToiKRqHwWWj6jTOHI6PJZbaHsk4OR5TPaZqTymcrnMS+f9/6qfD5Bz8I3TjOIDgn9evwi3vGwYfNqAhoJsD37mqDyeeVt4KELK5+9W8+MMcY+T2eFRonJ+Xh0hspnEok0HvoGC+ShTC/TNBUAAAAASUVORK5CYII="

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlDbLQvCAAAAK3RSTlMAAgMFCAsMDhETFBUXHSAhIiMtLi8/SlFSX2JjZm1ze4KFnbng6O3z9fv9whZhOgAAAStJREFUaN7t2V1PAjEQheFBYYEVgcUPXL9AWai1////aQRkW+ZuOI2R817OzRNC2k6yIoyxc6o/AtcXeQrwHuUDjzgJGSJChMhfQRq80UgFV5qKTx37fz2sl8mkdqc+J8/f83E0KcwnXjPCTTQqzXeXZoCRrYFFdgYU2RtI5NcAIgcDh7QMGNI2UEhkgJDYSJCB0XCqkSCysiG1aqSIDEpDhW4cIfbqgEcuQwak4zIgMvUZEKl8BuRYSZDe/dzQXUdXYuRiYzuM7/pviZGh8Vr51P991FUfKbBHq63gnt+WAlwkJj4DclCgy91ewa6pOwW8cI99BmSrzMDIjzKMnzVvM1bKnXz1eptMrhdvhl66whiwogRXqEvqqavF4RF+PyFC5LwQfj9hjDG9L/DQVRC18NMlAAAAAElFTkSuQmCC"

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABv1BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAhme5xAAAAlHRSTlMAAQIDBAUGBwgJCgsMDhAREhMUFRYXGBkaHB0eHyAhIiMlJicoKissMDEyMzQ1Nzg5OzxCQ0VGR0lKS0xNUFFVVldYWVtdX2FjZ2hrbXBxdHV3eHx/gIKDhomMjo+RkpSVmJqdnqCio6WmqquvsLK0t7q8vsDBw8XHyMrMzs/R09XZ2tze4uTm6Onr7e/x8/X3+fv92eXofwAAAzRJREFUGBntwf1DE3UABvDne9tgA8w5IjMwBCMTTQw1Z0VkJALpEmpiVpSQ0RuUSwtdvkC2Bm66secPtrG72+3lbve93fGL+3zQ0vJCEYFg556uoAJvBF5/bz6xRVXu9vULx3v8cNO+C3+ynvXPj4XgCuX0PVp4MHVAoEkimmYj2bhAM3qStGMfmvAR7XkHjokvabA89lrQB4hQ38TfrBKDU2KRumeTIRi8fIMVVuHUAnUrIVTpe0SDp3BokrorqKV8R4MAHBmkLo66Zlm2F074UtTcF6jvGnWH4MQV6vpgQiSpOQkHOqh7CFOvUDMOB+aoOw9z16iKQZ6So24A5kJULUDecZZFYCHOkhXIu86yPbAQZkkS8jIs64WVVe74F9I6aBCFlWHuyEBaHw3+ghUlx6JNSBuh0auw8gWLEpD2Lo3WYCXQP3z6/KVjkPYhK8zAC2dZ6RQ8cIJVzsJ9B1ntKz/c1s4amTMCLttkrdQZH1w1x3pylyNwUT9NJD/ohFvEFk2tjUfgjo9pJR3rhQvaCrSWntmLpn3KhhInBJrj22JjmakgmjJCOwpzQTTja9pSmPbBOd+oTW8JtLhpKEWPpYaQoudS4C4AdwG4C5Ch557gHD13DlACHlPQ4g/XJeCqyNUCa4XhsuDlbVYbhOtCC6xyEh4YzrPCKXjhQJ5G78MTQzSKwhvTNBiFDF+gPdTZBRvEBsuOQsYSizphwyjLeiFjiUXTsMFXoK4DMm6yKKvAhl+pE5DxO3eMwIYYNQlIuccdd2DDJDWTkPKIJd1obJaafkhZZ8ksGvuRqpwCKQ9YkvOhEbFNVRxy1qi6iEYGqDkIObeoCaOBFaqSkLRKzX0Flg5T8yYk/UzdIqz4U1QtQ9ZPLJuHOfELVek2yFqmwbcCJsQ3VOX3Q9pNGt19CXUFb1G1PQh537PSTAA1lLE8Ven9cGCJVfKxCCqEZ7LU/NYOJxZZa33qjQ6B/4muI5f+YdkncGaMJrKPN7KscDcCpw4t0ZZMVKAJ/iPxJ2zg6UU/mtY9/gfNPYz64I62o/P/sY7bE91wVWgg+tmNxMZmrvBs6/GdH65OvN2joKXlhfEcTA1TnELds/EAAAAASUVORK5CYII="

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA81BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlDKM9ljAAAAUHRSTlMAAQIDBAUHCQwPEBUWFx0eHyAhIiorLS84OjtAR0lMTU9QUlRcZGZoaWtsb3Fzd3iDhYaJjJGSl5qbnaCjpbS+wdHT1dfa5Ovv8fP19/n7/YwhIscAAAGzSURBVGje7ZpJU8JQEIQ7QRQUZXFfEHeDJBgBRcQtxF2D+f+/xgN5oYqMqRwYS3H62nn5Lm9mOlMBRKIJkaaPWaOA6crtmz92PbVWtSHjwPOZ1CsGCP3aZ9TWANL1WbUGAHu8DL+fAdLvzBD/Atj02ZVGhx+yApcfUkGfH3IEfoZvCOQXQ3aymYiyu8rt5qJuJhd21v1Zwp6/GYVc0pOsExYtpXTgXiHWDiEG/ZwR2N9M0/jDEIhABPKfISb9mJkIYiaEOBqZ9J3AXiBfUlCJV4+1h63eMY2IzJ5yPTvqGnaY012LsBt9Gb8CmTCIVyDLSV31KlVuek19TC0izg4hNt0Y7MAm+wH0wD1DrC2tXiACEcgPRyIrEcRKCHHJVKOrzUuRfEkp9nBoD+eJW69FVH8IN2PNqFtrhnuZx1PCbkkkEsjERaI8VU559XFwTMUVraoOk7Wqn0gkEohABPKnIR5/JDpEsKPp0VsitcEhezSK8ZFI2dto82+JlrDBP7SmkHrlZjQAlJkZHzMAcM4LWR5cIU7K55q6a+UXLsbd3PBGp9bbztj/Lni+t0ry64lIlFRfrJk1hGnKZcAAAAAASUVORK5CYII="

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAB+1BMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlBP84/vAAAAqHRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIyQlJicoKSosLS4vMTQ1Njc4OTo8PT4/QEFCQ0RGR0lKS0xNTk9RUlRVVldYWVtcXV5fYWJkZmhpa21vcXN0dXl7fH5/gIKDhYaIiYuMkZKVl5iam52eoKKjpaaoqqutsLW3ubq8vsDBxcfIyszOz9PV19na3N7i5Obo6evt7/Hz9ff5+/23OreuAAAECklEQVQYGe3B+3/NdRwH8Nf3bGubtpndy8JiLrHt47okQxgrtiRCSBOxGZpRc8m1Cy0rhNy2nTXn9WdWn+8mHu/v+5zvG6efPJ8AJ4zevnahr2vfjvbWVS2r1qxr3bh5264vDvT0nr509be7Qyn+awQRHvEpw7euXezrPtjZ2XX8zNW7j/mPJoAWSUT4i+l1AKO0QARm8BVwjxaIwAz2AzdpEUAImMEGoHl3V9+FwVGmN/bg1sCFr7c0I0Ll9KnVFVNKSuv2jPFZj64c/3xRKZ7IrVk/wEgjHRU5iKfgB0543L2sKhcR5iUpjRQjvuBnjlsDjaPUCYtajgugyaW0AiaP6N2G7j6FuTA5Qe8OdJcoTIXJFnpj0PVQqIBJM0MBVHsplMJkDkO5UG2lUAyTWobKoWqjUASTMobehmo1hSKYTGLIQbWCQglMchlaBdUyClNgEjDUAdViCuWwGaa3G6rFFCpgM0jvEFSOQiVsztPrhcpRqIRND73zUDkKVbDZRe8qVI5CNWzW07sFlaNQDRtHbwgqR6EGNnUMQeUo1MCmjKEAGkfhDdjkM5SAxlF4EzYBQ3nQOApTYTRCrxAaR6EWRgP0iqFxFGphdJpeGTSOwlswOkSvBhpHYRqMdtKbBo2jUA+jNnr10DgKjTBaSa8BGkehGUZL6C2CxlFYC6NGeu9B4yi0w+gdequhcRR2wmgOvVZoHIVOGNXT+xAaR+EYjOrpbYbGUeiH0Ux67dA0UbgMo3p6HdA0UhiE0Vx6m6BpoPAnjBbQ2wjNPApjMGqitw6amZRg1ExvJTTTKCVgs5beEmiqKeXB5hN6DdBMplQImy/p1UFTQKkUNn30KqHJoVQLm1/oTYIqRWE+bMbo5UB1k8L7MMmnl4TuOwrbYVJH7yfodlI4A5OP6e2HbiGFEZgM0GuBroRSIQyKGKpCGiMUFsLgU3qpAGn0UjiJ+IIhev1IZzmFVAKxtTC0HOnkUVqBuBL3GcpDWv0U7gaIaRtD3yC9BZSWIp7JKYYqkMENCsOvIY6cXxk6hkyaKJ1FDDmXGXqYi4yuUzqMjCZd57hZyKycEY4ESG/+MMe1IY52RrhShDTyT3BCJ+LpY4THHTlQ5G1IckInYgq+Z5Tk9nxEqDmc4hO7EFviDKOdX1qApyTKFh0Z5n9S78JiOzUPe7d+sKRpWUvbvlO/81k3qmEz+x6t9iZgldiRosXZKXgexV2M7dx0PK+Cz5KMIblvMl5EMLt7lGmNdtcHeGHBjI/6k4z08NSacrw8r89Y3H7w3I/X7wylRh/8MXj5+J6NrioXr7zyyktTuP/brDq5KQAGmG2tCJh1PQiYdUcRMOuOImDWHQWYdQeAg8y2WQCmN2ZVQwn+F38DDZqb+BiFAtMAAAAASUVORK5CYII="

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABMlBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlCgtID3AAAAZXRSTlMAAQIDBAYHCAsMDg8QExQXGBkcHyAjJCYoKSssLTEyNDc4OkBCRUlKS01OUFFWWVtcXWFiY2Roa21zdHh5gIOFhouUlZqiqKqvsLK0ubzFx8jKzM7P0dPV2tzk6Ovt7/P19/n7/UKwaqAAAAIQSURBVGje7dlrU9NAGAXg07QFLGi5KAUURUBAUItKW0XFgiIXlZulUqTaEs7//wt+aMJsk92aOL7FGfZ8S862TyYzuewGsLGxsbGxsbmK9BX2mxSIe7x6yzeeUDCvW0aRotkAgDEKZwFARRr55SBD8eSQk0fmMCmP5C3yvyNDSh6HBm+rtVq8MBVapO22+S4w9qxHbdVm0lT8GXEO28fegQCCzLnavYQIgodKtQshBGuXTb1HDHG++c0oxBD0u62iAEEE0yTJzxBFUCZZ7xVGnAqZgzCCAbcIcQSjiS4g+ljk+iK1qpdxtfB3VhsRkHuh/50KIEsdj6L3ZwQkXwxdlcGzcrMTsh3ldOU50fajZJVBpOKYjaeMhjT61O0PDCF8YzSyjIhwXznSRWoQjhmM5ElkhO8vt4apRc7SemSd0RHOeBvpH3qEm1pjinGQC2/2ukMDwke62XQzFsJaCgBKNCJuf8hIfGU8hJsA7tKMcC/0uCkwLsJnuNHohLAUMEYYH+H9A3ZEeLvNSJ3+DaKvld2nKbX4SBGktejgZZZCCKdDr5wCSNO/yyUOKYbwi7d3lYIIn8O8GBRAskrWwqPVOtgNAkjXhafYJw7wSXweX8ZSFxYLXl2HZY8uLKrNY0AeGQdq0oabBB5II8u61aB/nK3W43lF0ij7rwCZ0pHIB4GL728H7ecWGxsbGxubK8lvwLSCdxTXckYAAAAASUVORK5CYII="

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAdVBMVEUAAAAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlAsPlBBOUZoAAAAJnRSTlMAAwQFDxIUISIjJTRCQ0p0dXd4iYudoKK5usXHzM7Z2vHz9ff7/axzRNIAAAC8SURBVGje7dZJDoJAFIThYrQBxREHcGDs+x/RBdHEDXHRZdTUf4FvV+8BSv1+SWlJlcnDWFliy9HYWWpbAMgtuRzwGzbS+FhYenMc+MgeNz5yxcBHBtgPJESIECFChAiZQGI3z3UsRIgQIUKECBEiRIgQIUKECBHyPpIGTkonEU5CvhCp+UaNio9U2PCRNQwfMcCJbRwBhC3XaEMAMB3T6GbjZkYXnnGOntOcFT1D6Ivs9QR4gfM8KPUf3QHmuxw5jd/C9wAAAABJRU5ErkJggg=="

/***/ }),
/* 107 */
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

var	fixUrls = __webpack_require__(108);

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
/* 108 */
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
/* 109 */
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
  }, [_h('ve-toolbar'), " ", _h('ve-design'), " ", _vm._l((_vm.list), function(item) {
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
/* 110 */,
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNonceStr = createNonceStr;
function createNonceStr() {
  var str = '1234567890ABCDEFGHIJKLOMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var name = '';
  for (var i = 0; i < 10; i++) {
    name += str.charAt(Math.round(Math.random() * (str.length - 1)));
  }
  return name;
}

/***/ })
/******/ ]);
});