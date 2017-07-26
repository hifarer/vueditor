
import * as actions from './actions'
import mutations from './mutations'
import { getToolbar } from '../config/toolbar.js'
import { getConfig } from '../config/index.js'

export default function () {

  let toolbar = {};
  let {btns, selects} = getToolbar();
  let config = getConfig('toolbar');

  config.forEach(function (name) {
    if(name !== 'divider' && name !== '|'){
      toolbar[name] = {};
      if(name in selects){
        toolbar[name].value = '';
        toolbar[name].showPopup = false;
      }else {
        if (btns[name] && btns[name].action === undefined) {
          toolbar[name].showPopup = false;
        }
        toolbar[name].status = '';  // default disabled actived
      }
    }
  });

  return {
    state: {
      view: 'design',
      content: '',
      toolbar,
      fullscreen: false,
      rect: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      command: {
        name: '',
        value: ''
      },
      callee: {
        name: '',
        params: ''
      }
    },
    actions,
    mutations
  };
}