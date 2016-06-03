
<style lang="less" rel="stylesheet/less">
  .fontname {
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
  <a href="javascript:;" title="字体" :class="{'active': display}" @click="toggle">
    <i class="fa fa fa-font"></i>
  </a>
  <div class="ve-toolbar-dropdown fontname" v-show="display">
    <ul>
      <li v-for="font in fontArray" @click="clickHandler(font.name)">
        <a href="javascript:;" style="font-family: {{font.name}}, sans-serif;">{{font.abbr || font.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>

  let fontArray = [
    {name: "宋体, SimSun", abbr: "宋体"}, {name: "黑体, SimHei", abbr: "黑体"}, {name: "楷体, SimKai", abbr: "楷体"},
    {name: "微软雅黑, 'Microsoft YaHei'", abbr: "微软雅黑"}, {name: "arial black"},
    {name: "times new roman"}, {name: "Courier New"}
  ];

  export default {
    data(){
      return {
        fontArray: fontArray,
        display: false
      }
    },
    methods: {
      toggle () {
        this.$dispatch('dropdownToggle', this);
        this.display = !this.display;
      },
      clickHandler (fontfamily) {
        if(document.queryCommandSupported('styleWithCss')){
          iframeDoc.execCommand('styleWithCss', true);
        }
        iframeDoc.execCommand('fontName', false, fontfamily + ', sans-serif');
        this.display = false;
      }
    }
  }
</script>