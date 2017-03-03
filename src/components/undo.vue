
<script>

  import {mapActions} from 'vuex';

  export default {
    data () {
      return {
        stack: [],
        index: -1
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
      canUndo: function () {
        return this.index > 0;
      },
      canRedo: function () {
        return this.index < this.stack.length - 1;
      }
    },
    watch: {
      'content': function (content) {
        if(this.currentView == 'design'){
          this.push(content);
        }
      },
      'currentView': function (val) {
        if (val == 'design') {
          this.stack = [];
          this.index = -1;
          this.push(this.content);
        }
      },
      'action': function (data) {
        if(['undo', 'redo'].indexOf(data.name) != -1){
          this[data.name]();
        }
      }
    },
    methods: Object.assign({}, mapActions([
      'updateContent',
      'updateToolbarStates'
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
      push (content) {
        if (content != this.stack[this.index]) {
          this.stack = this.stack.slice(0, this.index + 1);
          this.stack.push(content);
          this.index++;
        }
        this.updateToolbarStates({
          undo: this.canUndo ? 'default' : 'disabled',
          redo: this.canRedo ? 'default' : 'disabled'
        });
      }
    })
  }
</script>