export default {

  // 非组件，系统命令按钮
  removeFormat: { className: 'icon-eraser', action: 'removeFormat', native: true },

  bold: { className: 'icon-bold', action: 'bold', native: true },
  italic: { className: 'icon-italic', action: 'italic', native: true },
  underline: { className: 'icon-underline', action: 'underline', native: true },
  strikeThrough: { className: 'icon-strikethrough', action: 'strikeThrough', native: true },

  superscript: { className: 'icon-superscript', action: 'superscript', native: true },
  subscript: { className: 'icon-subscript', action: 'subscript', native: true },
  indent: { className: 'icon-indent', action: 'indent', native: true },
  outdent: { className: 'icon-outdent', action: 'outdent', native: true },

  justifyLeft: { className: 'icon-align-left', action: 'justifyLeft', native: true },
  justifyCenter: { className: 'icon-align-center', action: 'justifyCenter', native: true },
  justifyRight: { className: 'icon-align-right', action: 'justifyRight', native: true },
  justifyFull: { className: 'icon-align-justify', action: 'justifyFull', native: true },

  insertOrderedList: { className: 'icon-list-ol', action: 'insertOrderedList', native: true },
  insertUnorderedList: { className: 'icon-list-ul', action: 'insertUnorderedList', native: true },

  // 非组件，只有一个按钮点击后执行一个操作
  markdown: { className: 'icon-markdown', action: 'markdown' },
  fullscreen: { className: 'icon-fullscreen', action: 'fullscreen' },

  // 组件的html按钮和其余部分分离的
  sourceCode: { className: 'icon-code', action: 'sourceCode' },
  picture: { className: 'icon-file-image-o', action: 'picture' }

  // 组件的html按钮和其余部分一体的，不在此列出
}
