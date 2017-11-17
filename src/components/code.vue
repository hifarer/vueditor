
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
  import veMixin from '../mixins'
  import { getConfig } from '../config/'

  export default {
    mixins: [veMixin],
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
        return this.$store.state.toolbar.code.showPopup
      }
    },
    mounted () {
      this.$store.dispatch('updateSelectValue', {name: 'code', value: this.val})
    },
    methods: {
      clickHandler (type) {
        this.val = type
        this.$store.dispatch('execCommand', {name: 'insertHTML', value: this.tpl.replace(/#type#/igm, type)})
        this.$store.dispatch('updateSelectValue', {name: 'code', value: type})
        this.$store.dispatch('updatePopupDisplay')
      }
    }
  }
</script>