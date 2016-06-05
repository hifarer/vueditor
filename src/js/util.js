/**
 * Created by wboll on 2016/6/2.
 */

const veUtil = {
  range: {
    get: function () {
      var oSel, oRange;
      if (iframeWin && iframeWin.getSelection) {
        oSel = iframeWin.getSelection();
        if (oSel && oSel.rangeCount != 0) {
          oRange = oSel.getRangeAt(0);
        }
      }
      return oRange;
    }
  },
 
  command: {
    format: function (obj, tagName, cssName) {
      // 此处不能用let？
      var temp = [];
      var pattern = {fontSize: /font\-size:\s?\d+px;/g, verticalAlign: /vertical\-align:\s?(sub|super);/g};
      var nodeList = obj.getElementsByTagName(tagName);
      for(var i = 0; i < nodeList.length; i++){
        var node = nodeList[i];
        if(node.attributes.length == 1 && node.getAttribute('style').match(pattern[cssName]) != null){
          if(node.children.length == 0){
            if(node.style.length == 1){
              node.parentNode.replaceChild(document.createTextNode(node.innerHTML), node);
              i--;
            }else{
              node.style[cssName] = '';
            }
          }else{
            temp.push(node);
          }
        }
      }
      if(temp.length != 0){
        this.format(obj, tagName, cssName);   // this -> command
      }
    }
  }
};