
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    display: table;
    width: 100%;
    font-size: 0;
    letter-spacing: -4px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    user-select: none;
    div {
      cursor: pointer;
      position: relative;
      display: inline-block;
      padding: 10px 12px;
      color: rgba(0, 0, 0, 0.6);
    }
    div.ve-divider {
      width: 0;
      height: 26px;
      margin: 5px;
      padding: 0;
      border-right: 1px solid #ddd;
      vertical-align: top;
    }
    div.ve-active {
      background: #eee;
      color: #000;
    }
    div:hover {
      background: #eee;
    }
    div.ve-disabled {
      background: transparent;
      color: rgba(0,0,0,.6);
    }
  }
  .font-select {
    width: 100px;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .lang-select {
    width: 80px;
  }
</style>

<template>
  <div class="ve-toolbar" ref="toolbar">
    <template v-for="item in config">
      <div v-if="item in btns" 
        @click.stop.prevent="btnHandler($event, item)" 
        :title="lang[item].title"
        :class="{'ve-active': toolbar[item] === 'actived', 've-disabled': toolbar[item] === 'disabled'}" 
        unselectable="on">
        <i :class="[btns[item].className]"></i>
      </div>
      <div v-if="item in selects" 
        @click.stop.prevent="selectHandler($event, item)" 
        :class="[{'ve-disabled': toolbar[item] == 'disabled'}, selects[item].className, 've-select']" 
        unselectable="on">
        <span>{{select[item]}}</span><i :class="{'ve-triangle-down': item !== activeComponent, 've-triangle-up': item === activeComponent}"></i>
      </div>
      <div class="ve-divider" v-if="item == 'divider' || item == '|'"></div>
    </template>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import { getLang } from '../config/lang.js'
  import { getConfig } from '../config/index.js'
  import { getToolbar } from '../config/toolbar.js'
  
  export default {
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
      triggerEvent (data) {
        this.$store.dispatch(this.mpath + 'triggerEvent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      setRect (data) {
        this.$store.dispatch(this.mpath + 'setRect', data)
      },
      btnHandler (event, name) {
        if (this.toolbar[name].status === 'disabled') return
        let btn = this.btns[name]
        if (btn.action) {
          if (btn.native) {
            this.execCommand({ name: name, value: null })
          } else {
            this.triggerEvent({ name: name, params: null })
          }
        }
        this.updateStates(name)
        this.updatePopup(name, event.currentTarget)
      },
      selectHandler (event, name) {
        if (this.toolbar[name].status === 'disabled') return
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