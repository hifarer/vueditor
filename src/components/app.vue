<template>
  <div class="vueditor" :class="classNames" :id="id" :style="style">
    <toolbar></toolbar>
    <veiframe></veiframe>
    <template v-for="item in list">
      <component v-if="config.toolbar.indexOf(item.replace('ve', '')) != -1" :is="item"></component>
    </template>
  </div>
</template>

<script>

  // the component name can not be any of the html tagName

  import toolbar from './toolbar.vue';
  import veiframe from './iframe.vue';
  
  import color from './color.vue';
  import fontName from './fontname.vue';
  import fontSize from './fontsize.vue';
  import sourceCode from './sourcecode.vue';
  import format from './format.vue';
  import vetable from './table.vue';
  import undo from './undo.vue';
  import velink from './link.vue';
  import emoji from './emoji.vue';
  import picture from './picture.vue';
  import markdown from './markdown.vue';
  import fullScreen from './fullscreen.vue';

  import '../less/style.less';

  export default {
    components: {
      toolbar,
      veiframe,
      sourceCode,
      'foreColor': color,
      'backColor': color,
      fontName,
      fontSize,
      format,
      vetable,
      undo,
      velink,
      emoji,
      picture,
      markdown,
      fullScreen
    },
    methods: {
      setContent (content) {
        this.$store.dispatch('updateContent', content);
      },
      getContent () {
        return this.$store.state.content;
      }
    },
    computed: {
      fullScreen: function () {
        return this.$store.state.fullScreen;
      },
      classNames: function () {
        let arr = this.classList || [];
        if(this.fullScreen){
          arr.push('ve-full-screen');
        }
        return arr;
      },
      style: function (width, height) {
        return {width, height};
      }
    },
    watch: {
      'fullScreen': function (val) {
        if(val){
          this.style = {
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px'
          };
          document.body.scrollTop = 0;
          document.body.style.overflow = 'hidden';
        }else{
          this.style = {};
          document.body.style.overflow = '';
        }
      }
    },
    created () {
      this.list = [
        'fontName', 'fontSize', 'format', 'foreColor', 'backColor', 'vetable', 'undo', 'velink',
        'emoji', 'picture', 'sourceCode', 'markdown', 'fullScreen'
      ];
      this.style = {};
      window.addEventListener('resize', () => {
        this.$store.dispatch('updateRect', {w: window.innerWidth, h: window.innerHeight});
        if(this.fullScreen){
          this.style = {
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px'
          };
        }
      }, false);
    }
  }
</script>