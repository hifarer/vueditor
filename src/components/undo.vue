<template>
  <div>
    <a href="javascript:;" :title="lang.undo" :class="{'ve-disabled': undoState}" @click="undo">
      <i class="icon-undo"></i>
    </a>
    <a href="javascript:;" :title="lang.redo" :class="{'ve-disabled': redoState}" @click="redo">
      <i class="icon-repeat"></i>
    </a>
  </div>
</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    data () {
      return {
        stack: [],
        index: -1,
        lang: this.$store.state.lang.undo
      };
    },
    computed: {
      currentView () {
        return this.$store.state.currentView;
      },
      content () {
        return this.$store.state.content;
      },
      action: function () {
        return this.$store.state.action;
      },
      undoState () {
        return this.$store.state.toolbarStates.undo.disabled;
      },
      redoState () {
        return this.$store.state.toolbarStates.redo.disabled;
      },
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
      'currentView': function (val) {
        if (val == 'design') {
          this.stack = [];
          this.index = -1;
          this.push(this.content, true);
        }
      },
      'action': function (val) {
        this[val]();
      }
    },
    methods: Object.assign({}, mapActions([
      'updateContent',
      'updateToolbarDisabledStates'
    ]), {
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
        let json = {undo: !this.canUndo, redo: !this.canRedo};
        if (isInit || this.currentView == 'sourceCode') {
          json = {undo: true, redo: true};
        }
        this.updateToolbarDisabledStates(json);
      }
    }),
    mounted () {
      this.push(this.content, true);
    }
  }
</script>