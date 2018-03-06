
export const setSelectValue = (context, data) => {
  context.commit('SET_SELECT_VALUE', data)
}

export const setButtonStates = ({ commit }, data) => {
  commit('SET_BUTTON_STATES', data)
}

export const setPopupDisplay = ({ commit }, data) => {
  commit('SET_POPUP_DISPLAY', data)
}

export const setFullScreen = ({ commit }, data) => {
  commit('SET_FULL_SCREEN', data)
}

export const setContent = ({ commit }, data) => {
  commit('SET_CONTENT', data)
}

export const setRect = ({ commit }, data) => {
  commit('SET_RECT', data)
}

export const setView = ({commit}, data) => {
  commit('SET_VIEW', data)
}

export const callMethod = ({ commit }, data) => {
  commit('CALL_METHOD', data)
}

export const execCommand = ({ commit }, data) => {
  commit('EXEC_COMMAND', data)
}
