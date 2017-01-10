
<template>
  <div>
    <a href="javascript:;" :title="lang.title" @click="clickHandler">
      <i class="icon-code"></i>
    </a>
  </div>
</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    data(){
      return {
        editor: null,
        lang: this.$store.state.lang.switchView
      }
    },
    methods: Object.assign({}, mapActions([
      'switchView',
      'updateToolbarDisabledStates',
      'updatePopupDisplay'
    ]), {
      clickHandler () {
        this.switchView();
        this.updateToolbarDisabledStates();
        this.updatePopupDisplay();
      }
    })
  }
</script>