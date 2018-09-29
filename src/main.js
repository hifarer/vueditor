
// 源码高度问题 切换其他程序后history问题 markdown功能 文档

import defaultConf from './config/index.js'
import defaultLang from './config/lang.js'

import Vue from 'vue'
import App from './components/app.vue'

/**
 * @param {Array} arr toolbar button list
 */
function distinctArray (arr) {
  return arr.filter((item, index) => {
    if (item !== '|' && item !== 'divider') {
      return arr.indexOf(item) === index
    } else {
      return true
    }
  })
}

/**
 * @param {Object} opts configuration
 */
function mergeApp (opts) {
  let config = opts ? Object.assign({}, defaultConf, opts) : defaultConf
  config.toolbar = distinctArray(config.toolbar)
  window.__VUEDITOR_LANGUAGE__ = config.lang || defaultLang

  return {
    extends: App,
    beforeCreate () {
      this.config = config
    }
  }
}

const install = function (Vue, opts) {
  Vue.component('Vueditor', mergeApp(opts))
}

// Create a 'subclass' of the base Vue constructor
const createEditor = function (el, opts) {
  let obj = document.querySelector(el)
  let Editor = Vue.extend(mergeApp(opts))
  let instance = new Editor().$mount(el)
  Array.prototype.forEach.call(obj.attributes, attr => {
    instance.$el.setAttribute(attr.nodeName, attr.nodeValue)
  })
  return instance
}

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
}

export default {
  install,
  createEditor
}
