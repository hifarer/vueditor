<style module>
  .ctn {
    width: 240px;
    height: 90px;
    margin-left: -102px;
  }
</style>

<template>
  <div class="ve-popover" :class="$style.ctn" 
  :style="{left: rect.left + 'px', top: (rect.top + rect.height) + 'px'}" v-show="showPopup">
    <div class="ve-pop-arrow"></div>
    <div class="ve-pop-header">{{lang.title}}</div>
    <div class="ve-pop-body">
      <div class="ve-input-box">
        <input type="text" class="ve-input" v-model="val">
        <button type="button" class="ve-btn" @click="linkHandler">{{lang.ok}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import { getLang } from '../config/lang.js'

  export default {
    mixins: [vuexMixin],
    data () {
      return {
        val: '',
        lang: getLang('link')
      }
    },
    computed: {
      rect () {
        return this.mstates.rect
      },
      callee () {
        return this.mstates.callee
      },
      showPopup () {
        return this.mstates.toolbar.link.showPopup
      }
    },
    watch: {
      'callee': function (val) {
        val.name === 'unLink' && this.unLinkHandler()
      }
    },
    methods: {
      updatePopupDisplay (data) {
        this.$store.dispatch(this.mpath + 'updatePopupDisplay', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      checkValid () {
        let href = this.val
        href.match(/^https?:\/\//igm) === null && (href = 'http://' + href)
        return href
      },
      linkHandler () {
        let href = this.checkValid()
        this.execCommand({ name: 'createlink', value: href })
        this.updatePopupDisplay()
      },
      unLinkHandler () {
        this.execCommand({ name: 'unlink', value: null })
      }
    }
  }
</script>