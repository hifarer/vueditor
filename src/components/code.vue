
<template>
  <div class="ve-code">
    <div :class="['ve-select', { 've-disable': view !== 'design' && view !== 'code' }]" unselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <a href="javascript:;" v-for="(type, index) in list" :key="index" @click="selectHandler(type)">{{type}}</a>
    </div>
  </div>
</template>

<script>
  
  import mixins from '../mixins'

  export default {
    name: 'code',
    props: {
      view: String,
      activeComponent: String
    },
    data() {
      return {
        list: ['bash', 'sql', 'clike', 'php', 'python', 'java', 'javascript', 'css', 'html'],
        val: 'bash',
        pattern: {
          attrName: 'class',
          attrValue: 'language-#lang#'
        },
        position: { left: 0, top: 0 }
      }
    },
    inject: ['editor', 'eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler(event) {
        this.toggleMenu(event)
      },
      selectHandler(codeLang) {
        let { attrName, attrValue } = this.pattern
        this.val = codeLang
        this.editor.insertCodeBlock(attrName, attrValue, codeLang)
        this.eventHub.$emit('set-active-component')
      },
      
      /**
       * @param type select name
       * @param data attributes object
       */
      syncValue({ type, data }) {
        if (type !== 'code') return
        let { attrName, attrValue } = this.pattern
        let val = data && data[attrName] ? data[attrName].value : ''
        attrValue = attrValue.replace(/#lang#/, '')     // language-#lang# -> language-
        if (attrName === 'class') {
          let temp = val.match(new RegExp(attrValue + '[^\\s]+', 'gim'))
          val = temp ? temp[0] : ''
        }
        this.val = val.replace(attrValue, '') || '--'
      }
    },
    created() {
      this.eventHub.$on('sync-select-value', this.syncValue)
    }
  }
</script>
