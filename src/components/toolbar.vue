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
      <a href="javascript:;" :title="lang[item].title" v-if="nativeBtns[item]"
        :class="{'ve-active': states[item].status == 'actived', 've-disabled': states[item].status == 'disabled'}"
        @click="nativeHandler(item, null)" unselectable="on">
        <i :class="[nativeBtns[item].className]"></i>
      </a>
      <a href="javascript:;" :title="lang[item].title" v-if="customBtns[item]"
        :class="{'ve-active': states[item].status == 'actived', 've-disabled': states[item].status == 'disabled'}"
        @click="customHandler($event, item)" unselectable="on">
        <i :class="[customBtns[item].className]"></i>
      </a>
      <a href="javascript:;" v-if="selects[item]"
        class="ve-select" :class="[{'ve-disabled': states[item].status == 'disabled'}, selects[item].className]"
        @click="customHandler($event, item)" unselectable="on">
        <span>{{states[item].value}}</span><i :class="{'ve-triangle-down': !display, 've-triangle-up': display}"></i>
      </a>
      <a href="javascript:;" class="ve-divider" v-if="item == 'divider' || item == '|'"></a>
    </template>
  </div>
</template>

<script>

  import {nativeBtns, customBtns, selects} from '../js/btns';

  export default {
    data () {
      return {
        nativeBtns,
        customBtns,
        selects,
        lang: this.$parent.lang,
        config: this.$parent.config.toolbar
      }
    },
    computed: {
      states () {
        return this.$store.state.toolbar;
      }
    },
    methods: {
      nativeHandler(name){
        this.states[name].status !== 'disabled' && this.$store.dispatch('execCommand', {name, null});
      },
      customHandler (event, name) {
        if(this.states[name].status == 'disabled')return;
        // directly do something
        if(customBtns[name] && customBtns[name].action){
          this.$store.dispatch('callAction', {name});
        }else{
          // show the popup menu
          let rect = event.currentTarget.getBoundingClientRect();
          let display = this.states[name].showPopup.display;
          let json = {};
          for(let item in customBtns){
            !customBtns[item].action && (json[item] = 'default');
          }
          json[name] = 'actived';
          this.$store.dispatch('updatePopupDisplay', {
            name,
            display: !display,
            left: rect.left,
            top: rect.top
          });
          this.$store.dispatch('updateToolbarStates', json);
        }
      }
    }
  }
</script>