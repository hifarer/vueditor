
<template>
  <div class="ve-select-box">
    <div :class="[{'ve-disabled': false}, 've-select']" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i>
    </div>
    <ul v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <li v-for="(type, index) in list" :key="index" @click="selectHandler(type)">{{type}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import rectMixin from '../mixins/rect'
  import { getConfig } from '../config/'

  export default {
    name: 'codeSnippet',
    data () {
      let { lang, pattern } = getConfig('codeSnippet')
      return {
        list: lang,
        val: lang[0],
        tpl: '<pre><code ' + pattern.attr + '="' + pattern.value + '"><br></code></pre>',
        rect: {}
      }
    },
    mixins: [vuexMixin, rectMixin],
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      clickHandler () {
        this.togglePopup(event)
      },
      selectHandler (lang) {
        this.val = lang
        this.execCommand({name: 'insertCodeBlock', value: this.tpl.replace(/#lang#/igm, lang)})
        this.setActiveComponent()
      }
    }
  }
</script>