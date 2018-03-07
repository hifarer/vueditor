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
    data () {
      return {
        val: '',
        lang: getLang('link')
      }
    },
    mixins: [vuexMixin],
    computed: {
      rect () {
        return this.mstates.rect
      },
      event () {
        return this.mstates.event
      }
    },
    watch: {
      'event': function (val) {
        val.name === 'unLink' && this.unLinkHandler()
      }
    },
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
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
        this.setActiveComponent()
      },
      unLinkHandler () {
        this.execCommand({ name: 'unlink', value: null })
      }
    }
  }
</script>