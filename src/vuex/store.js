
import Vuex from 'vuex';
import * as actions from './actions';
import mutations from './mutations';

export default function (config) {
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

  let state = {
    // editor config, in case of components need it
    config,
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

  return {
    state,
    actions,
    mutations
  };
}