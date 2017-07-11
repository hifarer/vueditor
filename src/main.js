
import Vue from 'vue'
import Vuex from 'vuex'

import en from './config/lang.js'
import defaultConfig from './config/index.js'

import app from './components/app.vue'
import createStore from './store/states.js'

// add plugins need app components, toolbar btns, store status
function mixinConfig (opts) {
  let config = opts ? Object.assign({}, defaultConfig, opts) : defaultConfig;
  !config.lang && (config.lang = en);
  let list = [
    'fontName', 'fontSize', 'element', 'foreColor', 'backColor', 'undo', 'table', 'link',
    'picture', 'sourceCode', 'markdown', 'fullscreen'
  ];
  return Object.assign({}, app, {
    store: new Vuex.Store(createStore(config)),
    data: function () {
      return {
        list,
        config
      }
    }
  });
}

const install = function (Vue, opts) {
  Vue.component('Vueditor', mixinConfig(opts));
};

const createEditor = function (el, opts) {
  let Editor = Vue.extend(mixinConfig(opts));
  return new Editor().$mount(el);
};

export default {
  install,
  createEditor
}