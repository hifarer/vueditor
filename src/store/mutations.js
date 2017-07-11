
export default {

  UPDATE_SELECT_VALUE ({ toolbar }, { name, value }) {
    toolbar[name].value = value;
  },

  UPDATE_BUTTON_STATES ({ toolbar }, data) {
    for (let name in data) {
      toolbar[name].status = data[name];
    }
  },

  UPDATE_POPUP_DISPLAY ({ toolbar }, data) {
    for (let name in toolbar) {
      if(toolbar[name].showPopup === undefined)continue;
      if(data && data.name === name){
        toolbar[name].showPopup = data.display;
      }else if(toolbar[name].showPopup !== false){
        toolbar[name].showPopup = false;
      }
    }
  },

  UPDATE_RECT (state, data) {
    state.rect = data
  },

  UPDATE_CONTENT (state, data) {
    state.content = data
  },

  SWITCH_VIEW (state, data) {
    state.view = data;
  },

  SET_FULL_SCREEN (state, data){
    state.fullscreen = data;
  },

  CALL_METHOD (state, data) {
    state.callee = data
  },

  EXEC_COMMAND (state, data) {
    state.command = data
  }

}