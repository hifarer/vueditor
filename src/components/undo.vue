
<template>
    <a href="javascript:;" title="撤销" :class="{'ve-disabled': undoState}" @click="undo">
        <i class="fa fa-undo"></i>
    </a>
    <a href="javascript:;" title="恢复" :class="{'ve-disabled': redoState}" @click="redo">
        <i class="fa fa-repeat"></i>
    </a>
</template>

<script>

    import {updateContent, updateTBDisabled} from '../vuex/actions';

    export default {
        data () {
            return {
                stack: [],
                index: -1
            };
        },
        vuex: {
            getters: {
                undoState: function (state) {
                    return state.toolBtns.undo.disabled;
                },
                redoState: function (state) {
                    return state.toolBtns.redo.disabled;
                },
                currentView: function(state) {
                    return state.currentView;
                },
                content: function (state) {
                    return state.content;
                }
            },
            actions: {
                updateContent,
                updateTBDisabled
            }
        },
        computed: {
            canUndo: function () {
                return this.index > 0;
            },
            canRedo: function () {
                return this.index < this.stack.length - 1;
            }
        },
        watch: {
            'content': function (content) {
                this.push(content);
            },
            'currentView': function () {
                this.stack = [];
                this.index = -1;
                this.push(this.content, true);
            }
        },
        methods: {
            undo () {
                if (!this.canUndo)return;
                this.index--;
                let content = this.stack[this.index];
                this.updateContent(content);
            },
            redo () {
                if (!this.canRedo)return;
                this.index++;
                let content = this.stack[this.index];
                this.updateContent(content);
            },
            push (content, isInit) {
                if (content != this.stack[this.index]) {
                    this.stack = this.stack.slice(0, this.index + 1);
                    this.stack.push(content);
                    this.index++;
                }
                this.updateTBDisabled(isInit ? {undo: true, redo: true} : {undo: !this.canUndo, redo: !this.canRedo});
            }
        },
        ready () {
            this.push(this.content, true);
        }
    }
</script>