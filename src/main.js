
import Vue from 'vue'
import Vuex from 'vuex'

import { setLang, getDefaultLang } from './config/lang.js'
import { setConfig, getDefaultConf } from './config/index.js'

import app from './components/app.vue'
import createStore from './store/index.js'

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
    if (Array.isArray(config[name])) {
      types += 'array'
      typeof config[name][0] === 'object' ? types += '.object' : types += '.string'
    } else if (typeof config[name] === 'object') {
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
    'sourceCode', 'picture'
  ]
  // type check for config
  let typeInfo = checkConfig(config)
  if (!typeInfo.valid) {
    throw new Error(typeInfo.info)
  }
  // todo toolbar 去重

  config.plugins && config.plugins.forEach(({ name, element, component }) => {
    list.push(name)
    app.components['ve-' + name] = component
    config.toolbar.indexOf(name) === -1 && config.toolbar.push(name)
    lang[name] = element.lang
  })

  setConfig(config)
  setLang(lang)

  return Object.assign({}, app, {
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

const getVuexModule = function () {
  return createStore()
}

// Create a 'subclass' of the base Vue constructor
const createEditor = function (el, opts) {
  let obj = mixinConfig(opts)
  obj.created = function () {}
  obj.store = new Vuex.Store(createStore())
  let Editor = Vue.extend(obj)
  return new Editor().$mount(el)
}

export default {
  install,
  getVuexModule,
  createEditor
}

Vue.config.devtools = true
