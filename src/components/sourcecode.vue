
<style>
  .ve-sourcecode {
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
  /* .border {
    width: 50%;
    border-right: 1px solid #ddd;
  } */
</style>

<template>
  <textarea 
    :class="['ve-sourcecode', view === 'markdown' ? '' : '']" 
    v-show="view === 'sourceCode' || view === 'markdown'"
    v-model="code"
  ></textarea>
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
      },
      event () {
        return this.mstates.event
      }
    },
    watch: {
      'view': function (val) {
        if (val === 'sourceCode') {
          this.code = this.content
        }
      },
      'code': function (val) {
        this.setContent(val)
      },
      'content': function (val) {
        this.setContent(val)
      },
      'event': function (val) {
        if (val.name === 'sourceCode') {
          this.setView(this.view === 'sourceCode' ? 'design' : 'sourceCode')
          this.setActiveComponent()
        }
      }
    },
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      setContent (data) {
        this.$store.dispatch(this.mpath + 'setContent', data)
      },
      setView (data) {
        this.$store.dispatch(this.mpath + 'setView', data)
      }
    }
  }
</script>
