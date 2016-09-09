/**
 * Created by vwvo on 2016/8/29.
 */

const mutations = {

    INIT_TOOLBAR_STATUS (state, config) {
        config.forEach(function (name) {
            !state.toolBtns[name] && (state.toolBtns[name] = {});
            state.toolBtns[name].active = false;
            state.toolBtns[name].disabled = true;
            state.toolBtns[name].display = true;
        });
    },
    
    UPDATE_TOOLBAR_ACTIVE (state, iframeDoc) {
        for(let name in state.toolBtns){
            try {
                state.toolBtns[name].active = iframeDoc.queryCommandState(name);
            }catch (e){}
        }
    },

    UPDATE_TOOLBAR_DISABLED (state) {
        let disabled = state.currentView !== 'design';
        for(let name in state.toolBtns){
            state.toolBtns[name].disabled = disabled;
        }
        state.toolBtns.view.disabled = false;
    },

    UPDATE_TOOLBAR_DISPLAY (state, target) {
        for(let name in state.toolBtns){
            //state !== target && (component.display = false);
        }
    },
    
    UPDATE_CONTENT (state, content) {
        state.content = content;
    },

    SWITCH_VIEW (state) {
        state.currentView = state.currentView == 'design' ? 'sourceCode' : 'design';
    }

};

export default mutations;