
<template>
  <a href="javascript:;" title="源码" @click="sourceCode">
    <i class="fa fa-code"></i>
  </a>
</template>

<script>

  export default {
    data(){
      return {
        editor: null
      }
    },
    methods: {
      sourceCode () {
        if(this.$root.currentView == 'design'){
          this.$root.currentView = 'sourceCode';
          this.$root.sourceCode = iframeBody.innerHTML;
          this.editor.setValue(beautifyHTML(iframeBody.innerHTML, {'indent_inner_html': true, 'indent_size': 2}));
          setTimeout(function () {
            this.editor.refresh();
          }.bind(this), 100);
        }else{
          this.$root.currentView = 'design';
          this.$root.sourceCode = this.editor.getValue();
          iframeBody.innerHTML = this.$root.sourceCode;
        }
      }
    },
    ready(){
      this.editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
        mode: 'htmlmixed',
        scrollbarStyle: 'null',
        viewportMargin: Infinity,
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        autoCloseTags: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        extraKeys: {
          'Ctrl-Q': function(cm){ cm.foldCode(cm.getCursor()); },
          'F11': function(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
          'Esc': function(cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
          }
        }
      });
    }
  }
</script>