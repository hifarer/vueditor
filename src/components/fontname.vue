
<style module lang="less" rel="stylesheet/less">
  .ctn {
    li {
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
  <div class="ve-dropdown" :class="$style.ctn" v-show="showPopup.display" 
  :style="{left: showPopup.left + 'px', top: (showPopup.top + 31) + 'px'}">
    <ul>
      <li v-for="font in fonts" @click="clickHandler(font)">
        <a href="javascript:;" :style="{fontFamily: font.val + ', sans-serif'}">{{font.abbr || font.val}}</a>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    data () {
      let arr = this.$parent.config.fontName;
      return {
        fonts: arr,
        val: arr[0].abbr || arr[0].val
      }
    },
    computed: {
      showPopup () {
        return this.$store.state.toolbar.fontName.showPopup
      }
    },
    mounted () {
      this.$store.dispatch('updateSelectValue', {name: 'fontName', value: this.val})
    },
    methods: {
      clickHandler (font) {
        this.val = font.abbr || font.val;
        this.$store.dispatch('execCommand', {name: 'fontName', value: font.val + ', sans-serif'});
        this.$store.dispatch('updateSelectValue', {name: 'fontName', value: this.val});
        this.$store.dispatch('updatePopupDisplay');
      }
    }
  }
</script>