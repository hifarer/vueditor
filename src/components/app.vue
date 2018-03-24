
<template>
  <div class="vueditor" :id="config.id" :class="[{'ve-fullscreen': fullscreen}].concat(config.classList)">
    <ve-toolbar></ve-toolbar>
    <ve-design ref="design"></ve-design>
    <template v-for="item in list">
      <component v-if="config.toolbar.indexOf(item) !== -1" :is="'ve-' + item.toLowerCase()"></component>
    </template>
  </div>
</template>

<script>

  import toolbar from './toolbar.vue'
  import design from './design.vue'
  
  import sourceCode from './sourcecode.vue'
  import table from './table.vue'
  import link from './link.vue'
  import picture from './picture.vue'
  import markdown from './markdown.vue'

  import createStore from '../store/index.js'
  import { createNonceStr } from '../util.js'
  import { getLang } from '../config/lang.js'

  import '../style/style.less'

  export default {
    components: {
      've-toolbar': toolbar,
      've-design': design,
      've-sourcecode': sourceCode,
      've-markdown': markdown,
      've-picture': picture
    },
    computed: {
      content () {
        let states = this.namespace ? this.$store.state[this.namespace] : this.$store.state
        return states.content
      },
      fullscreen () {
        let states = this.namespace ? this.$store.state[this.namespace] : this.$store.state
        return states.fullscreen
      }
    },
    methods: {
      setContent (content) {
        let path = this.namespace ? this.namespace + '/setContent' : 'setContent'
        this.$store.dispatch(path, content)
      },
      getContent () {
        return this.content
      }
    },
    created () {
      let lang = getLang('app')
      if (!this.$store) {
        throw new Error(lang.noStore)
      } else {
        this.namespace = createNonceStr()
        this.$store.registerModule(this.namespace, createStore())
      }
    }
  }
</script>