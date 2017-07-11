<style module>
  .ctn {
    width: 240px;
    height: 90px;
    margin-left: -102px;
  }
</style>

<template>
  <div class="ve-popover" :class="$style.ctn" :style="style" v-show="showPopup">
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

  import veMixin from '../mixins';

  export default {
    mixins: [veMixin],
    data () {
      return {
        val: '',
        lang: this.$parent.config.lang.link
      }
    },
    computed: {
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