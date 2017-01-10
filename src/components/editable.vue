<style>
  .ve-design>div {
    height: 100%;
    outline: none;
    overflow-y: auto;
    padding: 8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>

<template>
  <div class="ve-design" v-show="currentView == 'design'">
    <div contenteditable="true" spellcheck="false" @click="updatePopupDisplay" @keydown="keydownHandler" @keyup="keyupHandler"></div>
  </div>
</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    data () {
      return {
        timer: null,
        inited: false,
        cache: '',
        lang: this.$store.state.lang.editable
      }
    },

    computed: {
      currentView: function () {
        return this.$store.state.currentView;
      },
      content: function () {
        return this.$store.state.content;
      },
      command: function () {
        return this.$store.state.command;
      }
    },

    watch: {
      'currentView': function (val) {
        if (val == 'sourceCode') {
          clearTimeout(this.timer);
          this.updateContent(this.$el.children[0].innerHTML);
          this.updateToolbarActiveStates();
        }else{
          this.updateToolbarActiveStates(document);
        }
      },
      'content': function (val) {
        this.$el.children[0].innerHTML != val && (this.$el.children[0].innerHTML = val);
      },
      'command': function (data) {
        this.exec (data.name, data.value);
      }
    },
    mounted () {
      this.selectionChange();
    },
    methods: Object.assign({}, mapActions([
      'updateContent',
      'updateToolbarActiveStates',
      'updatePopupDisplay',
      'callAction'
    ]), {

      keydownHandler (event) {
        if (event.ctrlKey && (event.keyCode == 89 || event.keyCode == 90)) {
          event.preventDefault();
          event.keyCode == 89 && this.callAction('redo');
          event.keyCode == 90 && this.callAction('undo');
        }
      },

      keyupHandler () {
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          this.updateContent(this.$el.children[0].innerHTML);
        }.bind(this), 500);
      },

      selectionChange () {
        document.addEventListener('selectionchange', function(){
          if(this.$el.children[0].contains(window.getSelection().focusNode)){
            this.updateToolbarActiveStates(document);
          }
        }.bind(this), false);
        if (navigator.userAgent.indexOf('Firefox') !== -1) {
          let oSel = this.iframeWin.getSelection();
          let focusOffset = -1;
          setInterval(function () {
            if (oSel && oSel.rangeCount) {
              if (focusOffset !== oSel.focusOffset) {
                focusOffset = oSel.focusOffset;
                this.updateToolbarActiveStates(this.iframeDoc);
              }
            } else {
              oSel = window.getSelection();
            }
          }.bind(this), 300);
        }
      },

      exec (name, value) {
        let range = this.getRange();
        let container = range.commonAncestorContainer;
        if(!this.$el.children[0].contains(container)){
          return;
        }
        if (document.queryCommandSupported('styleWithCss')) {
          document.execCommand('styleWithCss', false, true);
        }
        this[name] ? this[name](name, value) : document.execCommand(name, false, value);
        this.updateToolbarActiveStates(document);
        this.updateContent(this.$el.children[0].innerHTML);
      },

      insertHTML (name, value) {
        let oSel = window.getSelection();
        let oRange = this.getRange();
        if (!oRange)return;
        let node = null;
        let frag = document.createDocumentFragment();
        let obj = document.createElement('div');
        obj.innerHTML = value;
        while (obj.firstChild) {
          node = obj.firstChild;
          frag.appendChild(node);
        }
        oRange.insertNode(frag);
        oRange.setStartAfter(node);
        oRange.collapse(true);
        oSel.removeAllRanges();
        oSel.addRange(oRange);
      },

      fontSize (name, value) {
        let selection = window.getSelection();
        let range = this.getRange();
        if (!range || range.collapsed) {
          return;
        }
        let childNodes = range.cloneContents().childNodes;
        if (childNodes.length == 1 && childNodes[0].nodeType == 1 && childNodes[0].tagName.toLowerCase() == 'span') {
          let span = range.extractContents().childNodes[0];
          span.style.fontSize = value;
          range.insertNode(span);
          range.selectNode(span);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          if (navigator.userAgent.indexOf('Chrome') != -1 && navigator.userAgent.indexOf('Edge') == -1) {
            if (document.queryCommandSupported('styleWithCss')) {
              document.execCommand('styleWithCss', false, true);
            }
            document.execCommand('fontSize', false, 7);
            let container = range.commonAncestorContainer;
            container.nodeType == 3 && (container = container.parentNode);
            container.tagName.toLowerCase() == 'span' && (container = container.parentNode);
            Array.prototype.forEach.call(container.getElementsByTagName('span'), function (span) {
              if (span.style.fontSize.trim() == '-webkit-xxx-large' || span.style.fontSize.trim() == 'xx-large') {
                span.style.fontSize = value;
              }
              span.normalize();
            });
          } else {
            if (document.queryCommandSupported('styleWithCss')) {
              document.execCommand('styleWithCss', false, false);
            }
            document.execCommand('fontSize', false, 7);

            let fontList = [], spanList = [];
            let container = range.commonAncestorContainer;
            container.nodeType == 3 && (container = container.parentNode);
            container.tagName.toLowerCase() == 'font' && (container = container.parentNode);
            fontList = container.getElementsByTagName('font');
            for (let i = 0; i < fontList.length; i++) {
              let font = fontList[i];
              let span = document.createElement('span');
              Array.prototype.forEach.call(font.attributes, function (attr) {
                attr.nodeName == 'size' ? span.style.fontSize = value : span.setAttribute(attr.nodeName, attr.nodeValue);
              });
              span.innerHTML = font.innerHTML;
              span.querySelectorAll('span').length != 0 && veUtil.command.format(span, 'span', 'fontSize');
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
      },

      formatBlock (name, value) {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)) {
          let range = this.getRange();
          if (!range || range.collapsed) {
            alert(this.lang.ieMsg);
          } else {
            document.execCommand('formatblock', false, '<' + value.toUpperCase() + '>');
          }
        } else {
          document.execCommand('formatblock', false, value);
        }
      },

      formatContent (obj, tagName, cssName) {
        let temp = [];
        let pattern = {fontSize: /font\-size:\s?\d+px;/g, verticalAlign: /vertical\-align:\s?(sub|super);/g};
        let nodeList = obj.getElementsByTagName(tagName);
        for (let i = 0; i < nodeList.length; i++) {
          let node = nodeList[i];
          if (node.attributes.length == 1 && node.style.length != 0 && node.getAttribute('style').match(pattern[cssName]) != null) {
            if (node.children.length == 0) {
              if (node.style.length == 1) {
                let parent = node.parentNode;
                parent.replaceChild(document.createTextNode(node.innerHTML), node);
                parent.normalize();
                i--;
              } else {
                node.style[cssName] = '';
              }
            } else {
              temp.push(node);
            }
          }
        }
        if (temp.length != 0) {
          this.formatContent(obj, tagName, cssName);
        }
      },

      removeFormat (name, value) {
        document.execCommand(name, false, value);
        let range = this.getRange();
        if (!range)return;
        let container = range.commonAncestorContainer;
        container.nodeType == 3 && (container = container.parentNode);
        container.tagName.toLowerCase() == 'span' && (container = container.parentNode);
        this.formatContent(container, 'span', 'verticalAlign');
        container.normalize();
      },

      getRange () {
        let oSel, oRange;
        if (window.getSelection) {
          oSel = window.getSelection();
          if (oSel && oSel.rangeCount != 0) {
            oRange = oSel.getRangeAt(0);
          }
        }
        return oRange;
      },

      setRange (range) {
        let oSel;
        if (window.getSelection) {
          oSel = window.getSelection();
          oSel.removeAllRanges();
          oSel.addRange(range);
        }
      },

      removeRange () {
        let oSel;
        if (window.getSelection) {
          oSel = window.getSelection();
          oSel.removeAllRanges();
        }
      },

      rangeValid () {
        let range = this.getRange();
        return (range && !range.collapsed);
      },

      unlink () {
        let range = this.getRange();
        let container = range.commonAncestorContainer;
        if (container.nodeType == 3) {
          container = container.parentNode;
        }
        if (container.tagName == 'A') {
          let newRange = document.createRange();
          newRange.selectNode(container);
          this.setRange(newRange);
          this.exec('Unlink', null);
          this.removeRange(newRange);
        } else {
          this.exec('Unlink', null);
        }
      }

    })
  }

</script>