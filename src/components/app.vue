
<template>
  <div class="vueditor" :class="{'ve-fullscreen': fullscreen}">
    <ve-toolbar 
      :btns="config.toolbar"
      :view="view"
      :content="content"
      :fullscreen="fullscreen"
      :activeComponent="activeComponent">
    </ve-toolbar>
    <div class="ve-container">
      <ve-sourcecode :view="view" :content="content"></ve-sourcecode>
      <ve-design :view="view" :content="content" :config="config"></ve-design>
    </div>
    <ve-picture :config="config.upload" :activeComponent="activeComponent"></ve-picture>
  </div>
</template>

<script>

  import Vue from 'vue'
  import Toolbar from './toolbar.vue'
  import Design from './design.vue'
  import SourceCode from './sourcecode.vue'
  import Picture from './picture.vue'

  import Range from '../range.js'

  import '../style/main.less'

  export default {
    data () {
      return {
        activeComponent: '',
        view: 'design',
        content: '',
        fullscreen: false
      }
    },
    components: {
      've-toolbar': Toolbar,
      've-design': Design,
      've-sourcecode': SourceCode,
      've-picture': Picture
    },
    methods: {
      setContent (content) {
        if (this.content !== content) {
          this.content = content
        }
      },
      getContent () {
        return this.content
      }
    },
    provide () {
      this.range = new Range()
      this.eventHub = new Vue()
      return {
        range: this.range,
        eventHub: this.eventHub
      }
    },
    created () {
      this.eventHub.$on('set-view', view => this.view = view)
      this.eventHub.$on('set-content', this.setContent)
      this.eventHub.$on('set-fullscreen', fullscreen => this.fullscreen = fullscreen)
      this.eventHub.$on('set-active-component', component => this.activeComponent = component)
    }
  }
</script>