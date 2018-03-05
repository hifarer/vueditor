
<script>
  
  import vuexMixin from '../mixins/vuex'
  import { mapState, mapActions } from 'vuex'

  export default {
    mixins: [vuexMixin],
    render () {
      return ''
    },
    data () {
      return {
        stack: [],
        index: -1
      }
    },
    computed: {
      content () {
        return this.editorState.content
      },
      callee () {
        return this.editorState.callee
      },
      view () {
        return this.editorState.view
      },
      canUndo: function () {
        return this.index > 0
      },
      canRedo: function () {
        return this.index < this.stack.length - 1
      }
    },
    watch: {
      'content': function (val) {
        if (this.view === 'design') {
          this.push(val)
        }
      },
      'view': function (val) {
        if (val === 'design') {
          this.stack = []
          this.index = -1
          this.push(this.content)
        }
      },
      'callee': function ({ name, params }) {
        if (['undo', 'redo'].indexOf(name) !== -1) {
          this[name]()
        }
      }
    },
    methods: {
      updateButtonStates (data) {
        this.$store.dispatch(this.getActionPath('updateButtonStates'), data)
      },
      updateContent (data) {
        this.$store.dispatch(this.getActionPath('updateContent'), data)
      },
      undo () {
        if (!this.canUndo) return
        this.index--
        this.updateContent(this.stack[this.index])
      },
      redo () {
        if (!this.canRedo) return
        this.index++
        this.updateContent(this.stack[this.index])
      },
      push (content) {
        if (content !== this.stack[this.index]) {
          this.stack = this.stack.slice(0, this.index + 1)
          this.stack.push(content)
          this.index++
        }
        this.updateButtonStates({
          undo: this.canUndo ? 'default' : 'disabled',
          redo: this.canRedo ? 'default' : 'disabled'
        })
      }
    }
  }
</script>