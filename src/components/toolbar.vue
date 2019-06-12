
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

<template>
  <div class="ve-toolbar">
    <template v-for="name in finalBtns">
      <!-- divider -->
      <div v-if="name == 'divider' || name == '|'" :key="name" class="ve-divider"></div>
      <!-- button with extra html -->
      <component v-else-if="name.indexOf('ve-') !== -1" 
        :key="name"
        :is="name"
        :view="view"
        :content="content"
        :activeComponent="activeComponent">
      </component>
      <!-- just button -->
      <div v-else :key="name" :class="['ve-icon', {'ve-active': status[name] === 'active', 've-disable': status[name] === 'disable'}]" unselectable="on">
        <a href="javascript:;" :title="lang[name].title" @click.stop.prevent="clickHandler($event, name)">
          <i :class="toolbarConf[name].className"></i>
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
  import Picture from './picture.vue'

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
        lang: window.__VUEDITOR_LANGUAGE__
      }
    },
    computed: {
      finalBtns () {
        let list = []
        for (let i = 0, item = ''; i < this.btns.length; i++) {
          item = this.btns[i]
          if (toolbarConf.hasOwnProperty(item) || item == 'divider' || item == '|') {
            list.push(item)
          } else {
            list.push('ve-' + item.toLowerCase())
          }
        }
        return list
      },
      status () {
        let status = {}
        for (let i = 0, item = ''; i < this.btns.length; i++) {
          item = this.btns[i]
          // divider has not status
          if (toolbarConf.hasOwnProperty(item) && item !== 'divider' && item !== '|') {
            status[item] = 'default' // default disable active
          }
        }
        return status
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
      've-picture': Picture
    },
    watch: {
      'view': function (val) {
        let status = {}
        // 这些无论view是什么都是显示默认状态
        let excludeArr = ['fullscreen', 'divider', '|']
        this.btns.forEach(item => {
          if (excludeArr.indexOf(item) === -1) {
            // status should be disable when view is codeSnippet
            status[item] = val !== 'design' ? 'disable' : 'default'
          }
        })
        this.setButtonStatus(status)
      }
    },
    methods: {
      setButtonStatus (data) {
        for (let name in data) {
          if (typeof this.status[name] !== 'undefined') {
            this.status[name] = data[name]
          }
        }
      },
      doAction (name) {
        switch (name) {
          case 'fullscreen':
            this.eventHub.$emit('set-fullscreen', !this.fullscreen)
            break
        }
      },
      clickHandler (event, name) {
        if (this.status[name] === 'disable') return
        if (this.toolbarConf[name].native) {
          this.eventHub.$emit('exec-command', { name: name, value: null })
          this.eventHub.$emit('set-active-component')
        } else {
          this.doAction(name)
        }
        this.setButtonStatus({
          [name]: this.status[name] === 'active' ? 'default' : 'active'
        })
      }
    },
    created () {
      this.eventHub.$on('set-button-status', this.setButtonStatus)
    }
  }
</script>