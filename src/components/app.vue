
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

  import { mapState } from 'vuex'

  import toolbar from './toolbar.vue'
  import design from './design.vue'
  
  import color from './color.vue'
  import fontName from './fontname.vue'
  import fontSize from './fontsize.vue'
  import sourceCode from './sourcecode.vue'
  import code from './code.vue'
  import element from './element.vue'
  import table from './table.vue'
  import undo from './undo.vue'
  import link from './link.vue'
  import picture from './picture.vue'
  import markdown from './markdown.vue'
  import fullscreen from './fullscreen.vue'

  import createStore from '../store/states.js'

  import '../style/style.less'

  export default {
    props: ['moduleName'],
    components: {
      've-toolbar': toolbar,
      've-design': design,
      've-sourcecode': sourceCode,
      've-code': code,
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
    computed: mapState({
      content (state) {
        return this.moduleName ? state[this.moduleName].content : state.content
      },
      fullscreen (state) {
        return this.moduleName ? state[this.moduleName].fullscreen : state.fullscreen
      }
    }),
    methods: {
      setContent (content) {
        let path = this.moduleName ? this.moduleName + '/updateContent' : 'updateContent'
        this.$store.dispatch(path, content)
      },
      getContent () {
        return this.content
      }
    },
    created () {
      let vuexModule = createStore()
      // let { state } = vuexModule
      // vuexModule.state = () => {
      //   return JSON.parse(JSON.stringify(state))
      // }
      this.$store.registerModule(this.moduleName, vuexModule)
    }
  }
</script>