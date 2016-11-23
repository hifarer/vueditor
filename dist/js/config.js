var VueditorConfig = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
    'links', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
  ],
  mode: 'iframe', // default, iframe
  iframePath: './iframe/page.html',  // mode设置为iframe, 需要指定一个指定一个HTML文件作为iframe页面。
  assetsPath: '/dist', // 图片等资源的访问路径, 需为绝对路径
  fileuploadUrl: '' // 上传文件的接口地址
};