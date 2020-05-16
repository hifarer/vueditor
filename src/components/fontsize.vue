
<template>
  <div class="ve-fontsize">
    <div :class="['ve-select', {'ve-disable': view !== 'design'}]" unselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <a href="javascript:;" v-for="(size, index) in list" :key="index" @click="selectHandler(size)">{{size}}</a>
    </div>
  </div>
</template>

<script>
  
  import mixins from '../mixins'

  export default {
    name: 'fontSize',
    props: {
      view: String,
      activeComponent: String
    },
    data() {
      return {
        list: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '42px', '48px'],
        val: '12px',
        position: { left: 0, top: 0 }
      }
    },
    inject: ['editor', 'eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler(event) {
        this.toggleMenu(event)
      },
      selectHandler(size) {
        this.val = size
        this.editor.setFontSize(size)
        this.eventHub.$emit('set-active-component')
      },
      syncValue ({ type, data }) {
        if (type !== 'fontSize') return
        let unit = data.match(/[a-z]+/ig)[0]
        if (unit === 'px') {
          this.list.indexOf(data) !== -1 && (this.val = data)
        } else if (unit === 'rem') {
          let rootFontSize = parseInt(window.getComputedStyle(document.documentElement)['fontSize'])
          let remFontSize = (parseInt(data) / rootFontSize).toFixed(1) + 'rem'
          this.list.indexOf(remFontSize) !== -1 && (this.val = remFontSize)
        } else {
          this.val = '--'
        }
      }
    },
    created() {
      this.eventHub.$on('sync-select-value', this.syncValue)
    }
  }
</script>
