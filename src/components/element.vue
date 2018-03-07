
<style module lang="less" rel="stylesheet/less">
  .ctn {
    li {
      display: block;
      cursor: pointer;
      padding: 6px;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #d5e1f2;
        border-color: #a3bde3;
      }
    }
  }
</style>

<template>
  <div class="ve-dropdown" :class="$style.ctn" @click="selectItem" v-show="showPopup" :style="style">
    <ul>
      <li v-for="(item, index) in arr" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  
  import rectMixin from '../mixins/rect'
  import vuexMixin from '../mixins/vuex'

  export default {
    data () {
      return {
        arr: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        val: 'p'
      }
    },
    mixins: [rectMixin, vuexMixin],
    mounted () {
      this.setSelectValue({name: 'element', value: this.val})
    },
    methods: {
      setSelectValue (data) {
        this.$store.dispatch(this.mpath + 'setSelectValue', data)
      },
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      selectItem (event) {
        let tagName = event.target.innerHTML.trim()
        this.val = tagName
        this.execCommand({name: 'formatBlock', value: tagName})
        this.setSelectValue({name: 'element', value: tagName})
        this.setActiveComponent()
      }
    }
  }
</script>