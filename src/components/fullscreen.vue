
<script>
  export default {
    computed: {
      callee: function () {
        return this.$store.state.callee;
      },
      fullScreen: function () {
        return this.$store.state.fullScreen;
      }
    },
    watch: {
      'callee': function (val) {
        if(val.name === 'fullScreen'){
          this.$store.dispatch('setFullScreen', !this.fullScreen);
        }
      }
    }
  }
</script>