
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
  
  import injectMixin from '../mixins/inject'
  import rectMixin from '../mixins/rect'

  export default {
    name: 'codeSnippet',
    data () {
      return {
        list: ['bash', 'clike', 'css', 'html', 'java', 'javascript', 'php', 'python', 'sql'],
        val: 'bash',
        pattern: {
          attrName: 'class',
          attrValue: 'language-#lang#'
        },
        rect: {}
      }
    },
    props: {
      view: String,
      activeComponent: String
    },
    mixins: [injectMixin, rectMixin],
    created () {
      this.eventHub.$on('parse-code-snippet', this.parseCodeSnippet)
    },
    methods: {
      clickHandler (event) {
        this.togglePopup(event)
      },
      selectHandler (lang) {
        this.val = lang
        this.insertCodeBlock(lang)
        this.eventHub.$emit('set-active-component')
      },
      insertCodeBlock (lang) {
        let container = this.range.getContainer()
        if (!container) return
        let { attrName, attrValue } = this.pattern
        let tempDiv = document.createElement('div')
        let html = ('<pre><code ' + attrName + '="' + attrValue + '"><br></code></pre>').replace(/#lang#/igm, lang)
        tempDiv.innerHTML = html
        // if the range inside code element
        if (container.tagName.toLowerCase() === 'code') {
          container.setAttribute(attrName, lang)
        } else if (container.tagName.toLowerCase() === 'pre') {
          this.eventHub.$emit('insert-html', tempDiv.getElementsByTagName('code')[0].outerHTML)
        } else {
          this.eventHub.$emit('insert-html', html)
        }
      },
      // tagName pre or code
      parseCodeSnippet (tagName) {
        let range = this.range.getRange()
        if (!range) return
        let container = this.range.getContainer()
        if (tagName === 'code') {
          let { attrName, attrValue } = this.pattern
          attrValue = attrValue.replace(/#lang#/, '')
          attrValue = (container.getAttribute(attrName) || '').replace(attrValue, '')
          this.val = attrValue || '--'
        } else {
          // 解决文字直接写到pre里
          if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            this.eventHub.$emit('wrap-text-node', range, 'code')
          }
        }
        this.view === 'design' && this.eventHub.$emit('set-view', 'codeSnippet')
      }
    }
  }
</script>