
<template>
  <div class="ve-design" v-show="view == 'design'">
    <iframe src="about:blank" frameborder="0" @load="init"></iframe>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    data () {
      return {
        iframeWin: null,
        iframeDoc: null,
        iframeBody: null,
        timer: null,
        inited: false,
        cache: '',
        lang: this.$parent.lang.design
      }
    },

    computed: mapState({
      view: 'view',
      content: 'content',
      command: 'command',
      states: 'toolbar',
    }),

    watch: {
      'view': function (val) {
        if (val == 'design') {
          this.updateStates();
        }else{
          clearTimeout(this.timer);
          this.updateContent(this.iframeBody.innerHTML);
          this.updateStates({});
        }
      },
      'content': function (val) {
        if (this.inited) {
          this.iframeBody.innerHTML != val && (this.iframeBody.innerHTML = val);
          this.view == 'design' && this.updateStates();
        } else {
          this.cache = val;
        }
      },
      'command': function (data) {
        this.exec(data.name, data.value);
      }
    },

    methods: Object.assign({}, mapActions([
      'updateContent',
      'updateButtonStates',
      'updatePopupDisplay',
      'exec'
    ]), {
      init (event) {
        this.iframeWin = event.target.contentWindow;
        this.iframeDoc = this.iframeWin.document;
        this.iframeBody = this.iframeWin.document.body;
        this.inited = true;
        if (this.cache) {
          this.iframeBody.innerHTML != this.cache && (this.iframeBody.innerHTML = this.cache);
          this.cache = '';
        }
        this.iframeDoc.designMode = 'on';
        this.addEvent();
      },

      // content change, selection change, view change
      updateStates (data) {
        if(!data){
          let json = {};
          for (let name in this.states) {
            if(['redo', 'undo'].indexOf(name) == -1){
              if(this.iframeDoc.queryCommandSupported(name)){
                json[name] = this.iframeDoc.queryCommandState(name) ? 'actived' : 'default';
              }else{
                json[name] = 'default';
              }
            }
          }
          this.updateButtonStates(json);
        }else{
          this.updateButtonStates();
        }
      },

      addEvent () {
        this.selectionChange();
        this.iframeDoc.addEventListener('click', () => {
          this.updatePopupDisplay();
        }, false);
        this.iframeBody.addEventListener('keydown', this.keydownHandler, false);
        this.iframeBody.addEventListener('keyup', this.keyupHandler, false);
      },

      keydownHandler (event) {
        if (event.ctrlKey && (event.keyCode == 89 || event.keyCode == 90)) {
          event.preventDefault();
          event.keyCode == 89 && this.callAction({name: 'redo'});
          event.keyCode == 90 && this.callAction({name: 'undo'});
        }
      },

      keyupHandler (event) {
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          this.updateContent(this.iframeBody.innerHTML);
        }.bind(this), 500);
      },

      selectionChange () {
        let timer = null;
        this.iframeDoc.addEventListener('selectionchange', function () {
          // throttle
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.view == 'design' && this.updateStates();
          }, 300);
        }.bind(this), false);
        if (navigator.userAgent.indexOf('Firefox') !== -1) {
          let oSel = this.iframeWin.getSelection();
          let focusOffset = -1;
          setInterval(function () {
            if (oSel && oSel.rangeCount) {
              if (focusOffset != oSel.focusOffset) {
                focusOffset = oSel.focusOffset;
                this.view == 'design' && this.updateStates();
              }
            } else {
              oSel = this.iframeWin.getSelection();
            }
          }.bind(this), 300);
        }
      },

      exec (name, value) {
        if (document.queryCommandSupported('styleWithCss')) {
          this.iframeDoc.execCommand('styleWithCss', false, true);
        }
        this[name] ? this[name](name, value) : this.iframeDoc.execCommand(name, false, value);
        this.updateContent(this.iframeBody.innerHTML);
      },

      insertHTML (name, value) {
        let oSel = this.iframeWin.getSelection();
        let oRange = this.getRange();
        if (!oRange)return;
        let node = null;
        let frag = this.iframeDoc.createDocumentFragment();
        let obj = this.iframeDoc.createElement('div');
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
        let selection = this.iframeWin.getSelection();
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
              this.iframeDoc.execCommand('styleWithCss', false, true);
            }
            this.iframeDoc.execCommand('fontSize', false, 7);
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
              this.iframeDoc.execCommand('styleWithCss', false, false);
            }
            this.iframeDoc.execCommand('fontSize', false, 7);

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
            this.iframeDoc.execCommand('formatblock', false, '<' + value.toUpperCase() + '>');
          }
        } else {
          this.iframeDoc.execCommand('formatblock', false, value);
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
        this.iframeDoc.execCommand(name, false, value);
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
        if (this.iframeWin.getSelection) {
          oSel = this.iframeWin.getSelection();
          if (oSel && oSel.rangeCount != 0) {
            oRange = oSel.getRangeAt(0);
          }
        }
        return oRange;
      },

      setRange (range) {
        let oSel;
        if (this.iframeWin.getSelection) {
          oSel = this.iframeWin.getSelection();
          oSel.removeAllRanges();
          oSel.addRange(range);
        }
      },

      removeRange () {
        let oSel;
        if (this.iframeWin.getSelection) {
          oSel = this.iframeWin.getSelection();
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