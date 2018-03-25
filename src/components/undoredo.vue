
<template>
  <div class="ve-undoredo">
    <div :title="lang.undo" :class="['ve-icon', {'ve-disabled': !canUndo}]" @click="undo"><i class="icon-undo"></i></div>
    <div :title="lang.redo" :class="['ve-icon', {'ve-disabled': !canRedo}]" @click="redo"><i class="icon-repeat"></i></div>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import { getLang } from '../config/lang.js'

  export default {
    name: 'undoRedo',
    data () {
      return {
        stack: [],
        index: -1,
        lang: getLang('undoRedo')
      }
    },
    mixins: [vuexMixin],
    computed: {
      content () {
        return this.mstates.content
      },
      view () {
        return this.mstates.view
      },
      canUndo: function () {
        return this.view === 'design' && this.index > 0
      },
      canRedo: function () {
        return this.view === 'design' && this.index < this.stack.length - 1
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
      'event': function ({ name, params }) {
        if (['undo', 'redo'].indexOf(name) !== -1) {
          this[name]()
        }
      }
    },
    methods: {
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
      }
    }
  }
</script>