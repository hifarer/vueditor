/**
 * Created by vwvo on 2016/8/29.
 */

import mutations from './mutations';

const state = {

    // toolbar disabled state & active state
    toolBtns: {},

    // editor content
    content: '',

    // current display block: design or sourceCode
    currentView: 'design'
    
};

export default new Vuex.Store({
    state,
    mutations
});