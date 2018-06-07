
<template>
  <div class="ve-fontsize">
    <div :class="['ve-select', {'ve-disabled': mstates.view !== 'design'}]" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i>
    </div>
    <ul v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <li v-for="(size, index) in list" :key="index" @click="selectHandler(size)">{{size}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import rectMixin from '../mixins/rect'

  export default {
    name: 'fontSize',
    data () {
      return {
        list: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'],
        val: '12px'
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
      clickHandler (event) {
        this.togglePopup(event)
      },
      selectHandler (size) {
        this.val = size
        this.setFontSize(size)
        this.setActiveComponent()
      },
      replaceFontWithSpan (element) {
        if (element.nodeType !== 1) return
        let span = document.createElement('span')
        Array.prototype.forEach.call(element.attributes, attr => {
          attr.nodeName !== 'size' && span.setAttribute(attr.nodeName, attr.nodeValue)
        })
        span.innerHTML = element.innerHTML
        element.parentNode.replaceChild(span, element)
        return span
      },
      setFontSize (size) {
        let comp = this.$parent.$parent.$refs.design
        let range = comp.getRange()
        if (!range || range.collapsed) {
          return
        }
        let container = range.commonAncestorContainer
        if (container.childNodes.length === 1) {
          container.childNodes[0].nodeType === 1 ? container.childNodes[0].style.fontSize = size : container.style.fontSize = size
        } else {
          comp.exec('fontSize', 7)
          container = range.commonAncestorContainer
          container.nodeType === 3 && (container = container.parentNode)
          container = container.parentNode
          let fontList = Array.from(container.getElementsByTagName('font'))
          let spanList = Array.from(container.getElementsByTagName('span'))
          let startNode, endNode
          if (fontList.length !== 0) {
            fontList.forEach((font, index) => {
              let span = this.replaceFontWithSpan(font)
              span.style.fontSize = size
              span.normalize()
              index === 0 && (startNode = span)
              index === fontList.length - 1 && (endNode = span)
            })
          }
          if (spanList.length !== 0) {
            spanList.forEach((span, index) => {
              if (span.style.fontSize.indexOf('xx-large') !== -1) {
                span.style.fontSize = size
                span.normalize()
                !startNode && (startNode = span)
                endNode = span
              }
            })
          }
          if (startNode && endNode) {
            range.setStartBefore(startNode)
            range.setEndAfter(endNode)
          }
        }
        comp.iframeDoc.dispatchEvent(new window.Event('selectionchange'))
      },
      syncValue (size) {
        let unit = size.match(/[a-z]+/ig)[0]
        if (unit === 'px') {
          this.list.indexOf(size) !== -1 && (this.val = size)
        } else if (unit === 'rem') {
          let rootFontSize = parseInt(window.getComputedStyle(document.documentElement)['fontSize'])
          let remFontSize = (parseInt(size) / rootFontSize).toFixed(1) + 'rem'
          this.list.indexOf(remFontSize) !== -1 && (this.val = remFontSize)
        } else {
          this.val = '--'
        }
      }
    }
  }
</script>