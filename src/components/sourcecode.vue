
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

  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        code: '',
      }
    },
    computed: mapState([
      'view',
      'content',
      'callee'
    ]),
    watch: {
      'view': function (val) {
        if(val === 'sourceCode'){
          this.code = this.content;
        }
      },
      'code': function (val) {
        this.updateContent(val);
      },
      'content': function (val) {
        this.$store.dispatch('updateContent', val);
      },
      'callee': function (val) {
        if(val.name === 'sourceCode'){
          this.switchView(this.view == 'sourceCode' ? 'design' : 'sourceCode');
          this.updatePopupDisplay();
        }
      }
    },
    methods: mapActions([
      'switchView',
      'updateContent',
      'updatePopupDisplay'
    ])
  }
</script>
