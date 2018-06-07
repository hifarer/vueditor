
<style module>
  .wrap {
    width: 500px;
    position: relative;
    top: 50%;
    background: #fff;
    margin: 0 auto;
    transform: translateY(-60%);
  }
</style>

<template>
  <div class="ve-picture ve-dialog" v-show="show" @click.self="hideDialog">
    <div :class="$style.wrap">
      <div class="ve-dialog-header">{{lang.title}}<a href="javascript:;" class="ve-close" @click="hideDialog">&times;</a></div>
      <div class="ve-dialog-body">
        <form>
          <input type="file" name="image" @change="changeHandler" ref="file">
        </form>
        <div class="ve-preview" v-if="url"><img :src="url"></div>
      </div>
      <div class="ve-dialog-footer">
        <div class="ve-btn-box">
          <button class="ve-btn" @click="hideDialog">{{lang.cancel}}</button>
          <button class="ve-btn" @click="certainHandler">{{lang.ok}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import vuexMixin from '../mixins/vuex'

  export default {
    name: 'picture',
    data () {
      return {
        url: '',
        lang: window.__VUEDITOR_LANGUAGE__.picture
      }
    },
    props: {
      uploadUrl: String
    },
    mixins: [vuexMixin],
    computed: {
      event () {
        return this.mstates.event
      },
      show () {
        return this.mstates.activeComponent === this.$options.name
      }
    },
    watch: {
      'event': function (val) {
        if (val.name === 'picture') {
          this.show = true
        }
      },
      'show': function (val) {
        if (val) {
          document.body.classList.add('ve-fixed')
        } else {
          document.body.classList.remove('ve-fixed')
        }
      }
    },
    methods: {
      setActiveComponent (data) {
        this.$store.dispatch(this.mpath + 'setActiveComponent', data)
      },
      setButtonStates (data) {
        this.$store.dispatch(this.mpath + 'setButtonStates', data)
      },
      execCommand (data) {
        this.$store.dispatch(this.mpath + 'execCommand', data)
      },
      hideDialog () {
        this.setButtonStates({picture: 'default'})
        this.setActiveComponent()
      },
      changeHandler () {
        this.preview(this.$refs.file)
      },
      pasteHandler (arr) {
        Array.prototype.forEach.call(arr, item => {
          if (item.getAsFile() && item.kind === 'file' && item.type.match(/^image\//i)) {
            if (this.uploadUrl) {
              this.upload(item.file[0])
            } else {
              this.preview(item)
              this.execCommand({name: 'insertHTML', value: `<img src="${this.url}">`})
              this.hideDialog()
            }
          }
        })
      },
      certainHandler (event) {
        let obj = this.$refs.file
        if (this.url) {
          if (this.$parent.upload) {
            this.$parent.upload(obj, href => {
              this.execCommand({name: 'insertHTML', value: `<img src="${href}">`})
              this.hideDialog()
            })
          } else if (this.uploadUrl) {
            this.upload(obj.file[0])
          } else {
            this.execCommand({name: 'insertHTML', value: `<img src="${this.url}">`})
            this.hideDialog()
          }
        } else {
          window.alert(this.lang.invalidFile)
        }
      },
      preview (obj) {
        if (navigator.userAgent.indexOf('MSIE') >= 1) { // IE
          this.url = obj.value
        } else {
          if (obj.files.length !== 0 && obj.files.item(0).type.indexOf('image') !== -1) {
            this.url = window.URL.createObjectURL(obj.files.item(0))
          }
        }
      },
      upload (file) {
        let formData = new window.FormData()
        let xhr = new window.XMLHttpRequest()
        formData.append('test', file)
        xhr.open('POST', this.uploadUrl)
        xhr.send(formData)
        xhr.onload = () => {
          this.execCommand({name: 'insertHTML', value: `<img src="${xhr.responseText}">`})
          this.hideDialog()
        }
        xhr.onerror = err => {
          window.alert(err)
        }
      }
    }
  }
</script>