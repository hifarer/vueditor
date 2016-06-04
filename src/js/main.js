/**
 * Created by wboll on 2016/5/26.
 */

import toolbar from '../components/toolbar.vue'
import util from '../js/util';

const vm = new Vue({
  el: 'body',
  data: {
    currentView: 'design',
    sourceCode: ''
  },
  components: {
    'toolbar': toolbar
  },
  methods: {
    init () {
      iframeEl = document.querySelector('.ve-iframe');
      iframeWin = iframeEl.contentWindow;
      iframeDoc = iframeWin.document;
      iframeBody = iframeWin.document.body;
      this.setContent('<p>开始的分厘卡士大撒地方卢卡附件里是夫萨拉深刻的风景拉萨孔家店发链接啊算了function(){alert(1);}</p>');
      this.addEvent();
    },
    setContent (content) {
      iframeBody.innerHTML = content;
    },
    addEvent () {
      iframeDoc.addEventListener('selectionchange', this.selectionChange.bind(this), false);

      if (navigator.userAgent.indexOf('Firefox') !== -1) {
        let oSel = iframeWin.getSelection();
        let focusNode = null;
        setInterval(function () {
          if (oSel && oSel.rangeCount) {
            if (focusNode != oSel.focusNode) {
              focusNode = oSel.focusNode;
              this.selectionChange();
            }
          } else {
            oSel = iframeWin.getSelection();
          }
        }.bind(this), 500);
      }
    },
    selectionChange () {
      this.$broadcast('stateChange');
    }
  }

});