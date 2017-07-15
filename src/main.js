
import Vue from 'vue'
import Vuex from 'vuex'

import { setLang } from './config/lang.js'
import { addToolbar } from './config/toolbar.js'
import { setConfig, getConfig } from './config/index.js'

import app from './components/app.vue'
import createStore from './store/states.js'

// add plugins need to set app components, toolbar btns, store status
function mixinConfig (opts) {
  let defaultConfig = getConfig();
  let config = opts ? Object.assign({}, defaultConfig, opts) : defaultConfig;
  let list = [
    'fontName', 'fontSize', 'element', 'foreColor', 'backColor', 'undo', 'table', 'link',
    'picture', 'sourceCode', 'markdown', 'fullscreen'
  ];

  for(var name in config.plugins){
    let plugin = config.plugins[name];
    list.push(name);
    app.components['ve-' + name] = plugin.component;
    config.toolbar.indexOf(name) === -1 && config.toolbar.push(name);
    config.lang[name] = plugin.lang;
    addToolbar(name, plugin.type, plugin.element);
  }

  setConfig(config);
  setLang(config.lang);

  return Object.assign({}, app, {
    store: new Vuex.Store(createStore()),
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