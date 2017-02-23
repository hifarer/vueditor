
export const updateToolbarValue = ({commit}, data) => {
  commit('UPDATE_TOOLBAR_VALUE', data)
}

export const updateToolbarStates = ({commit}, json) => {
  commit('UPDATE_TOOLBAR_STATES', json)
}

export const updatePopupDisplay = ({commit}, current) => {
  commit('UPDATE_POPUP_DISPLAY', current)
}

export const updateContent = ({commit}, content) => {
  commit('UPDATE_CONTENT', content)
}

export const switchView = ({commit}) => {
  commit('SWITCH_VIEW')
}

export const callAction = ({commit}, data) => {
  commit('CALL_ACTION', data)
}

export const execCommand = ({commit}, data) => {
  commit('EXEC_COMMAND', data)
}