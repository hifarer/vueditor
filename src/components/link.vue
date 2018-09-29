<style module lang="less" rel="stylesheet/less">
  .ctn {
    width: 240px;
    height: 90px;
  }
  .input {
    max-width: ~"calc(100% - 55px)";
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
    <div v-show="show" ref="popup" :class="['ve-popover', $style.ctn]" :style="position">
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
  
  import injectMixin from '../mixins/inject'
  import rectMixin from '../mixins/rect'

  export default {
    name: 'link',
    props: {
      view: String,
      activeComponent: String
    },
    data () {
      return {
        val: '',
        lang: window.__VUEDITOR_LANGUAGE__.link,
        position: { left: 0, top: 0, arrowLeft: 0 }
      }
    },
    mixins: [injectMixin, rectMixin],
    methods: {
      clickHandler (event) {
        this.toggleMenu(event)
      },
      addLink () {
        let href = this.val
        href.match(/^https?:\/\//igm) === null && (href = 'http://' + href)
        this.eventHub.$emit('exec-command', { name: 'createlink', value: href })
        this.eventHub.$emit('set-active-component')
      },
      // todo unlink IE问题
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