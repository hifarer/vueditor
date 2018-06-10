<style module>
  .ctn {
    width: 240px;
    height: 90px;
    margin-left: -102px;
  }
  .input {
    max-width: calc(100% - 55px);
  }
</style>

<template>
  <div class="ve-link">
    <div :class="['ve-icon', {'ve-active': show, 've-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" :title="lang.addLink" @click="clickHandler"><i class="icon-link"></i></a>
    </div>
    <div :class="['ve-icon', {'ve-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" :title="lang.clearLink" @click="clearLink"><i class="icon-unlink"></i></a>
    </div>
    <div v-show="show" ref="popup" :class="['ve-popover', $style.ctn]" :style="{left: position.left, top: position.top, marginLeft: position.popLeft}">
      <div class="ve-pop-arrow" :style="{left: position.arrowLeft}"></div>
      <div class="ve-pop-header">{{lang.addLink}}</div>
      <div class="ve-pop-body">
        <div class="ve-input-box">
          <input type="text" :class="['ve-input', $style.input]" v-model="val">
          <button type="button" class="ve-btn" @click="addLink">{{lang.ok}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  import hubMixin from '../mixins/hub'
  import rectMixin from '../mixins/rect'

  export default {
    name: 'link',
    data () {
      return {
        val: '',
        rect: {},
        lang: window.__VUEDITOR_LANGUAGE__.link
      }
    },
    props: {
      view: String,
      activeComponent: String
    },
    mixins: [hubMixin, rectMixin],
    methods: {
      checkValid () {
        let href = this.val
        href.match(/^https?:\/\//igm) === null && (href = 'http://' + href)
        return href
      },
      clickHandler (event) {
        this.togglePopup(event)
      },
      addLink () {
        let href = this.checkValid()
        this.eventHub.$emit('exec-command', { name: 'createlink', value: href })
        this.eventHub.$emit('set-active-component')
      },
      clearLink () {
        let container = this.range.getContainer()
        if (!container) return
        while (container.tagName && container.tagName.toLowerCase() !== 'a') {
          container = container.parentNode
        }
        if (container.tagName && container.tagName.toLowerCase() === 'a') {
          this.range.setRangeAtNode(container)
          this.eventHub.$emit('exec-command', { name: 'unlink', value: null })
        }
        this.eventHub.$emit('set-active-component')
      }
    }
  }
</script>