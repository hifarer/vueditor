
<template>
  <div class="ve-design" v-show="view === 'design' || view === 'codesnippet'">
    <iframe src="about:blank" frameborder="0" @load="init"></iframe>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { getLang } from '../config/lang.js'
  import { getConfig } from '../config/'

  export default {
    data () {
      return {
        iframeWin: null,
        iframeDoc: null,
        iframeBody: null,
        timer: null,
        inited: false,
        cache: '',
        lang: getLang('design'),
        config: getConfig()
      }
    },

    computed: mapState({
      view: 'view',
      content: 'content',
      command: 'command',
      states: 'toolbar'
    }),

    watch: {
      'view': function (val) {
        if (val !== 'design') {
          clearTimeout(this.timer)
          this.updateContent(this.iframeBody.innerHTML)
        }
      },
      'content': function (val) {
        if (this.inited) {
          this.iframeBody.innerHTML !== val && (this.iframeBody.innerHTML = val)
          this.view === 'design' && this.updateStates()
        } else {
          this.cache = val
        }
      },
      'command': function (data) {
        this.exec(data.name, data.value)
      }
    },

    methods: Object.assign({}, mapActions([
      'updateContent',
      'updateButtonStates',
      'updatePopupDisplay',
      'callMethod',
      'switchView'
    ]), {
      init (event) {
        this.iframeWin = event.target.contentWindow
        this.iframeDoc = this.iframeWin.document
        this.iframeBody = this.iframeWin.document.body
        this.inited = true
        if (this.cache) {
          this.iframeBody.innerHTML !== this.cache && (this.iframeBody.innerHTML = this.cache)
          this.cache = ''
        }
        this.iframeDoc.designMode = 'on'
        this.iframeBody.spellcheck = this.config.spellcheck
        this.iframeBody.style.cssText = 'overflow-x: hidden;'
        this.iframeDoc.head.insertAdjacentHTML('beforeEnd', '<style>pre {margin: 0; padding: 0.5rem; background: #f5f2f0;}</style>')
        this.addEvent()
      },

      // init, selection change
      updateStates () {
        let json = {}
        for (let name in this.states) {
          if (['redo', 'undo', 'fullscreen'].indexOf(name) === -1) {
            if (this.iframeDoc.queryCommandSupported(name)) {
              json[name] = this.iframeDoc.queryCommandState(name) ? 'actived' : 'default'
            }
          }
        }
        this.updateButtonStates(json)
      },

      addEvent () {
        let timer = null
        this.iframeDoc.addEventListener('click', () => {
          // throttle
          clearTimeout(timer)
          timer = setTimeout(() => {
            this.view === 'design' && this.updatePopupDisplay()
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
          event.keyCode === 89 && this.callMethod({name: 'redo'})
          event.keyCode === 90 && this.callMethod({name: 'undo'})
        }
        if (event.keyCode === 13) {
          event.preventDefault()
          let range = this.getRange()
          if (!range) return
          let container = range.commonAncestorContainer
          container.nodeType === 3 && (container = container.parentNode)
          let excludeTags = ['code', 'td']
          let includeTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
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
            if (range.collapsed) {
              range.setEndAfter(child)
            } else {
              range.setStart(range.startContainer, range.startOffset)
              range.setEndAfter(child)
            }
            // 如果后面没有文本内容了，生成新的p，如果有截断当前的元素
            if (range.toString() !== '') {
              if (child.nextElementSibling !== null) {
                child.parentNode.insertBefore(range.extractContents(), child.nextElementSibling)
              } else {
                child.parentNode.appendChild(range.extractContents())
              }
              child.innerHTML === '' && (child.innerHTML = '<br>')
            } else {
              child.insertAdjacentHTML('afterend', '<p><br></p>')
            }
            range.setStart(child.nextElementSibling, 0)
          }
          range.collapse(true)
        }
      },

      keyupHandler (event) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.updateContent(this.iframeBody.innerHTML)
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

        if (this.config.pasteUpload && clipboardData.items) {
          this.pasteUpload(clipboardData.items)
        }
      },

      pasteUpload (arr) {
        let self = this
        Array.prototype.forEach.call(arr, item => {
          if (item.getAsFile() && item.kind === 'file' && item.type.match(/^image\//i)) {
            let reader = new window.FileReader()
            reader.readAsDataURL(item.getAsFile())
            reader.onload = function (e) {
              let base64Str = e.target.result.replace('+', '%2B')
              let xhr = new window.XMLHttpRequest()
              xhr.open('POST', self.config.uploadUrl)
              xhr.send({ imageData: base64Str })
              xhr.onload = function () {
                self.insertHTML('', `<img src="${xhr.responseText}">`)
              }
            }
          }
        })
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
        let tags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        let container = range.commonAncestorContainer
        container.nodeType === 3 && (container = container.parentNode)
        let { pattern } = this.config.code
        if (container.tagName.toLowerCase() === 'code') {
          let value = pattern.value.replace(/#type#/, '')
          value = container.getAttribute(pattern.attr).replace(value, '')
          this.$store.dispatch('updateSelectValue', {name: 'code', value: value})
          this.view === 'design' && this.switchView('codesnippet')
        } else {
          // tagname fontsize fontfamily
          let style = window.getComputedStyle(container)
          let unit = this.config.fontSize[0].match(/[a-z]+/ig)[0]
          let fontName = style['fontFamily'].replace(', sans-serif', '').replace(/"/g, '')
          let tagName = container.tagName.toLowerCase()

          while (this.iframeBody.contains(container) && tagName !== 'body' && tags.indexOf(tagName) === -1) {
            container = container.parentNode
            tagName = container.tagName.toLowerCase()
          }
          // 解决文字直接写到body里
          if (tagName === 'body' && range.startContainer === range.endContainer && range.startContainer.nodeType === 3) {
            let offset = range.startOffset
            let obj = this.iframeDoc.createElement('p')
            obj.innerHTML = range.startContainer.nodeValue
            range.startContainer.parentNode.replaceChild(obj, range.startContainer)
            range.setStart(obj.childNodes[0], offset)
            range.collapse(true)
            tagName = 'p'
          }

          if (this.config.toolbar.indexOf('element') !== -1 && tags.indexOf(tagName) !== -1) {
            this.$store.dispatch('updateSelectValue', {name: 'element', value: tagName})
          }
          if (this.config.toolbar.indexOf('fontName') !== -1) {
            this.config.fontName.filter(item => item.val === fontName).length !== 0 && this.$store.dispatch('updateSelectValue', {name: 'fontName', value: fontName})
          }
          if (this.config.toolbar.indexOf('fontSize') !== -1) {
            if (unit === 'px') {
              this.config.fontSize.indexOf(style['fontSize']) !== -1 && this.$store.dispatch('updateSelectValue', {name: 'fontSize', value: style['fontSize']})
            }
            if (unit === 'rem') {
              let rootFontSize = parseInt(window.getComputedStyle(document.documentElement)['fontSize'])
              let remFontSize = (parseInt(style['fontSize']) / rootFontSize).toFixed(1) + 'rem'
              this.config.fontSize.indexOf(remFontSize) !== -1 && this.$store.dispatch('updateSelectValue', {name: 'fontSize', value: remFontSize})
            }
          }
          this.view !== 'design' && this.switchView('design')
        }
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
        this.updateContent(this.iframeBody.innerHTML)
      },

      insertHTML (name, value) {
        let sel = this.getSelection()
        let range = this.getRange()
        if (!sel || !range || !value) return
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
          range.setStart(node.childNodes[0], 0)
        } else {
          range.setStartAfter(node)
        }
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
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

      insertCodeBlock (name, value) {
        let range = this.getRange()
        if (!range) return
        let { pattern } = this.config.code
        let tempDiv = document.createElement('div')
        tempDiv.innerHTML = value
        let attrValue = tempDiv.getElementsByTagName('code')[0].getAttribute(pattern.attr)
        let container = range.commonAncestorContainer
        container.nodeType === 3 && (container = container.parentNode)
        if (container.tagName.toLowerCase() === 'code') {
          container.setAttribute(pattern.attr, attrValue)
        } else {
          this.insertHTML(name, value)
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
        if (this.iframeWin.getSelection) {
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

      setRange (range) {
        let sel = this.getSelection()
        if (sel) {
          sel.removeAllRanges()
          sel.addRange(range)
        }
      },

      removeRange () {
        let sel = this.getSelection()
        sel && sel.removeAllRanges()
      },

      rangeValid () {
        let range = this.getRange()
        return (range && !range.collapsed)
      },

      unlink () {
        let range = this.getRange()
        let container = range.commonAncestorContainer
        if (container.nodeType === 3) {
          container = container.parentNode
        }
        if (container.tagName === 'A') {
          let newRange = document.createRange()
          newRange.selectNode(container)
          this.setRange(newRange)
          this.exec('Unlink', null)
          this.removeRange(newRange)
        } else {
          this.exec('Unlink', null)
        }
      }

    })
  }
</script>