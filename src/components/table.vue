
<style lang="less" rel="stylesheet/less">
  .ve-table {
    width: 192px;
    padding: 10px;
    position: absolute;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    li a {
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
  <div class="ve-table" v-show="showPopup.display"
  :style="{left: showPopup.left + 'px', top: (showPopup.top + 36) + 'px'}">
    <ul>
      <!--vue.js 2.0 v-for i start with 1-->
      <li v-for="i in num" @mouseover="overHandler(i-1)" @click="clickHandler(i-1)">
        <a href="javascript:;" :class="{'active': ((i-1)%8 <= x && parseInt((i-1)/8) <= y)}"></a>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        num: 64,
        x: -1,
        y: -1,
        lang: this.$store.state.lang.table
      }
    },
    computed: {
      showPopup () {
        return this.$store.state.toolbar.table.showPopup;
      }
    },
    methods: {
      overHandler (index) {
        this.x = index % 8;
        this.y = parseInt(index/8);
      },
      clickHandler (index) {
        let html = this.createTable(this.x+1, this.y+1);
        this.$store.dispatch('execCommand', {name: 'insertHTML', value: html});
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