
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
      <li v-for="size in fontSize" @click="clickHandler(size)">
        <a href="javascript:;">{{size}}</a>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    data () {
      let arr = this.$parent.config.fontSize;
      return {
        fontSize: arr,
        val: arr[0]
      }
    },
    computed: {
      showPopup () {
        return this.$store.state.toolbar.fontSize.showPopup;
      }
    },
    mounted () {
      this.$store.dispatch('updateSelectValue', {name: 'fontSize', value: this.val});
    },
    methods: {
      clickHandler (size) {
        this.val = size;
        this.$store.dispatch('execCommand', {name: 'fontSize', value: size});
        this.$store.dispatch('updateSelectValue', {name: 'fontSize', value: size});
        this.$store.dispatch('updatePopupDisplay');
      }
    }
  }
</script>