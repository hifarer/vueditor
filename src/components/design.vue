
<style module>
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
  <iframe :class="['ve-design', view === 'markdown' ? $style.half: '' ]" src="about:blank" frameborder="0" v-show="view !== 'sourceCode'" @load="init"></iframe>
</template>

<script>

  import { getLang } from '../config/lang.js'
  import { getConfig } from '../config/'
  import vuexMixin from '../mixins/vuex'
  
  export default {
    name: 'design',
    data () {
      return {
        iframeWin: null,
        iframeDoc: null,
        iframeBody: null,
        timer: null,
        lang: getLang('design'),
        config: getConfig()
      }
    },
    
    mixins: [vuexMixin],

    computed: {
      view () {
        return this.mstates.view
      },
      content () {
        return this.mstates.content
      },
      command () {
        return this.mstates.command
      },
      toolbar () {
        return this.mstates.toolbar
      }
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
      },
      'command': function (data) {
        this.exec(data.name, data.value)
      }
    },

    methods: {
      setContent (data) {
        this.$store.dispatch(this.mpath + 'setContent', data)
      },
      setSelectValue (data) {
        // this.$store.dispatch(this.mpath + 'setSelectValue', data)
      },
      setButtonStates (data) {
        this.$store.dispatch(this.mpath + 'setButtonStates', data)
      },
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      triggerEvent (data) {
        this.$store.dispatch(this.mpath + 'triggerEvent', data)
      },
      setView (data) {
        this.$store.dispatch(this.mpath + 'setView', data)
      },
      init (event) {
        this.iframeWin = event.target.contentWindow
        this.iframeDoc = this.iframeWin.document
        this.iframeBody = this.iframeWin.document.body
        if (this.content) {
          this.iframeBody.innerHTML !== this.content && (this.iframeBody.innerHTML = this.content)
        }
        this.iframeDoc.designMode = 'on'
        this.iframeBody.spellcheck = this.config.spellcheck
        this.iframeBody.style.cssText = 'overflow-x: hidden; margin: 0; padding: 8px;'
        this.iframeDoc.head.insertAdjacentHTML('beforeEnd', '<style>pre {margin: 0; padding: 0.5rem; background: #f5f2f0; line-height: 1.6;}</style>')
        this.addEvent()
      },

      // init, selection change
      updateStates () {
        let json = {}
        for (let name in this.toolbar) {
          if (this.iframeDoc.queryCommandSupported(name) && ['redo', 'undo'].indexOf(name) === -1) {
            json[name] = this.iframeDoc.queryCommandState(name) ? 'actived' : 'default'
          }
        }
        this.setButtonStates(json)
      },

      addEvent () {
        let timer = null
        this.iframeDoc.addEventListener('click', () => {
          // throttle
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.view === 'design' && this.setActiveComponent()
          }, 200)
          // dispatch selectionchange event for throttling
          this.iframeDoc.dispatchEvent(new window.Event('selectionchange'))
        }, false)
        this.iframeBody.addEventListener('keydown', this.keydownHandler, false)
        this.iframeBody.addEventListener('keyup', this.keyupHandler, false)
        this.config.noFormatPaste && this.iframeBody.addEventListener('paste', this.pasteHandler, false)
        this.selectionChange()
      },

      keydownHandler (event) {
        if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
          event.preventDefault()
          event.keyCode === 89 && this.triggerEvent({name: 'redo'})
          event.keyCode === 90 && this.triggerEvent({name: 'undo'})
        }
        if (event.keyCode === 13 && this.getRange()) {
          let container = this.getRange().commonAncestorContainer
          container.nodeType === 3 && (container = container.parentNode)
          if (['code', 'td', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf( container.tagName.toLowerCase() ) !== -1 ) {
            event.preventDefault()
            this.enterHandler()
          }
        }
      },

      enterHandler () {
        let range = this.getRange()
        if (!range) return
        let container = range.commonAncestorContainer
        container.nodeType === 3 && (container = container.parentNode)
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
        let range = this.getRange()
        if (!range) return
        let container = range.commonAncestorContainer
        container.nodeType === 3 && (container = container.parentNode)
  
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
          // this.pasteUpload(clipboardData.items)
        }
      },

      selectionChange () {
        let timer = null
        this.iframeDoc.addEventListener('selectionchange', () => {
          // throttle
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.checkElement()
            this.view === 'design' && this.updateStates()
          }, 200)
        }, false)
        if (!('onselectionchange' in document)) {
          let sel = this.getSelection()
          let focusOffset = -1
          setInterval(() => {
            if (sel && sel.rangeCount) {
              if (focusOffset !== sel.focusOffset) {
                focusOffset = sel.focusOffset
                this.view === 'design' && this.updateStates()
                this.checkElement()
              }
            } else {
              sel = this.getSelection()
            }
          }, 200)
        }
      },

      checkElement () {
        let range = this.getRange()
        if (!range) return
        let tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table']
        let container = range.commonAncestorContainer
        container.nodeType === 3 && (container = container.parentNode)
        let { pattern } = this.config.codeSnippet
        if (container.tagName.toLowerCase() === 'code') {
          let value = pattern.value.replace(/#type#/, '')
          value = (container.getAttribute(pattern.attr) || '').replace(value, '')
          this.setSelectValue({name: 'code', value: value || '--'})
          this.view === 'design' && this.setView('codesnippet')
        } else if (container.tagName.toLowerCase() === 'pre') {
          // 解决文字直接写到pre里
          if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            this.wrapTextNode(range, 'code')
          }
          this.view === 'design' && this.setView('codesnippet')
        } else {
          // tagname fontsize fontfamily
          let style = window.getComputedStyle(container)
          let unit = this.config.fontSize[0].match(/[a-z]+/ig)[0]
          let fontName = style['fontFamily'].replace(', sans-serif', '').replace(/"/g, '')
          let tagName = container.tagName.toLowerCase()

          if (range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            // 解决文字直接写到body里
            if(tagName === 'body'){
              this.wrapTextNode(range, 'p')
              tagName = 'p'
            }
          }

          if (this.config.toolbar.indexOf('element') !== -1) {
            while (this.iframeBody.contains(container) && tagName !== 'body' && tags.indexOf(tagName) === -1) {
              container = container.parentNode
              tagName = container.tagName.toLowerCase()
            }
            tags.indexOf(tagName) !== -1 && this.setSelectValue({name: 'element', value: tagName})
          }
          if (this.config.toolbar.indexOf('fontName') !== -1) {
            this.config.fontName.filter(item => item.val === fontName).length !== 0 && this.setSelectValue({name: 'fontName', value: fontName})
          }
          if (this.config.toolbar.indexOf('fontSize') !== -1) {
            if (unit === 'px') {
              this.config.fontSize.indexOf(style['fontSize']) !== -1 && this.setSelectValue({name: 'fontSize', value: style['fontSize']})
            }
            if (unit === 'rem') {
              let rootFontSize = parseInt(window.getComputedStyle(document.documentElement)['fontSize'])
              let remFontSize = (parseInt(style['fontSize']) / rootFontSize).toFixed(1) + 'rem'
              this.config.fontSize.indexOf(remFontSize) !== -1 && this.setSelectValue({name: 'fontSize', value: remFontSize})
            }
          }
          // this.view !== 'design' && this.setView('design')
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

      exec (name, value) {
        if (this[name]) {
          this[name](name, value)
        } else {
          let sel = this.getSelection()
          let range = this.getRange()
          if (!sel || !range) return
          if (document.queryCommandSupported('styleWithCss')) {
            this.iframeDoc.execCommand('styleWithCss', false, true)
          }
          this.iframeDoc.execCommand(name, false, value)
          this.iframeDoc.dispatchEvent(new window.Event('selectionchange'))
        }
        this.iframeBody.focus()
        this.setContent(this.iframeBody.innerHTML)
      },

      insertHTML (name, value) {
        let range = this.getRange()
        if (!range || !value) return
        range.deleteContents()
        let node = null
        let frag = this.iframeDoc.createDocumentFragment()
        let obj = this.iframeDoc.createElement('div')
        obj.innerHTML = value
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
      },

      formatBlock (name, value) {
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)) {
          let range = this.getRange()
          if (!range || range.collapsed) {
            window.alert(this.lang.ieMsg)
          } else {
            this.iframeDoc.execCommand('formatblock', false, '<' + value.toUpperCase() + '>')
          }
        } else {
          this.iframeDoc.execCommand('formatblock', false, value)
        }
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
        let range = this.getRange()
        if (!range) return
        let container = range.commonAncestorContainer
        container.nodeType === 3 && (container = container.parentNode)
        container.tagName.toLowerCase() === 'span' && (container = container.parentNode)
        this.formatContent(container, 'span', 'verticalAlign')
        container.normalize()
      },

      getSelection () {
        if (this.iframeWin && this.iframeWin.getSelection) {
          return this.iframeWin.getSelection()
        }
      },

      getRange () {
        let sel = this.getSelection()
        let range
        if (sel && sel.rangeCount !== 0) {
          range = sel.getRangeAt(0)
        }
        return range
      },

      getRangeContainer () {
        let range = this.getRange()
        if (!range) return
        let container = range.commonAncestorContainer
        if (container.nodeType === 3) {
          container = container.parentNode
        }
        return container
      },

      setRange (startContainer, startOffset, endContainer, endOffset) {
        let range = this.getRange()
        range.setStart(startContainer, startOffset)
        range.setEnd(endContainer, endOffset)
      },

      setRangeAtNode (node) {
        let range = this.getRange()
        range.selectNode(node)
      },

      setRangeAtNodeContent (node) {
        let range = this.getRange()
        range.selectNodeContents(node)
      },

      removeRange () {
        let sel = this.getSelection()
        sel && sel.removeAllRanges()
      },

      rangeValid () {
        let range = this.getRange()
        return (range && !range.collapsed)
      }

    }
  }
</script>