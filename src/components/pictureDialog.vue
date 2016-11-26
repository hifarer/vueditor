
<style lang="less" rel="stylesheet/less">
  .pic-dialog .wrap {
    width: 500px;
  }
</style>

<template>
  <div class="ve-dialog pic-dialog" v-show="display" @click="hideDialog"
       :style="{width: ctnW + 'px', height: ctnH + 'px'}">
    <div class="wrap" @click.stop>
      <div class="dialog-header">插入图片<a href="javascript:;" class="ve-close" @click="hideDialog">&times;</a></div>
      <div class="dialog-body">
        <input type="file">
      </div>
      <div class="dialog-footer">
        <div class="ve-btn-box">
          <button class="ve-btn" @click="hideDialog">取消</button>
          <button class="ve-btn" @click="certainHandler">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        ctnW: window.innerWidth,
        ctnH: window.innerHeight
      }
    },
    computed: {
      display: function () {
        return this.$store.state.toolbarStates.picture.showPopup;
      }
    },
    methods: {
      updatePopupDisplay (current) {
        this.$store.dispatch('updatePopupDisplay', current);
      },
      hideDialog () {
        this.updatePopupDisplay();
      },
      certainHandler (event) {
        let url = '';
        let obj = this.$el.querySelector('input');
        let fileuploadUrl = this.$store.state.config.fileuploadUrl;
        if (navigator.userAgent.indexOf('MSIE') >= 1) { // IE
          url = obj.value;
        } else {
          if (obj.files.length != 0 && obj.files.item(0).type.indexOf('image') != -1) {
            url = window.URL.createObjectURL(obj.files.item(0));
          }
        }

        if (url) {
          this.$store.dispatch('execCommand', {name: 'insertHTML', value: `<img src="${url}">`});
          this.hideDialog();
        } else {
          alert('未选择图片或选择的文件并非图片!');
        }
      }
    },
    mounted () {
      window.addEventListener('resize', function () {
        this.ctnW = window.innerWidth;
        this.ctnH = window.innerHeight;
      }.bind(this), false);
    }
  }
</script>