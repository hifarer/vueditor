
<template>
  <div class="ve-codesnippet">
    <div :class="['ve-select', {'ve-disabled': mstates.view !== 'design'}]" @click="clickHandler">
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
  import { getConfig } from '../config/'

  export default {
    name: 'codeSnippet',
    data () {
      let { lang, pattern } = getConfig('codeSnippet')
      return {
        list: lang,
        val: lang[0],
        tpl: '<pre><code ' + pattern.attr + '="' + pattern.value + '"><br></code></pre>',
        rect: {}
      }
    },
    mixins: [vuexMixin, rectMixin],
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      clickHandler () {
        this.togglePopup(event)
      },
      selectHandler (lang) {
        this.val = lang
        this.execCommand({name: 'insertCodeBlock', value: this.tpl.replace(/#lang#/igm, lang)})
        this.setActiveComponent()
      },
      insertCodeBlock (name, value) {
        let range = this.getRange()
        if (!range) return
        let { pattern } = this.config.codeSnippet
        let tempDiv = document.createElement('div')
        tempDiv.innerHTML = value
        let attrValue = tempDiv.getElementsByTagName('code')[0].getAttribute(pattern.attr)
        let container = range.commonAncestorContainer
        container.nodeType === 3 && (container = container.parentNode)
        if (container.tagName.toLowerCase() === 'code') {
          container.setAttribute(pattern.attr, attrValue)
        } else if (container.tagName.toLowerCase() === 'pre') {
          this.insertHTML(name, tempDiv.getElementsByTagName('code')[0].outerHTML)
        } else {
          this.insertHTML(name, value)
        }
      }
    }
  }
</script>