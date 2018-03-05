
<script>

  import { mapState } from 'vuex'
  import vuexMixin from '../mixins/vuex'

  export default {
    mixins: [vuexMixin],
    render () {
      return ''
    },
    computed: {
      fullscreen () {
        return this.editorState.fullscreen
      },
      callee () {
        return this.editorState.callee
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
        this.$store.dispatch(this.getActionPath('setFullScreen'), bool)
      }
    }
  }
</script>