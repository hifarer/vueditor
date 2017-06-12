
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    border-bottom: 1px solid #ddd;
    user-select: none;
    display: table;
    width: 100%;
    font-size: 0;
    letter-spacing: -4px;
    background: #fff;
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
        <span>{{states[item].value}}</span><i :class="{'ve-triangle-down': !display, 've-triangle-up': display}"></i>
      </a>

      <a href="javascript:;" class="ve-divider" v-if="item == 'divider' || item == '|'"></a>

    </template>
  </div>
</template>

<script>

  import { btns, selects, customs } from '../config/btns'

  export default {
    data () {
      return {
        btns,
        selects,
        customs,
        lang: this.$parent.lang,
        config: this.$parent.config.toolbar
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
    methods: {
      btnHandler (event, name) {
        let btn = this.btns[name];
        if(this.states[name].status === 'disabled')return;
        if(btn.action){
          if(btn.native){
            this.$store.dispatch('execCommand', { name: name, value: null });
          }else{
            this.$store.dispatch('callMethod', { name: name, params: null });
            this.updateStates(name);
          }
        }else{
          this.showPopup(name, {top: event.currentTarget.offsetTop, left: event.currentTarget.offsetLeft});
          this.updateStates(name);
        }
      },
      selectHandler (event, name) {
        this.showPopup(name, {top: event.currentTarget.offsetTop, left: event.currentTarget.offsetLeft});
        this.updateStates();
      },
      showPopup (name, rect) {
        this.$store.dispatch('updatePopupDisplay', {
          name,
          display: !this.states[name].showPopup.display,
          left: rect.left,
          top: rect.top
        });
      },
      updateStates (name) {
        let state = {};
        this.states[name].status === 'actived' ? state[name] = 'default' : state[name] = 'actived';
        this.$store.dispatch('updateButtonStates', state);
      }
    }
  }
</script>