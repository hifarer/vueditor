
<template>
  <div class="vueditor" :id="config.id" :class="[{'ve-fullscreen': fullscreen}].concat(config.classList)">
    <ve-toolbar></ve-toolbar>
    <ve-design></ve-design>
    <template v-for="item in list">
      <component v-if="config.toolbar.indexOf(item) !== -1" :tagName="item" :is="'ve-' + item.toLowerCase()"></component>
    </template>
  </div>
</template>

<script>

  import toolbar from './toolbar.vue'
  import design from './design.vue'
  
  import color from './color.vue'
  import fontName from './fontname.vue'
  import fontSize from './fontsize.vue'
  import sourceCode from './sourcecode.vue'
  import element from './element.vue'
  import table from './table.vue'
  import undo from './undo.vue'
  import link from './link.vue'
  import picture from './picture.vue'
  import markdown from './markdown.vue'
  import fullscreen from './fullscreen.vue'

  import '../style/style.less'

  export default {
    components: {
      've-toolbar': toolbar,
      've-design': design,
      've-sourcecode': sourceCode,
      've-forecolor': color,
      've-backcolor': color,
      've-fontname': fontName,
      've-fontsize': fontSize,
      've-element': element,
      've-table': table,
      've-link': link,
      've-undo': undo,
      've-picture': picture,
      've-markdown': markdown,
      've-fullscreen': fullscreen
    },
    computed: {
      fullscreen: function () {
        return this.$store.state.fullscreen
      }
    },
    methods: {
      setContent (content) {
        this.$store.dispatch('updateContent', content)
      },
      getContent () {
        return this.$store.state.content
      }
    }
  }
</script>