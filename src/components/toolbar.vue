<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    border-bottom: 1px solid #ddd;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    display: table;
    width: 100%;
    &>div {
      position: relative;
      display: inline-block;
      &>a {
        display: inline-block;
        padding: 10px 12px;
        color: rgba(0, 0, 0, 0.6);
      }
      a.ve-divider {
        width: 0;
        height: 26px;
        margin: 0 5px;
        padding: 0;
        border-right: 1px solid #ddd;
        vertical-align: middle;
      }
      a.ve-active {
         background: #eee;
         color: #000;
      }
      &>a:not(.ve-disabled):hover {
        background: #eee;
        color: #000;
      }
    }
  }
</style>

<template>
  <div class="ve-toolbar">
    <template v-for="item in config">
      <div v-if="nativeBtns[item]">
        <a href="javascript:;" :title="nativeBtns[item].title"
           :class="{'ve-active': states[item].active, 've-disabled': states[item].disabled}"
           @click="clickHandler(item, null)" unselectable="on">
          <i :class="[nativeBtns[item].class]"></i>
        </a>
      </div>
      <div v-if="item == 'divider' || item == '|'">
        <a href="javascript:;" class="ve-divider"></a>
      </div>
      <component v-if="customBtns.indexOf(item) != -1" :is="item" :comp-name="item"></component>
    </template>
  </div>
</template>

<script>

  import color from './color.vue';
  import fontName from './fontname.vue';
  import fontSize from './fontsize.vue';
  import switchView from './switchView.vue';
  import elements from './elements.vue';
  import tables from './tables.vue';
  import undo from './undo.vue';
  import links from './links.vue';
  import emoji from './emoji.vue';
  import picture from './picture.vue';

  'asdfasdf';

  let nativeBtns = {

    removeFormat: {title: '清除选中区域格式', class: 'icon-eraser'},

    bold: {title: '加粗', class: 'icon-bold'},
    italic: {title: '斜体', class: 'icon-italic'},
    underline: {title: '下划线', class: 'icon-underline'},
    strikeThrough: {title: '中划线', class: 'icon-strikethrough'},

    superscript: {title: '上标文字', class: 'icon-superscript'},
    subscript: {title: '下标文字', class: 'icon-subscript'},
    indent: {title: '增加缩进', class: 'icon-indent'},
    outdent: {title: '减少缩进', class: 'icon-outdent'},

    justifyLeft: {title: '左对齐', class: 'icon-align-left'},
    justifyCenter: {title: '中间对齐', class: 'icon-align-center'},
    justifyRight: {title: '右对齐', class: 'icon-align-right'},
    justifyFull: {title: '两端对齐', class: 'icon-align-justify'},

    insertOrderedList: {title: '设置有序列表', class: 'icon-list-ol'},
    insertUnorderedList: {title: '设置无序列表', class: 'icon-list-ul'}
  };

  let customBtns = [
    'foreColor',
    'backColor',
    'fontName',
    'fontSize',
    'switchView',
    'elements',
    'tables',
    'undo',
    'links',
    'emoji',
    'picture'
  ];

  export default {
    data () {
      return {
        nativeBtns,
        customBtns
      }
    },
    computed: {
      config () {
        return this.$root.config.toolbar;
      },
      states () {
        return this.$store.state.toolbarStates;
      }
    },
    methods: {
      clickHandler(name, value){
        this.$store.dispatch('execCommand', {name, value});
      }
    },
    components: {
      'foreColor': color,
      'backColor': color,
      fontName,
      fontSize,
      switchView,
      elements,
      tables,
      undo,
      links,
      emoji,
      picture
    }
  }
</script>