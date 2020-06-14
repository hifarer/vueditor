
<template>
  <div class="ve-toolbar">
    <template v-for="name in toolbarList">
      <div 
        v-if="name == '|'"
        class="ve-divider"
        :key="name"
        >
      </div>
      <component 
        v-else-if="name.indexOf('ve-') !== -1"
        :is="name"
        :key="name"
        :view="view"
        :activeComponent="activeComponent"
      />
      <div 
        v-else
        unselectable="on"
        :key="name" 
        :class="['ve-icon', { 've-active': status[name] === 'active', 've-disable': status[name] === 'disable' }]" 
        >
        <a href="javascript:;" :title="lang[name].title" @click.prevent="clickHandler(name)">
          <i :class="toolbarConf[name]"></i>
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
  import code from './code.vue'
  import Image from './image.vue'
  import Fullscreen from './fullscreen.vue'

  export default {
    name: 'toolbar',
    props: {
      toolbarList: Array,
      view: String,
      activeComponent: String
    },
    inject: ['editor', 'eventHub'],
    data() {
      let status = {}
      let arr = this.toolbarList
      // 2.2版本先执行initState 再执行initInjections，所以这里不能从inject中读取config.toolbar
      for (let i = 0, item = ''; i < arr.length; i++) {
        item = arr[i]
        if (toolbarConf.hasOwnProperty(item)) {
          status[item] = 'default' // default disable active
        }
      }
      return {
        lang: window.__VUEDITOR_LANGUAGE__,
        status: status
      }
    },
    components: {
      've-fontsize': FontSize,
      've-fontname': FontName,
      've-element': Element,
      've-color': Color,
      've-link': Link,
      've-table': Table,
      've-undoredo': UndoRedo,
      've-code': code,
      've-image': Image,
      've-fullscreen': Fullscreen
    },
    watch: {
      'view': function (val) {
        let status = {}
        this.toolbarList.forEach(item => {
          if (item !== '|') {
            status[item] = val !== 'design' ? 'disable' : 'default'
          }
        })
        this.setButtonStatus(status)
      }
    },
    methods: {
      setButtonStatus(data) {
        for (let name in data) {
          if (typeof this.status[name] !== 'undefined') {
            this.status[name] = data[name]
          }
        }
      },
      clickHandler(name) {
        if (this.status[name] === 'disable') return
        this.editor.execCommand(name, null)
        this.eventHub.$emit('set-active-component')
        this.setButtonStatus({
          [name]: this.status[name] === 'active' ? 'default' : 'active'
        })
      }
    },
    created() {
      this.toolbarConf = toolbarConf
      this.eventHub.$on('set-button-status', this.setButtonStatus)
    }
  }
</script>

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
    div.ve-icon:not(.ve-disable):hover {
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
    div.ve-disable {
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
