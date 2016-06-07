
<style lang="less" rel="stylesheet/less">
  .selectvalue {
    position: relative;
    min-width: 60px;
    border-right: 1px solid #ddd;
    line-height: 26px;
    margin: 6px 0px;
    padding: 0 20px 0 10px!important;
    i {
      float: right;
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -2px;
    }
    &:hover {
      background: transparent!important;
      color: #000;
    }
  }
  .selectbox {
    width: 176px;
    padding: 5px 10px;
    position: absolute;
    top: 39px;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
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
  <a href="javascript:;" class="selectvalue" @click="toggle">
    {{val || arr[0]}}<i v-bind:class="{'triangle-down': !display, 'triangle-up': display}"></i>
  </a>
  <div class="selectbox" @click="selectItem" v-show="display">
    <a href="javascript:;" v-for="item in arr">
      {{item}}
    </a>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        display: false,
        arr: ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
        val: '',
      }
    },
    methods: {
      toggle () {
        this.$dispatch('dropdownToggle', this);
        this.display = !this.display;
      },
      selectItem (event) {
        let ua = navigator.userAgent.toLowerCase();
        let tagName = event.target.innerHTML.trim();
        this.display = false;
        this.val = tagName;
        if(ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)){
          iframeDoc.execCommand('formatblock', false, '<' + tagName + '>');
        }
        iframeDoc.execCommand('formatblock', false, tagName);
      }
    }
  }

</script>