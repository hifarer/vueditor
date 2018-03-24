
export default {

  SET_BUTTON_STATES ({ toolbar }, data) {
    console.log(data)
    for (let name in data) {
      if (typeof toolbar[name] !== 'undefined') {
        toolbar[name] = data[name]
      }
    }
  },

  SET_ACTIVE_COMPONENT (state, data) {
    state.activeComponent = data
  },

  SET_FULL_SCREEN (state, data) {
    state.fullscreen = data
  },

  SET_CONTENT (state, data) {
    state.content = data
  },

  SET_VIEW (state, data) {
    state.view = data
  },

  EXEC_COMMAND (state, data) {
    state.command = data
  },

  TRIGGER_EVENT (state, data) {
    state.event = data
  }

}
