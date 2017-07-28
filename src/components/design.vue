
<template>
  <div class="ve-design" v-show="view === 'design'">
    <iframe src="about:blank" frameborder="0" @load="init"></iframe>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex'
  import { getLang } from '../config/lang.js'

  export default {
    data () {
      return {
        iframeWin: null,
        iframeDoc: null,
        iframeBody: null,
        timer: null,
        inited: false,
        cache: '',
        lang: getLang('design')
      }
    },

    computed: mapState({
      view: 'view',
      content: 'content',
      command: 'command',
      states: 'toolbar'
    }),

    watch: {
      'view': function (val) {
        if (val !== 'design') {
          clearTimeout(this.timer);
          this.updateContent(this.iframeBody.innerHTML);
        }
      },
      'content': function (val) {
        if (this.inited) {
          this.iframeBody.innerHTML !== val && (this.iframeBody.innerHTML = val);
          this.view === 'design' && this.updateStates();
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
      'callMethod'
    ]), {
      init (event) {
        this.iframeWin = event.target.contentWindow;
        this.iframeDoc = this.iframeWin.document;
        this.iframeBody = this.iframeWin.document.body;
        this.inited = true;
        if (this.cache) {
          this.iframeBody.innerHTML !== this.cache && (this.iframeBody.innerHTML = this.cache);
          this.cache = '';
        }
        this.iframeDoc.designMode = 'on';
        this.iframeBody.style.cssText = 'overflow-x: hidden;';
        this.addEvent();
      },

      // init, selection change
      updateStates () {
        let json = {};
        for (let name in this.states) {
          if(['redo', 'undo'].indexOf(name) === -1){
            if(this.iframeDoc.queryCommandSupported(name)){
              json[name] = this.iframeDoc.queryCommandState(name) ? 'actived' : 'default';
            } else if (name !== 'fullscreen') {
              json[name] = 'default';
            }
          }
        }
        this.updateButtonStates(json);
      },

      addEvent () {
        let timer = null;
        this.iframeDoc.addEventListener('click', () => {
          // throttle
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.view === 'design' && this.updatePopupDisplay();
          }, 200);
          // dispatch selectionchange event in order to throttle
          this.iframeDoc.dispatchEvent(new Event('selectionchange'));
        }, false);
        this.iframeBody.addEventListener('keydown', this.keydownHandler, false);
        this.iframeBody.addEventListener('keyup', this.keyupHandler, false);
        this.selectionChange();
      },

      keydownHandler (event) {
        if (event.ctrlKey && (event.keyCode === 89 || event.keyCode === 90)) {
          event.preventDefault();
          event.keyCode === 89 && this.callMethod({name: 'redo'});
          event.keyCode === 90 && this.callMethod({name: 'undo'});
        }
      },

      keyupHandler (event) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.updateContent(this.iframeBody.innerHTML);
        }, 500);
      },

      selectionChange () {
        let timer = null;
        this.iframeDoc.addEventListener('selectionchange', () => {
          // throttle
          clearTimeout(timer);
          timer = setTimeout(() => {
            this.view === 'design' && this.updateStates();
          }, 200);
        }, false);
        if (!'onselectionchange' in document) {
          let sel = this.getSelection();
          let focusOffset = -1;
          setInterval(() => {
            if (sel && sel.rangeCount) {
              if (focusOffset !== sel.focusOffset) {
                focusOffset = sel.focusOffset;
                this.view === 'design' && this.updateStates();
              }
            } else {
              sel = this.getSelection();
            }
          }, 200);
        }
      },

      exec (name, value) {
        if(this[name]){
          this[name](name, value);
        }else{
          let sel = this.getSelection();
          let range = this.getRange();
          if (!sel || !range)return;
          if (document.queryCommandSupported('styleWithCss')) {
            this.iframeDoc.execCommand('styleWithCss', false, true);
          }
          this.iframeDoc.execCommand(name, false, value)
        }
        this.updateContent(this.iframeBody.innerHTML);
      },

      insertHTML (name, value) {
        let sel = this.getSelection();
        let range = this.getRange();
        if (!sel || !range)return;
        let node = null;
        let frag = this.iframeDoc.createDocumentFragment();
        let obj = this.iframeDoc.createElement('div');
        obj.innerHTML = value;
        while (obj.firstChild) {
          node = obj.firstChild;
          frag.appendChild(node);
        }
        range.insertNode(frag);
        range.setStartAfter(node);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      },

      fontSize (name, value) {
        let selection = this.getSelection();
        let range = this.getRange();
        if (!selection || !range || range.collapsed) {
          return;
        }
        let childNodes = range.cloneContents().childNodes;
        if (childNodes.length === 1 && childNodes[0].nodeType === 1 && childNodes[0].tagName.toLowerCase() === 'span') {
          let span = range.extractContents().childNodes[0];
          span.style.fontSize = value;
          range.insertNode(span);
          range.selectNode(span);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          if (navigator.userAgent.indexOf('Chrome') !== -1 && navigator.userAgent.indexOf('Edge') === -1) {
            if (document.queryCommandSupported('styleWithCss')) {
              this.iframeDoc.execCommand('styleWithCss', false, true);
            }
            this.iframeDoc.execCommand('fontSize', false, 7);
            let container = range.commonAncestorContainer;
            container.nodeType === 3 && (container = container.parentNode);
            container.tagName.toLowerCase() === 'span' && (container = container.parentNode);
            Array.prototype.forEach.call(container.getElementsByTagName('span'), function (span) {
              if (span.style.fontSize.trim() === '-webkit-xxx-large' || span.style.fontSize.trim() === 'xx-large') {
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
            container.nodeType === 3 && (container = container.parentNode);
            container.tagName.toLowerCase() === 'font' && (container = container.parentNode);
            fontList = container.getElementsByTagName('font');
            for (let i = 0; i < fontList.length; i++) {
              let font = fontList[i];
              let span = document.createElement('span');
              Array.prototype.forEach.call(font.attributes, function (attr) {
                attr.nodeName === 'size' ? span.style.fontSize = value : span.setAttribute(attr.nodeName, attr.nodeValue);
              });
              span.innerHTML = font.innerHTML;
              span.querySelectorAll('span').length !== 0 && this.formatContent(span, 'span', 'fontSize');
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
          if (node.attributes.length === 1 && node.style.length !== 0 && node.getAttribute('style').match(pattern[cssName]) != null) {
            if (node.children.length === 0) {
              if (node.style.length === 1) {
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
        if (temp.length !== 0) {
          this.formatContent(obj, tagName, cssName);
        }
      },

      removeFormat (name, value) {
        this.iframeDoc.execCommand(name, false, value);
        let range = this.getRange();
        if (!range)return;
        let container = range.commonAncestorContainer;
        container.nodeType === 3 && (container = container.parentNode);
        container.tagName.toLowerCase() === 'span' && (container = container.parentNode);
        this.formatContent(container, 'span', 'verticalAlign');
        container.normalize();
      },

      getSelection () {
        if(this.iframeWin.getSelection){
          return this.iframeWin.getSelection();
        }
      },

      getRange () {
        let sel = this.getSelection(), range;
        if (sel && sel.rangeCount !== 0) {
          range = sel.getRangeAt(0);
        }
        return range;
      },

      setRange (range) {
        let sel = this.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      },

      removeRange () {
        let sel = this.getSelection();
        sel && sel.removeAllRanges();
      },

      rangeValid () {
        let range = this.getRange();
        return (range && !range.collapsed);
      },

      unlink () {
        let range = this.getRange();
        let container = range.commonAncestorContainer;
        if (container.nodeType === 3) {
          container = container.parentNode;
        }
        if (container.tagName === 'A') {
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