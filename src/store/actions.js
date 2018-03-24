
export const setButtonStates = ({ commit }, data) => {
  commit('SET_BUTTON_STATES', data)
}

export const setActiveComponent = ({ commit }, data) => {
  commit('SET_ACTIVE_COMPONENT', data)
}

export const setFullScreen = ({ commit }, data) => {
  commit('SET_FULL_SCREEN', data)
}

export const setContent = ({ commit }, data) => {
  commit('SET_CONTENT', data)
}

export const setView = ({commit}, data) => {
  commit('SET_VIEW', data)
}

export const execCommand = ({ commit }, data) => {
  commit('EXEC_COMMAND', data)
}

export const triggerEvent = ({ commit }, data) => {
  commit('TRIGGER_EVENT', data)
}
