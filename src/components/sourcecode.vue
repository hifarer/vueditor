
<style module>
  :global(.ve-sourcecode) {
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    outline: none;
    border: none;
    resize: none;
    font-size: 14px;
  }
  .half {
    width: 50%;
    float: left;
    border-right: 1px solid #ddd;
  }
</style>

<template>
  <textarea :class="['ve-sourcecode', view === 'markdown' ? $style.half : '']" v-show="view === 'sourceCode' || view === 'markdown'" v-model="code"></textarea>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'

  export default {
    name: 'sourceCode',
    data () {
      return {
        code: ''
      }
    },
    mixins: [vuexMixin],
    computed: {
      view () {
        return this.mstates.view
      },
      content () {
        return this.mstates.content
      }
    },
    watch: {
      'content': function (val) {
        this.code = val
      },
      'code': function (val) {
        this.setContent(val)
      }
    },
    methods: {
      setContent (data) {
        this.$store.dispatch(this.mpath + 'setContent', data)
      }
    }
  }
</script>
