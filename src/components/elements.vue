<style lang="less" rel="stylesheet/less">
  .format-block {
    a {
      display: block;
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
  <div>
    <a href="javascript:;" class="ve-select" :class="{'ve-disabled': disabled}" @click="toggle">
      <span>{{val || arr[0]}}</span><i :class="{'triangle-down': !display, 'triangle-up': display}"></i>
    </a>
    <div class="ve-toolbar-dropdown ve-select-dropdown format-block" @click="selectItem" v-show="display">
      <a href="javascript:;" v-for="item in arr">{{item}}</a>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        arr: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: ''
      }
    },
    computed: {
      disabled () {
        return this.$store.state.toolbarStates.elements.disabled;
      },
      display () {
        return this.$store.state.toolbarStates.elements.showPopup;
      }
    },
    methods: {
      updatePopupDisplay (current) {
        this.$store.dispatch('updatePopupDisplay', current);
      },
      toggle () {
        !this.disabled && this.updatePopupDisplay('elements');
      },
      selectItem (event) {
        let tagName = event.target.innerHTML.trim();
        this.val = tagName;
        this.$store.dispatch('execCommand', {name: 'formatBlock', value: tagName});
        this.updatePopupDisplay();
      }
    }
  }

</script>