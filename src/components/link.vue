
<template>
  <div class="ve-link">
    <div :class="['ve-icon', {'ve-active': show, 've-disable': view !== 'design'}]" unselectable="on">
      <a href="javascript:;" :title="lang.addLink" @click="clickHandler"><i class="icon-link"></i></a>
    </div>
    <div :class="['ve-icon', {'ve-disable': view !== 'design'}]" unselectable="on">
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
  
  import mixins from '../mixins'

  export default {
    name: 'link',
    props: {
      view: String,
      activeComponent: String
    },
    data() {
      return {
        val: '',
        position: { left: 0, top: 0, arrowLeft: 0 },
        lang: window.__VUEDITOR_LANGUAGE__.link
      }
    },
    inject: ['editor', 'eventHub'],
    mixins: [mixins],
    methods: {
      clickHandler(event) {
        this.toggleMenu(event)
      },
      addLink() {
        this.editor.addLink(this.val)
        this.eventHub.$emit('set-active-component')
      },
      // todo unlink IE问题
      clearLink() {
        this.editor.clearLink()
        this.eventHub.$emit('set-active-component')
      }
    }
  }
</script>

<style module lang="less" rel="stylesheet/less">
  .ctn {
    width: 240px;
    height: 90px;
  }
  .input {
    max-width: ~"calc(100% - 55px)";
  }
</style>
