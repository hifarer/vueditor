
<template>
  <a href="javascript:;" title="源码" @click="sourceCode">
    <i class="fa fa-code"></i>
  </a>
</template>

<script>
//  document.write('<link rel="stylesheet" href="./plugins/codemirror/codemirror.min.css">');
//  document.write('<script type="text/javascript" src="./plugins/codemirror/codemirror.min.js"><\/script>');
//  document.write('<script type="text/javascript" src="./plugins/codemirror/javascript.min.js"><\/script>');

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
          this.editor.setValue(beautifyHTML(iframeBody.innerHTML, {'indent_inner_html': true}));
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
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        autoCloseTags: true,
        mode: 'htmlmixed',
        scrollbarStyle: 'null',
        viewportMargin: Infinity,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        extraKeys: {
          "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); },
          "F11": function(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          "Esc": function(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          }
        }
      });
    }
  }
</script>