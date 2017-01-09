<style lang="less" rel="stylesheet/less">
  .emoji-popover {
    width: 276px;
    transform: translateX(-50%);
    margin-left: 50%;
  }
  .emoji-popover .pop-body {
    max-height: 350px;
    overflow: auto;
  }
  .emoji-wrap {
    a {
      float: left;
      width: 30px;
      height: 30px;
      padding: 1px;
    }
    img {
      max-width: 100%;
    }
  }
</style>

<template>
  <div>
    <a href="javascript:;" :title="lang.title" :class="{'ve-disabled': disabled, 've-active': display}" @click="toggle">
      <i class="icon-smile-o"></i>
    </a>
    <div class="ve-popover emoji-popover" v-show="display">
      <div class="pop-arrow"></div>
      <div class="pop-header">{{lang.title}}</div>
      <div class="pop-body">
        <div class="emoji-wrap" @click="insertItem">
          <a href="javascript:;" v-for="item in arr">
            <img class="emoji" draggable="false" 
            :alt="twemoji.convert.fromCodePoint(item)" 
            :src="parseSrc(twemoji.parse(twemoji.convert.fromCodePoint(item)))">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// http://unicode.org/emoji/charts/full-emoji-list.html
// var arr = [];
// [].forEach.call(document.querySelectorAll('.code'), function(node){
// 	arr.push(node.children[0].getAttribute('name'))
// });
// console.log(arr);

  let list = ["1f600", "1f601", "1f602", "1f923", "1f603", "1f604", "1f605", "1f606", "1f609", "1f60a", "1f60b", "1f60e", "1f60d", "1f618",
  "1f617", "1f619", "1f61a", "263a", "1f642", "1f917", "1f914", "1f610", "1f611", "1f636", "1f644", "1f60f", "1f623", "1f625",
  "1f62e", "1f910", "1f62f", "1f62a", "1f62b", "1f634", "1f60c", "1f913", "1f61b", "1f61c", "1f61d", "1f924", "1f612", "1f613",
  "1f614", "1f615", "1f643", "1f911", "1f632", "2639", "1f641", "1f616", "1f61e", "1f61f", "1f624", "1f622", "1f62d", "1f626",
  "1f627", "1f628", "1f629", "1f62c", "1f630", "1f631", "1f633", "1f635", "1f621", "1f620", "1f607", "1f920", "1f921", "1f925",
  "1f637", "1f912", "1f915", "1f922", "1f927"];

  import twemoji from "exports?twemoji!../js/twemoji.min.js";

  export default {
    data () {
      return {
        arr: list,
        width: 260,
        height: 180,
        twemoji
      }
    },
    computed: {
      lang () {
        return this.$store.state.lang.emoji;
      },
      disabled: function () {
        return this.$store.state.toolbarStates.emoji.disabled;
      },
      display: function () {
        return this.$store.state.toolbarStates.emoji.showPopup;
      }
    },
    methods: {
      updatePopupDisplay (current) {
        this.$store.dispatch('updatePopupDisplay', current);
      },
      toggle () {
        !this.disabled && this.updatePopupDisplay('emoji');
      },
      parseSrc (str) {
        let div = document.createElement('div');
        div.innerHTML = str;
        return div.querySelector('img').src;
      },
      insertItem (event) {
        let img = event.target.cloneNode(true);
        img.style.width = '30px';
        this.$store.dispatch('execCommand', {name: 'insertHTML', value: img.outerHTML});
      }
    }
  }
</script>