
<template>
  <a href="javascript:;" title="源码" @click="clickHandler">
    <i class="fa fa-code"></i>
  </a>
</template>

<script>

  import {switchView, updateTBDisabled, updateTBDropdownDisplay} from '../vuex/toolbar-actions';

  export default {
    data(){
      return {
        editor: null
      }
    },
    vuex: {
      actions: {
        switchView,
        updateTBDisabled,
        updateTBDropdownDisplay
      }
    },
    methods: {
      clickHandler () {
        this.switchView();
        this.updateTBDisabled();
        this.updateTBDropdownDisplay();
      }
    }
  }
</script>