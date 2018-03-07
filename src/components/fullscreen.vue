
<script>

  import vuexMixin from '../mixins/vuex'

  export default {
    render () {
      return ''
    },
    mixins: [vuexMixin],
    computed: {
      fullscreen () {
        return this.mstates.fullscreen
      },
      event () {
        return this.mstates.event
      }
    },
    watch: {
      'event': function (val) {
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