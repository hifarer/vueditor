
import Vue from 'vue'
import Vuex from 'vuex'

import { setLang, getDefaultLang } from './config/lang.js'
import { resetToolbar, modifyToolbar } from './config/toolbar.js'
import { setConfig, getDefaultConf } from './config/index.js'

import app from './components/app.vue'
import createStore from './store/states.js'

function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

function isObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function checkConfig (config) {
  let proto = {
    toolbar: 'array.string',
    fontName: 'array.object',
    fontSize: 'array.string',
    uploadUrl: 'string',
    lang: 'object',
    id: 'string',
    classList: 'array.string',
    plugins: 'array.object'
  }
  let retData = {valid: true, info: ''}
  for (let name in config) {
    let types = ''
    if (isArray(config[name])) {
      types += 'array'
      isObject(config[name][0]) ? types += '.object' : types += '.string'
    } else if (isObject(config[name])) {
      types = 'object'
    } else {
      types = 'string'
    }
    if (proto[name] && proto[name] !== types) {
      retData = {
        valid: false,
        info: 'invalid configuration, the ' + name + ' attribute requires type ' + proto[name] + ' but received ' + types
      }
      break
    }
  }
  return retData
}

function mixinConfig (opts) {
  let defaultConf = getDefaultConf()
  let config = opts ? Object.assign({}, defaultConf, opts) : defaultConf
  let lang = config.lang || getDefaultLang()
  let list = [
    'fontName', 'fontSize', 'element', 'foreColor', 'backColor', 'undo', 'table', 'link',
    'code', 'picture', 'sourceCode', 'markdown', 'fullscreen'
  ]
  // type check for config
  let typeInfo = checkConfig(config)
  if (!typeInfo.valid) {
    throw new Error(typeInfo.info)
  }

  resetToolbar()

  config.plugins && config.plugins.forEach(({ name, element, component }) => {
    list.push(name)
    app.components['ve-' + name] = component
    config.toolbar.indexOf(name) === -1 && config.toolbar.push(name)
    lang[name] = element.lang
    modifyToolbar(name, element)
  })

  setConfig(config)
  setLang(lang)

  return Object.assign({}, app, {
    store: new Vuex.Store(createStore()),
    data: function () {
      return {
        list,
        config
      }
    }
  })
}

const install = function (Vue, opts) {
  Vue.component('Vueditor', mixinConfig(opts))
}

const createEditor = function (el, opts) {
  let Editor = Vue.extend(mixinConfig(opts))
  return new Editor().$mount(el)
}

export default {
  install,
  createEditor
}
