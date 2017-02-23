
<script>

  import { mapActions } from 'vuex';

  export default {
    data(){
      return {
        lang: this.$parent.lang.switchView
      }
    },
    computed: {
      action: function () {
        return this.$store.state.action;
      },
    },
    watch: {
      'action': function (data) {
        data.name == 'switchView' && this.switch();
      }
    },
    methods: Object.assign({}, mapActions([
      'switchView',
      'updatePopupDisplay'
    ]), {
      switch () {
        this.switchView();
        this.updatePopupDisplay();
      }
    })
  }
</script>