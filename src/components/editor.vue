
<template>
  <div ref="editor"></div>
</template>

<script>

  import { debounce } from '../core/util'
  
  export default {
    name: 'design',
    props: {
      config: Object,
      view: String,
      content: String
    },
    inject: ['editor', 'eventHub'],
    data() {
      return {
        lang: window.__VUEDITOR_LANGUAGE__.design
      }
    },
    methods: {
      
      init(event) {
        let iframe = document.createElement('iframe')
        iframe.src = ''
        iframe.className = 've-design'
        iframe.width = '100%'
        iframe.height = '100%'
        iframe.setAttribute('marginheight', 0)
        iframe.setAttribute('marginwidth', 0)
        iframe.setAttribute('frameborder', 0)
        iframe.setAttribute('scrolling', 'NO')
        this.$refs.editor.appendChild(iframe)
        this.iframeWin = iframe.contentWindow
        this.iframeDoc = iframe.contentWindow.document
        this.iframeDoc.write("<!DOCTYPE html><html lang='en' class='page'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta http-equiv='X-UA-Compatible' content='ie=edge'><title>Document</title><style>.page {width: 100%; height: 100%; } body {margin: 0; padding: 8px; box-sizing: border-box; word-break: break-all;} pre {margin: 0; padding: 0.5rem; background: #f5f2f0; line-height: 1.6;}</style></head><body contenteditable='true' spellcheck='false'></body></html>")
        this.iframeDoc.close()
        this.iframeBody = iframe.contentWindow.document.body
        this.iframeBody.innerHTML = this.editor.getContent()
        this.editor.init(this.iframeWin, this.iframeDoc, this.iframeBody)
        this.addEvent()
      },
      
      addEvent() {
        let keyupHandler = debounce(() => this.editor.setContent(), 200)
        let clickHandler = debounce(() => {
          this.editor.triggerEvent('selectionchange')
          this.eventHub.$emit('set-active-component')
        }, 200)
        let selectionchangeHandler = debounce(() => {
          this.checkElement()
          this.setButtonStatus()
        }, 200)
        this.iframeBody.addEventListener('paste', this.pasteHandler, false)
        this.iframeBody.addEventListener('keydown', this.keydownHandler, false)
        this.iframeBody.addEventListener('keyup', keyupHandler, false)
        this.iframeDoc.addEventListener('click', clickHandler, false)
        this.iframeDoc.addEventListener('selectionchange', selectionchangeHandler, false)
      },

      keydownHandler(event) {
        // undo redo
        if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
          event.preventDefault()
          event.keyCode === 89 && this.editor.redo()
          event.keyCode === 90 && this.editor.undo()
        }
        if (event.keyCode === 13) {
          let range = this.editor.getRange()
          let container = range.commonAncestorContainer
          container.nodeType === 3 && (container = container.parentNode)
          if (['code', 'td', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(container.tagName.toLowerCase()) !== -1) {
            event.preventDefault()
            this.enterHandler(range, container)
          }
        }
      },

      getDOMNodePath(parent, node) {
        let arr = []
        while(parent.contains(node)) {
          arr.push(node.tagName.toLowerCase())
          node = node.parentNode
        }
        return arr
      },

      isShouldAddNewLine(container) {
        let shouldAddNewLine = true
        let excludeIndex = -1
        let excludeTags = ['code', 'td']
        let includeIndex = -1
        let includeTags = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

        let domNodePath = this.getDOMNodePath(this.iframeBody, container)
        domNodePath.forEach((tag, i) => {
          if (includeTags.indexOf(tag) !== -1 && includeIndex === -1) {
            includeIndex = i
          }
          if (excludeTags.indexOf(tag) !== -1 && excludeIndex === -1) {
            excludeIndex = i
          }
        })
        // 如果检测到光标在code td标签中，回车不添加新行
        if (excludeIndex !== -1) {
          if (includeIndex === -1 
            || (includeIndex !== -1 && includeIndex > excludeIndex)) {
            shouldAddNewLine = false
          }
        }
        return shouldAddNewLine
      },

      enterHandler(range, container) {
        let shouldAddNewLine = this.isShouldAddNewLine(container)
        // should not append new line
        if (!shouldAddNewLine) {
          let br = this.iframeDoc.createElement('br')
          range.insertNode(br)
          br.insertAdjacentHTML('afterend', '&#8203;')
          range.setStartAfter(br.nextSibling)
        } else {
          if (!range.collapsed) {
            range.deleteContents()
          }
          range.setEndAfter(container)
          // insertBefore equals appendChild if the second arg is null
          container.parentNode.insertBefore(range.extractContents(), container.nextElementSibling)
          container.nextElementSibling.innerHTML.trim() === '' && (container.nextElementSibling.innerHTML = '<br>')
          container.innerHTML.trim() === '' && (container.innerHTML = '<br>')
          container.nextElementSibling.scrollIntoView()
          range.setStart(container.nextElementSibling, 0)
        }
        range.collapse(true)
      },

      pasteHandler(event) {
        let clipboardData = event.clipboardData || window.clipboardData
        let text = clipboardData.getData('text/plain') || clipboardData.getData('Text')
        if (this.config.paste.noFormat) {
          event.preventDefault()
          let arr = text.replace('<', '&lt;').replace('>', '&gt;').split('\n')
          this.editor.insertHTML(arr.shift() || '')
          arr.forEach(item => {
            if (item.match(/\S/mg) !== null) {
              this.editor.insertHTML('<br>' + item)
            }
          })
        }
        if (this.config.paste.upload && clipboardData.items) {
          this.eventHub.$emit('paste-upload', clipboardData.items)
        }
      },

      checkElement() {
        let range = this.editor.getRange()
        if (!range) return
        let container = range.commonAncestorContainer
        container.nodeType === 3 && (container = container.parentNode)
        let tagName = container.tagName.toLowerCase()
        
        if (['pre', 'code'].indexOf(tagName) !== -1) {
          if (tagName === 'pre') {
            // 解决文字直接写到pre里
            if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
              this.editor.wrapTextNode(range, 'code')
            }
          } else {
            this.eventHub.$emit('sync-select-value', { type: 'code', data: container.attributes })
          }
          this.view !== 'code' && this.eventHub.$emit('set-view', 'code')
        } else {
          let style = window.getComputedStyle(container)
          let fontSize = style['fontSize']
          let fontName = style['fontFamily'].replace(', sans-serif', '').replace(/"/g, '')
          // 解决文字直接写到body里
          if (tagName === 'body' && range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            this.editor.wrapTextNode(range, 'p')
          }
          this.eventHub.$emit('sync-select-value', { type: 'element', data: tagName })
          this.eventHub.$emit('sync-select-value', { type: 'fontName', data: fontName })
          this.eventHub.$emit('sync-select-value', { type: 'fontSize', data: fontSize })
          this.view !== 'design' && this.eventHub.$emit('set-view', 'design')
        }
      },

      setButtonStatus() {
        let status = {}
        let arr = this.config.toolbar
        for (let i = 0, name; i < arr.length; i++ ) {
          name = arr[i]
          if (this.iframeDoc.queryCommandSupported(name)) {
            status[name] = this.iframeDoc.queryCommandState(name) ? 'active' : 'default'
          }
        }
        this.eventHub.$emit('set-button-status', status)
      }

    },

    mounted() {
      this.init()
    }
  }
</script>

<style module lang="less" rel="stylesheet/less">
  :global(.ve-design) {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
