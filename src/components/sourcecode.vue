
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
  <div class="ve-code" v-show="currentView == 'sourceCode'">
    <textarea :class="$style.editor" ref="codemirror">{{content}}</textarea>
  </div>
</template>

<script>

  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        currentView: 'design'
      }
    },
    computed: {
      view: function () {
        return this.$store.state.view;
      },
      content: function () {
        return this.$store.state.content;
      },
      callee: function () {
        return this.$store.state.callee;
      }
    },
    watch: {
      'view': function (val) {
        if(val !== 'sourceCode' && this.currentView === 'sourceCode'){
          this.updateContent(this.$refs.codemirror.value);
        }
        this.currentView = val;
      },
      'callee': function (val) {
        if(val.name === 'sourceCode'){
          this.switchView(this.view == 'sourceCode' ? 'design' : 'sourceCode');
          this.updatePopupDisplay();
        }
      }
    },
    methods: Object.assign({}, 
      mapActions([
        'switchView',
        'updateContent',
        'updatePopupDisplay'
      ])
    )
  }
</script>