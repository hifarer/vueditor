
<script>
  
  import vuexMixin from '../mixins/vuex'

  export default {
    render () {
      return ''
    },
    data () {
      return {
        stack: [],
        index: -1
      }
    },
    mixins: [vuexMixin],
    computed: {
      content () {
        return this.mstates.content
      },
      callee () {
        return this.mstates.callee
      },
      view () {
        return this.mstates.view
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
      setButtonStates (data) {
        this.$store.dispatch(this.mpath + 'setButtonStates', data)
      },
      setContent (data) {
        this.$store.dispatch(this.mpath + 'setContent', data)
      },
      undo () {
        if (!this.canUndo) return
        this.index--
        this.setContent(this.stack[this.index])
      },
      redo () {
        if (!this.canRedo) return
        this.index++
        this.setContent(this.stack[this.index])
      },
      push (content) {
        if (content !== this.stack[this.index]) {
          this.stack = this.stack.slice(0, this.index + 1)
          this.stack.push(content)
          this.index++
        }
        this.setButtonStates({
          undo: this.canUndo ? 'default' : 'disabled',
          redo: this.canRedo ? 'default' : 'disabled'
        })
      }
    }
  }
</script>