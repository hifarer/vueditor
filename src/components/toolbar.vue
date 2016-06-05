
<style lang="less" rel="stylesheet/less">
  .ve-toolbar{
    position: relative;
    border: 1px solid #ddd;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    .ve-toolbar-wrap {
      height: 38px;
      overflow: hidden;
      .ve-toolbar-item {
        float: left;
        &>a:not(.separator) {
          display: inline-block;
          padding: 10px 12px;
          color: rgba(0, 0, 0, 0.6);
          &:hover, &.active {
            background: #eee;
            color: #000;
          }
        }
        &>a.separator {
          display: block;
          width: 0;
          height: 26px;
          margin: 6px;
          border-right: 1px solid #ddd;
        }
      }
    }
  }
</style>

<template>
  <div class="ve-toolbar">
    <div class="ve-toolbar-wrap">
      <div v-for="item in config" class="ve-toolbar-item" unselectable="off">
        <a v-if="nativeBtns[item]" href="javascript:;" title="{{nativeBtns[item].title}}" :class="{'active': state[item]}" @click="clickHandler(item, null)">
          <i class="fa" :class="[nativeBtns[item].class]"></i>
        </a>
        <a v-if="item == 'separator'" href="javascript:;" class="separator"></a>
        <component v-else :is="item" :param="costomBtns[item]"></component>
      </div>
    </div>
  </div>
</template>

<script>

  import color from '../components/color.vue';
  import fontName from '../components/fontname.vue';
  import fontSize from '../components/fontsize.vue';
  import sourceCode from '../components/code.vue';

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
    backcolor: {colorType: 'backcolor'}
  };

  export default {
    data () {
      return {
        nativeBtns: nativeBtns,
        costomBtns: costomBtns,
        config: [
          'removeformat', 'fontname', 'fontsize', 'forecolor', 'backcolor', 'separator', 'bold', 'italic', 'underline', 'strikethrough',
          'separator', 'subscript', 'superscript', 'separator', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull',
          'separator', 'indent', 'outdent', 'separator', 'sourcecode'
        ],
        state: []
      }
    },
    props: ['custom'],
    events: {
      stateChange () {
        let json = {};
        let config = this.custom || this.config;
        config.forEach(function (name) {
          json[name] = iframeDoc.queryCommandState(name);
        });
        this.state = json;
      },
      dropdownToggle (target) {
        this.$children.forEach(function (component) {
          component !== target && (component.display = false);
        });
      }
    },
    methods: {
      clickHandler(name, value){
        this.exec(name, value);
        this.$emit('dropdownToggle');
        this.$emit('stateChange');
      },
      exec (name, value) {
        if(document.queryCommandSupported('styleWithCss')){
          iframeDoc.execCommand('styleWithCss', false, true);
        }
        iframeDoc.execCommand(name, false, value);
        if(name == 'removeformat'){
          let range = veUtil.range.get();
          if(!range)return;
          let container = range.commonAncestorContainer;
          container.nodeType == 3 && (container = container.parentNode);
          container.tagName.toLowerCase() == 'span' && (container = container.parentNode);
          veUtil.command.format(container, 'span', 'verticalAlign');
        }
      }
    },
    components: {
      'forecolor': color,
      'backcolor': color,
      'fontname': fontName,
      'fontsize': fontSize,
      'sourcecode': sourceCode
    }
  }
</script>