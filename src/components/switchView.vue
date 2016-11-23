
<template>
  <div>
    <a href="javascript:;" title="源码" @click="clickHandler">
      <i class="icon-code"></i>
    </a>
  </div>
</template>

<script>

  import {mapActions} from 'vuex';

  export default {
    data(){
      return {
        editor: null
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