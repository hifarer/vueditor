
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    // display: table;
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
      padding: 10px 12px;
      color: rgba(0, 0, 0, 0.6);
    }
    div.ve-icon:hover {
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
    </template>

    <ve-fontsize></ve-fontsize>
    <ve-fontname></ve-fontname>
    <ve-element></ve-element>
    <ve-codesnippet></ve-codesnippet>
    <ve-color></ve-color>
    <ve-link></ve-link>
    <ve-table></ve-table>
    <ve-undoredo></ve-undoredo>

  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import { getLang } from '../config/lang.js'
  import { getConfig } from '../config/index.js'
  import { getToolbar } from '../config/toolbar.js'

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
      let {btns, selects} = getToolbar()
      return {
        btns,
        selects,
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
      select () {
        return this.mstates.select
      },
      fullscreen () {
        return this.mstates.fullscreen
      },
      activeComponent () {
        return this.mstates.activeComponent
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
      triggerEvent (data) {
        this.$store.dispatch(this.mpath + 'triggerEvent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      setRect (data) {
        this.$store.dispatch(this.mpath + 'setRect', data)
      },
      action (name) {
        switch (name) {
          case 'picture':
            this.setActiveComponent(name)
            break
          case 'fullscreen':
            this.setFullScreen(!this.fullscreen)
            break
        }
      },
      btnHandler (event, name) {
        if (this.toolbar[name].status === 'disabled') return
        let btn = this.btns[name]
        if (btn.native) {
          this.execCommand({ name: name, value: null })
        } else {
          this.action(name)
          // this.setActiveComponent(name)
          // this.triggerEvent({ name: name, params: null })
        }
        this.updateStates(name)
        this.updatePopup(name, event.currentTarget)
      },
      updatePopup (name, obj) {
        this.setActiveComponent(name)
        if ((this.btns[name] && !this.btns[name].action) || this.selects[name]) {
          this.setRect({
            left: obj.offsetLeft,
            top: obj.offsetTop,
            width: obj.offsetWidth,
            height: obj.offsetHeight + parseInt(window.getComputedStyle(obj).marginBottom)
          })
        }
      },
      updateStates (name) {
        let states = {}
        // update no action btn status, no action means click on it will toggle a popover menu;
        if (this.view === 'design') {
          for (let item in this.btns) {
            if (!this.btns[item].action && this.toolbar[item] === 'actived') {
              states[item] = 'default'
            }
          }
        }
        if (['sourceCode', 'markdown'].indexOf(name) !== -1) {
          this.toolbar['sourceCode'] && (states['sourceCode'] = 'default')
          this.toolbar['markdown'] && (states['markdown'] = 'default')
        }
        this.toolbar[name] === 'actived' ? states[name] = 'default' : states[name] = 'actived'
        this.setButtonStates(states)
      }
    }
  }
</script>