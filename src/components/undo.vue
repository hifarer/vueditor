
<template>
    <a href="javascript:;" title="撤销" :class="{'ve-disabled': undoDisabled}" @click="undo">
        <i class="fa fa-undo"></i>
    </a>
    <a href="javascript:;" title="恢复" :class="{'ve-disabled': redoDisabled}" @click="redo">
        <i class="fa fa-repeat"></i>
    </a>
</template>

<script>

    import {updateContent, updateTBDisabled} from '../vuex/toolbar-actions';

    export default {
        data () {
            return {
                stack: [],
                index: -1
            };
        },
        vuex: {
            getters: {
                undoDisabled: function (state) {
                    return state.toolBtns.undo.disabled;
                },
                redoDisabled: function (state) {
                    return state.toolBtns.redo.disabled;
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
                return this.index >= 0;
            },
            canRedo: function () {
                return this.index < this.stack.length - 1;
            }
        },
        watch: {
            'content': function (content) {
                this.push(content);
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
            push (content) {
                if (content != this.stack[this.index]) {
                    this.stack = this.stack.slice(0, this.index + 1);
                    this.stack.push(content);
                    this.index++;
                    this.render();
                }
            },
            render (content) {
                content && this.updateContent(content);
                this.updateTBDisabled({undo: !this.canUndo, redo: !this.canRedo});
            }
        },
        ready () {
            this.push(this.content);
        }
    }
</script>