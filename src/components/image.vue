
<template>
  <div class="ve-image">
    <div :class="['ve-icon', {'ve-active': show, 've-disable': view !== 'design'}]" unselectable="on">
      <a href="javascript:;" :title="lang.addLink" @click="clickHandler"><i class="icon-file-image-o"></i></a>
    </div>
    <div class="ve-dialog" ref="dialog" v-show="show" @click.self="hideDialog">
      <div :class="$style.wrap">
        <div class="ve-dialog-header">{{lang.title}}<a href="javascript:;" class="ve-close" @click="hideDialog">&times;</a></div>
        <div class="ve-dialog-body">
          <input type="file" ref="file" @change="changeHandler">
          <div class="ve-preview" v-if="url"><img :src="url"></div>
        </div>
        <div class="ve-dialog-footer">
          <div class="ve-btn-box">
            <button :class="['ve-btn', $style.mw70]" @click="hideDialog">{{lang.cancel}}</button>
            <button :class="['ve-btn', $style.mw70]" @click="certainHandler">{{lang.ok}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { getBrowser } from '../core/util'

  export default {
    name: 'image',
    props: {
      config: Object,
      view: String,
      activeComponent: String
    },
    data() {
      return {
        url: '',
        lang: window.__VUEDITOR_LANGUAGE__.image
      }
    },
    inject: ['editor', 'eventHub'],
    computed: {
      show() {
        return this.activeComponent === 'image'
      }
    },
    watch: {
      'show': function(val) {
        let body = document.body
        if (val) {
          body.classList ? body.classList.add('ve-fixed') : body.className += 've-fixed' 
        } else {
          body.classList ? body.classList.remove('ve-fixed') : body.className = body.className.replace('ve-fixed', '')
        }
      }
    },
    methods: {
      getFileObjectUrl(obj) {
        if (getBrowser() === 'IE') {
          return obj.value
        } else {
          return window.URL.createObjectURL(obj.files[0])
        }
      },
      hideDialog() {
        this.eventHub.$emit('set-active-component')
      },
      clickHandler(event) {
        this.eventHub.$emit('set-active-component', 'image')
      },
      changeHandler() {
        let obj = this.$refs.file
        if (obj.files && obj.files.length !== 0) {
          if (obj.files[0].type.match(/^image\//i)) {
            this.url = this.getFileObjectUrl(obj)
          } else {
            window.alert(this.lang.invalidFile)
          }
        } else {
          window.alert(this.lang.noFile)
        }
      },
      certainHandler() {
        let obj = this.$refs.file
        if (obj.files && obj.files.length !== 0 && obj.files[0].type.match(/^image\//i)) {
          this.prepareToUpload(obj.files[0])
        } else {
          this.hideDialog()
        }
      },
      pasteHandler(fileList) {
        Array.prototype.forEach.call(fileList, item => {
          if (item.getAsFile() && item.kind === 'file' && item.type.match(/^image\//i)) {
            this.prepareToUpload(item.getAsFile())
          }
        })
      },
      prepareToUpload(file) {
        // if upload function provided on vueditor instance
        if (typeof this.$parent.upload === 'function') {
          this.$parent.upload(file, href => {
            this.editor.insertHTML(`<img src="${href}">`)
            this.hideDialog()
          })
        } else if (this.config.url) {
          // if upload url provided
          this.upload(file)
        } else {
          // just preview
          if (this.url) {
            this.editor.insertHTML(`<img src="${this.url}">`)
          }
          this.hideDialog()
        }
      },
      upload(fileData) {
        let { url, fieldName } = this.config
        let formData = new window.FormData()
        let xhr = new window.XMLHttpRequest()
        formData.append(fieldName, fileData)
        xhr.open('POST', url)
        xhr.send(formData)
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            this.editor.insertHTML(`<img src="${xhr.responseText}">`)
          } else {
            window.alert(xhr.responseText)
          }
          this.hideDialog()
        }
        xhr.onerror = err => {
          window.alert(err)
        }
      }
    },
    mounted() {
      this.$el.parentNode.parentNode.appendChild(this.$refs.dialog)
      this.eventHub.$on('paste-upload', this.pasteHandler)
    },
    destroyed() {
      if (this.$refs.dialog && this.$refs.dialog.parentNode) {
        this.$refs.dialog.parentNode.removeChild(this.$refs.dialog)
      }
    }
  }
</script>

<style module lang="less" rel="stylesheet/less">
  .wrap {
    width: 500px;
    position: relative;
    top: 50%;
    background: #fff;
    margin: 0 auto;
    transform: translateY(-60%);
  }
  .mw70 {
    min-width: 70px;
  }
</style>
