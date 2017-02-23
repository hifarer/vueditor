
import Vue from 'vue'
import Vuex from 'vuex'
import app from '../components/app.vue'
import createModule from '../vuex/store'
import defaultConfig from './config'

import cn from '../js/lang-cn.js'
import en from '../js/lang-en.js'

function mixinConfig (opts) {
  let config = opts ? Object.assign({}, defaultConfig, opts) : defaultConfig;
  let lang = config.lang || 'cn';
  return Object.assign({}, app, {
    store: new Vuex.Store(createModule(config)),
    data: function (){
      return {
        config,
        lang: lang == 'cn' ? cn : en,
        id: config.id,
        classList: config.classList,
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