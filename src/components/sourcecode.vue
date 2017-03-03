
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

  import {mapActions} from 'vuex';

  export default {
    data () {
      return {
        view: 'design'
      }
    },
    computed: {
      currentView: function () {
        return this.$store.state.currentView;
      },
      content: function () {
        return this.$store.state.content;
      },
      action: function () {
        return this.$store.state.action;
      }
    },
    watch: {
      'currentView': function (val) {
        // this.view: previous view
        if(val != 'sourceCode' && this.view == 'sourceCode'){
          this.updateContent(this.$refs.codemirror.value);
        }
        this.view = val;
      },
      'action': function (data) {
        if(data.name == 'sourceCode'){
          this.switchView(this.currentView == 'sourceCode' ? 'design' : 'sourceCode');
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