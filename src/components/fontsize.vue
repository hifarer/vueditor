

<template>
  <div class="ve-selectbox">
    <div :class="[{'ve-disabled': false}, 've-select']" @click="selectHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': activeComponent !== 'fontSize', 've-triangle-up': activeComponent === 'fontSize'}"></i>
    </div>
    <ul class="ve-dropdown" v-show="activeComponent === 'fontSize'">
      <li v-for="(size, index) in list" :key="index" @click="clickHandler(size)">{{size}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import { getConfig } from '../config/'

  export default {
    data () {
      let arr = getConfig('fontSize')
      return {
        list: arr,
        val: arr[0]
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
      selectHandler () {
        if (this.activeComponent === 'fontSize') {
          this.setActiveComponent()
        } else {
          this.setActiveComponent('fontSize')
        }
      },
      clickHandler (size) {
        this.val = size
        this.execCommand({name: 'fontSize', value: size})
        this.setActiveComponent()
      }
    }
  }
</script>