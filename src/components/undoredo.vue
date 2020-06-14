
<template>
  <div class="ve-undoredo">
    <div :class="['ve-icon', { 've-disable': !canUndo }]" unselectable="on">
      <a href="javascript:;" :title="lang.undo" @click="undo"><i class="icon-undo"></i></a>
    </div>
    <div :class="['ve-icon', { 've-disable': !canRedo }]" unselectable="on">
      <a href="javascript:;" :title="lang.redo" @click="redo"><i class="icon-repeat"></i></a>
    </div>
  </div>
</template>

<script>
  import UndoRedo from '../core/undoRedo'

  export default {
    name: 'undoRedo',
    props: {
      view: String
    },
    data() {
      return {
        lang: window.__VUEDITOR_LANGUAGE__.undoRedo,
        canUndo: false,
        canRedo: false
      }
    },
    inject: ['editor', 'eventHub'],
    methods: {
      undo() {
        this.editor.undo()
      },
      redo() {
        this.editor.redo()
      }
    },
    mounted() {
      this.editor.subscrible('history', () => {
        this.canUndo = this.editor.canUndo()
        this.canRedo = this.editor.canRedo()
      })
    }
  }
</script>