

<template>
  <div class="ve-select-box">
    <div :class="[{'ve-disabled': false}, 've-select']" @click="clickHandler">
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
  import { getConfig } from '../config/'

  export default {
    name: 'fontSize',
    data () {
      let arr = getConfig('fontSize')
      return {
        list: arr,
        val: arr[0]
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
      selectHandler (size) {
        this.val = size
        this.execCommand({name: 'fontSize', value: size})
        this.setActiveComponent()
      },
      fontSize (name, value) {
        let selection = this.getSelection()
        let range = this.getRange()
        if (!selection || !range || range.collapsed) {
          return
        }
        let childNodes = range.cloneContents().childNodes
        if (childNodes.length === 1 && childNodes[0].nodeType === 1 && childNodes[0].tagName.toLowerCase() === 'span') {
          let span = range.extractContents().childNodes[0]
          span.style.fontSize = value
          range.insertNode(span)
          range.selectNode(span)
          selection.removeAllRanges()
          selection.addRange(range)
        } else {
          if (navigator.userAgent.indexOf('Chrome') !== -1 && navigator.userAgent.indexOf('Edge') === -1) {
            if (document.queryCommandSupported('styleWithCss')) {
              this.iframeDoc.execCommand('styleWithCss', false, true)
            }
            this.iframeDoc.execCommand('fontSize', false, 7)
            let container = range.commonAncestorContainer
            container.nodeType === 3 && (container = container.parentNode)
            container.tagName.toLowerCase() === 'span' && (container = container.parentNode)
            Array.prototype.forEach.call(container.getElementsByTagName('span'), function (span) {
              if (span.style.fontSize.trim() === '-webkit-xxx-large' || span.style.fontSize.trim() === 'xx-large') {
                span.style.fontSize = value
              }
              span.normalize()
            })
          } else {
            if (document.queryCommandSupported('styleWithCss')) {
              this.iframeDoc.execCommand('styleWithCss', false, false)
            }
            this.iframeDoc.execCommand('fontSize', false, 7)

            let fontList = []
            let spanList = []
            let container = range.commonAncestorContainer
            container.nodeType === 3 && (container = container.parentNode)
            container.tagName.toLowerCase() === 'font' && (container = container.parentNode)
            fontList = container.getElementsByTagName('font')
            for (let i = 0; i < fontList.length; i++) {
              let font = fontList[i]
              let span = document.createElement('span')
              Array.prototype.forEach.call(font.attributes, function (attr) {
                attr.nodeName === 'size' ? span.style.fontSize = value : span.setAttribute(attr.nodeName, attr.nodeValue)
              })
              span.innerHTML = font.innerHTML
              span.querySelectorAll('span').length !== 0 && this.formatContent(span, 'span', 'fontSize')
              span.normalize()
              font.parentNode.replaceChild(span, font)
              spanList.push(span)
              i--
            }
            range.setStartBefore(spanList[0])
            range.setEndAfter(spanList[spanList.length - 1])
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
        this.iframeDoc.dispatchEvent(new window.Event('selectionchange'))
      },
    }
  }
</script>