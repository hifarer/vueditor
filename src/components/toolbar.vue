<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    border-bottom: 1px solid #ddd;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    display: table;
    width: 100%;
    font-size: 0;
    letter-spacing: -4px;
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
</style>

<template>
  <div class="ve-toolbar">
    <template v-for="item in config">
      <a href="javascript:;" :title="lang[item].title" v-if="nativeBtns[item]"
        :class="{'ve-active': states[item].status == 'actived', 've-disabled': states[item].status == 'disabled'}"
        @click="nativeHandler(item, null)" unselectable="on">
        <i :class="[nativeBtns[item].class]"></i>
      </a>
      <a href="javascript:;" :title="lang[item].title" v-if="customBtns[item]"
        :class="{'ve-active': states[item].status == 'actived', 've-disabled': states[item].status == 'disabled'}"
        @click="customHandler($event, item)" unselectable="on">
        <i :class="[customBtns[item].class]"></i>
      </a>
      <a href="javascript:;" v-if="selects[item]"
        class="ve-select" :class="[{'ve-disabled': states[item].status == 'disabled'}, selects[item].class]"
        @click="customHandler($event, item)" unselectable="on">
        <span>{{states[item].value}}</span><i :class="{'triangle-down': !display, 'triangle-up': display}"></i>
      </a>
      <a href="javascript:;" class="ve-divider" v-if="item == 'divider' || item == '|'"></a>
    </template>
  </div>
</template>

<script>

  import {nativeBtns, customBtns, selects} from '../js/btns.js';

  export default {
    data () {
      return {
        nativeBtns,
        customBtns,
        selects,
        lang: this.$store.state.lang.toolbar,
        config: this.$store.state.config.toolbar
      }
    },
    computed: {
      states () {
        return this.$store.state.toolbar;
      }
    },
    methods: {
      nativeHandler(name, value){
        this.$store.dispatch('execCommand', {name, value});
      },
      customHandler (event, current) {
        if(customBtns[current] && customBtns[current].action){
          this.$store.dispatch('callAction', {name: current});
        }else{
          let rect = event.currentTarget.getBoundingClientRect();
          let display = this.states[current].showPopup.display;
          this.$store.dispatch('updatePopupDisplay', {
            name: current,
            display: !display,
            left: rect.left,
            top: rect.top
          });
        }
      }
    }
  }
</script>