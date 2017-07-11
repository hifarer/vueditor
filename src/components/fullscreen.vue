
<script>
  export default {
    render: function () {
      return '';
    },
    computed: {
      callee: function () {
        return this.$store.state.callee;
      },
      fullscreen: function () {
        return this.$store.state.fullscreen;
      }
    },
    watch: {
      'callee': function (val) {
        if(val.name === 'fullscreen'){
          this.$store.dispatch('setFullScreen', !this.fullscreen);
        }
      }
    }
  }
</script>