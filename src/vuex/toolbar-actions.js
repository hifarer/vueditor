/**
 * Created by vwvo on 2016/8/29.
 */


export const initToolbarStatus = ({dispatch}, config) => {
    dispatch('INIT_TOOLBAR_STATUS', config);
};

export const updateToolbarActive = ({dispatch}, obj) => {
    dispatch('UPDATE_TOOLBAR_ACTIVE', obj);
};

export const updateToolbarDisabled = ({dispatch}) => {
    dispatch('UPDATE_TOOLBAR_DISABLED');
};

export const updateToolbarDisplay = ({dispatch}) => {
    dispatch('UPDATE_TOOLBAR_DISPLAY');
};

export const updateContent = ({dispatch}) => {
    dispatch('UPDATE_CONTENT');
};

export const switchView = ({dispatch}) => {
    dispatch('SWITCH_VIEW');
};