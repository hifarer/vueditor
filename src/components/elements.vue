
<style lang="less" rel="stylesheet/less">
  .selectvalue {
    position: relative;
    min-width: 60px;
    border-right: 1px solid #ddd;
    line-height: 26px;
    margin: 6px;
    margin-left: 0;
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
    margin-left: -7px;
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
        arr: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
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
          let range = veUtil.range.get();
          if(!range || range.collapsed){
            alert('在IE浏览器中必须选中一段文字才能使用此功能！');
          }else{
            iframeDoc.execCommand('formatblock', false, '<' + tagName.toUpperCase() + '>');
          }
        } else {
          iframeDoc.execCommand('formatblock', false, tagName);
        }
      }
    }
  }

</script>