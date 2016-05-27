
<template>
  <div class="ve-toolbar">
    <div class="ve-toolbar-wrap">
      <div v-for="item in config" class="ve-toolbar-item" unselectable="off">
        <a v-if="nativeBtns[item]" href="javascript:;" title="{{nativeBtns[item].title}}" :class="{'active': state[item]}" @click="exec(item, null)">
          <i class="fa" :class="[nativeBtns[item].class]"></i>
        </a>
        <component v-else :is="item" :param="costomBtns[item]"></component>
      </div>
    </div>
  </div>
</template>

<script>

  import color from '../components/color.vue';
  import sourceCode from '../components/code.vue';

  var nativeBtns = {

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

  var costomBtns = {
    forecolor: {colorType: 'forecolor'},
    backcolor: {colorType: 'backcolor'},
    code: ''
  };

  export default {
    data: function () {
      return {
        nativeBtns: nativeBtns,
        costomBtns: costomBtns,
        config: [
          'removeformat', 'bold', 'italic', 'underline', 'strikethrough', 'forecolor', 'backcolor', 'subscript', 'superscript', 'justifyleft',
          'justifycenter', 'justifyright', 'justifyfull', 'indent', 'outdent', 'sourceCode'
        ],
        state: []
      }
    },
    props: ['custom'],
    events: {
      stateChange: function () {
        var json = {};
        var config = this.custom || this.config;
        config.forEach(function (name) {
          json[name] = iframeDoc.queryCommandState(name);
        });
        this.state = json;
      }
    },
    methods: {
      exec: function (name, value) {
        iframeDoc.execCommand(name, false, value);
      }
    },
    components: {
      'forecolor': color,
      'backcolor': color,
      'sourceCode': sourceCode
    }
  }
</script>