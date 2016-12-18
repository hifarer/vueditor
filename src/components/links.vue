<style lang="less" rel="stylesheet/less">
  .link-popover {
    width: 240px;
    height: 90px;
    transform: translateX(-50%);
    margin-left: 25%;
  }
</style>

<template>
  <div>
    <a href="javascript:;" :title="lang.addLink" :class="{'ve-disabled': linkState, 've-active': display}" @click="toggle">
      <i class="icon-link"></i>
    </a>
    <a href="javascript:;" :title="lang.cancelLink" :class="{'ve-disabled': unLinkState}" @click="unLinkHandler">
      <i class="icon-unlink"></i>
    </a>
    <div class="ve-popover link-popover" v-show="display">
      <div class="pop-arrow"></div>
      <div class="pop-header">{{lang.addLink}}</div>
      <div class="pop-body">
        <div class="ve-input-box">
          <input type="text" class="ve-input" v-model="linkVal">
          <button class="ve-btn" @click="linkHandler">{{lang.ok}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        width: 240,
        height: 90,
        linkVal: ''
      }
    },
    computed: {
      lang () {
        return this.$store.state.lang.links;
      },
      linkState () {
        return this.$store.state.toolbarStates.links.disabled;
      },
      unLinkState () {
        return this.$store.state.toolbarStates.unlink.disabled;
      },
      display () {
        return this.$store.state.toolbarStates.links.showPopup;
      }
    },
    methods: {
      updatePopupDisplay (current) {
        this.$store.dispatch('updatePopupDisplay', current);
      },
      execCommand (data) {
        this.$store.dispatch('execCommand', data);
      },
      toggle () {
        !this.disabled && this.updatePopupDisplay('links');
      },
      checkValid () {
        let link = this.linkVal;
        link.indexOf('http://') == -1 && (link = 'http://' + link);
        return link;
      },
      linkHandler () {
        let link = this.checkValid();
        this.execCommand({name: 'CreateLink', value: link});
        this.updatePopupDisplay();
      },
      unLinkHandler () {
        this.execCommand({name: 'Unlink', value: null});
      }
    }
  }
</script>