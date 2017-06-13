/*!
 * vueditor v0.2.5
 * https://github.com/hifarer/vueditor.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("emoji", [], factory);
	else if(typeof exports === 'object')
		exports["emoji"] = factory();
	else
		root["emoji"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(5)

	/* script */
	__vue_exports__ = __webpack_require__(1)

	/* template */
	var __vue_template__ = __webpack_require__(8)
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
	__vue_options__.__file = "/Users/jiang/work/vueditor/src/plugins/emoji.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d441196a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-d441196a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] emoji.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _twemoji = __webpack_require__(6);

	var _twemoji2 = _interopRequireDefault(_twemoji);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  data: function data() {
	    return {
	      twemoji: _twemoji2.default,
	      arr: ["1f600", "1f601", "1f602", "1f923", "1f603", "1f604", "1f605", "1f606", "1f609", "1f60a", "1f60b", "1f60e", "1f60d", "1f618", "1f617", "1f619", "1f61a", "263a", "1f642", "1f917", "1f914", "1f610", "1f611", "1f636", "1f644", "1f60f", "1f623", "1f625", "1f62e", "1f910", "1f62f", "1f62a", "1f62b", "1f634", "1f60c", "1f913", "1f61b", "1f61c", "1f61d", "1f924", "1f612", "1f613", "1f614", "1f615", "1f643", "1f911", "1f632", "2639", "1f641", "1f616", "1f61e", "1f61f", "1f624", "1f622", "1f62d", "1f626", "1f627", "1f628", "1f629", "1f62c", "1f630", "1f631", "1f633", "1f635", "1f621", "1f620", "1f607", "1f920", "1f921", "1f925", "1f637", "1f912", "1f915", "1f922", "1f927"],
	      btn: '<a href="javascript:;" title="Insert emoji" unselectable="on"><i class="icon-smile-o"></i></a>'
	    };
	  },

	  computed: {
	    showPopup: function showPopup() {
	      return {};
	      // return this.$store.state.toolbar.emoji.showPopup;
	    }
	  },
	  methods: {
	    parseSrc: function parseSrc(str) {
	      var div = document.createElement('div');
	      div.innerHTML = _twemoji2.default.parse(_twemoji2.default.convert.fromCodePoint(str));
	      return div.children[0].src;
	    },
	    insertItem: function insertItem(event) {
	      var obj = event.target;
	      if (obj.tagName.toLowerCase() == 'a') {
	        obj = obj.children[0];
	      }
	      this.$store.dispatch('execCommand', { name: 'insertHTML', value: obj.outerHTML });
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


	// To get emoji list for Vueditor, open http://unicode.org/emoji/charts/full-emoji-list.html
	// and run the following code in console panel.
	// var arr = [];
	// [].forEach.call(document.querySelectorAll('.code'), function(node){
	// 	  arr.push(node.children[0].getAttribute('name'))
	// });
	// console.log(arr);

	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "\n.emoji {\n  width: 276px;\n  margin-left: -120px;\n}\n.emoji .ve-pop-body {\n  max-height: 350px;\n  overflow: auto;\n}\n.emoji .wrap a {\n  float: left;\n  width: 30px;\n  height: 30px;\n  padding: 1px;\n}\n/*icon for toolbar button*/\n.icon-smile-o {\n  background: url(" + __webpack_require__(7) + ") no-repeat;\n}\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
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

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
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

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d441196a!../../node_modules/postcss-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./emoji.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d441196a!../../node_modules/postcss-loader/index.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./emoji.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

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
	       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"> emoji!
	       *
	       *
	       *  twemoji.parse("I \u2764\uFE0F emoji!", function(iconId, options) {
	       *    return '/assets/' + iconId + '.gif';
	       *  });
	       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"> emoji!
	       *
	       *
	       * twemoji.parse("I \u2764\uFE0F emoji!", {
	       *   size: 72,
	       *   callback: function(iconId, options) {
	       *     return '/assets/' + options.size + '/' + iconId + options.ext;
	       *   }
	       * });
	       *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/72x72/2764.png"> emoji!
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

	    // nodes with type 1 which should **not** be parsed (including lower case svg)
	    shouldntBeParsed = /IFRAME|NOFRAMES|NOSCRIPT|SCRIPT|SELECT|STYLE|TEXTAREA|[a-z]/,

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
	      // ignore all nodes that are not type 1 or that
	      // should not be parsed as script, style, and others
	      else if (nodeType === 1 && !shouldntBeParsed.test(subnode.nodeName)) {
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
	        ret = ret.concat('>');
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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.showPopup.display),
	      expression: "showPopup.display"
	    }],
	    staticClass: "ve-popover emoji",
	    style: ({
	      left: _vm.showPopup.left + 'px',
	      top: (_vm.showPopup.top + 36) + 'px'
	    })
	  }, [_vm._m(0), " ", _vm._m(1), " ", _h('div', {
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
	        "alt": _vm.twemoji.convert.fromCodePoint(item)
	      }
	    })])
	  })])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticClass: "ve-pop-arrow"
	  })
	},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _h('div', {
	    staticClass: "ve-pop-header"
	  }, ["Insert emoji"])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d441196a", module.exports)
	  }
	}

/***/ }
/******/ ])
});
;