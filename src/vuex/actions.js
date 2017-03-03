
export const updateToolbarValue = ({commit}, data) => {
  commit('UPDATE_TOOLBAR_VALUE', data)
}

export const updateToolbarStates = ({commit}, data) => {
  commit('UPDATE_TOOLBAR_STATES', data)
}

export const updatePopupDisplay = ({commit}, current) => {
  commit('UPDATE_POPUP_DISPLAY', current)
}

export const updateContent = ({commit}, content) => {
  commit('UPDATE_CONTENT', content)
}

export const switchView = ({commit}, view) => {
  commit('SWITCH_VIEW', view)
}

export const fullScreen = ({commit}, bool) => {
  commit('FULL_SCREEN', bool)
}

export const updateRect = ({commit}, data) => {
  commit('UPDATE_RECT', data)
}

export const callAction = ({commit}, data) => {
  commit('CALL_ACTION', data)
}

export const execCommand = ({commit}, data) => {
  commit('EXEC_COMMAND', data)
}