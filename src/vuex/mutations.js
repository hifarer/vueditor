
export default {

  UPDATE_TOOLBAR_VALUE (state, data) {
     state.toolbar[data.name].value = data.value;
  },

  UPDATE_TOOLBAR_STATES (state, data) {
    let bool = state.currentView !== 'design';
    for (let name in state.toolbar) {
      bool && (state.toolbar[name].status = 'disabled');
      if(data && data[name] !== undefined){
        state.toolbar[name].status = data[name];
      }
    }
    state.toolbar.switchView && (state.toolbar.switchView.status = 'default');
  },

  UPDATE_POPUP_DISPLAY (state, json) {
    for (let name in state.toolbar) {
      if(json && json.name == name){
        state.toolbar[name].showPopup = {
          display: json.display,
          left: json.left || 0,
          top: json.top || 0
        }
      }else{
        state.toolbar[name].showPopup = {
          display: false,
          left: 0,
          top: 0
        }
      }
    }
  },

  UPDATE_CONTENT (state, content) {
    state.content = content
  },

  SWITCH_VIEW (state) {
    state.currentView = state.currentView == 'design' ? 'sourceCode' : 'design'
  },

  CALL_ACTION (state, data) {
    state.action = data
  },

  EXEC_COMMAND (state, data) {
    state.command = data
  }

}