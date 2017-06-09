
export default {

  UPDATE_SELECT_VALUE ({ toolbar }, { name, value }) {
    toolbar[name].value = value;
  },

  UPDATE_BUTTON_STATES ({ toolbar, view }, data) {
    let bool = view !== 'design';
    for (let name in toolbar) {
      bool && (toolbar[name].status = 'disabled');
      if(data && data[name] !== undefined){
        toolbar[name].status = data[name];
      }
    }
    ['sourceCode', 'markdown', 'fullScreen'].forEach(item => {
      toolbar[item] && (toolbar[item].status = 'default');
    });
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
    state.currentView = data;
  },

  SET_FULL_SCREEN (state, data){
    state.fullScreen = data;
  },

  EXEC (state, data) {
    state.callee = data
  },

  EXEC_COMMAND (state, data) {
    state.command = data
  }

}