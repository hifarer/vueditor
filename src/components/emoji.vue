<style module>
  .ctn {
    width: 276px;
    margin-left: -120px;
  }
  .main {
    max-height: 350px;
    overflow: auto;
  }
  .wrap a {
    float: left;
    width: 30px;
    height: 30px;
    padding: 1px;
  }
</style>

<template>
  <div class="ve-popover" :class="$style.ctn" v-show="showPopup.display"
  :style="{left: showPopup.left + 'px', top: (showPopup.top + 36) + 'px'}">
    <div class="ve-pop-arrow"></div>
    <div class="ve-pop-header">{{lang.title}}</div>
    <div class="ve-pop-body" :class="$style.main">
      <div :class="$style.wrap" @click="insertItem">
        <a href="javascript:;" draggable="false" v-for="item in arr">
          <img class="emoji"
          :src="parseSrc(item)"
          :alt="twemoji.convert.fromCodePoint(item)" 
          >
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

  import twemoji from 'twemoji';

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
        // let url = 'https://twemoji.maxcdn.com/';
        let div = document.createElement('div');
        div.innerHTML = twemoji.parse(twemoji.convert.fromCodePoint(str));
        return div.children[0].src;
      },
      insertItem (event) {
        let obj = event.target;
        if(obj.tagName.toLowerCase() == 'a'){
          obj = obj.children[0];
        }
        this.$store.dispatch('execCommand', {name: 'insertHTML', value: obj.outerHTML});
      }
    }
  }
</script>