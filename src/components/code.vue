
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
        this.$dispatch('switchView');
        this.editor.setValue(iframeBody.innerHTML);
      }
    },
    ready(){
      this.editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), {
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true,
        theme: 'learncode'
      });
    }
  }
</script>