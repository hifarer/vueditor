<style lang="less" rel="stylesheet/less">
  .emoji-popover {
    width: 276px;
    margin-left: -120px;
  }
  .emoji-popover .pop-body {
    max-height: 350px;
    overflow: auto;
  }
  .emoji-wrap a {
    float: left;
    width: 30px;
    height: 30px;
    padding: 1px;
  }
</style>

<template>
  <div class="ve-popover emoji-popover" v-show="showPopup.display"
  :style="{left: showPopup.left + 'px', top: (showPopup.top + 36) + 'px'}">
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
</template>

<script>

// To get emoji list for Vueditor, open http://unicode.org/emoji/charts/full-emoji-list.html
// and put the following code in console panel then run.
// var arr = [];
// [].forEach.call(document.querySelectorAll('.code'), function(node){
// 	arr.push(node.children[0].getAttribute('name'))
// });
// console.log(arr);

  import twemoji from 'exports?twemoji!../js/twemoji.min.js';

  export default {
    data () {
      return {
        twemoji,
        arr: this.$parent.config.emoji,
        lang: this.$parent.lang.emoji
      }
    },
    computed: {
      showPopup: function () {
        return this.$store.state.toolbar.emoji.showPopup;
      }
    },
    methods: {
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