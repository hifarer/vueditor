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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by wboll on 2016/5/26.
	 */

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _toolbar = __webpack_require__(2);

	var _toolbar2 = _interopRequireDefault(_toolbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var vm = new Vue({
	  el: 'body',
	  data: {
	    currentView: 'design',
	    sourceCode: ''
	  },
	  components: {
	    'toolbar': _toolbar2.default
	  },
	  events: {
	    switchView: function switchView() {
	      this.currentView = this.currentView == 'design' ? 'sourceCode' : 'design';
	      this.sourceCode = iframeBody.innerHTML;
	    }
	  },
	  methods: {
	    init: function init() {
	      iframeEl = document.querySelector('.ve-iframe');
	      iframeWin = iframeEl.contentWindow;
	      iframeDoc = iframeWin.document;
	      iframeBody = iframeWin.document.body;
	      this.setContent('<p>萨拉深刻的风景拉萨孔家店发链接啊算了</p>');
	      this.addEvent();
	    },
	    setContent: function setContent(content) {
	      iframeBody.innerHTML = content;
	    },
	    addEvent: function addEvent() {
	      iframeDoc.addEventListener('selectionchange', this.selectionChange.bind(this), false);

	      if (navigator.userAgent.indexOf('Chrome') == -1) {
	        var oSel = iframeWin.getSelection();
	        var focusNode = null;
	        setInterval(function () {
	          if (oSel && oSel.rangeCount) {
	            if (focusNode != oSel.focusNode) {
	              focusNode = oSel.focusNode;
	              this.selectionChange();
	            }
	          } else {
	            oSel = iframeWin.getSelection();
	          }
	        }.bind(this), 500);
	      }
	    },
	    selectionChange: function selectionChange() {
	      this.$broadcast('stateChange');
	    }
	  }

	}); /**
	     * Created by wboll on 2016/5/26.
	     */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(3)
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\wboll\\Documents\\vueditor\\src\\components\\toolbar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _color = __webpack_require__(4);

	var _color2 = _interopRequireDefault(_color);

	var _code = __webpack_require__(8);

	var _code2 = _interopRequireDefault(_code);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	// <template>
	//   <div class="ve-toolbar">
	//     <div class="ve-toolbar-wrap">
	//       <div v-for="item in config" class="ve-toolbar-item" unselectable="off">
	//         <a v-if="nativeBtns[item]" href="javascript:;" title="{{nativeBtns[item].title}}" :class="{'active': state[item]}" @click="exec(item, null)">
	//           <i class="fa" :class="[nativeBtns[item].class]"></i>
	//         </a>
	//         <component v-else :is="item" :param="costomBtns[item]"></component>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	//
	// <script>

	var nativeBtns = {

	  removeformat: { title: '清除选中区域格式', class: 'fa-eraser' },

	  bold: { title: '加粗', class: 'fa-bold' },
	  italic: { title: '斜体', class: 'fa-italic' },
	  underline: { title: '下划线', class: 'fa-underline' },
	  strikethrough: { title: '中划线', class: 'fa-strikethrough' },

	  superscript: { title: '上标文字', class: 'fa-superscript' },
	  subscript: { title: '下标文字', class: 'fa-subscript' },
	  indent: { title: '增加缩进', class: 'fa-indent' },
	  outdent: { title: '减少缩进', class: 'fa-outdent' },

	  justifyleft: { title: '左对齐', class: 'fa-align-left' },
	  justifycenter: { title: '中间对齐', class: 'fa-align-center' },
	  justifyright: { title: '右对齐', class: 'fa-align-right' },
	  justifyfull: { title: '两端对齐', class: 'fa-align-justify' },

	  insertOrderedList: { title: '设置有序列表', class: 'fa-list-ol' },
	  insertUnorderedList: { title: '设置无序列表', class: 'fa-list-ul' }
	};

	var costomBtns = {
	  forecolor: { colorType: 'forecolor' },
	  backcolor: { colorType: 'backcolor' },
	  code: ''
	};

	exports.default = {
	  data: function data() {
	    return {
	      nativeBtns: nativeBtns,
	      costomBtns: costomBtns,
	      config: ['removeformat', 'bold', 'italic', 'underline', 'strikethrough', 'forecolor', 'backcolor', 'subscript', 'superscript', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'indent', 'outdent', 'sourceCode'],
	      state: []
	    };
	  },
	  props: ['custom'],
	  events: {
	    stateChange: function stateChange() {
	      var json = {};
	      var config = this.custom || this.config;
	      config.forEach(function (name) {
	        json[name] = iframeDoc.queryCommandState(name);
	      });
	      this.state = json;
	    }
	  },
	  methods: {
	    exec: function exec(name, value) {
	      iframeDoc.execCommand(name, false, value);
	    }
	  },
	  components: {
	    'forecolor': _color2.default,
	    'backcolor': _color2.default,
	    'sourceCode': _code2.default
	  }
	};
	// </script>

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(5)
	__vue_template__ = __webpack_require__(6)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\wboll\\Documents\\vueditor\\src\\components\\color.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <a href="javascript:;" title="{{param.colorType == 'forecolor' ? '文字颜色' : '背景颜色'}}" @click="toggle = !toggle">
	//     <i class="fa" :class="{'fa-file-text': param.colorType == 'backcolor', 'fa-file-text-o': param.colorType == 'forecolor'}"></i>
	//   </a>
	//   <div class="ve-toolbar-dropdown colorpicker" v-show="toggle">
	//     <div class="input-group">
	//       <input type="text" class="form-control" placeholder="颜色代码" v-model="color">
	//         <span class="input-group-btn">
	//             <button type="button" class="btn btn-default" @click="inputHandler">确定</button>
	//         </span>
	//     </div>
	//     <ul>
	//       <li v-for="color in colors"><a href="javascript:;" title="{{color}}" @click="clickHandler(color)" style="background:{{color}};"></a></li>
	//     </ul>
	//   </div>
	// </template>
	//
	// <script>
	var colors = ['#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500', '#009900', '#006600', '#99BB00', '#B8D100', '#60D978', '#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE', '#00D5FF', '#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000'];
	exports.default = {
	  data: function data() {
	    return {
	      colors: colors,
	      color: '',
	      toggle: false
	    };
	  },

	  props: ['param'],
	  methods: {
	    checkValid: function checkValid(color) {
	      var sColor = color.replace(/\s+/g, '');
	      var hsl3 = /^#[0-9a-f]{3}$/i,
	          hsl6 = /^#[0-9a-f]{6}$/i,
	          rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/;
	      if (hsl3.test(sColor) || hsl6.test(sColor) || rgb.test(sColor)) {
	        return true;
	      }
	    },
	    setColor: function setColor(colorType, color) {
	      if (document.queryCommandSupported('styleWithCss')) {
	        iframeDoc.execCommand('styleWithCss', true);
	      }

	      iframeDoc.execCommand(colorType, false, color);
	      //document.querySelectorAll('font').length > 0 && formatEl(arr, colorType, color);
	    },
	    clickHandler: function clickHandler(color) {
	      this.setColor(this.param.colorType, color);
	      this.toggle = false;
	    },
	    inputHandler: function inputHandler() {
	      var color = this.color;
	      var result = this.checkValid(color);
	      if (!result) {
	        alert('请输入正确的颜色代码。');
	      } else {
	        this.setColor(this.param.colorType, color);
	        this.toggle = false;
	      }
	      this.color = '';
	    }
	  }
	};
	// </script>

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "\r\n  <a href=\"javascript:;\" title=\"{{param.colorType == 'forecolor' ? '文字颜色' : '背景颜色'}}\" @click=\"toggle = !toggle\">\r\n    <i class=\"fa\" :class=\"{'fa-file-text': param.colorType == 'backcolor', 'fa-file-text-o': param.colorType == 'forecolor'}\"></i>\r\n  </a>\r\n  <div class=\"ve-toolbar-dropdown colorpicker\" v-show=\"toggle\">\r\n    <div class=\"input-group\">\r\n      <input type=\"text\" class=\"form-control\" placeholder=\"颜色代码\" v-model=\"color\">\r\n        <span class=\"input-group-btn\">\r\n            <button type=\"button\" class=\"btn btn-default\" @click=\"inputHandler\">确定</button>\r\n        </span>\r\n    </div>\r\n    <ul>\r\n      <li v-for=\"color in colors\"><a href=\"javascript:;\" title=\"{{color}}\" @click=\"clickHandler(color)\" style=\"background:{{color}};\"></a></li>\r\n    </ul>\r\n  </div>\r\n";

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "\r\n  <div class=\"ve-toolbar\">\r\n    <div class=\"ve-toolbar-wrap\">\r\n      <div v-for=\"item in config\" class=\"ve-toolbar-item\" unselectable=\"off\">\r\n        <a v-if=\"nativeBtns[item]\" href=\"javascript:;\" title=\"{{nativeBtns[item].title}}\" :class=\"{'active': state[item]}\" @click=\"exec(item, null)\">\r\n          <i class=\"fa\" :class=\"[nativeBtns[item].class]\"></i>\r\n        </a>\r\n        <component v-else :is=\"item\" :param=\"costomBtns[item]\"></component>\r\n      </div>\r\n    </div>\r\n  </div>\r\n";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(9)
	__vue_template__ = __webpack_require__(10)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "C:\\Users\\wboll\\Documents\\vueditor\\src\\components\\code.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	// <template>
	//   <a href="javascript:;" title="源码" @click="sourceCode">
	//     <i class="fa fa-code"></i>
	//   </a>
	// </template>
	//
	// <script>
	//  document.write('<link rel="stylesheet" href="./plugins/codemirror/codemirror.min.css">');
	//  document.write('<script type="text/javascript" src="./plugins/codemirror/codemirror.min.js"><\/script>');
	//  document.write('<script type="text/javascript" src="./plugins/codemirror/javascript.min.js"><\/script>');

	exports.default = {
	  data: function data() {
	    return {
	      editor: null
	    };
	  },

	  methods: {
	    sourceCode: function sourceCode() {
	      this.$dispatch('switchView');
	      this.editor.setValue(iframeBody.innerHTML);
	    }
	  },
	  ready: function ready() {
	    this.editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
	      lineNumbers: true,
	      matchBrackets: true,
	      styleActiveLine: true,
	      theme: 'learncode'
	    });
	  }
	};
	// </script>

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "\r\n  <a href=\"javascript:;\" title=\"源码\" @click=\"sourceCode\">\r\n    <i class=\"fa fa-code\"></i>\r\n  </a>\r\n";

/***/ }
/******/ ]);