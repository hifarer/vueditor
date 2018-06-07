
<template>
  <div class="ve-codesnippet">
    <div :class="['ve-select', {'ve-disabled': mstates.view !== 'design' && mstates.view !== 'codesnippet'}]" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i>
    </div>
    <ul v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <li v-for="(type, index) in list" :key="index" @click="selectHandler(type)">{{type}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
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
    mixins: [vuexMixin, rectMixin],
    computed: {
      view () {
        return this.mstates.view
      }
    },
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      setView (data) {
        this.$store.dispatch(this.mpath + 'setView', data)
      },
      clickHandler () {
        this.togglePopup(event)
      },
      selectHandler (lang) {
        this.val = lang
        this.insertCodeBlock(lang)
        this.setActiveComponent()
      },
      insertCodeBlock (lang) {
        let comp = this.$parent.$parent.$refs.design
        let container = comp.getRangeContainerElement()
        if (!container) return
        let { attr, value } = this.pattern
        let tempDiv = document.createElement('div')
        let html = ('<pre><code ' + attr + '="' + value + '"><br></code></pre>').replace(/#lang#/igm, lang)
        tempDiv.innerHTML = html
        // if the range inside code element
        if (container.tagName.toLowerCase() === 'code') {
          container.setAttribute(attr, lang)
        } else if (container.tagName.toLowerCase() === 'pre') {
          comp.insertHTML(name, tempDiv.getElementsByTagName('code')[0].outerHTML)
        } else {
          comp.insertHTML(name, html)
        }
      },
      // tagName pre or code
      parseCodeBlock (tagName) {
        if (tagName === 'code') {
          let { attrName, attrValue } = this.pattern
          attrValue = attrValue.replace(/#type#/, '')
          attrValue = (container.getAttribute(attrName) || '').replace(attrValue, '')
          this.val = value || '--'
        } else {
          let comp = this.$parent.$parent.$refs.design
          let range = comp.getRange()
          // 解决文字直接写到pre里
          if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            comp.wrapTextNode(range, 'code')
          }
        }
        this.view === 'design' && this.setView('codesnippet')
      }
    }
  }
</script>