
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
        this.newSetFontSize(size)
        this.eventHub.$emit('set-active-component')
      },
      handleTextNode(node) {

      },
      handleElementNode(node) {

      },
      traverseStartToContainer(range, size) {
        let container = range.commonAncestorContainer
        let start = range.startContainer
        let startOffset = range.startOffset
        let shouldSetStyle = true
        while (start.parentNode !== container) {
          // 处理文本节点
          if (start.nodeType === 3) {
            // _代表光标位置

            // 无需添加包裹标签的情况
            // <p>_hello<span>hello</span></p>
            // <p>hello<span>_hello<span>hello</span></span></p>
            // <p>hello<span>_hello</span></p>
            // 只有当光标定在父级节点的第一个节点的开始时，文本节点不需要创建新元素来包裹它
            if (startOffset === 0 && start === start.parentNode.firstChild) {
              // 向上跳一级
              start = start.parentNode
              // 因为本级没有修改样式，那么上一级就需要修改
              shouldSetStyle = true
              continue
            } else {
              // 需要添加包裹标签的情况
              // <p>he_llo<span>hello</span></p>
              // <p><span>_hello</span>hello</p>
              let eleStart = document.createElement('span')
              eleStart.style.fontSize = size
              // if true 把整个文本节点替换成元素节点
              if (startOffset === 0) {
                eleStart.appendChild(document.createTextNode(start.nodeValue))
                start.parentNode.replaceChild(eleStart, start)
              } else {
                // 把光标后面的替换成元素节点，同时修改原文本节点
                eleStart.appendChild(document.createTextNode(start.nodeValue.substr(startOffset)))
                start.parentNode.insertBefore(eleStart, start.nextSibling)
                start.nodeValue = start.nodeValue.substr(0, startOffset)
              }
              start = eleStart
            }
          } else {
            // 处理元素节点
            // 如果是父级的第一个节点，样式应该设置在父级上；需要排除选区不在其起点位置的情况
            if (start == start.parentNode.firstChild) {
              // 向上跳一级
              if (shouldSetStyle) {
                start = start.parentNode
                continue
              }
            } else {
              // 不是则设置在自己身上
              if (shouldSetStyle) {
                start.style.fontSize = size
                this.clearChildStyle(start)
              }
            }
          }
          // 如果是往右，即下一个要处理的是兄弟节点，那么需要设置样式；如果是往上，因为下面一级都已经处理过样式，则不需要处理样式。
          shouldSetStyle = start.nextSibling !== null
          start = shouldSetStyle ? start.nextSibling : start.parentNode
          // startOffset = 0
        }
        // 如果遍历到container的直接子元素还是需要设置样式（continue上来的或者start一开始就是container的直接子元素）
        if (shouldSetStyle) {
          if (start.nodeType === 1) {
            start.style.fontSize = size
            this.clearChildStyle(start)
          } else if (start.nodeType === 3) {
            // 不考虑再向上跳了直接处理
            let eleStart = document.createElement('span')
            eleStart.style.fontSize = size
            // if true 把整个文本节点替换成元素节点
            if (startOffset === 0) {
              eleStart.appendChild(document.createTextNode(start.nodeValue))
              start.parentNode.replaceChild(eleStart, start)
            } else {
              // 把光标后面的替换成元素节点，同时修改原文本节点
              eleStart.appendChild(document.createTextNode(start.nodeValue.substr(startOffset)))
              start.parentNode.insertBefore(eleStart, start.nextSibling)
              start.nodeValue = start.nodeValue.substr(0, startOffset)
            }
            start = eleStart
          }
        }
        return start
      },
      traverseEndToContainer(range, size) {
        let container = range.commonAncestorContainer
        let end = range.endContainer
        let endOffset = range.endOffset
        let shouldSetStyle = true
        while (end.parentNode !== container) {
          if (end.nodeType === 3) {
            // _代表光标位置

            // 无需添加包裹标签的情况
            // <p><span>hello</span>hello_</p>
            // <p><span>hello<span>hello_</span></span>hello</p>
            // <p><span>hello_</span>hello</p>
            // 只有当光标定在父级节点的最后一个节点的结束时，文本节点不需要创建新元素来包裹它
            if (endOffset === end.nodeValue.length && end === end.parentNode.lastChild) {
              // 向上跳一级
              end = end.parentNode
              shouldSetStyle = true
              continue
            } else {
              // 需要添加包裹标签的情况
              // <p><span>hello</span>he_llo</p>
              // <p>hello<span>hello_</span></p>
              let eleEnd = document.createElement('span')
              eleEnd.style.fontSize = size
              if (endOffset === end.nodeValue.length) {
                eleEnd.appendChild(document.createTextNode(end.nodeValue))
                end.parentNode.replaceChild(eleEnd, end)
              } else {
                eleEnd.appendChild(document.createTextNode(end.nodeValue.substr(0, endOffset)))
                end.parentNode.insertBefore(eleEnd, end)
                end.nodeValue = end.nodeValue.substr(endOffset)
              }
              end = eleEnd
            }
          } else {
            // 选到了最后一个子元素，往上一层设置样式
            if (end == end.parentNode.lastChild) {
              // 向上跳一级
              if (shouldSetStyle) {
                end = end.parentNode
                continue
              }
            } else {
              if (shouldSetStyle) {
                end.style.fontSize = size
                this.clearChildStyle(end)
              }
            }
          }
          // 如果是往左，即下一个要处理的是兄弟节点，那么需要设置样式；如果是往上，因为下面一级都已经处理过样式，则不需要处理样式。
          shouldSetStyle = end.previousSibling !== null
          end = shouldSetStyle ? end.previousSibling : end.parentNode
          // endOffset = end.nodeType === 3 ? end.nodeValue.length : end.innerText.length
        }
        if (shouldSetStyle) {
          if (end.nodeType === 1) {
            end.style.fontSize = size
            this.clearChildStyle(end)
          } else if (end.nodeType === 3) {
            // 不考虑再向上跳了直接处理
            let eleEnd = document.createElement('span')
            eleEnd.style.fontSize = size
            // if true 把整个文本节点替换成元素节点
            if (endOffset === end.nodeValue.length) {
              eleEnd.appendChild(document.createTextNode(end.nodeValue))
              end.parentNode.replaceChild(eleEnd, end)
            } else {
              eleEnd.appendChild(document.createTextNode(end.nodeValue.substr(0, endOffset)))
              end.parentNode.insertBefore(eleEnd, end)
              end.nodeValue = end.nodeValue.substr(endOffset)
            }
            end = eleEnd
          }
        }
        return end
      },
      traverseTopLevelSibling(start, end, size) {
        while ((start = start.nextSibling) !== end) {
          // 跳过换行符节点
          if (start.nodeType === 3) {
            if (start.nodeValue.trim() !== '') {
              let eleStart = document.createElement('span')
              eleStart.style.fontSize = size
              eleStart.appendChild(document.createElement(start.nodeValue))
              start.parentNode.replaceChild(eleStart, start)
              start = eleStart
            }
          } else if (start.nodeType === 1) {
            start.style.fontSize = size
            this.clearChildStyle(start)
          }
        }
      },

      // 无论嵌套多复杂，都可以分成三种情况
      // ... target</ele></ele>
      // <ele><ele>target</ele></ele>
      // <ele><ele>target

      // 如果container是纯文本节点，判断它是否是一个元素节点的完整子节点，如果是将样式应用到文本节点的父级节点上，如果不是创建新元素包裹
      // startContainer is text startOffset equals 0

      // 如果文本是元素节点文本的一部分，那么说明需要创建新的元素节点包裹文本；否则应该将样式应用到文本节点的父级节点上
      // 从startContainer遍历到endContainer
      // 当前节点处理完毕，看有没有nextSibling，如果有则继续直到没有nextSibling，没有nextSibling那么向上一级，以此内推直到向上到commonAncestorContainer
      newSetFontSize(size) {
        let range = this.range.getRange()
        if (!range || range.collapsed) {
          return
        }
        let container = range.commonAncestorContainer
        console.log(container)
        console.log(range)
        console.log(size)

        // todo 排除换行符的影响
        // todo 遍历到htmlbug
        if (container.firstChild === range.startContainer && range.startOffset === 0
          && container.lastChild === range.endContainer && range.endOffset === ( range.endContainer.nodeType === 3 ? range.endContainer.nodeValue.length : range.endContainer.innerText.length) ) {
          console.log('inside container if')
          if (container.nodeType === 3) {
            container = container.parentNode
          }
          container.style.fontSize = size
          this.clearChildStyle(container)
          return
        }

        // start、 end、container相等的时候
        let start = range.startContainer
        if (start === range.endContainer && start === container) {
          if (start.nodeType === 3) {
            if (range.startOffset !== 0 || range.endOffset !== start.nodeValue.length) {
              let eleStart = document.createElement('span')
              eleStart.style.fontSize = size
              // 把光标后面的替换成元素节点，同时修改原文本节点
              eleStart.appendChild(document.createTextNode(start.nodeValue.substr(range.startOffset, range.endOffset)))
              let textEnd = document.createTextNode(start.nodeValue.substr(range.endOffset))
              start.parentNode.insertBefore(textEnd, start.nextSibling)
              start.parentNode.insertBefore(eleStart, textEnd)
              start.nodeValue = start.nodeValue.substr(0, range.startOffset)
            } else {
              start.parentNode.style.fontSize = size
              this.clearChildStyle(start.parentNode)
            }
          } else {
            start.style.fontSize = size
            this.clearChildStyle(start)
          }
          return
        }

        let topLevelStart = this.traverseStartToContainer(range, size)
        let topLevelEnd = this.traverseEndToContainer(range, size)
        this.traverseTopLevelSibling(topLevelStart, topLevelEnd, size)
      },
      // 清除已有元素节点的子节点的样式，如果是新创建的元素则无需清除
      clearChildStyle(node) {
        let children = Array.prototype.slice.call(node.children)    // 因为元素节点会变成文本节点，children会动态变化，这里需要存一下   
        for (let i = 0; i < children.length; i++) {
          // 深度优先
          if (children[i].children.length > 0) {
            this.clearChildStyle(children[i])
          }
          if (children[i].style.fontSize !== '') {
            children[i].style.fontSize = ''
            // 如果只是个存粹的包裹元素，把它变成文本节点
            if (children[i].children.length === 0
              && children[i].attributes.length === 1 
              && children[i].attributes[0].name === 'style'
              && children[i].getAttribute('style') === '') {
              let textNode = document.createTextNode(children[i].innerText)
              children[i].parentNode.replaceChild(textNode, children[i])
              // 最后一个
              if (i === children.length - 1) {
                textNode.parentNode.normalize()
              }
            }
          }
        }
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