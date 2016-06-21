
<style lang="less" rel="stylesheet/less">
  .mytable {
    width: 192px;
    padding: 10px;
    position: absolute;
    top: 39px;
    z-index: 1000;
    background: #fff;
    border: 1px solid #ccc;
    border-top: none;
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
  <a href="javascript:;" title="表格" @click="toggle">
    <i class="fa fa-table"></i>
  </a>
  <div class="ve-toolbar-dropdown mytable" v-show="display">
    <ul>
      <li v-for="i in num" @mouseover="overHandler(i)" @click="clickHandler(i)">
        <a href="javascript:;" :class="{'active': (i%8 <= x && parseInt(i/8) <= y)}"></a>
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
        display: false
      }
    },
    methods: {
      toggle () {
        this.$dispatch('dropdownToggle', this);
        this.display = !this.display;
        this.x = -1;
        this.y = -1;
      },
      overHandler (index) {
        this.x = index % 8;
        this.y = parseInt(index/8);
      },
      clickHandler (index) {
        let html = this.createTable(this.x+1, this.y+1);
        this.insertTable(html);
        this.display = false;
      },
      createTable (rows, cols) {
        let oTable = iframeDoc.createElement('table');
        for (let i = 0; i < rows; i++) {
          let tr = iframeDoc.createElement('tr');
          for (let j = 0; j < cols; j++) {
            let td = iframeDoc.createElement('td');
            td.innerHTML = '<br>';
            td.style.cssText = 'width: 50px; border: 1px solid #ddd;';
            tr.appendChild(td);
          }
          oTable.appendChild(tr);
        }
        oTable.style.cssText = 'border-collapse: collapse;';
        return oTable.outerHTML;
      },
      insertTable (html) {
        var oSel = iframeWin.getSelection();
        if (!oSel.rangeCount)return;
        var oRange = oSel.getRangeAt(0), node = null;
        var frag = iframeDoc.createDocumentFragment(), obj = iframeDoc.createElement('div');
        obj.innerHTML = html;
        while (obj.firstChild) {
          node = obj.firstChild;
          frag.appendChild(node);
        }
        oRange.insertNode(frag);
        oRange.setStartAfter(node);
        oRange.collapse(true);
        oSel.removeAllRanges();
        oSel.addRange(oRange);
      }
    }
  }

</script>