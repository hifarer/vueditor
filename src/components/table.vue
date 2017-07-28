
<style lang="less" rel="stylesheet/less">
  .ve-table {
    width: 192px;
    padding: 10px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    li {
      width: 20px;
      height: 20px;
      margin: 1px;
      float: left;
      border: 1px solid #ddd;
      &.active {
        background: #F7F7F7;
      }
    }
  }
</style>

<template>
  <div class="ve-table" v-show="showPopup" :style="style">
    <ul>
      <!--Vue.js 2.0 v-for i start with 1-->
      <li v-for="i in num" :key="i" @mouseover="overHandler(i - 1)" @click="clickHandler" :class="{'active': ((i - 1) % 8 <= x && parseInt((i - 1) / 8) <= y)}">
      </li>
    </ul>
  </div>
</template>

<script>

  import veMixin from '../mixins'
  import { getLang } from '../config/lang.js'

  export default {
    mixins: [veMixin],
    data () {
      return {
        num: 64,
        x: -1,
        y: -1,
        lang: getLang('table')
      }
    },
    computed: {
      showPopup: function () {
        return this.$store.state.toolbar.table.showPopup;
      }
    },
    methods: {
      overHandler (index) {
        this.x = index % 8;
        this.y = parseInt(index / 8);
      },
      clickHandler () {
        let html = this.createTable(this.y + 1, this.x + 1);
        this.$store.dispatch('execCommand', { name: 'insertHTML', value: html });
        this.$store.dispatch('updatePopupDisplay');
      },
      createTable (rows, cols) {
        let oTable = document.createElement('table');
        let oTbody = document.createElement('tbody');
        oTable.style.cssText = 'border-collapse: collapse;';
        oTable.appendChild(oTbody);
        for (let i = 0; i < rows; i++) {
          let tr = document.createElement('tr');
          for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            td.innerHTML = '<br>';
            td.style.cssText = 'width: 50px; border: 1px #ddd solid;';
            tr.appendChild(td);
          }
          oTbody.appendChild(tr);
        }
        return oTable.outerHTML;
      }
    }
  }

</script>