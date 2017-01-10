<style lang="less" rel="stylesheet/less">
  .colorpicker {
    width: 176px;
    padding: 10px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    li {
      margin: 1px;
      float: left;
      a {
        display: block;
        width: 20px;
        height: 20px;
      }
    }
    .ve-input {
      max-width: ~"calc(100% - 35px)";
    }
    .ve-btn {
      line-height: 16px;
    }
  }
</style>

<template>
  <div>
    <a href="javascript:;" :title="compName == 'foreColor' ? lang.foreColor : lang.backColor"
       :class="{'ve-active': this.display, 've-disabled': this.disabled}"
       @click="toggle">
      <i :class="{'icon-file-text': compName == 'backColor', 'icon-file-text-o': compName == 'foreColor'}"></i>
    </a>
    <div class="ve-toolbar-dropdown colorpicker" v-show="display">
      <div class="ve-input-box">
        <input type="text" class="ve-input" :placeholder="lang.colorCode" v-model="color">
        <button type="button" class="ve-btn" @click="inputHandler">{{lang.ok}}</button>
      </div>
      <ul>
        <li v-for="color in colors" @click="clickHandler(color)">
          <a href="javascript:;" :title="color" :style="{background: color}"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  var colors = [
    '#000000', '#424242', '#636363', '#9C9C94', '#CEC6CE', '#EFEFEF', '#F7F7F7', '#FFFFFF',
    '#FF0000', '#FF9C00', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9C00FF', '#FF00FF',
    '#F7C6CE', '#FFE7CE', '#FFEFC6', '#D6EFD6', '#CEDEE7', '#CEE7F7', '#D6D6E7', '#E7D6DE',
    '#E79C9C', '#FFC69C', '#FFE79C', '#B5D6A5', '#A5C6CE', '#9CC6EF', '#B5A5D6', '#D6A5BD',
    '#E76363', '#F7AD6B', '#FFD663', '#94BD7B', '#73A5AD', '#6BADDE', '#8C7BC6', '#C67BA5',
    '#CE0000', '#E79439', '#EFC631', '#6BA54A', '#4A7B8C', '#3984C6', '#634AA5', '#A54A7B',
    '#9C0000', '#B56308', '#BD9400', '#397B21', '#104A5A', '#085294', '#311873', '#731842',
    '#630000', '#7B3900', '#846300', '#295218', '#083139', '#003163', '#21104A', '#4A1031'
  ];

  export default {
    data () {
      return {
        colors: colors,
        color: '',
        lang: this.$store.state.lang.color
      }
    },
    props: ['comp-name'],
    computed: {
      disabled () {
        return this.$store.state.toolbarStates[this.compName].disabled;
      },
      display () {
        return this.$store.state.toolbarStates[this.compName].showPopup;
      }
    },
    methods: {
      updatePopupDisplay (current) {
        this.$store.dispatch('updatePopupDisplay', current);
      },
      toggle () {
        !this.disabled && this.updatePopupDisplay(this.compName);
      },
      checkValid (color) {
        let sColor = color.replace(/\s+/g, '');
        let hsl3 = /^#[0-9a-f]{3}$/i,
            hsl6 = /^#[0-9a-f]{6}$/i,
            rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/;
        if (hsl3.test(sColor) || hsl6.test(sColor) || rgb.test(sColor)) {
          return true;
        }
      },
      setColor (colorType, color) {
        this.$store.dispatch('execCommand', {name: colorType, value: color});
      },
      clickHandler (color) {
        this.setColor(this.compName, color);
        this.updatePopupDisplay();
      },
      inputHandler () {
        let color = this.color;
        let result = this.checkValid(color);
        if (!result) {
          alert(this.lang.invalidColorCodeMsg);
        } else {
          this.setColor(this.compName, color);
          this.updatePopupDisplay();
        }
        this.color = '';
      }
    }
  }
</script>