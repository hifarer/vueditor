
<style module lang="less" rel="stylesheet/less">
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
  <div class="ve-picture">
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
            <button class="ve-btn" @click="hideDialog">{{lang.cancel}}</button>
            <button class="ve-btn" @click="certainHandler">{{lang.ok}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { getBrowser } from '../util'

  export default {
    name: 'picture',
    props: {
      config: Object,
      view: String,
      activeComponent: String
    },
    data () {
      return {
        url: '',
        lang: window.__VUEDITOR_LANGUAGE__.picture
      }
    },
    inject: ['eventHub'],
    computed: {
      show () {
        return this.activeComponent === 'picture'
      }
    },
    watch: {
      'show': function (val) {
        let body = document.body
        if (val) {
          body.classList ? body.classList.add('ve-fixed') : body.className += 've-fixed' 
        } else {
          body.classList ? body.classList.remove('ve-fixed') : body.className = body.className.replace('ve-fixed', '')
        }
      }
    },
    methods: {
      clickHandler (event) {
        this.eventHub.$emit('set-active-component', 'picture')
      },
      hideDialog () {
        this.eventHub.$emit('set-button-status', { picture: 'default' })
        this.eventHub.$emit('set-active-component')
      },
      changeHandler () {
        let obj = this.$refs.file
        if (obj.files && obj.files.length !== 0 && obj.files[0].type.match(/^image\//i)) {
          if (getBrowser() === 'IE') {
            this.url = obj.value
          } else {
            this.url = window.URL.createObjectURL(obj.files[0])
          }
        }
      },
      pasteHandler (arr) {
        Array.prototype.forEach.call(arr, item => {
          if (item.getAsFile() && item.kind === 'file' && item.type.match(/^image\//i)) {
            let reader = new FileReader()
            reader.onload = event => {
              if (this.config.url) {
                this.upload(event.target.result)
              } else {
                this.url = event.target.result
                this.eventHub.$emit('insert-html', `<img src="${this.url}">`)
              }
            }
            reader.readAsDataURL(item.getAsFile())
          }
        })
      },
      certainHandler () {
        let obj = this.$refs.file
        if (this.url) {
          // if upload function provided
          if (typeof this.$parent.upload === 'function') {
            this.$parent.upload(obj, href => {
              this.eventHub.$emit('insert-html', `<img src="${href}">`)
              this.hideDialog()
            })
          } else if (this.config.url) {
            // if upload url provided
            this.upload(obj.file[0])
          } else {
            this.eventHub.$emit('insert-html', `<img src="${this.url}">`)
            this.hideDialog()
          }
        } else {
          window.alert(this.lang.invalidFile)
        }
      },
      upload (fileData) {
        let { url, fieldName } = this.config
        let formData = new window.FormData()
        let xhr = new window.XMLHttpRequest()
        formData.append(fieldName, fileData)
        xhr.open('POST', url)
        xhr.send(formData)
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            this.eventHub.$emit('insert-html', `<img src="${xhr.responseText}">`)
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
    mounted () {
      this.$el.parentNode.parentNode.appendChild(this.$refs.dialog);
    },
    created () {
      this.eventHub.$on('paste-upload', this.pasteHandler)
    },
    destroyed () {
      if (this.$refs.dialog && this.$refs.dialog.parentNode) {
        this.$refs.dialog.parentNode.removeChild(this.$refs.dialog);
      }
    }
  }
</script>
