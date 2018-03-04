
<style module>
  .editor {
    /*safari*/
    position: absolute;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px;
    outline: none;
    border: none;
    resize: none;
    font-size: 14px;
  }
</style>

<template>
  <div class="ve-code" v-show="view === 'sourceCode'">
    <textarea :class="$style.editor" v-model="code"></textarea>
  </div>
</template>

<script>
  
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        code: ''
      }
    },
    computed: mapState('vueditor', {
      view: state => state.view,
      content: state => state.content,
      callee: state => state.callee
    }),
    watch: {
      'view': function (val) {
        if (val === 'sourceCode') {
          this.code = this.content
        }
      },
      'code': function (val) {
        this.updateContent(val)
      },
      'content': function (val) {
        this.updateContent(val)
      },
      'callee': function (val) {
        if (val.name === 'sourceCode') {
          this.switchView(this.view === 'sourceCode' ? 'design' : 'sourceCode')
          this.updatePopupDisplay()
        }
      }
    },
    methods: mapActions('vueditor', [
      'switchView',
      'updateContent',
      'updatePopupDisplay'
    ])
  }
</script>
