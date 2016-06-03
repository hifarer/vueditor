
<style lang="less" rel="stylesheet/less">
  .fontsize {
    width: 176px;
    padding: 5px 10px;
    position: absolute;
    top: 39px;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
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
  <a href="javascript:;" title="字号" :class="{'active': display}" @click="toggle">
    <i class="fa fa-sort-numeric-asc"></i>
  </a>
  <div class="ve-toolbar-dropdown fontsize" v-show="display">
    <ul>
      <li v-for="size in sizeArray" @click="clickHandler(size)">
        <a href="javascript:;">{{size}}px</a>
      </li>
    </ul>
  </div>
</template>

<script>
  let sizeArray = [
    12, 14, 16, 18, 20, 24, 28, 32, 36
  ];

  export default {
    data () {
      return {
        sizeArray: sizeArray,
        display: false
      }
    },
    methods: {
      toggle () {
        this.$dispatch('dropdownToggle', this);
        this.display = !this.display;
      },
      clickHandler (size) {
        if(document.queryCommandSupported('styleWithCss')){
          iframeDoc.execCommand('styleWithCss', true);
        }
        iframeDoc.execCommand('fontSize', false, 5);
        this.display = false;
      }
    }
  }
</script>