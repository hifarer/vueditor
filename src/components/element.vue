
<template>
  <div class="ve-element">
    <div :class="['ve-select', {'ve-disable': view !== 'design'}]" unselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <a href="javascript:;" v-for="(item, index) in list" :key="index" @click="selectHandler(item)">{{item}}</a>
    </div>
  </div>
</template>

<script>
  
  import mixins from '../mixins'

  export default {
    name: 'element',
    props: {
      view: String,
      activeComponent: String
    },
    data() {
      return {
        list: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: 'p',
        position: { left: 0, top: 0 }
      }
    },
    inject: ['editor', 'eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler(event) {
        this.toggleMenu(event)
      },
      selectHandler(tagName) {
        this.val = tagName
        this.editor.formatBlock(tagName)
        this.eventHub.$emit('set-active-component')
      },
      syncValue({ type, data }) {
        if (type !== 'element') return
        if (this.list.indexOf(data) !== -1) {
          this.val = data
        }
      }
    },
    created() {
      this.eventHub.$on('sync-select-value', this.syncValue)
    }
  }
</script>