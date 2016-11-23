const mutations = {

  UPDATE_TOOLBAR_ACTIVE_STATES (state, iframeDoc) {
    for (let name in state.toolbarStates) {
      try {
        if(iframeDoc){
          state.toolbarStates[name].active = iframeDoc.queryCommandState(name);
        }else{
          state.toolbarStates[name].active = false;
        }
      } catch (e) {

      }
    }
  },

  UPDATE_TOOLBAR_DISABLED_STATES (state, json) {
    let disabled = state.currentView !== 'design';
    for (let name in state.toolbarStates) {
      state.toolbarStates[name].disabled = disabled;
    }
    for (let name in json) {
      state.toolbarStates[name].disabled = json[name];
    }
    if (state.toolbarStates.switchView) {
      state.toolbarStates.switchView.disabled = false;
    }
  },

  UPDATE_POPUP_DISPLAY (state, current) {
    (current && typeof current == 'string') && (state.toolbarStates[current].showPopup = !state.toolbarStates[current].showPopup);
    for (let name in state.toolbarStates) {
      name != current && (state.toolbarStates[name].showPopup = false);
    }
  },

  UPDATE_CONTENT (state, content) {
    state.content = content;
  },

  SWITCH_VIEW (state) {
    state.currentView = state.currentView == 'design' ? 'sourceCode' : 'design';
  },

  EXEC_COMMAND (state, data) {
    state.command = data;
  },

  CALL_ACTION (state, name) {
    state.action = name;
  }

};

export default mutations;