
<style module lang="less" rel="stylesheet/less">
  :global(.ve-sourcecode) {
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    outline: none;
    border: none;
    resize: none;
    font-size: 14px;
  }
  .half {
    width: 50%;
    height: 100%;
    float: left;
    border-right: 1px solid #ddd;
  }
</style>

<template>
  <textarea v-if="view === 'sourceCode' || view === 'markdown'" v-model="code" :class="['ve-sourcecode', view === 'markdown' ? $style.half : '']"></textarea>
</template>

<script>

  export default {
    name: 'sourceCode',
    props: {
      view: String,
      content: String
    },
    data () {
      return {
        code: ''
      }
    },
    inject: ['eventHub'],
    watch: {
      'code': function (val) {
        // only update when switch to markdown
        if (this.view === 'markdown') {
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
            this.eventHub.$emit('set-content', val)
          }, 200)
        }
      },
      'view': function (val, oldVal) {
        // markdown的时候会定时更新，sourceCode不会
        if (val === 'design' && oldVal === 'sourceCode') {
          this.eventHub.$emit('set-content', this.code)
        }
        if ((val === 'sourceCode' || val === 'markdown') && oldVal === 'design') {
          this.code = this.content
        }
      }
    },
    created () {
      this.timer = null
      this.code = this.content
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    }
  }
</script>
