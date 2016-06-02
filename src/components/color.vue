<template>
  <a href="javascript:;" title="{{param.colorType == 'forecolor' ? '文字颜色' : '背景颜色'}}" @click="toggle = !toggle">
    <i class="fa" :class="{'fa-file-text': param.colorType == 'backcolor', 'fa-file-text-o': param.colorType == 'forecolor'}"></i>
  </a>
  <div class="ve-toolbar-dropdown colorpicker" v-show="toggle">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="颜色代码" v-model="color">
        <span class="input-group-btn">
            <button type="button" class="btn btn-default" @click="inputHandler">确定</button>
        </span>
    </div>
    <ul>
      <li v-for="color in colors"><a href="javascript:;" title="{{color}}" @click="clickHandler(color)" style="background:{{color}};"></a></li>
    </ul>
  </div>
</template>

<script>
  var colors = [
    '#E53333', '#E56600', '#FF9900', '#64451D', '#DFC5A4', '#FFE500', '#009900', '#006600', '#99BB00', '#B8D100',
    '#60D978', '#337FE5', '#003399', '#4C33E5', '#9933E5', '#CC33E5', '#EE33EE', '#00D5FF', '#FFFFFF', '#CCCCCC',
    '#999999', '#666666', '#333333', '#000000'
  ];
  export default {
    data () {
      return {
        colors: colors,
        color: '',
        toggle: false
      }
    },
    props: ['param'],
    methods: {
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
        if(document.queryCommandSupported('styleWithCss')){
          iframeDoc.execCommand('styleWithCss', true);
        }

        iframeDoc.execCommand(colorType, false, color);
        //document.querySelectorAll('font').length > 0 && formatEl(arr, colorType, color);
      },
      clickHandler (color) {
        this.setColor(this.param.colorType, color);
        this.toggle = false;
      },
      inputHandler () {
        let color = this.color;
        let result = this.checkValid(color);
        if(!result){
          alert('请输入正确的颜色代码。');
        }else{
          this.setColor(this.param.colorType, color);
          this.toggle = false;
        }
        this.color = '';
      }
    }
  }
</script>