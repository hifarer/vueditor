
<template>
  <div class="vueditor" :class="{ 've-fullscreen': fullscreen }">
    <ve-toolbar 
      :toolbarList="config.toolbar"
      :view="view"
      :activeComponent="activeComponent"
    />
    <div class="ve-container">
      <div class="ve-wrapper">
        <ve-editor :view="view" />
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'
  import Toolbar from './toolbar.vue'
  import EditorComponent from './editor.vue'

  import Editor from '../core/editor'

  export default {
    data() {
      return {
        view: 'design',
        fullscreen: false,
        activeComponent: ''
      }
    },
    provide() {
      let eventHub = new Vue()
      this.editor = new Editor(eventHub)
      this.eventHub = eventHub
      return {
        config: this.config,
        editor: this.editor,
        eventHub: this.eventHub
      }
    },
    components: {
      've-toolbar': Toolbar,
      've-editor': EditorComponent
    },
    methods: {
      setContent(content) {
        this.editor.setContent(content)
      },
      getContent() {
        return this.editor.getContent()
      }
    },
    created() {
      this.eventHub.$on('set-view', view => this.view = view)
      this.eventHub.$on('set-fullscreen', () => this.fullscreen = !this.fullscreen)
      this.eventHub.$on('set-active-component', component => this.activeComponent = component)
    }
  }
</script>