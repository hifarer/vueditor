
<template>
  <div class="ve-icon" unselectable="on">
    <a href="javascript:;" :title="lang.title" @click.prevent="clickHandler">
      <i class="icon-fullscreen"></i>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: window.__VUEDITOR_LANGUAGE__.fullscreen
    }
  },
  inject: ['eventHub'],
  methods: {
    clickHandler() {
      this.eventHub.$emit('set-fullscreen')
    }
  }
}
</script>