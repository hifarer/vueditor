

<template>
  <div>
    <a href="javascript:;" :title="lang.title" :class="{'ve-disabled': disabled}" @click="toggle">
      <i class="icon-file-image-o"></i>
    </a>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        lang: this.$store.state.lang.picture
      };
    },
    computed: {
      disabled: function () {
        return this.$store.state.toolbarStates.picture.disabled;
      }
    },
    methods: {
      updatePopupDisplay (current) {
        this.$store.dispatch('updatePopupDisplay', current);
      },
      toggle () {
        !this.disabled && this.updatePopupDisplay('picture');
      }
    }
  }
</script>