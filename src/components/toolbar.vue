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
        <a href="javascript:;" :title="lang[item].title"
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

  let nativeBtns = {

    removeFormat: {class: 'icon-eraser'},

    bold: {class: 'icon-bold'},
    italic: {class: 'icon-italic'},
    underline: {class: 'icon-underline'},
    strikeThrough: {class: 'icon-strikethrough'},

    superscript: {class: 'icon-superscript'},
    subscript: {class: 'icon-subscript'},
    indent: {class: 'icon-indent'},
    outdent: {class: 'icon-outdent'},

    justifyLeft: {class: 'icon-align-left'},
    justifyCenter: {class: 'icon-align-center'},
    justifyRight: {class: 'icon-align-right'},
    justifyFull: {class: 'icon-align-justify'},

    insertOrderedList: {class: 'icon-list-ol'},
    insertUnorderedList: {class: 'icon-list-ul'}
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
      lang () {
        return this.$store.state.lang.toolbar;
      },
      config () {
        return this.$store.state.config.toolbar;
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