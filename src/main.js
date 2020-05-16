// @ts-nocheck

import defaultConf from './config/index.js'
import toolbarConf from './config/toolbar'
import defaultLang from './lang/en.js'

import Vue from 'vue'
import App from './components/app.vue'

import { getBrowser } from './core/util'

import './style/main.less'

// 动态配置与静态配置
// 动态的可以传入，静态的写死在配置文件

// todo IE设置字号BUG 清除格式问题　插入图片 表格问题

/**
 * @param {Array} arr
 */
function distinctToolbarArray (arr) {
  return arr.filter((item, index) => {
    if (item !== '|') {
      return arr.indexOf(item) === index
    } else {
      return true
    }
  })
}

/**
 * @param {Array} arr
 */
function finalizeToolbarButton(arr) {
  let list = []
  for (let i = 0; i < arr.length; i++) {
    if (toolbarConf.hasOwnProperty(arr[i]) || arr[i] == '|') {
      list.push(arr[i])
    } else {
      list.push('ve-' + arr[i].toLowerCase())
    }
  }
  return list
}

/**
 * @param {Object} opts configuration
 */
function mergeApp (opts) {
  let config = opts ? Object.assign({}, defaultConf, opts) : defaultConf
  let toolbar = distinctToolbarArray(config.toolbar)
  toolbar = finalizeToolbarButton(toolbar)
  config.toolbar = toolbar
  window.__VUEDITOR_LANGUAGE__ = config.lang || defaultLang
  
  return {
    extends: App,
    beforeCreate() {
      this.config = config
    }
  }
}

const install = function (Vue, opts) {
  if (getBrowser() === 'IE') {
    throw new Error('Vueditor does not support IE browser!')
  }
  Vue.component('Vueditor', mergeApp(opts))
}

// Create a 'subclass' of the base Vue constructor
const createEditor = function (el, opts) {
  if (getBrowser() === 'IE') {
    throw new Error('Vueditor does not support IE browser!')
  }
  let obj = document.querySelector(el)
  if (!obj) {
    throw new Error('Element not found!')
  }
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
