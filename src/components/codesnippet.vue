
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
      <li v-for="(type, index) in lang" :key="index" @click="clickHandler(type)">{{type}}</li>
    </ul>
  </div>
</template>

<script>
  
  import rectMixin from '../mixins/rect'
  import vuexMixin from '../mixins/vuex'
  import { getConfig } from '../config/'

  export default {
    data () {
      let { lang, pattern } = getConfig('codeSnippet')
      return {
        lang: lang,
        tpl: '<pre><code ' + pattern.attr + '="' + pattern.value + '"><br></code></pre>'
      }
    },
    mixins: [rectMixin, vuexMixin],
    mounted () {
      this.$store.dispatch(this.mpath + 'setSelectValue', {name: 'code', value: this.lang[0]})
    },
    methods: {
      clickHandler (lang) {
        this.$store.dispatch(this.mpath + 'execCommand', {name: 'insertCodeBlock', value: this.tpl.replace(/#lang#/igm, lang)})
        this.$store.dispatch(this.mpath + 'setSelectValue', {name: 'code', value: lang})
        this.$store.dispatch(this.mpath + 'setActiveComponent')
      }
    }
  }
</script>