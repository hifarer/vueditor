
<style module lang="less" rel="stylesheet/less">
  :global(.ve-markdown) {
    position: relative;
  }
  .editor {
    width: 50%;
    height: 100%;
    padding: 8px;
    position: absolute;
    outline: none;
    resize: none;
    border: none;
    box-sizing: border-box;
    overflow-y: auto;
    font-size: 14px;
    border-right: 1px solid #ddd;
  }
  .iframe {
    width: 50%;
    height: 100%;
    position: absolute;
    right: 0;
  }
</style>

<template>
  <div class="ve-markdown" v-show="currentView == 'markdown'">
    <textarea :class="$style.editor" @input="update" v-model="md" ref="editor"></textarea>
    <iframe src="about:blank" frameborder="0" :class="$style.iframe" @load="init"></iframe>
  </div>
</template>

<script>

  import marked from 'marked'

  export default {
    name: 'markdown',
    props: {
      view: String,
      content: String
    },
    data () {
      return {
        md: '',
        el: null,
        doc: null,
        top: 0,
        currentView: 'design'
      }
    },
    inject: ['eventHub'],
    watch: {
      'view': function (val) {
        if (val !== 'markdown' && this.currentView === 'markdown') {
          this.eventHub.$emit('set-content', this.doc.body.innerHTML)
        } else {
          this.md = this.content
          this.update()
        }
        this.currentView = val
      }
    },
    created () {
      this.eventHub.$on('markdown', () => {
        this.eventHub.$emit('set-view', this.view === 'markdown' ? 'design' : 'markdown')
        this.eventHub.$emit('set-active-component')
      })
    },
    methods: {
      init (event) {
        this.el = event.target
        this.doc = event.target.contentDocument
        this.addEvent()
      },
      update () {
        this.doc.body.innerHTML = marked(this.md.trim())
      },
      addEvent () {
        this.doc.addEventListener('scroll', this.scrollHandler.bind(this, 'iframe'), false)
        this.$refs.editor.addEventListener('scroll', this.scrollHandler.bind(this, 'editor'), false)
      },
      scrollHandler (type, event) {
        if (this.isJsAction) {
          this.isJsAction = false
          return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          let editor = this.$refs.editor
          let body = this.doc.body
          let nowLeft = editor.scrollTop
          let maxLeft = editor.scrollHeight - editor.offsetHeight
          let maxRight = body.scrollHeight - 1 - this.el.offsetHeight
          let nowRight = body.scrollTop
          if (type === 'editor') {
            body.scrollTop = (nowLeft / maxLeft) * maxRight
          } else {
            editor.scrollTop = (nowRight / maxRight) * maxLeft
          }
          // next call of this function is caused by js.
          this.isJsAction = true
        }, 100)
      }
    },
    created () {
      let renderer = new marked.Renderer()
      renderer.heading = function (text, level) {
        return `<h${level}>${text}</h${level}>`
      }
      renderer.paragraph = function (text) {
        let div = document.createElement('div')
        div.innerHTML = text
        if (div.children.length === 0) {
          return '<p>' + text + '</p>\n'
        }
        return text + '\n'
      }

      marked.setOptions({
        renderer: renderer,
        gfm: false
      })
      this.isJsAction = false
      this.timer = null
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    }
  }
</script>