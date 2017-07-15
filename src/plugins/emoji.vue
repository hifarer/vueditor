
<style>
  .emoji {
    width: 276px;
    margin-left: -120px;
  }
  .emoji .ve-pop-body {
    max-height: 350px;
    overflow: auto;
  }
  .emoji .wrap a {
    float: left;
    width: 30px;
    height: 30px;
    padding: 1px;
  }
  /*icon for toolbar button*/
  .icon-smile-o {
    background: url("../images/icon-smile-o.png") no-repeat;
  }
</style>

<template>
  <div class="ve-popover emoji" v-show="showPopup" 
  :style="{left: rect.left + 'px', top: (rect.top + rect.height) + 'px'}">
    <div class="ve-pop-arrow"></div>
    <div class="ve-pop-header">Insert Emoji</div>
    <div class="ve-pop-body">
      <div class="wrap" @click="insertItem">
        <a href="javascript:;" draggable="false" v-for="item in arr">
          <img :src="parseSrc(item)" :alt="convert(item)">
        </a>
      </div>
    </div>
  </div>
</template>

<script>

  // To get emoji list for Vueditor, open http://unicode.org/emoji/charts/full-emoji-list.html
  // and run the following code in console panel.
  // var arr = [];
  // [].forEach.call(document.querySelectorAll('.code'), function(node){
  // 	  arr.push(node.children[0].getAttribute('name'))
  // });
  // console.log(arr);

  import twemoji from 'twemoji';

  export default {
    data () {
      return {
        arr: [
          '1f600', '1f601', '1f602', '1f923', '1f603', '1f604', '1f605', '1f606', '1f609', '1f60a', '1f60b', '1f60e', '1f60d', '1f618',
          '1f617', '1f619', '1f61a', '263a', '1f642', '1f917', '1f914', '1f610', '1f611', '1f636', '1f644', '1f60f', '1f623', '1f625',
          '1f62e', '1f910', '1f62f', '1f62a', '1f62b', '1f634', '1f60c', '1f913', '1f61b', '1f61c', '1f61d', '1f924', '1f612', '1f613',
          '1f614', '1f615', '1f643', '1f911', '1f632', '2639', '1f641', '1f616', '1f61e', '1f61f', '1f624', '1f622', '1f62d', '1f626',
          '1f627', '1f628', '1f629', '1f62c', '1f630', '1f631', '1f633', '1f635', '1f621', '1f620', '1f607', '1f920', '1f921', '1f925',
          '1f637', '1f912', '1f915', '1f922', '1f927'
        ]
      }
    },
    computed: {
      rect: function () {
        return this.$store.state.rect;
      },
      showPopup: function () {
        return this.$store.state.toolbar.emoji.showPopup;
      }
    },
    methods: {
      convert (code) {
        return twemoji.convert.fromCodePoint(code);
      },
      parseSrc (str) {
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