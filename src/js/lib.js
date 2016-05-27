/**
 * Created by wboll on 2016/5/26.
 */

var iframeEl, iframeWin, iframeDoc, iframeBody;

function init() {
  iframeEl = document.querySelector('.ve-iframe');
  iframeWin = iframeEl.contentWindow;
  iframeDoc = iframeWin.document;
  iframeBody = iframeWin.document.body;
  setContent('<p>萨拉深刻的风景拉萨孔家店发链接啊算了</p>');
}

function setContent(content){
  "use strict";
  iframeBody.innerHTML = content;
}