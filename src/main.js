
// vuex依赖移除， markdown 功能

import Vue from 'vue'
import Vuex from 'vuex'

import defaultConf from './config/index.js'
import defaultLang from './config/lang.js'

import app from './components/app.vue'
import store from './store/index.js'

function mixinConfig (opts) {
  let config = opts ? Object.assign({}, defaultConf, opts) : defaultConf
  // todo toolbar 去重
  window.__VUEDITOR_LANGUAGE__ = config.lang || defaultLang

  return Object.assign({}, app, {
    data: function () {
      return config
    }
  })
}

const install = function (Vue, opts) {
  Vue.component('Vueditor', mixinConfig(opts))
}

// Create a 'subclass' of the base Vue constructor
const createEditor = function (el, opts) {
  let obj = mixinConfig(opts)
  obj.created = function () {}
  obj.store = new Vuex.Store(store)
  let Editor = Vue.extend(obj)
  return new Editor().$mount(el)
}

export default {
  install,
  createEditor
}

Vue.config.devtools = true
