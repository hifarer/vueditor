
<script>
  export default {
    computed: {
      action: function () {
        return this.$store.state.action;
      },
      fullScreen: function () {
        return this.$store.state.fullScreen;
      }
    },
    watch: {
      'action': function (data) {
        if(data.name == 'fullScreen'){
          this.$store.dispatch('fullScreen', !this.fullScreen);
        }
      }
    }
  }
</script>