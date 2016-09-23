
export const updateTBActive = ({dispatch}, obj) => {
    dispatch('UPDATE_TB_ACTIVE', obj);
};

export const updateTBDisabled = ({dispatch}, json) => {
    dispatch('UPDATE_TB_DISABLED', json);
};

export const updateTBDropdownDisplay = ({dispatch}, current) => {
    dispatch('UPDATE_TB_DROPDOWN_DISPLAY', current);
};

export const updateContent = ({dispatch}, content) => {
    dispatch('UPDATE_CONTENT', content);
};

export const switchView = ({dispatch}) => {
    dispatch('SWITCH_VIEW');
};