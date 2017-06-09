<style module>
  .ctn {
    width: 240px;
    height: 90px;
    margin-left: -102px;
  }
</style>

<template>
  <div class="ve-popover" :class="$style.ctn" v-show="showPopup.display"
  :style="{left: showPopup.left + 'px', top: (showPopup.top + 36) + 'px'}">
    <div class="ve-pop-arrow"></div>
    <div class="ve-pop-header">{{lang.title}}</div>
    <div class="ve-pop-body">
      <div class="ve-input-box">
        <input type="text" class="ve-input" v-model="linkVal">
        <button class="ve-btn" @click="linkHandler">{{lang.ok}}</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        linkVal: '',
        lang: this.$parent.lang.link
      }
    },
    computed: {
      showPopup:function () {
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
        let link = this.linkVal;
        link.match(/^https?:\/\//igm) === null && (link = 'http://' + link);
        return link;
      },
      linkHandler () {
        let link = this.checkValid();
        this.$store.dispatch('execCommand', { name: 'createlink', value: link });
        this.$store.dispatch('updatePopupDisplay');
      },
      unLinkHandler () {
        this.$store.dispatch('execCommand', { name: 'unlink', value: null });
      }
    }
  }
</script>