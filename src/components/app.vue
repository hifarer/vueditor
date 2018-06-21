
<template>
  <div class="vueditor" :class="{'ve-fullscreen': fullscreen}">
    <ve-toolbar 
      :icons="config.toolbar" 
      :view="view" 
      :content="content" 
      :fullscreen="fullscreen"
      :activeComponent="activeComponent">
    </ve-toolbar>
    <div class="ve-container">
      <ve-sourcecode :view="view" :content="content"></ve-sourcecode>
      <ve-design :config="config" :view="view" :content="content"></ve-design>
    </div>
    <ve-picture :uploadUrl="config.uploadUrl" :activeComponent="activeComponent"></ve-picture>
  </div>
</template>

<script>

  import toolbar from './toolbar.vue'
  import design from './design.vue'
  import sourceCode from './sourcecode.vue'
  import picture from './picture.vue'

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
    provide () {
      return {
        range: this.range,
        eventHub: this.eventHub
      }
    },
    components: {
      've-toolbar': toolbar,
      've-design': design,
      've-sourcecode': sourceCode,
      've-picture': picture
    },
    methods: {
      setContent (content) {
        this.content = content
      },
      getContent () {
        return this.content
      }
    },
    created () {
      this.eventHub.$on('set-iframe-win', obj => {
        this.range.setIframeWin(obj)
      })
      this.eventHub.$on('set-active-component', component => {
        this.activeComponent = component
      })
      this.eventHub.$on('set-view', view => {
        this.view = view
      })
      this.eventHub.$on('set-fullscreen', bool => {
        this.fullscreen = bool
      })
      this.eventHub.$on('set-content', this.setContent)
    }
  }
</script>