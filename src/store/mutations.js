
export default {

  UPDATE_SELECT_VALUE ({ toolbar }, { name, value }) {
    toolbar[name].value = value;
  },

  UPDATE_BUTTON_STATES ({ toolbar }, data) {
    for (let name in data) {
      toolbar[name].status = data[name];
    }
  },

  UPDATE_POPUP_DISPLAY ({ toolbar }, json) {
    for (let name in toolbar) {
      if(json && json.name == name){
        toolbar[name].showPopup = {
          display: json.display,
          left: json.left || 0,
          top: json.top || 0
        }
      }else{
        toolbar[name].showPopup = {
          display: false,
          left: 0,
          top: 0
        }
      }
    }
  },

  UPDATE_CONTENT (state, data) {
    state.content = data
  },

  SWITCH_VIEW (state, data) {
    state.view = data;
  },

  SET_FULL_SCREEN (state, data){
    state.fullScreen = data;
  },

  CALL_METHOD (state, data) {
    state.callee = data
  },

  EXEC_COMMAND (state, data) {
    state.command = data
  }

}