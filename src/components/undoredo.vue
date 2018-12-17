
<template>
  <div class="ve-undoredo">
    <div :class="['ve-icon', {'ve-disabled': !canUndo}]">
      <a href="javascript:;" :title="lang.undo" @click="undo"><i class="icon-undo"></i></a>
    </div>
    <div :class="['ve-icon', {'ve-disabled': !canRedo}]" onselectable="on">
      <a href="javascript:;" :title="lang.redo" @click="redo"><i class="icon-repeat"></i></a>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'undoRedo',
    props: {
      view: String,
      content: String
    },
    data () {
      return {
        stack: [],
        index: -1,
        lang: window.__VUEDITOR_LANGUAGE__.undoRedo
      }
    },
    inject: ['eventHub'],
    computed: {
      canUndo: function () {
        return this.view === 'design' && this.index > 0
      },
      canRedo: function () {
        return this.view === 'design' && this.index < this.stack.length - 1
      }
    },
    watch: {
      'content': function (val) {
        if (this.view !== 'sourceCode') {
          this.push(val)
        }
      },
      'view': function (val, oldVal) {
        // re initial stack
        if (val === 'design' && oldVal !== 'codeSnippet') {
          this.stack = []
          this.index = -1
          this.push(this.content)
        }
      }
    },
    created () {
      this.eventHub.$on('undo', this.undo)
      this.eventHub.$on('redo', this.redo)
    },
    methods: {
      setContent (data) {
        this.eventHub.$emit('set-content', data)
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