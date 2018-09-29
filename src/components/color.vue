
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
    a {
      width: 20px;
      height: 20px;
      margin: 1px;
      float: left;
      cursor: pointer;
    }
  }
  .input {
    max-width: ~"calc(100% - 46px)";
  }
  .btn {
    line-height: 16px;
  }
</style>

<template>
  <div class="ve-color">
    <div :class="['ve-icon', {'ve-active': show && key ==='foreColor', 've-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" :title="lang.foreColor" @click="clickHandler('foreColor', $event)"><i class="icon-file-text-o"></i></a>
    </div>
    <div :class="['ve-icon', {'ve-active': show && key ==='backColor', 've-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" :title="lang.backColor" @click="clickHandler('backColor', $event)"><i class="icon-file-text"></i></a>
    </div>
    <div ref="popup" :class="$style.ctn" :style="position" v-show="show">
      <div class="ve-input-box">
        <input type="text" class="ve-input" :class="$style.input" :placeholder="lang.colorCode" v-model="val">
        <button type="button" class="ve-btn" :class="$style.input" @click="inputHandler">{{lang.ok}}</button>
      </div>
      <div :class="$style.list">
        <a href="javascript:;" v-for="(item, index) in colors" :key="index" :title="item" :style="{background: item}" @click="setColor(item)"></a>
      </div>
    </div>
  </div>
</template>

<script>
  
  import rectMixin from '../mixins/rect'
  import injectMixin from '../mixins/inject'
  
  export default {
    name: 'color',
    props: {
      view: String,
      activeComponent: String
    },
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
        position: { left: 0, top: 0 },
        key: '',
        val: '',
        lang: window.__VUEDITOR_LANGUAGE__.color
      }
    },
    mixins: [rectMixin, injectMixin],
    methods: {
      clickHandler (type, event) {
        if (this.view !== 'design') return
        this.$refs.popup.style.display = 'block' // show the popup menu so that we can get it's offsetWidth
        let obj = event.currentTarget.parentNode
        let rect = obj.getBoundingClientRect()
        let popWidth = this.$refs.popup.offsetWidth
        let showMenu = this.key !== type || this.activeComponent !== 'color'
        this.key = type
        // getPositionForDropdown comes from mixin
        this.position = this.getPositionForDropdown({
          popWidth,
          btnWidth: rect.width,
          btnHeight: rect.height,
          rectLeft: rect.left,
          offsetLeft: obj.offsetLeft
        })
        this.eventHub.$emit('set-active-component', showMenu ? 'color' : '')
      },
      // todo ie输入颜色代码range丢失问题
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
      },
      setColor (val) {
        this.eventHub.$emit('exec-command', {name: this.key, value: val})
        this.eventHub.$emit('set-active-component')
      }
    }
  }
</script>