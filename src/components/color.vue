
<style module lang="less" rel="stylesheet/less">
  .ctn {
    width: 176px;
    padding: 10px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
  }
  .list {
    overflow: hidden;
  }
  .list span {
    width: 20px;
    height: 20px;
    margin: 1px;
    float: left;
    cursor: pointer;
  }
  .input {
    max-width: ~"calc(100% - 35px)";
  }
  .btn {
    line-height: 16px;
  }
</style>

<template>
  <div class="ve-color">
    <div :title="lang.foreColor" :class="['ve-icon', {'ve-active': show && key ==='foreColor', 've-disabled': view !== 'design'}]" @click="clickHandler('foreColor', $event)"><i class="icon-file-text-o"></i></div>
    <div :title="lang.backColor" :class="['ve-icon', {'ve-active': show && key ==='backColor', 've-disabled': view !== 'design'}]" @click="clickHandler('backColor', $event)"><i class="icon-file-text"></i></div>
    <div ref="popup" :class="$style.ctn" :style="position" v-show="show">
      <div class="ve-input-box">
        <input type="text" class="ve-input" :class="$style.input" :placeholder="lang.colorCode" v-model="val">
        <button type="button" class="ve-btn" :class="$style.input" @click="inputHandler">{{lang.ok}}</button>
      </div>
      <div :class="$style.list">
        <span v-for="(item, index) in colors" :key="index" :title="item" :style="{background: item}" @click="setColor(item)"></span>
      </div>
    </div>
  </div>
</template>

<script>
  
  import rectMixin from '../mixins/rect'
  import hubMixin from '../mixins/hub'
  
  export default {
    name: 'color',
    data () {
      return {
        colors: [
          '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
          '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
          '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
          '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
          '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
          '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
          '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
          '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
        ],
        key: '',
        val: '',
        rect: {},
        lang: window.__VUEDITOR_LANGUAGE__.color
      }
    },
    props: {
      view: String,
      activeComponent: String
    },
    mixins: [rectMixin, hubMixin],
    methods: {
      setActiveComponent (data) {
        this.eventHub.$emit('set-active-component', data)
      },
      clickHandler (type, event) {
        if (this.view !== 'design') {
          return
        }
        let obj = event.currentTarget
        this.rect = {
          left: obj.offsetLeft,
          top: obj.offsetTop,
          width: obj.offsetWidth,
          height: obj.offsetHeight + parseInt(window.getComputedStyle(obj).marginBottom)
        }
        if (this.key === type && this.activeComponent === 'color') {
          this.setActiveComponent()
        } else {
          this.setActiveComponent('color')
        }
        this.key = type
      },
      setColor (val) {
        this.eventHub.$emit('exec-command', {name: this.key, value: val})
        this.setActiveComponent()
      },
      inputHandler () {
        let color = this.val
        let valid = this.checkValid(color)
        if (!valid) {
          window.alert(this.lang.invalidColorCodeMsg)
        } else {
          this.setColor(color)
        }
      },
      checkValid (val) {
        let sColor = val.replace(/\s+/g, '')
        let hsl3 = /^#[0-9a-f]{3}$/i
        let hsl6 = /^#[0-9a-f]{6}$/i
        let rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/
        if (hsl3.test(sColor) || hsl6.test(sColor) || rgb.test(sColor)) {
          return true
        }
      }
    }
  }
</script>