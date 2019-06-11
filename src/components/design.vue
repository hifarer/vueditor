
<style module lang="less" rel="stylesheet/less">
  :global(.ve-design) {
    display: block;
    width: 100%;
    height: 100%;
  }
  .half {
    width: 50%;
  }
</style>

<template>
  <iframe v-if="view !== 'sourceCode'" @load="init" :class="['ve-design', view === 'markdown' ? $style.half: '' ]" width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" src="javascript:void(function () {document.open();document.write('<!DOCTYPE html><html lang=\'en\' class=\'page\'><head><meta charset=\'UTF-8\'><meta name=\'viewport\' content=\'width=device-width, initial-scale=1.0\'><meta http-equiv=\'X-UA-Compatible\' content=\'ie=edge\'><title>Document</title><style>.page {width: 100%; height: 100%; } body {margin: 0; padding: 8px; box-sizing: border-box; word-break: break-all;} pre {margin: 0; padding: 0.5rem; background: #f5f2f0; line-height: 1.6;}</style></head><body contenteditable=\'true\' spellcheck=\'false\'></body></html>');document.close();}())"></iframe>
</template>

<script>

  import marked from '../markdown.js'
  import { getBrowser } from '../util.js'

  const browser = getBrowser()
  
  export default {
    name: 'design',
    props: {
      config: {
        validator (value) {
          return Array.isArray(value.toolbar)
        }
      },
      view: String,
      content: String
    },
    data () {
      return {
        lang: window.__VUEDITOR_LANGUAGE__.design
      }
    },
    inject: ['range', 'eventHub'],

    created: function () {
      this.timer = null
      this.eventHub.$on('insert-html', this.insertHTML)
      this.eventHub.$on('exec-command', this.execCommand)
    },

    beforeDestroy () {
      clearTimeout(this.timer)
    },

    watch: {
      'view': function (val) {
        this.iframeBody.setAttribute('contenteditable', val === 'markdown' ? false : true)
      },
      'content': function (val) {
        // only update when visible
        if (this.view !== 'sourceCode') {
          if (this.iframeBody && this.iframeBody.innerHTML !== val) {
            this.iframeBody.innerHTML = marked ? marked(val) : val
          }
        }
      }
    },

    methods: {
      
      init (event) {
        this.iframeWin = event.target.contentWindow
        this.iframeDoc = this.iframeWin.document
        this.iframeBody = this.iframeWin.document.body
        if (this.content) {
          this.iframeBody.innerHTML !== this.content && (this.iframeBody.innerHTML = this.content)
        }
        this.addEvent()
        this.range.setIframeWin(this.iframeWin)
      },
      
      // init, selection change
      setButtonStatus () {
        let status = {}
        let arr = this.config.toolbar
        for (let i = 0, name; i < arr.length; i++ ) {
          name = arr[i]
          if (this.iframeDoc.queryCommandSupported(name) && ['redo', 'undo'].indexOf(name) === -1) {
            status[name] = this.iframeDoc.queryCommandState(name) ? 'actived' : 'default'
          }
        }
        this.eventHub.$emit('set-button-status', status)
      },

      triggerEvent (eventName) {
        let event = document.createEvent('Event')
        // args: string type, boolean bubbles, boolean cancelable
        event.initEvent(eventName, false, true)
        this.iframeDoc.dispatchEvent(event);
      },

      addEvent () {
        let timer = null
        this.iframeDoc.addEventListener('click', () => {
          // throttle
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.view === 'design' && this.eventHub.$emit('set-active-component')
          }, 200)
          // dispatch selectionchange event for throttling
          this.triggerEvent('selectionchange')
        }, false)
        this.iframeBody.addEventListener('keydown', this.keydownHandler, false)
        this.iframeBody.addEventListener('keyup', this.keyupHandler, false)
        this.iframeBody.addEventListener('paste', this.pasteHandler, false)
        this.selectionChange()
      },

      keydownHandler (event) {
        // undo redo
        if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
          event.preventDefault()
          event.keyCode === 89 && this.eventHub.$emit('redo')
          event.keyCode === 90 && this.eventHub.$emit('undo')
        }
        let container = this.range.getContainer()
        if (event.keyCode === 13 && container) {
          if (['code', 'td', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(container.tagName.toLowerCase()) !== -1) {
            event.preventDefault()
            this.enterHandler(this.shouldAddNewLine(container))
          }
        }
      },

      getDOMNodePath (parent, node) {
        let tagName = ''
        let arr = []
        do {
          tagName = node.tagName.toLowerCase()
          arr.push(tagName)
          node = node.parentNode
        } while (tagName !== parent.tagName.toLowerCase() && parent.contains(node))
        return arr
      },

      shouldAddNewLine (container) {
        let bool = true
        let arr = this.getDOMNodePath(this.iframeBody, container)
        
        let excludeTags = ['code', 'td']
        let includeTags = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        let includeIndex = -1
        let excludeIndex = -1

        // find the first exclude and include tag index
        arr.forEach((tag, i) => {
          if (includeTags.indexOf(tag) !== -1 && includeIndex === -1) {
            includeIndex = i
          }
          if (excludeTags.indexOf(tag) !== -1 && excludeIndex === -1) {
            excludeIndex = i
          }
        })
        // if exclude-tag-node does not contain include-tag-node or include-tag-node contains exclude-tag-node
        if (excludeIndex !== -1) {
          if (includeIndex === -1 || (includeIndex !== -1 && includeIndex > excludeIndex)) {
            bool = false
          }
        }
        return bool
      },

      enterHandler (bool) {
        let range = this.range.getRange()
        if (!range) return
        let container = this.range.getContainer()
        // should not append new line
        if (!bool) {
          let br = this.iframeDoc.createElement('br')
          range.insertNode(br)
          br.insertAdjacentHTML('afterend', '&#8203;')
          range.setStartAfter(br.nextSibling)
        } else {
          if (!range.collapsed) {
            range.deleteContents()
          }
          range.setEndAfter(container)
          // if container.nextElementSibling === null insertBefore equals appendChild
          container.parentNode.insertBefore(range.extractContents(), container.nextElementSibling)
          container.nextElementSibling.innerHTML.trim() === '' && (container.nextElementSibling.innerHTML = '<br>')
          container.innerHTML.trim() === '' && (container.innerHTML = '<br>')
          container.nextElementSibling.scrollIntoView()
          range.setStart(container.nextElementSibling, 0)
        }
        range.collapse(true)
      },

      keyupHandler (event) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.eventHub.$emit('set-content', this.iframeBody.innerHTML)
        }, 200)
      },
  
      pasteHandler (event) {
        let container = this.range.getContainer()
        if (!container) return
        let clipboardData = event.clipboardData || window.clipboardData
        let text = clipboardData.getData('text/plain') || clipboardData.getData('Text')
        
        if (this.config.paste.noFormat) {
          event.preventDefault()
          let arr = text.replace(/(<|>)/igm, data => {
            return data.replace('<', '&lt;').replace('>', '&gt;')
          }).split('\n')
    
          this.insertHTML(arr.shift() || '')
          arr.forEach(item => {
            if (item.match(/\S/mg) !== null) {
              this.insertHTML('<br>' + item)
            }
          })
        }

        if (this.config.paste.upload && clipboardData.items) {
          this.eventHub.$emit('paste-upload', clipboardData.items)
        }
      },

      selectionChange () {
        let timer = null
        this.iframeDoc.addEventListener('selectionchange', () => {
          // throttle
          clearTimeout(timer)
          timer = setTimeout(() => {
            // update select value and button status
            this.checkElement()
            this.view === 'design' && this.setButtonStatus()
          }, 200)
        }, false)
        if (!('onselectionchange' in document)) {
          let sel = this.range.getSelection()
          let focusOffset = -1
          setInterval(() => {
            if (sel && sel.rangeCount) {
              // if previous focusOffset does not equal current focusOffset 
              if (focusOffset !== sel.focusOffset) {
                focusOffset = sel.focusOffset
                this.checkElement()
                this.view === 'design' && this.setButtonStatus()
              }
            } else {
              sel = this.range.getSelection()
            }
          }, 200)
        }
      },

      checkElement () {
        let range = this.range.getRange()
        if (!range) return
        let container = this.range.getContainer()
        let tagName = container.tagName.toLowerCase()
        let domNodePath = this.getDOMNodePath(this.iframeBody, container)
        
        if (['pre', 'code'].indexOf(tagName) !== -1) {
          if (tagName === 'pre') {
            // 解决文字直接写到pre里
            if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
              this.wrapTextNode(range, 'code')
            }
          } else {
            this.eventHub.$emit('sync-select-value', { type: 'codeSnippet', data: container.attributes })
          }
          this.view === 'design' && this.eventHub.$emit('set-view', 'codeSnippet')
        } else {
          let style = window.getComputedStyle(container)
          let fontName = style['fontFamily'].replace(', sans-serif', '').replace(/"/g, '')
          let fontSize = style['fontSize']
          // 解决文字直接写到body里
          if (tagName === 'body' && range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            this.wrapTextNode(range, 'p')
          }
          this.eventHub.$emit('sync-select-value', { type: 'element', data: domNodePath })
          this.eventHub.$emit('sync-select-value', { type: 'fontName', data: fontName })
          this.eventHub.$emit('sync-select-value', { type: 'fontSize', data: fontSize })
          // if not in code or pre element, set view to design
          if (this.view !== 'markdown' && this.view !== 'design') {
            this.eventHub.$emit('set-view', 'design')
          }
        }
      },

      setStyleWithCss (bool) {
        try {
          this.iframeDoc.execCommand('styleWithCSS', false, bool)
        } catch (e) {
          try {
            // use false to use CSS, true to use HTML
            this.iframeDoc.execCommand('useCSS', false, !bool)
          } catch (e) {}
        }
      },

      execCommand ({name, value}) {
        let range = this.range.getRange()
        if (!range) return
        if (this[name]) {
          this[name](value)
        } else {
          this.setStyleWithCss(false)
          this.iframeDoc.execCommand(name, false, value)
        }
        this.triggerEvent('selectionchange')
        this.iframeBody.focus()
        // 设置一个延迟以便像设置字号等功能在调用这个方法后再次改变innerHTML
        setTimeout(() => {
          this.eventHub.$emit('set-content', this.iframeBody.innerHTML)
        }, 200)
      },

      insertHTML (html) {
        let range = this.range.getRange()
        if (!range || !html) return
        range.deleteContents()
        let node = null
        let frag = this.iframeDoc.createDocumentFragment()
        let obj = this.iframeDoc.createElement('div')
        obj.innerHTML = html
        while (obj.firstChild) {
          node = obj.firstChild
          frag.appendChild(node)
        }
        range.insertNode(frag)
        // set cursor
        if (node.hasChildNodes() && node.childNodes[0].nodeType === 1) {
          while(node.hasChildNodes() && node.childNodes[0].nodeType === 1){
            node = node.childNodes[0]
          }
          node.tagName.toLowerCase() === 'br' ? range.selectNode(node) : range.setStart(node, 0)
        } else {
          range.setStartAfter(node)
          range.collapse(true)
        }
        this.iframeBody.focus()
      },

      removeFormat (value) {
        this.iframeDoc.execCommand('removeFormat', false, value)
        let container = this.range.getContainer(true)
        if (!container) return
        // container.tagName.toLowerCase() === 'span' && (container = container.parentNode)
        console.log(container.innerHTML || container.textContent)
        this.formatContent(container)
        container.normalize()
      },

      formatContent (obj) {
        
        if (obj.nodeType === 3) return
        // console.log(obj.innerHTML || container.textContent)
        let nodeList = Array.prototype.slice.call(obj.getElementsByTagName('span'))
        for (let i = 0; i < nodeList.length; i++) {
          let node = nodeList[i]
          // node has no element child
          // console.log(node.outerHTML) 
          if (node.children.length === 0) {
            // style is the only attribute, replace the Node
            
            if (node.attributes.length === 1 && node.attributes[0].nodeName === 'style' && node.parentNode) {
              let parent = node.parentNode
              // console.log(parent)
              parent.replaceChild(document.createTextNode(node.innerText || node.textContent), node)
              parent.normalize()
              // console.log('fi')
            } else {
              node.removeAttribute('style')
              // console.log('2')
            }
          } else {
            this.formatContent(node)
          }
        }
      },

      wrapTextNode (range, tagName) {
        let offset = range.startOffset
        let obj = this.iframeDoc.createElement(tagName)
        obj.innerText = range.startContainer.nodeValue
        range.startContainer.parentNode.replaceChild(obj, range.startContainer)
        range.setStart(obj.childNodes[0], offset)
        range.collapse(true)
        this.eventHub.$emit('set-content', this.iframeBody.innerHTML)
      }
    }
  }
</script>