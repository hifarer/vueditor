
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
  import eventHub from './eventhub.vue'

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
    inject: ['range'],
    mixins: [vuexMixin, rectMixin],
    computed: {
      view () {
        return this.mstates.view
      }
    },
    created () {
      this.eventHub = eventHub
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
        let container = this.range.getContainer()
        if (!container) return
        let { attr, value } = this.pattern
        let tempDiv = document.createElement('div')
        let html = ('<pre><code ' + attr + '="' + value + '"><br></code></pre>').replace(/#lang#/igm, lang)
        tempDiv.innerHTML = html
        // if the range inside code element
        if (container.tagName.toLowerCase() === 'code') {
          container.setAttribute(attr, lang)
        } else if (container.tagName.toLowerCase() === 'pre') {
          this.eventHub.$emit('insert-html', tempDiv.getElementsByTagName('code')[0].outerHTML)
        } else {
          this.eventHub.$emit('insert-html', html)
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
          let range = this.range.getRange()
          // 解决文字直接写到pre里
          if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            this.eventHub.$emit('wrap-text-node', range, 'code')
          }
        }
        this.view === 'design' && this.setView('codesnippet')
      }
    }
  }
</script>