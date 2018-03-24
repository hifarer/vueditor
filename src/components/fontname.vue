
<style module lang="less" rel="stylesheet/less">
  .select {
    width: 100px;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>

<template>
  <div class="ve-selectbox">
    <div :class="[{'ve-disabled': false}, 've-select', $style.select]" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': activeComponent !== 'fontName', 've-triangle-up': activeComponent === 'fontName'}"></i>
    </div>
    <ul class="ve-dropdown" v-show="activeComponent === 'fontName'" :style="style">
      <li v-for="(item, index) in list" :key="index" @click="selectHandler(item)" :style="{fontFamily: item.val + ', sans-serif'}">{{item.abbr || item.val}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import { getConfig } from '../config/'

  export default {
    data () {
      let arr = getConfig('fontName')
      return {
        list: arr,
        val: arr[0].abbr || arr[0].val
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
        if (this.activeComponent === 'fontName') {
          this.setActiveComponent()
        } else {
          this.setActiveComponent('fontName')
        }
      },
      selectHandler (font) {
        this.val = font.abbr || font.val
        this.execCommand({name: 'fontName', value: font.val + ', sans-serif'})
        this.setActiveComponent()
      }
    }
  }
</script>