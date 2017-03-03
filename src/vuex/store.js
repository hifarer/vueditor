
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

import {customBtns, selects} from '../js/btns';

export default function (config) {
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
      // toolbar disabled state & active state & dropdown menu display state
      toolbar,
      // editor's content
      content: '',
      // current display block: design, sourceCode, markdown
      currentView: 'design',
      fullScreen: false,
      rect: {
        w: 0,
        h: 0
      },
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