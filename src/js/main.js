/**
 * Created by wboll on 2016/5/26.
 */

import toolbar from '../components/toolbar.vue'

const vm = new Vue({
  el: 'body',
  data: {
    currentView: 'design',
    sourceCode: ''
  },
  components: {
    'toolbar': toolbar
  },
  events: {
    switchView: function () {
      this.currentView = this.currentView == 'design' ? 'sourceCode' : 'design';
      this.sourceCode = iframeBody.innerHTML;
    }
  },
  methods: {
    init: function () {
      iframeEl = document.querySelector('.ve-iframe');
      iframeWin = iframeEl.contentWindow;
      iframeDoc = iframeWin.document;
      iframeBody = iframeWin.document.body;
      this.setContent('<p>萨拉深刻的风景拉萨孔家店发链接啊算了</p>');
      this.addEvent();
    },
    setContent:function(content) {
      iframeBody.innerHTML = content;
    },
    addEvent: function () {
      iframeDoc.addEventListener('selectionchange', this.selectionChange.bind(this), false);

      if(navigator.userAgent.indexOf('Chrome') == -1){
        var oSel = iframeWin.getSelection();
        var focusNode = null;
        setInterval(function () {
          if (oSel && oSel.rangeCount) {
            if (focusNode != oSel.focusNode) {
              focusNode = oSel.focusNode;
              this.selectionChange();
            }
          }else{
            oSel = iframeWin.getSelection();
          }
        }.bind(this), 500);
      }
    },
    selectionChange: function () {
      this.$broadcast('stateChange');
    }
  }
  
});