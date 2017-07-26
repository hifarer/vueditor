
export const updateSelectValue = ({ commit }, data) => {
  commit('UPDATE_SELECT_VALUE', data)
}

export const updateButtonStates = ({ commit }, data) => {
  commit('UPDATE_BUTTON_STATES', data)
}

export const updatePopupDisplay = ({ commit }, data) => {
  commit('UPDATE_POPUP_DISPLAY', data)
}

export const updateRect = ({ commit }, data) => {
  commit('UPDATE_RECT', data)
}

export const updateContent = ({ commit }, data) => {
  commit('UPDATE_CONTENT', data)
}

export const switchView = ({commit}, data) => {
  commit('SWITCH_VIEW', data)
}

export const setFullScreen = ({ commit }, data) => {
  commit('SET_FULL_SCREEN', data)
}

export const callMethod = ({ commit }, data) => {
  commit('CALL_METHOD', data)
}

export const execCommand = ({ commit }, data) => {
  commit('EXEC_COMMAND', data)
}