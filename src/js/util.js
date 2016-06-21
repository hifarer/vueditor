/**
 * Created by wboll on 2016/6/2.
 */

const veUtil = {
  range: {
    get () {
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
    format (obj, tagName, cssName) {
      let temp = [];
      let pattern = {fontSize: /font\-size:\s?\d+px;/g, verticalAlign: /vertical\-align:\s?(sub|super);/g};
      let nodeList = obj.getElementsByTagName(tagName);
      for(let i = 0; i < nodeList.length; i++){
        let node = nodeList[i];
        if(node.attributes.length == 1 && node.style.length != 0 && node.getAttribute('style').match(pattern[cssName]) != null){
          if(node.children.length == 0){
            if(node.style.length == 1){
              let parent = node.parentNode;
              parent.replaceChild(document.createTextNode(node.innerHTML), node);
              parent.normalize();
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