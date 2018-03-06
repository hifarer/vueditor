
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
  .code-select {
    width: 80px;
  }
</style>

<template>
  <div class="ve-toolbar" ref="toolbar">
    <template v-for="item in config">
      <div v-if="item in btns" 
        @click.stop.prevent="btnHandler($event, item)" 
        :title="lang[item].title"
        :class="{'ve-active': toolbar[item].status == 'actived', 've-disabled': toolbar[item].status == 'disabled'}" 
        unselectable="on">
        <i :class="[btns[item].className]"></i>
      </div>
      <div v-if="item in selects" 
        @click.stop.prevent="selectHandler($event, item)" 
        :class="[{'ve-disabled': toolbar[item].status == 'disabled'}, selects[item].className, 've-select']" 
        unselectable="on">
        <span>{{toolbar[item].value}}</span><i :class="{'ve-triangle-down': !toolbar[item].display, 've-triangle-up': toolbar[item].display}"></i>
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
      toolbar () {
        return this.mstates.toolbar
      },
      view () {
        return this.mstates.view
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
          states.code !== undefined && (states.code = 'default')
        }
        this.updateButtonStates(states)
      }
    },
    methods: {
      updateButtonStates (data) {
        this.$store.dispatch(this.mpath + 'updateButtonStates', data)
      },
      updatePopupDisplay (data) {
        this.$store.dispatch(this.mpath + 'updatePopupDisplay', data)
      },
      callMethod (data) {
        this.$store.dispatch(this.mpath + 'callMethod', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      updateRect (data) {
        this.$store.dispatch(this.mpath + 'updateRect', data)
      },
      btnHandler (event, name) {
        if (this.toolbar[name].status === 'disabled') return
        let btn = this.btns[name]
        if (btn.action) {
          if (btn.native) {
            this.execCommand({ name: name, value: null })
          } else {
            this.callMethod({ name: name, params: null })
          }
        }
        this.updateStates(name)
        this.showPopup(name, event.currentTarget)
      },
      selectHandler (event, name) {
        if (this.toolbar[name].status === 'disabled') return
        this.updateStates(name)
        this.showPopup(name, event.currentTarget)
      },
      showPopup (name, obj) {
        this.updatePopupDisplay(this.toolbar[name].showPopup !== undefined 
        ? {name, display: !this.toolbar[name].showPopup} 
        : {})
        if (!this.btns[name].action) {
          this.updateRect({
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
            if (!this.btns[item].action && this.toolbar[item] && this.toolbar[item].status === 'actived') {
              states[item] = 'default'
            }
          }
        }
        if (['sourceCode', 'markdown'].indexOf(name) !== -1) {
          this.toolbar['sourceCode'] && (states['sourceCode'] = 'default')
          this.toolbar['markdown'] && (states['markdown'] = 'default')
        }
        this.toolbar[name].status === 'actived' ? states[name] = 'default' : states[name] = 'actived'
        this.updateButtonStates(states)
      }
    }
  }
</script>