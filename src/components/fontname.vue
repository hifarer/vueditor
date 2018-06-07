
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
  <div class="ve-fontname">
    <div :class="['ve-select', $style.select, {'ve-disabled': mstates.view !== 'design'}]" @click="clickHandler">
      <span>{{val}}</span><i :class="{'ve-triangle-down': !show, 've-triangle-up': show}"></i>
    </div>
    <ul v-show="show" ref="popup" class="ve-dropdown" :style="style">
      <li v-for="(item, index) in list" :key="index" @click="selectHandler(item)" :style="{fontFamily: item.val + ', sans-serif'}">{{item.abbr || item.val}}</li>
    </ul>
  </div>
</template>

<script>
  
  import vuexMixin from '../mixins/vuex'
  import rectMixin from '../mixins/rect'

  export default {
    name: 'fontName',
    data () {
      return {
        list: [
          { val: 'arial black' },
          { val: 'times new roman' },
          { val: 'Courier New' }
        ],
        val: 'arial black'
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
      selectHandler (font) {
        this.val = font.abbr || font.val
        this.execCommand({name: 'fontName', value: font.val + ', sans-serif'})
        this.setActiveComponent()
      },
      syncValue (fontName) {
        this.list.filter(item => item.val === fontName).length !== 0 && (this.val = fontName)
      }
    }
  }
</script>