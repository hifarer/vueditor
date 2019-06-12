
<template>
  <div class="ve-fontsize">
    <div :class="['ve-select', {'ve-disable': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <a href="javascript:;" v-for="(size, index) in list" :key="index" @click="selectHandler(size)">{{size}}</a>
    </div>
  </div>
</template>

<script>
  
  import mixins from '../mixins'

  export default {
    name: 'fontSize',
    props: {
      view: String,
      activeComponent: String
    },
    data () {
      return {
        list: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '42px', '48px'],
        val: '12px',
        position: { left: 0, top: 0 }
      }
    },
    inject: ['range', 'eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler (event) {
        this.toggleMenu(event)
      },
      selectHandler (size) {
        this.val = size
        this.setFontSize(size)
        this.eventHub.$emit('set-active-component')
      },
      assignElement (source, target) {
        let sibling = source.nextSibling
        Array.prototype.forEach.call(source.attributes, attr => {
          attr.nodeName !== 'size' && target.setAttribute(attr.nodeName, attr.nodeValue)
        })
        while (source.firstChild) {
          target.appendChild(source.firstChild)
        }
        target.normalize()
        return target
      },
      parseFontElement (element) {
        if (element.nodeType !== 1) return
        let temp = null
        // <font></font>
        if (element.innerHTML.trim() === '') {
          temp = document.createTextNode(element.innerHTML)
          element.parentNode.replaceChild(temp, element)
          return temp
        }
        // <span><font>xxx</font></span>
        else if (element.parentNode.children.length === 1 && element.parentNode.innerHTML.trim() === element.outerHTML.trim()) {
          temp = element.parentNode
          this.assignElement(element, temp)
          temp.removeChild(element)
          return temp
        }
        // <font><span>xxx</span></font>
        else if (element.children.length === 1 && element.innerHTML.trim() === element.children[0].outerHTML.trim()) {
          temp = element.children[0]
          while (element.firstChild) {
            element.parentNode.insertBefore(element.firstChild, element)
          }
          element.parentNode.removeChild(element)
          return temp
        } else {
          temp = this.assignElement(element, document.createElement('span'))
          element.parentNode.replaceChild(temp, element)
          return temp
        }
      },
      setFontSize (size) {
        let range = this.range.getRange()
        if (!range || range.collapsed) {
          return
        }
        let container = range.commonAncestorContainer
        // if range container has only one child
        if (container.childNodes.length === 1) {
          container.childNodes[0].nodeType === 1 ? container.childNodes[0].style.fontSize = size : container.style.fontSize = size
        } else {
          // use execCommand to create a new dom tree for the range
          this.eventHub.$emit('exec-command', { name: 'fontSize', value: 7 })
          range = this.range.getRange()
          container = range.commonAncestorContainer
          container.nodeType === 3 && (container = container.parentNode)
          container = container.parentNode

          let startNode, endNode
          Array.prototype.slice.call(container.getElementsByTagName('font')).forEach((ele, index) => {
            ele = this.parseFontElement(ele)
            ele.nodeType === 1 && (ele.style.fontSize = size)
            !startNode && (startNode = ele)
            endNode = ele
          })
          if (startNode && endNode) {
            range.setStartBefore(startNode)
            range.setEndAfter(endNode)
          }

          Array.prototype.slice.call(container.getElementsByTagName('span')).forEach((ele, index) => {
            let bool = this.range.isNodeInRange(range, ele)
            console.log(bool)
            if (bool && ele.style.fontSize !== '' && ele.style.fontSize !== size) {
              ele.style.fontSize = size
            }
          })
          
        }
      },
      syncValue ({ type, data }) {
        if (type !== 'fontSize') return
        let unit = data.match(/[a-z]+/ig)[0]
        if (unit === 'px') {
          this.list.indexOf(data) !== -1 && (this.val = data)
        } else if (unit === 'rem') {
          let rootFontSize = parseInt(window.getComputedStyle(document.documentElement)['fontSize'])
          let remFontSize = (parseInt(data) / rootFontSize).toFixed(1) + 'rem'
          this.list.indexOf(remFontSize) !== -1 && (this.val = remFontSize)
        } else {
          this.val = '--'
        }
      }
    },
    created () {
      this.eventHub.$on('sync-select-value', this.syncValue)
    }
  }
</script>