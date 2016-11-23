
export const updateToolbarActiveStates = ({commit}, obj) => {
  commit('UPDATE_TOOLBAR_ACTIVE_STATES', obj);
};

export const updateToolbarDisabledStates = ({commit}, json) => {
  commit('UPDATE_TOOLBAR_DISABLED_STATES', json);
};

export const updatePopupDisplay = ({commit}, current) => {
  commit('UPDATE_POPUP_DISPLAY', current);
};

export const updateContent = ({commit}, content) => {
  commit('UPDATE_CONTENT', content);
};

export const switchView = ({commit}) => {
  commit('SWITCH_VIEW');
};

export const execCommand = ({commit}, data) => {
  commit('EXEC_COMMAND', data);
};

export const callAction = ({commit}, name) => {
  commit('CALL_ACTION', name);
};