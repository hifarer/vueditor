
<template>
  <div class="ve-element">
    <div :class="['ve-select', {'ve-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" @click="clickHandler"><span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-dropdown" :style="position" @click="selectHandler">
      <a href="javascript:;" v-for="(item, index) in list" :key="index">{{item}}</a>
    </div>
  </div>
</template>

<script>
  
  import injectMixin from '../mixins/inject'
  import rectMixin from '../mixins/rect'
  import { getBrowser } from '../util.js'

  export default {
    name: 'element',
    data () {
      return {
        list: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: 'p',
        rect: {}
      }
    },
    props: {
      view: String,
      activeComponent: String
    },
    mixins: [injectMixin, rectMixin],
    created () {
      this.eventHub.$on('sync-select-value', this.syncValue)
    },
    methods: {
      clickHandler (event) {
        this.togglePopup(event)
      },
      selectHandler (event) {
        let tagName = event.target.innerHTML.trim()
        this.val = tagName
        this.formatBlock(tagName)
        this.eventHub.$emit('set-active-component')
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
      },
      formatBlock (value) {
        let browser = getBrowser()
        let lang = window.__VUEDITOR_LANGUAGE__.element
        if (browser === 'IE') {
          let range = this.range.getRange()
          if (!range || range.collapsed) {
            window.alert(lang.ieMsg)
          } else {
            this.eventHub.$emit('exec-command', {name: 'formatblock', value:'<' + value.toUpperCase() + '>'})
          }
        } else {
          this.eventHub.$emit('exec-command', {name: 'formatblock', value})
        }
      }
    }
  }
</script>