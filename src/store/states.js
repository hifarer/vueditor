
export default function (config) {

  let actions = require('./actions');
  let mutations = require('./mutations');
  let { btns, selects } = require('../config/btns.js');
  let toolbar = {};

  config.toolbar.forEach(function (name) {
    if(name !== 'divider' && name !== '|'){
      toolbar[name] = {};
      if(name in selects){
        toolbar[name].value = '';
        toolbar[name].showPopup = {
          display: false,
          left: 0,
          top: 0
        }
      }else {
        if (btns[name] && btns[name].action === undefined) {
          toolbar[name].showPopup = {
            display: false,
            left: 0,
            top: 0
          }
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
      fullScreen: false,
      // rect: {
      //   w: 0,
      //   h: 0
      // },
      command: {
        name: '',
        value: ''
      },
      callee: {
        name: '',
        arguments: ''
      }
    },
    actions,
    mutations
  };
}