
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

import cn from '../js/lang-cn.js';
import en from '../js/lang-en.js';

import {nativeBtns, customBtns, selects} from '../js/btns';

export default function (config) {
  let lang = config.lang || 'cn';
  let toolbarConfig = config.toolbar;
  let toolbar = {};
  toolbarConfig.forEach(function (name) {
    if(name != 'divider' && name != '|'){
      toolbar[name] = {};
      name in selects ? toolbar[name].value = '' : toolbar[name].status = '';  // default disabled actived
      (name in selects || (name in customBtns && !customBtns[name].action)) && (toolbar[name].showPopup = {
        display: false,
        left: 0,
        top: 0
      });
    }
  });

  return {
    state: {
      // editor config, in case of children components need it
      config,
      // language
      lang: lang === 'cn' ? cn : en,
      // toolbar disabled state & active state & dropdown menu display state
      toolbar,
      // editor's content
      content: '',
      // current display block: design or sourceCode
      currentView: 'design',
      command: {
        name: '',
        value: ''
      },
      action: ''
    },
    actions,
    mutations
  };
}