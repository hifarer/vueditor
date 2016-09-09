<style lang="less" rel="text/less">

</style>

<template>
    <a href="javascript:;" title="撤销" :class="{'ve-disabled': disabled && !_states.undo}" @click="undo">
        <i class="fa fa-undo"></i>
    </a>
    <a href="javascript:;" title="恢复" :class="{'ve-disabled': disabled && !_states.redo}" @click="redo">
        <i class="fa fa-repeat"></i>
    </a>
</template>

<script>

    export default {
        data () {
            return {
                _prevContent: '',
                _tmp: '',
                _obj: null,
                _cb: null,
                _stack: [],
                _index: -1
            };
        },
        props: ['param'],
        vuex: {
            getters: {
                disabled: function (state) {
                    return state.toolBtns.undo.disabled;
                }
            }
        },
        method: {

            get _canUndo() {
                return this._index >= 0;
            },

            get _canRedo() {
                return this._index < this._stack.length - 1;
            },

            // 更新内容->更新状态->更新UI
            set _content(content) {
                this._tmp = content;
                this._updateStates();
            },

            get _content() {
                return this._tmp;
            },

            _updateStates (states) {
                this._states = {undo: this._canUndo, redo: this._canRedo};
                this._renderUI();
            },

            _renderUI () {
                this._obj.innerHTML = this._content;
                this._cb && this._cb();
            },

            undo () {
                if (!this._canUndo)return;
                this._index--;
                this._content = this._stack[this._index] || this._prevContent;
            },

            redo () {
                if (!this._canRedo)return;
                this._index++;
                this._content = this._stack[this._index];
            },

            push (content) {
                if (content != this._stack[this._index]) {
                    this._stack = this._stack.slice(0, this._index + 1);
                    this._stack.push(content);
                    this._index++;
                    this._updateStates();
                }
            }
        },
        ready () {
            this._prevContent = this.param.obj.innerHTML;
            this._obj = this.param.obj;
            this._cb = this.param.cb;
        }
    }
</script>