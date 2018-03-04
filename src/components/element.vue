
<style module lang="less" rel="stylesheet/less">
  .ctn {
    li {
      display: block;
      cursor: pointer;
      padding: 6px;
      border-bottom: 1px solid #ddd;
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
  <div class="ve-dropdown" :class="$style.ctn" @click="selectItem" v-show="showPopup" :style="style">
    <ul>
      <li v-for="(item, index) in arr" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  import veMixin from '../mixins'

  export default {
    mixins: [veMixin],
    data () {
      return {
        arr: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: 'p'
      }
    },
    computed: {
      showPopup () {
        return this.$store.state.vueditor.toolbar.element.showPopup
      }
    },
    mounted () {
      this.$store.dispatch('vueditor/updateSelectValue', {name: 'element', value: this.val})
    },
    methods: {
      selectItem (event) {
        let tagName = event.target.innerHTML.trim()
        this.val = tagName
        this.$store.dispatch('vueditor/execCommand', {name: 'formatBlock', value: tagName})
        this.$store.dispatch('vueditor/updateSelectValue', {name: 'element', value: tagName})
        this.$store.dispatch('vueditor/updatePopupDisplay')
      }
    }
  }
</script>