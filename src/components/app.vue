<template>
  <div class="vueditor" :class="classList" :id="id">
    <toolbar></toolbar>
    <veiframe></veiframe>
    <sourcecode></sourcecode>
    <template v-for="item in list">
      <component v-if="config.toolbar.indexOf(item.replace('ve', '')) != -1" :is="item" :comp-name="item"></component>
    </template>
  </div>
</template>

<script>

  // the component name can not be any of the html tagName

  import toolbar from './toolbar.vue';
  import veiframe from './iframe.vue';
  import sourcecode from './sourcecode.vue';

  import color from './color.vue';
  import fontName from './fontname.vue';
  import fontSize from './fontsize.vue';
  import switchView from './switchview.vue';
  import format from './format.vue';
  import vetable from './table.vue';
  import undo from './undo.vue';
  import velink from './link.vue';
  import emoji from './emoji.vue';
  import picture from './picture.vue';

  import '../less/style.less';

  export default {
    components: {
      toolbar,
      veiframe,
      sourcecode,
      'foreColor': color,
      'backColor': color,
      fontName,
      fontSize,
      switchView,
      format,
      vetable,
      undo,
      velink,
      emoji,
      picture
    },
    methods: {
      setContent (content) {
        this.$store.dispatch('updateContent', content);
      },
      getContent () {
        return this.$store.state.content;
      }
    },
    created () {
      this.list = [
        'foreColor', 'backColor', 'fontName', 'fontSize', 'switchView', 'format', 'vetable', 'undo', 'velink', 'emoji', 'picture'
      ];
    }
  }
</script>