
<style lang="less" rel="stylesheet/less">
  .fontsize {
    width: 176px;
    padding: 5px 10px;
    position: absolute;
    top: 39px;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
    li {
      padding: 6px;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #d5e1f2;
        border-color: #a3bde3;
      }
    }
  }
</style>

<template>
  <a href="javascript:;" title="字号" :class="{'active': display}" @click="toggle">
    <i class="fa fa-sort-numeric-asc"></i>
  </a>
  <div class="ve-toolbar-dropdown fontsize" v-show="display">
    <ul>
      <li v-for="size in sizeArray" @click="clickHandler(size)">
        <a href="javascript:;">{{size}}px</a>
      </li>
    </ul>
  </div>
</template>

<script>
  let sizeArray = [12, 14, 16, 18, 20, 24, 28, 32, 36];

  export default {
    data () {
      return {
        sizeArray: sizeArray,
        display: false
      }
    },
    methods: {
      toggle () {
        this.$dispatch('dropdownToggle', this);
        this.display = !this.display;
      },
      clickHandler (size) {
        let selection = iframeWin.getSelection();
        let range = veUtil.range.get();
        if(!range){
          this.display = false;
          return;
        }
        let childNodes = range.cloneContents().childNodes;
        if(childNodes.length == 1 && childNodes[0].nodeType == 1 && childNodes[0].tagName.toLowerCase() == 'span'){
          let span = range.extractContents().childNodes[0];
          span.style.fontSize = size + 'px';
          range.insertNode(span);
          range.selectNode(span);
          selection.removeAllRanges();
          selection.addRange(range);
        }else{
          if(navigator.userAgent.indexOf('Chrome') != -1 && navigator.userAgent.indexOf('Edge') == -1){
            if(document.queryCommandSupported('styleWithCss')){
              iframeDoc.execCommand('styleWithCss', false, true);
            }
            iframeDoc.execCommand('fontSize', false, 7);    //设置为1-7一般都可以，但是当设置为3时，在chrome中会没反应，应该是face="3"和默认字号一样大造成的。
            let container = range.commonAncestorContainer;
            container.nodeType == 3 && (container = container.parentNode);
            container.tagName.toLowerCase() == 'span' && (container = container.parentNode);
            Array.prototype.forEach.call(container.getElementsByTagName('span'), function (span) {
              if(span.style.fontSize.trim() == '-webkit-xxx-large' || span.style.fontSize.trim() == 'xx-large'){
                span.style.fontSize = size + 'px';
              }
              span.normalize();
            });
          }else{
            if(document.queryCommandSupported('styleWithCss')){
              iframeDoc.execCommand('styleWithCss', false, false);
            }
            iframeDoc.execCommand('fontSize', false, 7);

            let fontList = [], spanList = [];
            let container = range.commonAncestorContainer;
            container.nodeType == 3 && (container = container.parentNode);
            container.tagName.toLowerCase() == 'font' && (container = container.parentNode);
            fontList = container.getElementsByTagName('font');
            for(let i = 0; i < fontList.length; i++){   //将<font face="7"></font>转换成<span style="font-size: npx;"></span>
              let font = fontList[i];
              let span = document.createElement('span');
              Array.prototype.forEach.call(font.attributes, function (attr) {
                attr.nodeName == 'size' ? span.style.fontSize = size + 'px' : span.setAttribute(attr.nodeName, attr.nodeValue);
              });
              span.innerHTML = font.innerHTML;
              span.querySelectorAll('span').length != 0 && veUtil.command.format(span, 'span', 'fontSize');   //firefox 不会格式化选区内部元素的字号，手动修改。将来firefox改的跟chrome一样，这个函数不执行。
              span.normalize();
              font.parentNode.replaceChild(span, font);
              spanList.push(span);
              i--;
            }
            range.setStartBefore(spanList[0]);
            range.setEndAfter(spanList[spanList.length - 1]);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
        this.display = false;
      }
    }
  }
</script>