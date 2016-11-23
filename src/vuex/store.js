
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

export default function (config) {
  let toolbarConfig = config.toolbar;
  let toolbarStates = {};

  if (toolbarConfig.indexOf('undo') !== -1) {
    toolbarConfig.push('redo');
  }
  if (toolbarConfig.indexOf('links') !== -1) {
    toolbarConfig.push('unlink');
  }
  toolbarConfig.forEach(function (name) {
    toolbarStates[name] = {};
    toolbarStates[name].active = false;
    toolbarStates[name].disabled = false;
    toolbarStates[name].showPopup = false;
  });

  let state = {

    // toolbar disabled state & active state
    toolbarStates,

    // editor content
    content: '',

    // current display block: design or sourceCode
    currentView: 'design',

    command: {
      name: '',
      value: ''
    },

    action: ''

  };

  return new Vuex.Store({
    state,
    actions,
    mutations
  });
}
