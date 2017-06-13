
import Vue from 'vue'
import Vuex from 'vuex'

import en from './config/lang.js'
import defaultConfig from './config/index.js'
// import { setCustom } from './config/btns.js'

import app from './components/app.vue'
import createStore from './store/states.js'

function mixinConfig (opts) {
  let config = opts ? Object.assign({}, defaultConfig, opts) : defaultConfig;
  !config.lang && (config.lan = en);
  let list = [
    'fontName', 'fontSize', 'format', 'foreColor', 'backColor', 'vetable', 'undo', 'velink',
    'picture', 'sourceCode', 'markdown', 'fullScreen'
  ];
  let plugins = {};
  for(let name in config.plugins){
    // let data = config.plugins[name].data();

    // list.push(name);
    // setCustom(name, data.btn);
    // plugins[name] = data.btn;

    app.components[name] = config.plugins[name];
    config.toolbar.indexOf(name) === -1 && config.toolbar.push(name);
  }

  return Object.assign({}, app, {
    store: new Vuex.Store(createStore(config)),
    data: function () {
      return {
        list,
        config,
        plugins
      };
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