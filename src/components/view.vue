
<template>
  <a href="javascript:;" title="源码" @click="clickHandler">
    <i class="fa fa-code"></i>
  </a>
</template>

<script>

  import {switchView, updateTBDisabled} from '../vuex/toolbar-actions';

  export default {
    data(){
      return {
        editor: null
      }
    },
    vuex: {
      actions: {
        switchView,
        updateTBDisabled
      }
    },
    methods: {
      clickHandler () {
        this.switchView();
        this.updateTBDisabled();
      }
    }
  }
</script>