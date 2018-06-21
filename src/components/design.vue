
<style module lang="less" rel="stylesheet/less">
  :global(.ve-design) {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
  }
  .half {
    width: 50%;
    float: left;
  }
</style>

<template>
  <iframe :class="['ve-design', view === 'markdown' ? $style.half: '' ]" width="100%" height="100%" frameborder="0" src="javascript:void(function () {document.open();document.write('<!DOCTYPE html><html lang=\'en\' class=\'page\'><head><meta charset=\'UTF-8\'><meta name=\'viewport\' content=\'width=device-width, initial-scale=1.0\'><meta http-equiv=\'X-UA-Compatible\' content=\'ie=edge\'><title>Document</title><style>.page {width: 100%; height: 100%; margin: 0; word-break: break-word; overflow: hidden;} pre {margin: 0; padding: 0.5rem; background: #f5f2f0; line-height: 1.6;}</style><script>document.designMode = \'on\'</script></head><body class=\'page\' spellcheck=\'false\'></body></html>');document.close();}())" v-show="view !== 'sourceCode'" @load="init"></iframe>
</template>

<script>

  import injectMixin from '../mixins/inject'
  
  export default {
    name: 'design',
    data () {
      return {
        iframeWin: null,
        iframeDoc: null,
        iframeBody: null,
        timer: null,
        lang: window.__VUEDITOR_LANGUAGE__.design
      }
    },
    props: {
      config: {
        validator (value) {
          return Array.isArray(value.toolbar)
        }
      },
      view: String,
      content: String
    },
    
    mixins: [injectMixin],

    created: function () {
      this.eventHub.$on('selection-change', () => {
        this.setContent(this.iframeBody.innerHTML)
        this.triggerEvent('selectionchange')
      })
      this.eventHub.$on('wrap-text-node', this.wrapTextNode)
      this.eventHub.$on('insert-html', this.insertHTML)
      this.eventHub.$on('exec-command', this.exec)
    },

    watch: {
      'view': function (val) {
        if (val !== 'design') {
          clearTimeout(this.timer)
          this.setContent(this.iframeBody.innerHTML)
        }
      },
      'content': function (val) {
        if (this.iframeBody && this.iframeBody.innerHTML !== val) {
          this.iframeBody.innerHTML = val
        }
      }
    },

    methods: {
      setContent (content) {
        this.eventHub.$emit('set-content', content)
      },
      triggerEvent (eventName) {
        let event = document.createEvent('Event')
        // args: string type, boolean bubbles, boolean cancelable
        event.initEvent(eventName, false, true)
        this.iframeDoc.dispatchEvent(event);
      },
      init (event) {
        this.iframeWin = event.target.contentWindow
        this.iframeDoc = this.iframeWin.document
        this.iframeBody = this.iframeWin.document.body
        if (this.content) {
          this.iframeBody.innerHTML !== this.content && (this.iframeBody.innerHTML = this.content)
        }
        this.addEvent()
        this.eventHub.$emit('set-iframe-win', this.iframeWin)
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
        // this.config.noFormatPaste && this.iframeBody.addEventListener('paste', this.pasteHandler, false)
        this.selectionChange()
      },

      keydownHandler (event) {
        if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
          event.preventDefault()
          event.keyCode === 89 && this.eventHub.$emit('redo')
          event.keyCode === 90 && this.eventHub.$emit('undo')
        }
        let container = this.range.getContainer()
        if (event.keyCode === 13 && container) {
          if (['code', 'td', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf( container.tagName.toLowerCase() ) !== -1 ) {
            event.preventDefault()
            this.enterHandler()
          }
        }
      },

      enterHandler () {
        let range = this.range.getRange()
        if (!range) return
        let container = this.range.getContainer()
        let excludeTags = ['code', 'td']
        let includeTags = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        let bool = false
        let arr = []
        let child = container
        let tagName = child.tagName.toLowerCase()
        arr.push(tagName)
        while (tagName !== 'body' && this.iframeBody.contains(container)) {
          container = container.parentNode
          tagName = container.tagName.toLowerCase()
          arr.push(tagName)
        }
        // 路径中包括excludeTags也不行, 但如果是 td 包括 p 是可以的
        let includeIndex = -1
        let excludeIndex = -1
        arr.forEach((tag, i) => {
          if (includeTags.indexOf(tag) !== -1 && includeIndex === -1) {
            includeIndex = i
          }
          if (excludeTags.indexOf(tag) !== -1 && excludeIndex === -1) {
            excludeIndex = i
          }
        })
        if (excludeIndex !== -1) {
          if (includeIndex === -1 || (includeIndex !== -1 && includeIndex > excludeIndex)) {
            bool = true
          }
        }
        if (bool) {
          let br = this.iframeDoc.createElement('br')
          range.insertNode(br)
          br.insertAdjacentHTML('afterend', '&#8203;')
          range.setStartAfter(br.nextSibling)
        } else {
          if (!range.collapsed) {
            range.deleteContents()
          }
          // 如果后面没有文本内容了，生成新的p，如果有截断当前的元素
          range.setEndAfter(child)
          if (range.toString() !== '') {
            // if child.nextElementSibling === null insertBefore equals appendChild
            child.parentNode.insertBefore(range.extractContents(), child.nextElementSibling)
            child.innerHTML === '' && (child.innerHTML = '<br>')
          } else {
            child.insertAdjacentHTML('afterend', '<p><br></p>')
          }
          range.setStart(child.nextElementSibling, 0)
        }
        range.collapse(true)
      },

      keyupHandler (event) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.setContent(this.iframeBody.innerHTML)
        }, 500)
      },
  
      // 无格式粘贴
      pasteHandler (event) {
        event.preventDefault()
        let container = this.range.getContainer()
        if (!container) return
        let clipboardData = event.clipboardData || window.clipboardData
        let text = clipboardData.getData('text/plain') || clipboardData.getData('Text')
        let arr = text.replace(/(<|>)/igm, function (data) {
          return data.replace('<', '&lt;').replace('>', '&gt;')
        }).split('\n')

        this.insertHTML('', arr.shift())
        arr.forEach(item => {
          if (item.match(/\S/mg) !== null) {
            this.insertHTML('', '<br>' + item)
          }
        })

        if (this.config.uploadOnPaste && clipboardData.items) {
          this.eventHub.$emit('paste-upload', clipboardData.items)
        }
      },

      selectionChange () {
        let timer = null
        this.iframeDoc.addEventListener('selectionchange', () => {
          // throttle
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.checkElement()
            this.view === 'design' && this.setButtonStatus()
          }, 200)
        }, false)
        if (!('onselectionchange' in document)) {
          let sel = this.getSelection()
          let focusOffset = -1
          setInterval(() => {
            if (sel && sel.rangeCount) {
              if (focusOffset !== sel.focusOffset) {
                focusOffset = sel.focusOffset
                this.view === 'design' && this.setButtonStatus()
                this.checkElement()
              }
            } else {
              sel = this.getSelection()
            }
          }, 200)
        }
      },

      checkElement () {
        let range = this.range.getRange()
        if (!range) return
        let container = this.range.getContainer()
        let tagName = container.tagName.toLowerCase()
        
        if (['code', 'pre'].indexOf(tagName) !== -1) {
          this.eventHub.$emit('parse-code-block', tagName)
        } else {
          let style = window.getComputedStyle(container)
          let fontName = style['fontFamily'].replace(', sans-serif', '').replace(/"/g, '')
          let fontSize = style['fontSize']
          if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            // 解决文字直接写到body里
            if(tagName === 'body'){
              this.wrapTextNode(range, 'p')
              tagName = 'p'
            }
          }
          this.eventHub.$emit('sync-element-tag', this.iframeBody, container)
          this.eventHub.$emit('sync-font-name', fontName)
          this.eventHub.$emit('sync-font-size', fontSize)
          this.view !== 'design' && this.eventHub.$emit('set-view', 'design')
        }
      },

      wrapTextNode (range, tagName) {
        let offset = range.startOffset
        let obj = this.iframeDoc.createElement(tagName)
        obj.innerText = range.startContainer.nodeValue
        range.startContainer.parentNode.replaceChild(obj, range.startContainer)
        range.setStart(obj.childNodes[0], offset)
        range.collapse(true)
      },

      exec ({name, value}) {
        let range = this.range.getRange()
        if (!range) return
        if (document.queryCommandSupported('styleWithCss')) {
          this.iframeDoc.execCommand('styleWithCss', false, true)
        }
        this.iframeDoc.execCommand(name, false, value)
        this.triggerEvent('selectionchange')
        this.iframeBody.focus()
        name !== 'fontSize' && this.setContent(this.iframeBody.innerHTML)
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

      formatContent (obj, tagName, cssName) {
        let temp = []
        let pattern = {fontSize: /font-size:\s?\d+px;/g, verticalAlign: /vertical-align:\s?(sub|super);/g}
        let nodeList = obj.getElementsByTagName(tagName)
        for (let i = 0; i < nodeList.length; i++) {
          let node = nodeList[i]
          if (node.attributes.length === 1 && node.style.length !== 0 && node.getAttribute('style').match(pattern[cssName]) != null) {
            if (node.children.length === 0) {
              if (node.style.length === 1) {
                let parent = node.parentNode
                parent.replaceChild(document.createTextNode(node.innerHTML), node)
                parent.normalize()
                i--
              } else {
                node.style[cssName] = ''
              }
            } else {
              temp.push(node)
            }
          }
        }
        if (temp.length !== 0) {
          this.formatContent(obj, tagName, cssName)
        }
      },

      removeFormat (name, value) {
        this.iframeDoc.execCommand(name, false, value)
        let container = this.range.getContainer()
        if (!container) return
        container.tagName.toLowerCase() === 'span' && (container = container.parentNode)
        this.formatContent(container, 'span', 'verticalAlign')
        container.normalize()
      }
    }
  }
</script>