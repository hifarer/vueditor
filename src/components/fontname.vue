
<style lang="less" rel="stylesheet/less">
  .font-select {
    width: 100px;
    font-size: 14px;
    vertical-align: bottom;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .font-name {
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
  <a href="javascript:;" class="ve-select font-select" :class="{'ve-disabled': !available}" @click="toggle">
    <span>{{val || fontArray[0].abbr}}</span><i v-bind:class="{'triangle-down': !display, 'triangle-up': display}"></i>
  </a>
  <div class="ve-toolbar-dropdown ve-select-dropdown font-name" v-show="display">
    <ul>
      <li v-for="font in fontArray" @click="clickHandler(font)">
        <a href="javascript:;" :style="{fontFamily: font.name + ', sans-serif'}">{{font.abbr || font.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>

  let fontArray = [
    {name: "宋体, SimSun", abbr: "宋体"}, {name: "黑体, SimHei", abbr: "黑体"}, {name: "楷体, SimKai", abbr: "楷体"},
    {name: "微软雅黑, 'Microsoft YaHei'", abbr: "微软雅黑"}, {name: "arial black"}, {name: "times new roman"},
    {name: "Courier New"}
  ];

  export default {
    data(){
      return {
        display: false,
        fontArray: fontArray,
        val: ''
      }
    },
    props: ['available'],
    methods: {
      toggle () {
        if(this.available){
          this.$dispatch('dropdownToggle', this);
          this.display = !this.display;
        }
      },
      clickHandler (font) {
        if(document.queryCommandSupported('styleWithCss')){
          iframeDoc.execCommand('styleWithCss', false, true);
        }
        iframeDoc.execCommand('fontName', false, font.name + ', sans-serif');
        this.display = false;
        this.val = font.abbr || font.name;
      }
    }
  }
</script>