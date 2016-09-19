
<style lang="less" rel="stylesheet/less">
  .font-size {
    li {
      padding: 6px;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #d5e1f2;
        border-color: #a3bde3;
      }
    }
  }
</style>

<template>
  <a href="javascript:;" class="ve-select" :class="{'ve-disabled': disabled}" @click="toggle">
    <span>{{val || fontSize[0]}}px</span><i :class="{'triangle-down': !display, 'triangle-up': display}"></i>
  </a>
  <div class="ve-toolbar-dropdown ve-select-dropdown font-size" v-show="display" :style="{left: left + 'px', top: top + 'px'}">
    <ul>
      <li v-for="size in fontSize" @click="clickHandler(size)">
        <a href="javascript:;">{{size}}px</a>
      </li>
    </ul>
  </div>
</template>

<script>

  let fontSize = [12, 14, 16, 18, 20, 24, 28, 32, 36];

  import {updateTBDropdownDisplay} from '../vuex/actions';

  export default {
    data () {
      return {
        fontSize: fontSize,
        val: '',
        left: 0,
        top: 0
      }
    },
    vuex: {
      getters: {
        disabled: function (state) {
          return state.toolBtns.fontSize.disabled;
        },
        display: function (state) {
          return state.toolBtns.fontSize.showmenu;
        }
      },
      actions: {
        updateTBDropdownDisplay
      }
    },
    methods: {
      toggle () {
        if(!this.disabled){
          let obj = this.$el.nextElementSibling;
          this.left = obj.offsetLeft;
          this.top = obj.offsetTop + (obj.offsetHeight + parseInt(getComputedStyle(obj).marginBottom));
          this.updateTBDropdownDisplay('fontSize');
        }
      },
      clickHandler (size) {
        this.val = size;
        this.$root.$refs.design.exec('fontSize', size);
        this.updateTBDropdownDisplay();
      }
    }
  }
</script>