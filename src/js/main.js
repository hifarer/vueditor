
import Vue from 'vue'
import Vuex from 'vuex'
import app from '../components/app.vue'
import createModule from '../vuex/store'
import defaultConfig from './config'

const globalConfig = window.VueditorConfig ? VueditorConfig : null;
const install = function (Vue, opts = {}) {
  let config = opts || globalConfig || defaultConfig;
  let storeModule = createModule(config);
  let data = {
    config,
    comps: [
      'toolbar',
      'editable',
      'sourcecode',
      'pictureDialog'
    ]
  };
  opts.mode !== 'default' && (data.comps[1] = 'iframe');
  opts.toolbar.indexOf('picture') !== -1 && data.comps.push('pictureDialog');
  Vue.component('Vueditor', Object.assign({}, app, {
    store: new Vuex.Store(storeModule),
    data: function (){
      return data;
    }
  }));
};

export default {
  install
}

// TODO 安全，图片上传