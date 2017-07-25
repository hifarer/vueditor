
let defaultConf = {
  toolbar: [
    'removeFormat', 'undo', 'redo', '|', 'element', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
    'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'table', '|', 'fullscreen', 'sourceCode', 'markdown'
  ],
  fontName: [
    { val: 'arial black' }, 
    { val: 'times new roman' }, 
    { val: 'Courier New' }
  ],
  fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px']
};

let config = JSON.parse(JSON.stringify(defaultConf));

export default {
  setConfig (data) {
    config = data
  },
  getConfig (name) {
    return name ? config[name] : config
  },
  getDefaultConf () {
    return defaultConf
  }
}