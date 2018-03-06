
<script>

  import vuexMixin from '../mixins/vuex'

  export default {
    mixins: [vuexMixin],
    render () {
      return ''
    },
    computed: {
      fullscreen () {
        return this.mstates.fullscreen
      },
      callee () {
        return this.mstates.callee
      }
    },
    watch: {
      'callee': function (val) {
        if (val.name === 'fullscreen') {
          this.setFullScreen(!this.fullscreen)
        }
      }
    },
    methods: {
      setFullScreen (bool) {
        this.$store.dispatch(this.mpath + 'setFullScreen', bool)
      }
    }
  }
</script>