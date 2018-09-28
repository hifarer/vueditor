
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
    <div v-show="show" ref="popup" class="ve-dropdown" :style="style">
      <a href="javascript:;" v-for="(item, index) in list" :key="index" @click="selectHandler(item)" :style="{fontFamily: item.val + ', sans-serif'}">{{item.abbr || item.val}}</a>
    </div>
  </div>
</template>

<script>
  
  import injectMixin from '../mixins/inject'
  import rectMixin from '../mixins/rect'

  export default {
    name: 'fontName',
    data () {
      return {
        list: [
          { val: 'arial black' },
          { val: 'times new roman' },
          { val: 'Courier New' }
        ],
        val: 'arial black'
      }
    },
    props: {
      view: String,
      activeComponent: String
    },
    mixins: [injectMixin, rectMixin],
    created () {
      this.eventHub.$on('sync-select-value', this.syncValue)
    },
    methods: {
      clickHandler (event) {
        this.togglePopup(event)
      },
      selectHandler (font) {
        this.val = font.abbr || font.val
        this.eventHub.$emit('exec-command', {name: 'fontName', value: font.val + ', sans-serif'})
        this.eventHub.$emit('set-active-component')
      },
      syncValue ({ name, value }) {
        if (name !== 'fontName') return
        this.val = this.list.filter(item => item.val === value).length !== 0 ? value : '--'
      }
    }
  }
</script>