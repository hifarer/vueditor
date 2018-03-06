
export default {

  SET_SELECT_VALUE (state, { name, value }) {
    state[name].value = value
  },

  SET_BUTTON_STATES (state, data) {
    for (let name in data) {
      if (state[name]) {
        state[name].status = data[name]
      }
    }
  },

  SET_POPUP_DISPLAY (state, data) {
    for (let name in state) {
      if (state[name].showPopup === undefined) continue
      if (data && data.name === name) {
        state[name].showPopup = data.display
      } else if (state[name].showPopup !== false) {
        state[name].showPopup = false
      }
    }
  },

  SET_FULL_SCREEN (state, data) {
    state.fullscreen = data
  },

  SET_CONTENT (state, data) {
    state.content = data
  },

  SET_RECT (state, data) {
    state.rect = data
  },

  SET_VIEW (state, data) {
    state.view = data
  },

  CALL_METHOD (state, data) {
    state.callee = data
  },

  EXEC_COMMAND (state, data) {
    state.command = data
  }

}
