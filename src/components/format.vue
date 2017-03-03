<style module lang="less" rel="stylesheet/less">
  .ctn {
    a {
      display: block;
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
  <div class="ve-dropdown" :class="$style.ctn" @click="selectItem" v-show="showPopup.display"
  :style="{left: showPopup.left + 'px', top: (showPopup.top + 31) + 'px'}">
    <a href="javascript:;" v-for="item in arr">{{item}}</a>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        arr: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: 'p'
      }
    },
    computed: {
      showPopup () {
        return this.$store.state.toolbar.format.showPopup;
      }
    },
    mounted () {
      this.$store.dispatch('updateToolbarValue', {name: 'format', value: this.val});
    },
    methods: {
      selectItem (event) {
        let tagName = event.target.innerHTML.trim();
        this.val = tagName;
        this.$store.dispatch('execCommand', {name: 'formatBlock', value: tagName});
        this.$store.dispatch('updateToolbarValue', {name: 'format', value: tagName});
        this.$store.dispatch('updatePopupDisplay');
      }
    }
  }

</script>