<style lang="less" rel="stylesheet/less">
    .ve-code {
        border: 1px solid #ddd;
        border-top: none;
    }
</style>

<template>
    <div class="ve-code" v-show="currentView == 'sourceCode'">
        <textarea name="codemirror" id="codemirror"></textarea>
    </div>
</template>

<script>
    let cmConfig = {
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
            'Ctrl-Q': function (cm) {
                cm.foldCode(cm.getCursor());
            },
            'F11': function (cm) {
                cm.setOption('fullScreen', !cm.getOption('fullScreen'));
            },
            'Esc': function (cm) {
                if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
            }
        }
    };

    import {updateContent} from '../vuex/actions';

    export default {
        data () {
          return {
            editor: null
          }
        },
        vuex: {
          getters: {
              currentView: function(state) {
                  return state.currentView;
              },
              content: function(state) {
                  return state.content;
              }
          },
          actions: {
              updateContent
          }
        },
        watch: {
          'currentView': function () {
              this.editor.setValue(beautifyHTML(this.content, {'indent_inner_html': true, 'indent_size': 2}));
              this.editor.refresh();
              setTimeout(function () {
                  this.editor.refresh();
              }.bind(this), 100);
          }
        },
        ready () {
            this.editor = CodeMirror.fromTextArea(document.getElementById('codemirror'), cmConfig);
            this.editor.on('blur', function () {
                this.updateContent(this.editor.getValue());
            }.bind(this));
        }
    }
</script>