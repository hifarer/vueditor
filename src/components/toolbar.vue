
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    border: 1px solid #ddd;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    &:after {
      clear: both;
      content: "";
      display: block;
      width: 0;
      height: 0;
      visibility: hidden;
    }
    &>a {
      float: left;
      &.ve-divider {
        display: block;
        width: 0;
        height: 26px;
        margin: 6px;
        border-right: 1px solid #ddd;
      }
      &:not(.ve-divider) {
        display: inline-block;
        padding: 10px 12px;
        color: rgba(0, 0, 0, 0.6);
      }
      &:not(.ve-disabled) {
        &:hover, &.ve-active {
          background: #eee;
          color: #000;
        }
      }
    }
  }
</style>

<template>
  <div class="ve-toolbar">
    <template v-for="item in config" v-ref="config">
      <a v-if="nativeBtns[item]" href="javascript:;" title="{{nativeBtns[item].title}}"
         :class="{'ve-active': toolBtns[item].active, 've-disabled': toolBtns[item].disabled}" @click="clickHandler(item, null)"  unselectable="on">
        <i class="fa" :class="[nativeBtns[item].class]"></i>
      </a>
      <a v-if="item == 'divider' || item == '|'" href="javascript:;" class="ve-divider"></a>
      <component v-else :is="item" :param="customBtns[item]"></component>
    </template>
  </div>
</template>

<script>

  import color from './color.vue';
  import fontName from './fontname.vue';
  import fontSize from './fontsize.vue';
  import view from './view.vue';
  import elements from './elements.vue';
  import table1 from './table.vue';
  import undo from './undo.vue';
  import link from './link.vue';
  import emoji from './emoji.vue';
  import picture from './picture.vue';

  import * as actions from '../vuex/actions';
  //import {toolbarConfig} from '../js/config';

  let nativeBtns = {

    removeFormat: {title: '清除选中区域格式', class: 'fa-eraser'},

    bold: {title: '加粗', class: 'fa-bold'},
    italic: {title: '斜体', class: 'fa-italic'},
    underline: {title: '下划线', class: 'fa-underline'},
    strikeThrough: {title: '中划线', class: 'fa-strikethrough'},

    superscript: {title: '上标文字', class: 'fa-superscript'},
    subscript: {title: '下标文字', class: 'fa-subscript'},
    indent: {title: '增加缩进', class: 'fa-indent'},
    outdent: {title: '减少缩进', class: 'fa-outdent'},

    justifyLeft: {title: '左对齐', class: 'fa-align-left'},
    justifyCenter: {title: '中间对齐', class: 'fa-align-center'},
    justifyRight: {title: '右对齐', class: 'fa-align-right'},
    justifyFull: {title: '两端对齐', class: 'fa-align-justify'},

    insertOrderedList: {title: '设置有序列表', class: 'fa-list-ol'},
    insertUnorderedList: {title: '设置无序列表', class: 'fa-list-ul'}
  };

  let customBtns = {
    foreColor: {colorType: 'foreColor'},
    backColor: {colorType: 'backColor'}
  };

  export default {
    data () {
      return {
        nativeBtns: nativeBtns,
        customBtns: customBtns,
        defaultConfig: [
          'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
          'link', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
          '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'table1', '|', 'view'
        ],
        customConfig: toolbarConfig
      }
    },
    computed: {
      config: function () {
        return this.customConfig || this.defaultConfig;
      }
    },
    vuex: {
      getters: {
        toolBtns: function(state) {
          return state.toolBtns;
        }
      },
      actions
    },
    methods: {
      clickHandler(name, value){
        this.$root.$refs.design.exec(name, value);
      }
    },
    ready () {
      let temp = null;
      this.$children.forEach(function (comp) {
        comp.hasOwnProperty('canRedo') && (temp = comp);
      });
      this.$refs.undo = temp;
    },
    components: {
      'foreColor': color,
      'backColor': color,
      fontName,
      fontSize,
      view,
      elements,
      table1,
      undo,
      link,
      emoji,
      picture
    }
  }
</script>