
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
  
  import vuexMixin from '../mixins/vuex'

  export default {
    data () {
      return {
        code: ''
      }
    },
    mixins: [vuexMixin],
    computed: {
      view () {
        return this.mstates.view
      },
      content () {
        return this.mstates.content
      },
      callee () {
        return this.mstates.callee
      }
    },
    watch: {
      'view': function (val) {
        if (val === 'sourceCode') {
          this.code = this.content
        }
      },
      'code': function (val) {
        this.setContent(val)
      },
      'content': function (val) {
        this.setContent(val)
      },
      'callee': function (val) {
        if (val.name === 'sourceCode') {
          this.setView(this.view === 'sourceCode' ? 'design' : 'sourceCode')
          this.setPopupDisplay()
        }
      }
    },
    methods: {
      setPopupDisplay (data) {
        this.$store.dispatch(this.mpath + 'setPopupDisplay', data)
      },
      setContent (data) {
        this.$store.dispatch(this.mpath + 'setContent', data)
      },
      setView (data) {
        this.$store.dispatch(this.mpath + 'setView', data)
      }
    }
  }
</script>
