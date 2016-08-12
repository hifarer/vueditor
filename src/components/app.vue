<template>
  <div class="vueditor" @click="setActive">
    <toolbar></toolbar>
    <div class="ve-body">
      <div class="ve-design" v-show="currentView == 'design'">
        <iframe src="../dist/iframe/page.html" frameborder="0" class="ve-iframe" @load="init"></iframe>
      </div>
      <div class="ve-code" v-show="currentView == 'sourceCode'">
        <textarea name="codemirror" id="codemirror">{{sourceCode}}</textarea>
      </div>
    </div>
  </div>
</template>

<script>

  import toolbar from '../components/toolbar.vue';

  export default {
    data () {
      return {
        currentView: 'design',
        sourceCode: ''
      };
    },
    components: {
      'toolbar': toolbar
    },
    watch: {
      'currentView': function () {
        let available = this.currentView == 'design';
        this.$broadcast('availableState', available);
      }
    },
    methods: {
      init (event) {
        iframeEle = event.target;
        iframeWin = iframeEle.contentWindow;
        iframeDoc = iframeWin.document;
        iframeBody = iframeWin.document.body;
        this.setContent('<p>开始的分厘卡士大撒地方卢卡附件里是夫萨拉深刻的风景拉萨孔家店发链接啊算了function(){alert(1);}</p>');
        this.addEvent();
      },
      setContent (content) {
        iframeBody.innerHTML = content;
      },
      setActive (event) {
        iframeEle = event.currentTarget.getElementsByTagName('iframe').item(0);
        iframeWin = iframeEle.contentWindow;
        iframeDoc = iframeWin.document;
        iframeBody = iframeWin.document.body;
      },
      addEvent () {

        iframeBody.addEventListener('focus', function (event){
          this.$broadcast('dropdownToggle', null);
          iframeBody = event.currentTarget;
          iframeDoc = iframeBody.ownerDocument;
          iframeWin = iframeDoc.defaultView;
          iframeEle = iframeWin.frameElement;
        }.bind(this), false);

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
        this.$broadcast('activeState');
      }
    }
  }

</script>