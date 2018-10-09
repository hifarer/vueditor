
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
    float: left;
    border-right: 1px solid #ddd;
  }
</style>

<template>
  <textarea :class="['ve-sourcecode', view === 'markdown' ? $style.half : '']" v-show="view === 'sourceCode' || view === 'markdown'" v-model="code"></textarea>
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
      'content': function (val) {
        // only update when visible
        if (this.view === 'sourceCode' || this.view === 'markdown') {
          this.code = val
        }
      },
      'code': function (val) {
        clearTimeout(this.timer)
        // throttle
        this.timer = setTimeout(() => {
          this.eventHub.$emit('set-content', val)
        }, 200)
      }
    },
    created () {
      this.timer = null
    }
  }
</script>
