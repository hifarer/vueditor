
<style module lang="less" rel="stylesheet/less">
  .select {
    width: 100px;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>

<template>
  <div class="ve-fontname">
    <div :class="['ve-select', $style.select, {'ve-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <a href="javascript:;" v-for="(item, index) in list" :key="index" @click="selectHandler(item)" :style="{fontFamily: item.val + ', sans-serif'}">{{item.abbr || item.val}}</a>
    </div>
  </div>
</template>

<script>
  
  import mixins from '../mixins'
  import { getBrowser } from '../util.js'

  const browser = getBrowser()

  export default {
    name: 'fontName',
    props: {
      view: String,
      activeComponent: String
    },
    data () {
      return {
        list: [
          { val: 'arial black' },
          { val: 'times new roman' },
          { val: 'Courier New' }
        ],
        val: 'arial black',
        position: { left: 0, top: 0 }
      }
    },
    inject: ['range', 'eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler (event) {
        this.toggleMenu(event)
      },
      selectHandler (font) {
        this.val = font.abbr || font.val
        if (browser !== 'IE') {
          this.eventHub.$emit('exec-command', {name: 'fontName', value: font.val + ', sans-serif'})
        } else {
          this.setFontName(font.val + ', sans-serif')
        }
        this.eventHub.$emit('set-active-component')
      },
      replaceFontWithSpan (element) {
        if (element.nodeType !== 1) return
        let span = document.createElement('span')
        Array.prototype.forEach.call(element.attributes, attr => {
          attr.nodeName !== 'face' && span.setAttribute(attr.nodeName, attr.nodeValue)
        })
        while (element.firstChild) {
          span.appendChild(element.firstChild)
        }
        span.normalize()
        element.parentNode.replaceChild(span, element)
        return span
      },
      setFontName (fontName) {
        let range = this.range.getRange()
        if (!range || range.collapsed) {
          return
        }
        let container = range.commonAncestorContainer
        // if range container has only one child
        if (container.childNodes.length === 1) {
          container.childNodes[0].nodeType === 1 ? container.childNodes[0].style.fontFamily = fontName : container.style.fontFamily = fontName
        } else {
          // use native api to create new dom tree for the range
          this.eventHub.$emit('exec-command', {name: 'fontName', value: fontName})
          container = range.commonAncestorContainer
          container.nodeType === 3 && (container = container.parentNode)
          container = container.parentNode
          // some browser does not support styleWithCss
          let fontList = [].slice.call(container.getElementsByTagName('font'))
          let spanList = [].slice.call(container.getElementsByTagName('span'))
          let startNode, endNode
          if (fontList.length !== 0) {
            fontList.forEach((font, index) => {
              let span = this.replaceFontWithSpan(font)
              span.style.fontFamily = fontName
              // for new range
              index === 0 && (startNode = span)
              index === fontList.length - 1 && (endNode = span)
            })
          }
          if (spanList.length !== 0) {
            spanList.forEach(span => {
              if (span.getAttribute('face') !== null) {
                span.removeAttribute('face')
                span.style.fontFamily = fontName
                !startNode && (startNode = span)
                endNode = span  // endNode will be the last one of the loop
              }
            })
          }
          if (startNode && endNode) {
            range.setStartBefore(startNode)
            range.setEndAfter(endNode)
          }
        }
      },
      syncValue ({ type, data }) {
        if (type !== 'fontName') return
        this.val = this.list.filter(item => item.val === data).length !== 0 ? data : '--'
      }
    },
    created () {
      this.eventHub.$on('sync-select-value', this.syncValue)
    }
  }
</script>