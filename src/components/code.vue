
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
        let app = this.$root.$children[0];
        if(app.currentView == 'design'){
          app.currentView = 'sourceCode';
          app.sourceCode = iframeBody.innerHTML;
          this.$dispatch('dropdownToggle', this);
          this.editor.setValue(beautifyHTML(iframeBody.innerHTML, {'indent_inner_html': true, 'indent_size': 2}));
          setTimeout(function () {
            this.editor.refresh();
          }.bind(this), 100);
        }else{
          app.currentView = 'design';
          app.sourceCode = this.editor.getValue();
          iframeBody.innerHTML = app.sourceCode;
        }
      },
      switchView () {

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