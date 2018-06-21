
<template>
  <div class="ve-fontsize">
    <div :class="['ve-select', {'ve-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <a href="javascript:;" v-for="(size, index) in list" :key="index" @click="selectHandler(size)">{{size}}</a>
    </div>
  </div>
</template>

<script>
  
  import injectMixin from '../mixins/inject'
  import rectMixin from '../mixins/rect'

  export default {
    name: 'fontSize',
    data () {
      return {
        list: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'],
        val: '12px'
      }
    },
    props: {
      view: String,
      activeComponent: String
    },
    mixins: [injectMixin, rectMixin],
    created () {
      this.eventHub.$on('sync-font-size', this.syncValue)
    },
    methods: {
      clickHandler (event) {
        this.togglePopup(event)
      },
      selectHandler (size) {
        this.val = size
        this.setFontSize(size)
        this.eventHub.$emit('set-active-component')
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
        let range = this.range.getRange()
        if (!range || range.collapsed) {
          return
        }
        let container = range.commonAncestorContainer
        if (container.childNodes.length === 1) {
          container.childNodes[0].nodeType === 1 ? container.childNodes[0].style.fontSize = size : container.style.fontSize = size
        } else {
          this.eventHub.$emit('exec-command', {name: 'fontSize', value: 7})
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
        this.eventHub.$emit('selection-change')
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