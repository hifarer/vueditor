<style lang="less" rel="stylesheet/less">
  .colorpicker {
    width: 176px;
    padding: 10px;
    position: absolute;
    top: 39px;
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
  }
</style>

<template>
  <a href="javascript:;" title="{{param.colorType == 'foreColor' ? '文字颜色' : '背景颜色'}}"
     :class="{'active': display, 've-disabled': toolBtns[this.param.colorType].disabled}" @click="toggle">
    <i class="fa" :class="{'fa-file-text': param.colorType == 'backColor', 'fa-file-text-o': param.colorType == 'foreColor'}"></i>
  </a>
  <div class="ve-toolbar-dropdown colorpicker" v-show="toolBtns[this.param.colorType].showmenu" :style="{left: left + 'px', top: top + 'px'}">
    <div class="ve-input-box">
      <input type="text" class="ve-input" placeholder="颜色代码" v-model="color">
      <button type="button" class="ve-btn" @click="inputHandler">确定</button>
    </div>
    <ul>
      <li v-for="color in colors" @click="clickHandler(color)"><a href="javascript:;" title="{{color}}" :style="{background: color}"></a></li>
    </ul>
  </div>
</template>

<script>

  /*'#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500', '#009900', '#006600', '#99BB00', '#B8D100',
   '#60D978', '#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE', '#00D5FF', '#FFFFFF', '#CCCCCC',
   '#999999', '#666666', '#333333', '#000000'*/

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

  import {updateTBDropdownDisplay} from '../vuex/actions';

  export default {
    data () {
      return {
        colors: colors,
        color: '',
        left: 0,
        top: 0
      }
    },
    props: ['param'],
    vuex: {
      getters: {
        toolBtns: function (state) {
          return state.toolBtns;
        }
      },
      actions: {
        updateTBDropdownDisplay
      }
    },
    methods: {
      toggle () {
        if(!this.toolBtns[this.param.colorType].disabled){
          let obj = this.$el.nextElementSibling;
          this.left = obj.offsetLeft;
          this.top = obj.offsetTop + (obj.offsetHeight + parseInt(getComputedStyle(obj).marginBottom));
          //this.display = !this.display;
          this.updateTBDropdownDisplay(this.param.colorType);
        }
      },
      checkValid (color) {
        let sColor = color.replace(/\s+/g, '');
        let hsl3 = /^#[0-9a-f]{3}$/i,
            hsl6 = /^#[0-9a-f]{6}$/i,
            rgb  = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/;
        if(hsl3.test(sColor) || hsl6.test(sColor) || rgb.test(sColor)){
          return true;
        }
      },
      setColor (colorType, color) {
        this.$root.$refs.design.exec(colorType, color);
      },
      clickHandler (color) {
        this.setColor(this.param.colorType, color);
        this.updateTBDropdownDisplay();
      },
      inputHandler () {
        let color = this.color;
        let result = this.checkValid(color);
        if(!result){
          alert('请输入正确的颜色代码。');
        }else{
          this.setColor(this.param.colorType, color);
          this.updateTBDropdownDisplay();
        }
        this.color = '';
      }
    }
  }
</script>