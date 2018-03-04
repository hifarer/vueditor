
<script>

  import { mapState } from 'vuex'

  export default {
    render: function () {
      return ''
    },
    computed: mapState('vueditor', {
      fullscreen: state => state.fullscreen,
      callee: state => state.callee
    }),
    watch: {
      'callee': function (val) {
        if (val.name === 'fullscreen') {
          this.$store.dispatch('vueditor/setFullScreen', !this.fullscreen)
        }
      }
    }
  }
</script>