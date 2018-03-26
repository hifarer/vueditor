
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    display: table-caption;
    // display: table;
    width: 100%;
    font-size: 0;
    // letter-spacing: -4px;
    background: #fff;
    border: 1px solid #ddd;
    border-bottom: none;
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
      padding: 10px 12px;
      color: rgba(0, 0, 0, 0.6);
    }
    div.ve-icon:not(.ve-disabled):hover {
      background: #eee;
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
    <template v-for="item in config">

      <div v-if="item in btns" @click.stop.prevent="btnHandler($event, item)" 
        :title="lang[item].title"
        :class="['ve-icon', {'ve-active': toolbar[item] === 'actived', 've-disabled': toolbar[item] === 'disabled'}]">
        <i :class="[btns[item].className]"></i>
      </div>

      <div class="ve-divider" v-if="item == 'divider' || item == '|'"></div>

      <component v-if="componentList.indexOf(item) !== -1" :is="getComponentName(item)"></component>

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
  
  import vuexMixin from '../mixins/vuex'
  import { getLang } from '../config/lang.js'
  import { getConfig } from '../config/index.js'

  import fontSize from './fontsize.vue'
  import fontName from './fontname.vue'
  import element from './element.vue'
  import color from './color.vue'
  import link from './link.vue'
  import table from './table.vue'
  import undoredo from './undoredo.vue'
  import codeSnippet from './codesnippet.vue'
  
  export default {
    name: 'toolbar',
    data () {
      return {
        lang: getLang(),
        config: getConfig('toolbar')
      }
    },
    mixins: [vuexMixin],
    components: {
      've-fontsize': fontSize,
      've-fontname': fontName,
      've-element': element,
      've-color': color,
      've-link': link,
      've-table': table,
      've-undoredo': undoredo,
      've-codesnippet': codeSnippet,
    },
    computed: {
      view () {
        return this.mstates.view
      },
      toolbar () {
        return this.mstates.toolbar
      },
      fullscreen () {
        return this.mstates.fullscreen
      },
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
        for (let i = 0, item = ''; i < this.config.length; i++) {
          item = this.config[i]
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
        let states = {}
        let exArr = ['sourceCode', 'markdown', 'fullscreen', 'divider', '|']
        this.config.forEach(item => {
          if (exArr.indexOf(item) === -1) {
            states[item] = val === 'design' ? 'default' : 'disabled'
          }
        })
        if (val === 'codesnippet') {
          states.codeSnippet !== undefined && (states.codeSnippet = 'default')
        }
        this.setButtonStates(states)
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
    methods: {
      setButtonStates (data) {
        this.$store.dispatch(this.mpath + 'setButtonStates', data)
      },
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      setFullScreen (bool) {
        this.$store.dispatch(this.mpath + 'setFullScreen', bool)
      },
      setView (data) {
        this.$store.dispatch(this.mpath + 'setView', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      action (name) {
        switch (name) {
          case 'picture':
            this.setActiveComponent(name)
            break
          case 'fullscreen':
            this.setFullScreen(!this.fullscreen)
            break
          case 'sourceCode':
          case 'markdown':
            this.setView(this.view === name ? 'design' : name)
        }
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
      },
      btnHandler (event, name) {
        if (this.toolbar[name] === 'disabled') return
        if (this.btns[name].native) {
          this.execCommand({ name: name, value: null })
          this.setActiveComponent()
        } else {
          this.action(name)
        }
        let states = {}
        this.toolbar[name] === 'actived' ? states[name] = 'default' : states[name] = 'actived'
        this.setButtonStates(states)
      }
    }
  }
</script>