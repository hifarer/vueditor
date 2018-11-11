
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    width: 100%;
    font-size: 0;
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
    <template v-for="(val, name) in componentData">
      <!-- divider -->
      <div v-if="name == 'divider' || name == '|'" :key="name" class="ve-divider"></div>
      <!-- button with extra html -->
      <component v-else-if="name.indexOf('ve-') !== -1 && name === 've-undoredo'" 
        :key="name" 
        :is="name"
        :view="view"
        :content="content">
      </component>
      <component v-else-if="name.indexOf('ve-') !== -1 && name !== 've-undoredo'"
        :key="name"
        :is="name"
        :view="view"
        :activeComponent="activeComponent">
      </component>
      <!-- just button -->
      <div v-else :key="name" :class="['ve-icon', {'ve-active': status[name] === 'actived', 've-disabled': status[name] === 'disabled'}]" unselectable="on">
        <a href="javascript:;" :title="lang[name].title" @click.stop.prevent="clickHandler($event, name)">
          <i :class="[toolbarConf[name].className]"></i>
        </a>
      </div>
    </template>
  </div>
</template>

<script>
  
  import toolbarConf from '../config/toolbar'

  import FontSize from './fontsize.vue'
  import FontName from './fontname.vue'
  import Element from './element.vue'
  import Color from './color.vue'
  import Link from './link.vue'
  import Table from './table.vue'
  import UndoRedo from './undoredo.vue'
  import CodeSnippet from './codesnippet.vue'
  import Emoji from './emoji.vue'

  export default {
    name: 'toolbar',
    props: {
      btns: Array,
      view: String,
      content: String,
      fullscreen: Boolean,
      activeComponent: String
    },
    data () {
      this.toolbarConf = toolbarConf
      return {
        lang: window.__VUEDITOR_LANGUAGE__,
        status: this.getInitialStatus(),
        componentData: this.getComponentData()
      }
    },
    inject: ['eventHub'],
    components: {
      've-fontsize': FontSize,
      've-fontname': FontName,
      've-element': Element,
      've-color': Color,
      've-link': Link,
      've-table': Table,
      've-undoredo': UndoRedo,
      've-codesnippet': CodeSnippet,
      've-emoji': Emoji
    },
    watch: {
      'view': function (val) {
        let status = {}
        let excludeArr = ['sourceCode', 'markdown', 'fullscreen', 'divider', '|']
        this.btns.forEach(item => {
          if (excludeArr.indexOf(item) === -1) {
            // status should be disabled when view is codeSnippet or sourceCode 
            status[item] = val !== 'design' ? 'disabled' : 'default'
          }
        })
        if (val === 'codeSnippet' && status.codeSnippet !== undefined) {
          status.codeSnippet = 'default'
        }
        this.setButtonStatus(status)
      }
    },
    methods: {
      getInitialStatus () {
        let status = {}
        for (let i = 0, item = ''; i < this.btns.length; i++) {
          item = this.btns[i]
          // divider has not status
          if (item !== 'divider' && item !== '|') {
            status[item] = 'default' // default disabled actived
          }
        }
        return status
      },
      getComponentData () {
        let componentData = {}
        for (let i = 0, item = ''; i < this.btns.length; i++) {
          item = this.btns[i]
          // get actual component list from button list
          if (item in toolbarConf || item == 'divider' || item == '|') {
            componentData[item] = null
          } else if (['undo', 'redo'].indexOf(item) !== -1) {
            componentData['ve-undoredo'] = null
          } else if (['foreColor', 'backColor'].indexOf(item) !== -1) {
            componentData['ve-color'] = null
          } else if (['link', 'unLink'].indexOf(item) !== -1) {
            componentData['ve-link'] = null
          } else {
            componentData['ve-' + item.toLowerCase()] = null
          }
        }
        return componentData
      },
      setButtonStatus (data) {
        for (let name in data) {
          if (typeof this.status[name] !== 'undefined') {
            this.status[name] = data[name]
          }
        }
      },
      doAction (name) {
        switch (name) {
          case 'picture':
            this.eventHub.$emit('set-active-component', name)
            break
          case 'fullscreen':
            this.eventHub.$emit('set-fullscreen', !this.fullscreen)
            break
          case 'sourceCode':
          case 'markdown':
            this.eventHub.$emit('set-view', this.view === name ? 'design' : name)
            this.eventHub.$emit('set-active-component')
        }
      },
      clickHandler (event, name) {
        if (this.status[name] === 'disabled') return
        if (this.toolbarConf[name].native) {
          this.eventHub.$emit('exec-command', { name: name, value: null })
          this.eventHub.$emit('set-active-component')
        } else {
          this.doAction(name)
        }
        this.setButtonStatus({
          [name]: this.status[name] === 'actived' ? 'default' : 'actived'
        })
      }
    },
    created () {
      this.eventHub.$on('set-button-status', this.setButtonStatus)
    }
  }
</script>