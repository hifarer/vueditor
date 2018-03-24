
<template>
  <div class="ve-selectbox">
    <div :class="[{'ve-disabled': false}, 've-select']" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': activeComponent !== 'element', 've-triangle-up': activeComponent === 'element'}"></i>
    </div>
    <ul class="ve-dropdown" @click="selectHandler" v-show="activeComponent === 'element'" :style="style">
      <li v-for="(item, index) in list" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'

  export default {
    data () {
      return {
        list: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: 'p'
      }
    },
    mixins: [vuexMixin],
    computed: {
      activeComponent () {
        return this.mstates.activeComponent
      }
    },
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      clickHandler () {
        if (this.activeComponent === 'element') {
          this.setActiveComponent()
        } else {
          this.setActiveComponent('element')
        }
      },
      selectHandler (event) {
        let tagName = event.target.innerHTML.trim()
        this.val = tagName
        this.execCommand({name: 'formatBlock', value: tagName})
        this.setActiveComponent()
      }
    }
  }
</script>