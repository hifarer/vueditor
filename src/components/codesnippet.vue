
<template>
  <div class="ve-selectbox">
    <div :class="[{'ve-disabled': false}, 've-select']" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': activeComponent !== 'codeSnippet', 've-triangle-up': activeComponent === 'codeSnippet'}"></i>
    </div>
    <ul class="ve-dropdown" v-show="activeComponent === 'codeSnippet'" :style="style">
      <li v-for="(type, index) in list" :key="index" @click="selectHandler(type)">{{type}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import { getConfig } from '../config/'

  export default {
    data () {
      let { lang, pattern } = getConfig('codeSnippet')
      return {
        list: lang,
        val: lang[0],
        tpl: '<pre><code ' + pattern.attr + '="' + pattern.value + '"><br></code></pre>'
      }
    },
    mixins: [vuexMixin],
    computed: {
      activeComponent () {
        return this.mstates.activeComponent
      }
    },
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      clickHandler () {
        if (this.activeComponent === 'codeSnippet') {
          this.setActiveComponent()
        } else {
          this.setActiveComponent('codeSnippet')
        }
      },
      selectHandler (lang) {
        this.val = lang
        this.execCommand({name: 'insertCodeBlock', value: this.tpl.replace(/#lang#/igm, lang)})
        this.setActiveComponent()
      }
    }
  }
</script>