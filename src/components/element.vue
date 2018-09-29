
<template>
  <div class="ve-element">
    <div :class="['ve-select', {'ve-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position">
      <a href="javascript:;" v-for="(item, index) in list" :key="index" @click="selectHandler(item)">{{item}}</a>
    </div>
  </div>
</template>

<script>
  
  import injectMixin from '../mixins/inject'
  import rectMixin from '../mixins/rect'
  import { getBrowser } from '../util.js'

  export default {
    name: 'element',
    props: {
      view: String,
      activeComponent: String
    },
    data () {
      return {
        list: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: 'p',
        position: { left: 0, top: 0 }
      }
    },
    mixins: [injectMixin, rectMixin],
    methods: {
      clickHandler (event) {
        this.toggleMenu(event)
      },
      selectHandler (tagName) {
        this.val = tagName
        this.formatBlock(tagName)
        this.eventHub.$emit('set-active-component')
      },
      formatBlock (value) {
        let lang = window.__VUEDITOR_LANGUAGE__.element
        if (getBrowser() === 'IE') {
          let range = this.range.getRange()
          if (!range || range.collapsed) {
            window.alert(lang.ieMsg)
          } else {
            this.eventHub.$emit('exec-command', {name: 'formatblock', value:'<' + value.toUpperCase() + '>'})
          }
        } else {
          this.eventHub.$emit('exec-command', {name: 'formatblock', value})
        }
      },
      syncValue ({ name, value }) {
        if (name !== 'element') return
        let tagName = '--'
        Array.isArray(value) && value.forEach(item => {
          // the first tagName in list
          if (this.list.indexOf(item) !== -1 && tagName === '--') {
            tagName = item
          }
        })
        this.val = tagName
      }
    },
    created () {
      this.eventHub.$on('sync-select-value', this.syncValue)
    }
  }
</script>