
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    width: 100%;
    font-size: 0;
    // letter-spacing: -4px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    user-select: none;
    & > div {
      position: relative;
      display: inline-block;
      vertical-align: top;
    }
    div.ve-icon,
    div.ve-select {
      cursor: pointer;
      position: relative;
      display: inline-block;
      // padding: 10px 12px;
      color: rgba(0, 0, 0, 0.6);
    }
    div.ve-icon:not(.ve-disabled):hover {
      background: #eee;
    }
    div.ve-icon a {
      display: inline-block;
      padding: 10px 12px;
    }
    div.ve-active {
      background: #eee;
      color: #000;
    }
    div.ve-disabled {
      background: transparent;
      color: rgba(0,0,0,.6);
    }
    div.ve-divider {
      display: inline-block;
      width: 0;
      height: 26px;
      margin: 5px;
      padding: 0;
      border-right: 1px solid #ddd;
      vertical-align: top;
    }
  }
  .lang-select {
    width: 80px;
  }
</style>

<template>
  <div class="ve-toolbar" ref="toolbar">
    <template v-for="item in toolbarIcons">

      <div 
        unselectable="on"
        v-if="item in btns"
        :class="['ve-icon', {'ve-active': status[item] === 'actived', 've-disabled': status[item] === 'disabled'}]">
        <a href="javascript:;" :title="lang[item].title" @click.stop.prevent="clickHandler($event, item)">
          <i :class="[btns[item].className]"></i>
        </a>
      </div>
      
      <div class="ve-divider" v-if="item == 'divider' || item == '|'"></div>

      <component 
        :view="view" 
        :content="content" 
        :fullscreen="fullscreen" 
        :activeComponent="activeComponent"
        v-if="componentList.indexOf(item) !== -1" :is="getComponentName(item)">
      </component>

    </template>

    <!-- <ve-fontsize></ve-fontsize>
    <ve-fontname></ve-fontname>
    <ve-element></ve-element>
    <ve-codesnippet></ve-codesnippet>
    <ve-color></ve-color>
    <ve-link></ve-link>
    <ve-table></ve-table>
    <ve-undoredo></ve-undoredo> -->

  </div>
</template>

<script>
  
  import hubMixin from '../mixins/hub'

  import fontSize from './fontsize.vue'
  import fontName from './fontname.vue'
  import element from './element.vue'
  import color from './color.vue'
  import link from './link.vue'
  import table from './table.vue'
  import undoredo from './undoredo.vue'
  import codeSnippet from './codesnippet.vue'
  import emoji from './emoji.vue'
  
  export default {
    name: 'toolbar',
    data () {
      let status = {}
      // 每一个按钮都有一个状态
      // 每一个下拉菜单、对话框都有一个显示状态
      this.toolbarIcons.forEach( name => {
        if (name !== 'divider' && name !== '|') {
          status[name] = 'default' // default disabled actived
        }
      })
      return {
        status,
        lang: window.__VUEDITOR_LANGUAGE__
      }
    },
    props: {
      toolbarIcons: Array,
      view: String,
      content: String,
      fullscreen: Boolean,
      activeComponent: String
    },
    mixins: [hubMixin],
    components: {
      've-fontsize': fontSize,
      've-fontname': fontName,
      've-element': element,
      've-color': color,
      've-link': link,
      've-table': table,
      've-undoredo': undoredo,
      've-codesnippet': codeSnippet,
      've-emoji': emoji
    },
    computed: {
      componentList () {
        // 'undo', 'redo'
        // 'foreColor', 'backColor'
        // 'link', 'unLink'
        // 'table'
        // 'fontSize'
        // 'fontName'
        // 'element'
        // 'codeSnippet'
        let arr = []
        for (let i = 0, item = ''; i < this.toolbarIcons.length; i++) {
          item = this.toolbarIcons[i]
          if (item in this.btns || item == 'divider' || item == '|') {
            continue
          }
          if (arr.indexOf(item) === -1) {
            arr.push(item)
          }
        }
        (arr.indexOf('undo') !== -1 && arr.indexOf('redo') !== -1) && arr.splice(arr.indexOf('redo'), 1);
        (arr.indexOf('foreColor') !== -1 && arr.indexOf('backColor') !== -1) && arr.splice(arr.indexOf('backColor'), 1);
        (arr.indexOf('link') !== -1 && arr.indexOf('unLink') !== -1) && arr.splice(arr.indexOf('unLink'), 1);
        return arr
      }
    },
    watch: {
      'view': function (val) {
        let status = {}
        let exArr = ['sourceCode', 'markdown', 'fullscreen', 'divider', '|']
        this.toolbarIcons.forEach(item => {
          if (exArr.indexOf(item) === -1) {
            status[item] = val === 'design' ? 'default' : 'disabled'
          }
        })
        if (val === 'codeSnippet') {
          status.codeSnippet !== undefined && (status.codeSnippet = 'default')
        }
        this.setButtonStatus(status)
      }
    },
    beforeCreate () {
      this.btns = {

        removeFormat: {className: 'icon-eraser', action: 'removeFormat', native: true},

        bold: {className: 'icon-bold', action: 'bold', native: true},
        italic: {className: 'icon-italic', action: 'italic', native: true},
        underline: {className: 'icon-underline', action: 'underline', native: true},
        strikeThrough: {className: 'icon-strikethrough', action: 'strikeThrough', native: true},

        superscript: {className: 'icon-superscript', action: 'superscript', native: true},
        subscript: {className: 'icon-subscript', action: 'subscript', native: true},
        indent: {className: 'icon-indent', action: 'indent', native: true},
        outdent: {className: 'icon-outdent', action: 'outdent', native: true},

        justifyLeft: {className: 'icon-align-left', action: 'justifyLeft', native: true},
        justifyCenter: {className: 'icon-align-center', action: 'justifyCenter', native: true},
        justifyRight: {className: 'icon-align-right', action: 'justifyRight', native: true},
        justifyFull: {className: 'icon-align-justify', action: 'justifyFull', native: true},

        insertOrderedList: {className: 'icon-list-ol', action: 'insertOrderedList', native: true},
        insertUnorderedList: {className: 'icon-list-ul', action: 'insertUnorderedList', native: true},

        sourceCode: {className: 'icon-code', action: 'sourceCode'},
        markdown: {className: 'icon-markdown', action: 'markdown'},
        fullscreen: {className: 'icon-fullscreen', action: 'fullscreen'},
        picture: {className: 'icon-file-image-o', action: 'picture'}
      }
    },
    created () {
      this.eventHub.$on('set-button-status', this.setButtonStatus)
    },
    methods: {
      setButtonStatus (data) {
        for (let name in data) {
          if (typeof this.status[name] !== 'undefined') {
            this.status[name] = data[name]
          }
        }
      },
      setActiveComponent (data) {
        this.eventHub.$emit('set-active-component', data)
      },
      action (name) {
        switch (name) {
          case 'picture':
            this.setActiveComponent(name)
            break
          case 'fullscreen':
            this.eventHub.$emit('set-fullscreen', !this.fullscreen)
            break
          case 'sourceCode':
          case 'markdown':
            this.eventHub.$emit('set-view', this.view === name ? 'design' : name)
            this.setActiveComponent()
        }
      },
      clickHandler (event, name) {
        if (this.status[name] === 'disabled') return
        if (this.btns[name].native) {
          this.eventHub.$emit('exec-command', { name: name, value: null })
          this.setActiveComponent()
        } else {
          this.action(name)
        }
        let status = {}
        this.status[name] === 'actived' ? status[name] = 'default' : status[name] = 'actived'
        this.setButtonStatus(status)
      },
      getComponentName (name) {
        switch (name) {
          case 'undo':
          case 'redo':
            return 've-undoredo'
          case 'foreColor':
          case 'backColor':
            return 've-color'
          case 'link':
          case 'unLink':
            return 've-link'
          default:
            return 've-' + name.toLowerCase()
        }
      }
    }
  }
</script>