
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
  <a href="javascript:;" title="表格" :class="{'ve-disabled': disabled}" @click="toggle">
    <i class="fa fa-table"></i>
  </a>
  <div class="ve-toolbar-dropdown mytable" v-show="display" :style="{left: left + 'px', top: top + 'px'}">
    <ul>
      <li v-for="i in num" @mouseover="overHandler(i)" @click="clickHandler(i)">
        <a href="javascript:;" :class="{'active': (i%8 <= x && parseInt(i/8) <= y)}"></a>
      </li>
    </ul>
  </div>
</template>

<script>

  import {updateTBDropdownDisplay} from '../vuex/toolbar-actions';

  export default {
    data () {
      return {
        num: 64,
        x: -1,
        y: -1,
        display: false,
        left: 50,
        top: 50
      }
    },
    vuex: {
      getters: {
        disabled: function (state) {
          return state.toolBtns.table.disabled;
        }
      },
      actions: {
        updateTBDropdownDisplay
      }
    },
    methods: {
      toggle () {
        if(!this.disabled){
          let obj = this.$el.nextElementSibling;
          this.left = obj.offsetLeft;
          this.top = obj.offsetTop + (obj.offsetHeight + parseInt(getComputedStyle(obj).marginBottom));
          this.x = -1;
          this.y = -1;
          this.updateTBDropdownDisplay('table');
        }
      },
      overHandler (index) {
        this.x = index % 8;
        this.y = parseInt(index/8);
      },
      clickHandler (index) {
        let html = this.createTable(this.x+1, this.y+1);
        this.insertTable(html);
        this.updateTBDropdownDisplay();
      },
      createTable (rows, cols) {
        let app = this.$root.$children[0];
        let oTable = app.iframeDoc.createElement('table');
        let oTbody = app.iframeDoc.createElement('tbody');
        oTable.appendChild(oTbody);
        for (let i = 0; i < rows; i++) {
          let tr = app.iframeDoc.createElement('tr');
          for (let j = 0; j < cols; j++) {
            let td = app.iframeDoc.createElement('td');
            td.innerHTML = '<br>';
            td.style.cssText = 'width: 50px; border: 1px #ddd solid;';
            tr.appendChild(td);
          }
          oTbody.appendChild(tr);
        }
        oTable.style.cssText = 'border-collapse: collapse;';
        return oTable.outerHTML;
      },
      insertTable (html) {
        let app = this.$root.$children[0];
        let oSel = app.iframeWin.getSelection();
        if (!oSel.rangeCount)return;
        let oRange = oSel.getRangeAt(0), node = null;
        let frag = app.iframeDoc.createDocumentFragment(), obj = app.iframeDoc.createElement('div');
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