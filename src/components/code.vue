
<style module lang="less" rel="stylesheet/less">
  .ctn {
    li {
      padding: 6px;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #d5e1f2;
        border-color: #a3bde3;
      }
    }
  }
</style>

<template>
  <div class="ve-dropdown" :class="$style.ctn" v-show="showPopup" :style="style">
    <ul>
      <li v-for="(type, index) in code" :key="index" @click="clickHandler(type)">{{type}}</li>
    </ul>
  </div>
</template>

<script>
  
  import rectMixin from '../mixins/rect'
  import vuexMixin from '../mixins/vuex'
  import { getConfig } from '../config/'

  export default {
    mixins: [rectMixin, vuexMixin],
    data () {
      let { type, pattern } = getConfig('code')
      return {
        code: type,
        val: type[0],
        tpl: '<pre><code ' + pattern.attr + '="' + pattern.value + '"><br></code></pre>'
      }
    },
    computed: {
      showPopup () {
        return this.editorState.toolbar.code.showPopup
      }
    },
    mounted () {
      this.$store.dispatch(this.getActionPath('updateSelectValue'), {name: 'code', value: this.val})
    },
    methods: {
      clickHandler (type) {
        this.val = type
        this.$store.dispatch(this.getActionPath('execCommand'), {name: 'insertCodeBlock', value: this.tpl.replace(/#type#/igm, type)})
        this.$store.dispatch(this.getActionPath('updateSelectValue'), {name: 'code', value: type})
        this.$store.dispatch(this.getActionPath('updatePopupDisplay'))
      }
    }
  }
</script>