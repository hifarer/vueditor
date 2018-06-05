
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
  import { getConfig } from '../config/'

  export default {
    name: 'codeSnippet',
    data () {
      let { lang, pattern } = getConfig('codeSnippet')
      return {
        list: lang,
        val: lang[0],
        pattern: pattern,
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
      }
    }
  }
</script>