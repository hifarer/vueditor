<template>
  <div class="vueditor">
    <template v-for="item in comps">
      <component :is="item"></component>
    </template>
  </div>
</template>

<script>

  import toolbar from './toolbar.vue';
  import pictureDialog from './pictureDialog.vue'
  import editable from './editable.vue';
  import iframe from './iframe.vue';
  import sourcecode from './sourcecode.vue';

  import '../less/style.less';

  export default {
    data () {
      let config = this.$root.config;
      let comps = [
        'toolbar',
        'editable',
        'sourcecode'
      ];
      if(config.toolbar.indexOf('picture') !== -1){
        comps.push('pictureDialog');
      }
      if(config.mode !== 'default'){
        comps[1] = 'iframe';
      }
      return {
        comps: comps
      }
    },
    components: {
      toolbar,
      iframe,
      editable,
      sourcecode,
      pictureDialog
    }
  }
</script>