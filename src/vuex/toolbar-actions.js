/**
 * Created by vwvo on 2016/8/29.
 */


export const updateTBActive = ({dispatch}, obj) => {
    dispatch('UPDATE_TB_ACTIVE', obj);
};

export const updateTBDisabled = ({dispatch}, json) => {
    dispatch('UPDATE_TB_DISABLED', json);
};

export const updateTBDropdownDisplay = ({dispatch}, current) => {
    dispatch('UPDATE_TB_DROPDOWN_DISPLAY', current);
};

export const updateContent = ({dispatch}) => {
    dispatch('UPDATE_CONTENT');
};

export const switchView = ({dispatch}) => {
    dispatch('SWITCH_VIEW');
};