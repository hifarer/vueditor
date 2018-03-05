
<style module lang="less" rel="stylesheet/less">
  .ctn {
    li {
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
  <div class="ve-dropdown" :class="$style.ctn" v-show="showPopup" :style="style">
    <ul>
      <li v-for="(font, index) in fonts" :key="index" @click="clickHandler(font)" :style="{fontFamily: font.val + ', sans-serif'}">{{font.abbr || font.val}}</li>
    </ul>
  </div>
</template>

<script>
  
  import rectMixin from '../mixins/rect'
  import vuexMixin from '../mixins/vuex'
  import { mapActions } from 'vuex'
  import { getConfig } from '../config/'

  export default {
    mixins: [rectMixin, vuexMixin],
    data () {
      let arr = getConfig('fontName')
      return {
        fonts: arr,
        val: arr[0].abbr || arr[0].val
      }
    },
    computed: {
      showPopup () {
        return this.editorState.toolbar.fontName.showPopup
      }
    },
    mounted () {
      this.updateSelectValue({name: 'fontName', value: this.val})
    },
    methods: {
      updateSelectValue (data) {
        this.$store.dispatch(this.getActionPath('updateSelectValue'), data)
      },
      updatePopupDisplay (data) {
        this.$store.dispatch(this.getActionPath('updatePopupDisplay'), data)
      },
      execCommand (data) {
        this.$store.dispatch(this.getActionPath('execCommand'), data)
      },
      clickHandler (font) {
        this.val = font.abbr || font.val
        this.execCommand({name: 'fontName', value: font.val + ', sans-serif'})
        this.updateSelectValue({name: 'fontName', value: this.val})
        this.updatePopupDisplay()
      }
    }
  }
</script>