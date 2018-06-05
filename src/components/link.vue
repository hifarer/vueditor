<style module>
  .ctn {
    width: 240px;
    height: 90px;
    margin-left: -102px;
  }
</style>

<template>
  <div class="ve-link">
    <div :title="lang.addLink" :class="['ve-icon', {'ve-active': show, 've-disabled': mstates.view !== 'design'}]" @click="clickHandler"><i class="icon-link"></i></div>
    <div :title="lang.clearLink" :class="['ve-icon', {'ve-disabled': mstates.view !== 'design'}]" @click="clearLink"><i class="icon-unlink"></i></div>
    <div v-show="show" ref="popup" :class="['ve-popover', $style.ctn]" :style="position">
      <div class="ve-pop-arrow"></div>
      <div class="ve-pop-header">{{lang.addLink}}</div>
      <div class="ve-pop-body">
        <div class="ve-input-box">
          <input type="text" class="ve-input" v-model="val">
          <button type="button" class="ve-btn" @click="addLink">{{lang.ok}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import rectMixin from '../mixins/rect'
  import { getLang } from '../config/lang.js'

  export default {
    name: 'link',
    data () {
      return {
        val: '',
        rect: {},
        lang: getLang('link')
      }
    },
    mixins: [vuexMixin, rectMixin],
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      checkValid () {
        let href = this.val
        href.match(/^https?:\/\//igm) === null && (href = 'http://' + href)
        return href
      },
      clickHandler () {
        this.togglePopup(event)
      },
      addLink () {
        let href = this.checkValid()
        this.execCommand({ name: 'createlink', value: href })
        this.setActiveComponent()
      },
      clearLink () {
        let comp = this.$parent.$parent.$refs.design
        let container = comp.getRangeContainerElement()
        if (!container) return
        while (container.tagName && container.tagName.toLowerCase() !== 'a') {
          container = container.parentNode
        }
        if (container.tagName && container.tagName.toLowerCase() === 'a') {
          comp.setRangeAtNode(container)
          comp.exec('unlink', null)
        }
        this.setActiveComponent()
      }
    }
  }
</script>