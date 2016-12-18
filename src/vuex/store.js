
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

import cn from '../js/lang-cn.js';
import en from '../js/lang-en.js';

export default function (config) {
  let lang = config.lang || 'cn';
  let toolbarConfig = config.toolbar;
  let toolbarStates = {};
  toolbarConfig.indexOf('undo') !== -1 && toolbarConfig.push('redo');
  toolbarConfig.indexOf('links') !== -1 && toolbarConfig.push('unlink');
  toolbarConfig.forEach(function (name) {
    toolbarStates[name] = {};
    toolbarStates[name].active = false;
    toolbarStates[name].disabled = false;
    toolbarStates[name].showPopup = false;
  });

  return {
    state: {
      // editor config, in case of children components need it
      config,
      // language
      lang: lang === 'cn' ? cn : en,
      // toolbar disabled state & active state & dropdown menu display state
      toolbarStates,
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