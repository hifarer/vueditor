const mutations = {

  UPDATE_TOOLBAR_VALUE (state, data) {
     state.toolbar[data.name].value = data.value;
  },

  UPDATE_TOOLBAR_STATES (state, {data, doc}) {
    let bool = state.currentView !== 'design';
    for (let name in state.toolbar) {
      // disabled
      if(bool){
        state.toolbar[name].status = 'disabled';
      }else{
        if(['redo', 'undo'].indexOf(name) != -1){
          if(data && data[name] !== undefined){
            state.toolbar[name].status = data[name] ? 'disabled' : 'default';
          }
        }else{
          state.toolbar[name].status != 'actived' && (state.toolbar[name].status = 'default');
        }
      }
      // actived
      if(state.toolbar[name].status != 'disabled'){
        if(doc && doc.queryCommandSupported(name)){
          state.toolbar[name].status = doc.queryCommandState(name) ? 'actived' : 'default';
        }
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

  EXEC_COMMAND (state, data) {
    state.command = data
  },

  CALL_ACTION (state, data) {
    state.action = data
  }

}

export default mutations