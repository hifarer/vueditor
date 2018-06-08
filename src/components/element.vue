
<template>
  <div class="ve-element">
    <div :class="['ve-select', {'ve-disabled': view !== 'design'}]" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i>
    </div>
    <ul v-show="show" ref="popup" class="ve-dropdown" :style="position" @click="selectHandler">
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  
  import hubMixin from '../mixins/hub'
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
    mixins: [hubMixin, rectMixin],
    created () {
      this.eventHub.$on('sync-element-tag', this.syncValue)
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
      syncValue (parent, child) {
        let tagName = child.tagName.toLowerCase()
        while (parent.contains(child) && tagName !== 'body' && this.list.indexOf(tagName) === -1) {
          child = child.parentNode
          tagName = child.tagName.toLowerCase()
        }
        this.list.indexOf(tagName) !== -1 && (this.val = tagName)
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