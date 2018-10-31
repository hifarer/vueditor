
<template>
  <div class="ve-codesnippet">
    <div :class="['ve-select', {'ve-disabled': view !== 'design' && view !== 'codeSnippet'}]" onselectable="on">
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
    name: 'codeSnippet',
    props: {
      view: String,
      activeComponent: String
    },
    data () {
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
    inject: ['range', 'eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler (event) {
        this.toggleMenu(event)
      },
      selectHandler (lang) {
        this.val = lang
        this.insertCodeBlock(lang)
        this.eventHub.$emit('set-active-component')
      },
      insertCodeBlock (lang) {
        let container = this.range.getContainer()
        if (!container) return
        // if the range is inside code element
        if (container.tagName.toLowerCase() === 'code') {
          container.setAttribute(attrName, lang)
        } else {
          let { attrName, attrValue } = this.pattern
          let tempDiv = document.createElement('div')
          let html = ('<pre><code ' + attrName + '="' + attrValue + '"><br></code></pre>').replace(/#lang#/igm, lang)
          tempDiv.innerHTML = html
          // if the range is inside pre element
          if (container.tagName.toLowerCase() === 'pre') {
            this.eventHub.$emit('insert-html', tempDiv.children[0].outerHTML)
          } else {
            this.eventHub.$emit('insert-html', html)
          }
        }
      },
      /**
       * @param type select name
       * @param data attributes object
       */
      syncValue ({ type, data }) {
        if (type !== 'codeSnippet') return
        let { attrName, attrValue } = this.pattern
        attrValue = attrValue.replace(/#lang#/, '')     // language-#lang# -> language-
        let val = data && data[attrName] ? data[attrName].value : ''
        if (attrName === 'class') {
          let temp = val.match(new RegExp(attrValue + '[^\\s]+', 'gim'))
          val = temp ? temp[0] : ''
        }
        this.val = val.replace(attrValue, '') || '--'
      }
    },
    created () {
      this.eventHub.$on('sync-select-value', this.syncValue)
    }
  }
</script>