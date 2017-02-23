<style lang="less" rel="stylesheet/less">
  .link-popover {
    width: 240px;
    height: 90px;
    margin-left: -102px;
  }
</style>

<template>
  <div class="ve-popover link-popover" v-show="showPopup.display"
  :style="{left: showPopup.left + 'px', top: (showPopup.top + 36) + 'px'}">
    <div class="pop-arrow"></div>
    <div class="pop-header">{{lang.addLink}}</div>
    <div class="pop-body">
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
      showPopup () {
        return this.$store.state.toolbar.link.showPopup;
      },
      action: function () {
        return this.$store.state.action;
      }
    },
    watch: {
      'action': function (data) {
        data.name == 'unLink' && this.unLinkHandler();
      }
    },
    methods: {
      execCommand (data) {
        this.$store.dispatch('execCommand', data);
      },
      checkValid () {
        let link = this.linkVal;
        link.indexOf('http://') == -1 && (link = 'http://' + link);
        return link;
      },
      linkHandler () {
        let link = this.checkValid();
        this.execCommand({name: 'CreateLink', value: link});
        this.$store.dispatch('updatePopupDisplay');
      },
      unLinkHandler () {
        this.execCommand({name: 'unlink', value: null});
      }
    }
  }
</script>