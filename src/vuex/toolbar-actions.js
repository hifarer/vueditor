/**
 * Created by vwvo on 2016/8/29.
 */


export const updateTBActive = ({dispatch}, obj) => {
    dispatch('UPDATE_TB_ACTIVE', obj);
};

export const updateTBDisabled = ({dispatch}) => {
    dispatch('UPDATE_TB_DISABLED');
};

export const updateTBDropdownDisplay = ({dispatch}) => {
    dispatch('UPDATE_TB_DROPDOWN_DISPLAY');
};

export const updateContent = ({dispatch}) => {
    dispatch('UPDATE_CONTENT');
};

export const switchView = ({dispatch}) => {
    dispatch('SWITCH_VIEW');
};