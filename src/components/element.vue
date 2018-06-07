
<template>
  <div class="ve-element">
    <div :class="['ve-select', {'ve-disabled': mstates.view !== 'design'}]" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i>
    </div>
    <ul v-show="show" ref="popup" class="ve-dropdown" :style="position" @click="selectHandler">
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import rectMixin from '../mixins/rect'

  export default {
    name: 'element',
    data () {
      return {
        list: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: 'p',
        rect: {}
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
      clickHandler () {
        this.togglePopup(event)
      },
      selectHandler (event) {
        let tagName = event.target.innerHTML.trim()
        this.val = tagName
        this.execCommand({name: 'formatBlock', value: tagName})
        this.setActiveComponent()
      },
      syncValue (parent, child) {
        let tagName = child.tagName.toLowerCase()
        while (parent.contains(child) && tagName !== 'body' && this.list.indexOf(tagName) === -1) {
          child = child.parentNode
          tagName = child.tagName.toLowerCase()
        }
        this.list.indexOf(tagName) !== -1 && (this.val = tagName)
      }
    }
  }
</script>