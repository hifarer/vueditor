
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
</style>

<template>
  <div class="ve-toolbar">
    <template v-for="item in list">
      <div v-if="item in btns" :class="['ve-icon', {'ve-active': status[item] === 'actived', 've-disabled': status[item] === 'disabled'}]" unselectable="on">
        <a href="javascript:;" :title="lang[item].title" @click.stop.prevent="clickHandler($event, item)">
          <i :class="[btns[item].className]"></i>
        </a>
      </div>
      <div v-if="item == 'divider' || item == '|'" class="ve-divider"></div>
      <component v-if="item.indexOf('ve-') !== -1"
        :view="view" 
        :content="content" 
        :fullscreen="fullscreen" 
        :activeComponent="activeComponent"
        :is="item">
      </component>
    </template>
  </div>
</template>

<script>
  
  import injectMixin from '../mixins/inject'
  import toolbar from '../config/toolbar'

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
      return {
        lang: window.__VUEDITOR_LANGUAGE__
      }
    },
    props: {
      icons: Array,
      view: String,
      content: String,
      fullscreen: Boolean,
      activeComponent: String
    },
    mixins: [injectMixin],
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
      status () {
        let status = {}
        this.icons.forEach( name => {
          if (name !== 'divider' && name !== '|') {
            status[name] = 'default' // default disabled actived
          }
        })
        return status
      },
      list () {
        let arr = []
        for (let i = 0, item = ''; i < this.icons.length; i++) {
          item = this.icons[i]
          if (item in this.btns || item == 'divider' || item == '|') {
            arr.push(item)
          } else if (['undo', 'redo'].indexOf(item) !== -1 && arr.indexOf('ve-undoredo') === -1) {
            arr.push('ve-undoredo')
          } else if (['foreColor', 'backColor'].indexOf(item) !== -1 && arr.indexOf('ve-color') === -1) {
            arr.push('ve-color')
          } else if (['link', 'unLink'].indexOf(item) !== -1 && arr.indexOf('ve-link') === -1) {
            arr.push('ve-link')
          } else {
            arr.push('ve-' + item.toLowerCase())
          }
        }
        return arr
      }
    },
    watch: {
      'view': function (val) {
        let status = {}
        let exArr = ['sourceCode', 'markdown', 'fullscreen', 'divider', '|']
        this.icons.forEach(item => {
          if (exArr.indexOf(item) === -1) {
            status[item] = val === 'design' ? 'default' : 'disabled'
          }
        })
        if (val === 'codeSnippet' && status.codeSnippet !== undefined) {
          status.codeSnippet = 'default'
        }
        this.setButtonStatus(status)
      }
    },
    beforeCreate () {
      this.btns = toolbar
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
        status[name] = this.status[name] === 'actived' ? 'default' : 'actived'
        this.setButtonStatus(status)
      }
    }
  }
</script>