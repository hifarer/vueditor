
<style module lang="less" rel="stylesheet/less">
  .select {
    width: 100px;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>

<template>
  <div class="ve-fontname">
    <div :class="['ve-select', $style.select, {'ve-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <a href="javascript:;" v-for="(item, index) in list" :key="index" @click="selectHandler(item)" :style="{fontFamily: item.val + ', sans-serif'}">{{item.abbr || item.val}}</a>
    </div>
  </div>
</template>

<script>
  
  import mixins from '../mixins'

  export default {
    name: 'fontName',
    props: {
      view: String,
      activeComponent: String
    },
    data () {
      return {
        list: [
          { val: 'arial black' },
          { val: 'times new roman' },
          { val: 'Courier New' }
        ],
        val: 'arial black',
        position: { left: 0, top: 0 }
      }
    },
    inject: ['eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler (event) {
        this.toggleMenu(event)
      },
      selectHandler (font) {
        this.val = font.abbr || font.val
        this.eventHub.$emit('exec-command', {name: 'fontName', value: font.val + ', sans-serif'})
        this.eventHub.$emit('set-active-component')
      },
      syncValue ({ type, data }) {
        if (type !== 'fontName') return
        this.val = this.list.filter(item => item.val === data).length !== 0 ? data : '--'
      }
    },
    created () {
      this.eventHub.$on('sync-select-value', this.syncValue)
    }
  }
</script>