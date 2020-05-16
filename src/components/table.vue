
<template>
  <div class="ve-table">
    <div :class="['ve-icon', {'ve-active': show, 've-disable': view !== 'design'}]" unselectable="on">
      <a href="javascript:;" :title="lang.title" @click="clickHandler"><i class="icon-table"></i></a>
    </div>
    <div v-show="show" ref="popup" :class="$style.container" :style="position">
      <!--Vue.js 2.0 v-for i starts with 1-->
      <span 
        v-for="i in num" 
        :key="i"
        :class="[(i - 1) % 8 <= x && parseInt((i - 1) / 8) <= y ? $style.active : '']"
        @mouseover="overHandler(i - 1)" 
        @click="insertTable">
      </span>
    </div>
  </div>
</template>

<script>

  import mixins from '../mixins'

  export default {
    name: 'table',
    props: {
      view: String,
      activeComponent: String
    },
    data() {
      return {
        num: 64,
        x: -1,
        y: -1,
        position: { left: 0, top: 0 },
        lang: window.__VUEDITOR_LANGUAGE__.table
      }
    },
    inject: ['editor', 'eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler(event) {
        this.toggleMenu(event)
      },
      overHandler(index) {
        this.x = index % 8
        this.y = parseInt(index / 8)
      },
      insertTable() {
        this.editor.insertTable(this.y + 1, this.x + 1)
        this.eventHub.$emit('set-active-component')
      }
    }
  }
</script>

<style module lang="less" rel="stylesheet/less">
  .container {
    width: 192px;
    padding: 10px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    span {
      float: left;
      width: 20px;
      height: 20px;
      margin: 1px;
      border: 1px solid #ddd;
    }
  }
  .active {
    background: #F7F7F7;
  }
</style>
