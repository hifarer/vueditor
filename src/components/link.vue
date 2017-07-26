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

  import { getLang } from '../config/lang.js'

  export default {
    data () {
      return {
        val: '',
        lang: getLang('link')
      }
    },
    computed: {
      rect: function () {
        return this.$store.state.rect;
      },
      showPopup: function () {
        return this.$store.state.toolbar.link.showPopup;
      },
      callee: function () {
        return this.$store.state.callee;
      }
    },
    watch: {
      'callee': function (val) {
        val.name == 'unLink' && this.unLinkHandler();
      }
    },
    methods: {
      checkValid () {
        let href = this.val;
        href.match(/^https?:\/\//igm) === null && (href = 'http://' + href);
        return href;
      },
      linkHandler () {
        let href = this.checkValid();
        this.$store.dispatch('execCommand', { name: 'createlink', value: href });
        this.$store.dispatch('updatePopupDisplay');
      },
      unLinkHandler () {
        this.$store.dispatch('execCommand', { name: 'unlink', value: null });
      }
    }
  }
</script>