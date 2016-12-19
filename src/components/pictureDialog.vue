
<style lang="less" rel="stylesheet/less">
  .pic-dialog .wrap {
    width: 500px;
  }
</style>

<template>
  <div class="ve-dialog pic-dialog" v-show="display" @click="hideDialog"
       :style="{width: ctnW + 'px', height: ctnH + 'px'}">
    <div class="wrap" @click.stop>
      <div class="dialog-header">{{lang.title}}<a href="javascript:;" class="ve-close" @click="hideDialog">&times;</a></div>
      <div class="dialog-body">
        <input type="file" ref="file">
      </div>
      <div class="dialog-footer">
        <div class="ve-btn-box">
          <button class="ve-btn" @click="hideDialog">{{lang.cancel}}</button>
          <button class="ve-btn" @click="certainHandler">{{lang.ok}}</button>
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
      lang () {
        return this.$store.state.lang.pictureDialog;
      },
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
          if(fileuploadUrl){
            let formData = new FormData(obj);
            let xhr = new XMLHttpRequest();
            xhr.open('POST', fileuploadUrl);
            xhr.send(formData);
            xhr.onload = function () {
              this.$store.dispatch('execCommand', {name: 'insertHTML', value: `<img src="${xhr.responseText}">`});
              this.hideDialog();
            };
            xhr.onerror = function (err) {
              alert(err);
            }
          }else{
            this.$store.dispatch('execCommand', {name: 'insertHTML', value: `<img src="${url}">`});
            this.hideDialog();
          }
        } else {
          alert(this.lang.invalidFile);
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