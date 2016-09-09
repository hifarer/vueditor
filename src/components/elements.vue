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
  <a href="javascript:;" class="ve-select" :class="{'ve-disabled': disabled}" @click="toggle">
    <span>{{val || arr[0]}}</span><i :class="{'triangle-down': !display, 'triangle-up': display}"></i>
  </a>
  <div class="ve-toolbar-dropdown ve-select-dropdown format-block" @click="selectItem" v-show="display" :style="{left: left + 'px', top: top + 'px'}">
    <a href="javascript:;" v-for="item in arr">{{item}}</a>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        display: false,
        arr: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: '',
        left: 50,
        top: 50
      }
    },
    vuex: {
      getters: {
        disabled: function (state) {
          return state.toolBtns.elements.disabled;
        }
      }
    },
    methods: {
      toggle () {
        if(!this.disabled){
          // https://vuejs.org.cn/api/#vm-el
          // https://vuejs.org.cn/guide/components.html#片断实例
          let obj = this.$el.nextElementSibling;
          this.left = obj.offsetLeft;
          this.top = obj.offsetTop + (obj.offsetHeight + parseInt(getComputedStyle(obj).marginBottom));
          this.display = !this.display;
        }
      },
      selectItem (event) {
        let app = this.$root.$children[0];
        let ua = navigator.userAgent.toLowerCase();
        let tagName = event.target.innerHTML.trim();
        this.display = false;
        this.val = tagName;
        if(ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)){
          let range = veUtil.range.get();
          if(!range || range.collapsed){
            alert('在IE浏览器中必须选中一段文字才能使用此功能！');
          }else{
            app.iframeDoc.execCommand('formatblock', false, '<' + tagName.toUpperCase() + '>');
          }
        } else {
          app.iframeDoc.execCommand('formatblock', false, tagName);
        }
      }
    }
  }

</script>