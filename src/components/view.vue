
<template>
  <a href="javascript:;" title="源码" @click="clickHandler">
    <i class="fa fa-code"></i>
  </a>
</template>

<script>

  import {switchView, updateToolbarDisabled} from '../vuex/toolbar-actions';

  export default {
    data(){
      return {
        editor: null
      }
    },
    vuex: {
      actions: {
        switchView,
        updateToolbarDisabled
      }
    },
    methods: {
      clickHandler () {
        this.switchView();
        this.updateToolbarDisabled();
      }
    }
  }
</script>