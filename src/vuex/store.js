
import mutations from './mutations';
//import {toolbarConfig} from '../js/config';

let toolBtns = {};
toolbarConfig.push('redo');
toolbarConfig.push('unlink');
toolbarConfig.forEach(function (name) {
    !toolBtns[name] && (toolBtns[name] = {});
    toolBtns[name].active = false;
    toolBtns[name].disabled = false;
    toolBtns[name].showmenu = false;
});

const state = {

    // toolbar disabled state & active state
    toolBtns: toolBtns,
    
    // editor content
    content: '',

    // current display block: design or sourceCode
    currentView: 'design'
    
};

export default new Vuex.Store({
    state,
    mutations
});