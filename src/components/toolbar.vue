
<style lang="less" rel="stylesheet/less">
  .ve-toolbar {
    position: relative;
    border: 1px solid #ddd;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    overflow: hidden;

    a {
      float: left;
    }
    a.divider {
      display: block;
      width: 0;
      height: 26px;
      margin: 6px;
      border-right: 1px solid #ddd;
    }
    a:not(.divider) {
      display: inline-block;
      padding: 10px 12px;
      color: rgba(0, 0, 0, 0.6);
      &:not(.disabled) {
        &:hover, &.active {
          background: #eee;
          color: #000;
        }
      }
    }
  }
</style>

<template>
  <div class="ve-toolbar">
    <template v-for="item in config">
      <a v-if="nativeBtns[item]" href="javascript:;" title="{{nativeBtns[item].title}}"
         :class="{'active': toolBtns[item].active, 'disabled': toolBtns[item].disabled}" @click="clickHandler(item, null)"  unselectable="on">
        <i class="fa" :class="[nativeBtns[item].class]"></i>
      </a>
      <a v-if="item == 'divider' || item == '|'" href="javascript:;" class="divider"></a>
      <component v-else :is="item" :param="costomBtns[item]"></component>
    </template>
  </div>
</template>

<script>

  import color from './color.vue';
  import fontName from './fontname.vue';
  import fontSize from './fontsize.vue';
  import view from './view.vue';
  import elements from './elements.vue';
  import myTable from './table.vue';
  import undo from './undo.vue';

  import * as actions from '../vuex/toolbar-actions';

  let nativeBtns = {

    removeformat: {title: '清除选中区域格式', class: 'fa-eraser'},

    bold: {title: '加粗', class: 'fa-bold'},
    italic: {title: '斜体', class: 'fa-italic'},
    underline: {title: '下划线', class: 'fa-underline'},
    strikethrough: {title: '中划线', class: 'fa-strikethrough'},

    superscript: {title: '上标文字', class: 'fa-superscript'},
    subscript: {title: '下标文字', class: 'fa-subscript'},
    indent: {title: '增加缩进', class: 'fa-indent'},
    outdent: {title: '减少缩进', class: 'fa-outdent'},

    justifyleft: {title: '左对齐', class: 'fa-align-left'},
    justifycenter: {title: '中间对齐', class: 'fa-align-center'},
    justifyright: {title: '右对齐', class: 'fa-align-right'},
    justifyfull: {title: '两端对齐', class: 'fa-align-justify'},

    insertOrderedList: {title: '设置有序列表', class: 'fa-list-ol'},
    insertUnorderedList: {title: '设置无序列表', class: 'fa-list-ul'}
  };

  let costomBtns = {
    forecolor: {colorType: 'forecolor'},
    backcolor: {colorType: 'backcolor'},
    undo: {obj: document.body, cb: function () {alert(1)}}
  };

  export default {
    data () {
      return {
        nativeBtns: nativeBtns,
        costomBtns: costomBtns,
        config: [
          'removeformat', 'undo', '|', 'elements', 'fontname', 'fontsize', 'forecolor', 'backcolor', 'separator', 'bold', 'italic', 'underline', 'strikethrough',
          'separator', 'subscript', 'superscript', 'separator', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
          '|', 'indent', 'outdent', '|', 'mytable', '|', 'view'
        ]
      }
    },
    props: ['custom'],
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
        this.updateToolbarActive();
        this.updateToolbarDisabled();
      }
    },
    created () {
      this.initToolbarStatus(this.custom || this.config);
    },
    components: {
      'forecolor': color,
      'backcolor': color,
      'fontname': fontName,
      'fontsize': fontSize,
      'view': view,
      'elements': elements,
      'mytable': myTable,
      'undo': undo
    }
  }
</script>