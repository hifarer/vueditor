export default {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
    'links', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
  ],
  mode: 'default', // default, iframe
  iframePath: '',  // mode设置为iframe, 需要指定iframe.html的路径
  assetsPath: '/dist', // 图片等资源的访问路径
  fileuploadUrl: '' // 上传文件的接口地址, 留空不上传文件, 只显示本地预览。
}
