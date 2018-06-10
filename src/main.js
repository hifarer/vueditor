
// toolbar优化 源码高度问题 ie输入颜色代码range丢失问题 unlink问题 切换其他程序后history问题 markdown功能 文档

import Vue from 'vue'

import defaultConf from './config/index.js'
import defaultLang from './config/lang.js'
import Range from './range.js'
import { createNonceStr } from './util.js'

import getEventHub from './eventhub.js'
import app from './components/app.vue'

function distinctArray (arr) {
  return arr.filter((item, index) => {
    if (item !== '|' && item !== 'divider') {
      return arr.indexOf(item) === index
    } else {
      return true
    }
  })
}

function mixinConfig (opts) {
  let config = opts ? Object.assign({}, defaultConf, opts) : defaultConf
  config.toolbar = distinctArray(config.toolbar)
  window.__VUEDITOR_LANGUAGE__ = config.lang || defaultLang

  app.beforeCreate = function () {
    this.range = new Range()
    this.nonceStr = createNonceStr()
    this.eventHub = getEventHub(this.nonceStr)
    this.config = config
  }
  return app
}

const install = function (Vue, opts) {
  Vue.component('Vueditor', mixinConfig(opts))
}

// Create a 'subclass' of the base Vue constructor
const createEditor = function (el, opts) {
  let obj = document.querySelector(el)
  let config = mixinConfig(opts)
  let Editor = Vue.extend(config)
  let instance = new Editor().$mount(el)
  Array.prototype.forEach.call(obj.attributes, attr => {
    instance.$el.setAttribute(attr.nodeName, attr.nodeValue)
  })
  return instance
}

export default {
  install,
  createEditor
}

Vue.config.devtools = true
