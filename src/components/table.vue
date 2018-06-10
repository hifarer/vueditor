
<style lang="less" rel="stylesheet/less">
  .ve-table .ve-wrap {
    width: 192px;
    padding: 10px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    span {
      width: 20px;
      height: 20px;
      margin: 1px;
      float: left;
      border: 1px solid #ddd;
    }
    span.active {
      background: #F7F7F7;
    }
  }
</style>

<template>
  <div class="ve-table">
    <div :class="['ve-icon', {'ve-active': show, 've-disabled': view !== 'design'}]" onselectable="on">
      <a href="javascript:;" :title="lang.title" @click="clickHandler"><i class="icon-table"></i></a>
    </div>
    <div v-show="show" ref="popup" class="ve-wrap" :style="position">
      <!--Vue.js 2.0 v-for i starts with 1-->
      <span v-for="i in num" :key="i" @mouseover="overHandler(i - 1)" @click="insertTable" :class="{'active': ((i - 1) % 8 <= x && parseInt((i - 1) / 8) <= y)}">
      </span>
    </div>
  </div>
</template>

<script>

  import rectMixin from '../mixins/rect'
  import hubMixin from '../mixins/hub'

  export default {
    name: 'table',
    data () {
      return {
        num: 64,
        x: -1,
        y: -1,
        rect: {},
        lang: window.__VUEDITOR_LANGUAGE__.table
      }
    },
    props: {
      view: String,
      activeComponent: String
    },
    mixins: [hubMixin, rectMixin],
    methods: {
      clickHandler (event) {
        this.togglePopup(event)
      },
      overHandler (index) {
        this.x = index % 8
        this.y = parseInt(index / 8)
      },
      insertTable () {
        let html = this.createTable(this.y + 1, this.x + 1)
        this.eventHub.$emit('insert-html', html)
        this.eventHub.$emit('set-active-component')
      },
      createTable (rows, cols) {
        let oTable = document.createElement('table')
        let oTbody = document.createElement('tbody')
        oTable.style.cssText = 'border-collapse: collapse; width: ' + cols * 50 + 'px'
        oTable.setAttribute('border', '1')
        oTable.appendChild(oTbody)
        for (let i = 0; i < rows; i++) {
          let tr = document.createElement('tr')
          for (let j = 0; j < cols; j++) {
            let td = document.createElement('td')
            td.innerHTML = '<br>'
            tr.appendChild(td)
          }
          oTbody.appendChild(tr)
        }
        return oTable.outerHTML
      }
    }
  }
</script>