
<style module lang="less" rel="stylesheet/less">
  .ctn {
    li {
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
  <div class="ve-dropdown" :class="$style.ctn" v-show="showPopup" :style="style">
    <ul>
      <li v-for="(size, index) in fontSize" :key="index" @click="clickHandler(size)">{{size}}</li>
    </ul>
  </div>
</template>

<script>
  
  import rectMixin from '../mixins/rect'
  import vuexMixin from '../mixins/vuex'
  import { mapActions } from 'vuex'
  import { getConfig } from '../config/'

  export default {
    mixins: [rectMixin, vuexMixin],
    data () {
      let arr = getConfig('fontSize')
      return {
        fontSize: arr,
        val: arr[0]
      }
    },
    computed: {
      showPopup () {
        return this.editorState.toolbar.fontSize.showPopup
      }
    },
    mounted () {
      this.updateSelectValue({name: 'fontSize', value: this.val})
    },
    methods: {
      updateSelectValue (data) {
        this.$store.dispatch(this.getActionPath('updateSelectValue'), data)
      },
      updatePopupDisplay (data) {
        this.$store.dispatch(this.getActionPath('updatePopupDisplay'), data)
      },
      execCommand (data) {
        this.$store.dispatch(this.getActionPath('execCommand'), data)
      },
      clickHandler (size) {
        this.val = size
        this.execCommand({name: 'fontSize', value: size})
        this.updateSelectValue({name: 'fontSize', value: size})
        this.updatePopupDisplay()
      }
    }
  }
</script>