
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    display: table;
    width: 100%;
    font-size: 0;
    letter-spacing: -4px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    user-select: none;
    a {
      position: relative;
      display: inline-block;
      padding: 10px 12px;
      color: rgba(0, 0, 0, 0.6);
    }
    a.ve-divider {
      width: 0;
      height: 26px;
      margin: 5px;
      padding: 0;
      border-right: 1px solid #ddd;
      vertical-align: top;
    }
    a.ve-active {
      background: #eee;
      color: #000;
    }
    a:not(.ve-disabled):hover {
      background: #eee;
      color: #000;
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
</style>

<template>
  <div class="ve-toolbar" ref="toolbar">
    <template v-for="item in config">
      <a href="javascript:;"  
        v-if="item in btns" 
        @click.stop="btnHandler($event, item)" 
        :title="lang[item].title"
        :class="{'ve-active': states[item].status == 'actived', 've-disabled': states[item].status == 'disabled'}" 
        unselectable="on">
        <i :class="[btns[item].className]"></i>
      </a>
      <a href="javascript:;" 
        v-if="item in selects" 
        @click.stop="selectHandler($event, item)" 
        :class="[{'ve-disabled': states[item].status == 'disabled'}, selects[item].className, 've-select']" 
        unselectable="on">
        <span>{{states[item].value}}</span><i :class="{'ve-triangle-down': !states[item].display, 've-triangle-up': states[item].display}"></i>
      </a>
      <a href="javascript:;" class="ve-divider" v-if="item == 'divider' || item == '|'"></a>
    </template>
  </div>
</template>

<script>

  import { getToolbar } from '../config/toolbar.js'
  import { getLang } from '../config/lang.js'
  import { getConfig } from '../config/index.js'

  export default {
    data () {
      let {btns, selects} = getToolbar();
      return {
        btns,
        selects,
        lang: getLang(),
        config: getConfig('toolbar'),
      }
    },
    computed: {
      states: function () {
        return this.$store.state.toolbar
      },
      view: function () {
        return this.$store.state.view
      }
    },
    watch: {
      'view': function (val) {
        let states = {};
        let json = Object.assign({}, this.btns, this.selects);
        for(let name in json){
          if(['sourceCode', 'markdown', 'fullscreen'].indexOf(name) === -1){
            states[name] = val === 'design' ? 'default' : 'disabled';
          }
        }
        this.$store.dispatch('updateButtonStates', states);
      }
    },
    methods: {
      btnHandler (event, name) {
        if(this.states[name].status === 'disabled')return;
        let btn = this.btns[name];
        if(btn.action){
          if(btn.native){
            this.$store.dispatch('execCommand', { name: name, value: null });
          }else{
            this.$store.dispatch('callMethod', { name: name, params: null });
            this.updateStates(name);
          }
        }else{
          this.updateStates(name);
        }
        this.showPopup(name, event.currentTarget);
      },
      selectHandler (event, name) {
        this.showPopup(name, event.currentTarget);
        this.updateStates(name);
      },
      showPopup (name, obj) {
        if(this.states[name].showPopup !== undefined){
          this.$store.dispatch('updatePopupDisplay', {
            name,
            display: !this.states[name].showPopup
          });
          this.$store.dispatch('updateRect', {
            left: obj.offsetLeft,
            top: obj.offsetTop,
            width: obj.offsetWidth,
            height: obj.offsetHeight + parseInt(getComputedStyle(obj).marginBottom)
          });
        }
      },
      updateStates (name) {
        let states = {};
        // update no action btn status, no action means click on it will toggle a popover menu;
        if(this.view === 'design'){
          for(let item in this.btns){
            if(!this.btns[item].action && this.states[item]){
              states[item] = 'default';
            }
          }
        }
        if(['sourceCode', 'markdown'].indexOf(name) !== -1){
          states['sourceCode'] = 'default';
          states['markdown'] = 'default';
        }
        if(this.states[name].status !== undefined){
          this.states[name].status === 'actived' ? states[name] = 'default' : states[name] = 'actived';
        }
        this.$store.dispatch('updateButtonStates', states);
      }
    }
  }
</script>