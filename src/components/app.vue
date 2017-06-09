
<template>
  <div class="vueditor" :id="id" :class="classNames">
    <toolbar></toolbar>
    <design></design>
    <template v-for="item in list">
      <component v-if="config.toolbar.indexOf(item.replace('ve', '')) !== -1" :is="item"></component>
    </template>
  </div>
</template>

<script>

  // the component name can not be any of the html tagName

  import toolbar from './toolbar.vue'
  import design from './design.vue'
  
  import color from './color.vue'
  import fontName from './fontname.vue'
  import fontSize from './fontsize.vue'
  import sourceCode from './sourcecode.vue'
  import format from './format.vue'
  import vetable from './table.vue'
  import undo from './undo.vue'
  import velink from './link.vue'
  import picture from './picture.vue'
  import markdown from './markdown.vue'
  import fullScreen from './fullscreen.vue'

  import '../style/style.less'

  export default {
    components: {
      toolbar,
      design,
      sourceCode,
      'foreColor': color,
      'backColor': color,
      fontName,
      fontSize,
      format,
      vetable,
      undo,
      velink,
      picture,
      markdown,
      fullScreen
    },
    computed: {
      fullScreen: function () {
        return this.$store.state.fullScreen;
      },
      classNames: function () {
        let arr = (this.classList || []).concat();
        if(this.fullScreen){
          arr.push('ve-full-screen');
        }
        return arr;
      }
    },
    methods: {
      setContent (content) {
        this.$store.dispatch('updateContent', content);
      },
      getContent () {
        return this.$store.state.content;
      }
    }
  }
</script>