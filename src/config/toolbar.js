
let defaultToolbar = {
  
  btns: {
    
    removeFormat: {className: 'icon-eraser', action: 'removeFormat', native: true},

    bold: {className: 'icon-bold', action: 'bold', native: true},
    italic: {className: 'icon-italic', action: 'italic', native: true},
    underline: {className: 'icon-underline', action: 'underline', native: true},
    strikeThrough: {className: 'icon-strikethrough', action: 'strikeThrough', native: true},

    superscript: {className: 'icon-superscript', action: 'superscript', native: true},
    subscript: {className: 'icon-subscript', action: 'subscript', native: true},
    indent: {className: 'icon-indent', action: 'indent', native: true},
    outdent: {className: 'icon-outdent', action: 'outdent', native: true},

    justifyLeft: {className: 'icon-align-left', action: 'justifyLeft', native: true},
    justifyCenter: {className: 'icon-align-center', action: 'justifyCenter', native: true},
    justifyRight: {className: 'icon-align-right', action: 'justifyRight', native: true},
    justifyFull: {className: 'icon-align-justify', action: 'justifyFull', native: true},

    insertOrderedList: {className: 'icon-list-ol', action: 'insertOrderedList', native: true},
    insertUnorderedList: {className: 'icon-list-ul', action: 'insertUnorderedList', native: true},

    foreColor: {className: 'icon-file-text-o'},
    backColor: {className: 'icon-file-text'},
    link: {className: 'icon-link'},
    unLink: {className: 'icon-unlink', action: 'unLink'},
    markdown: {className: 'icon-markdown', action: 'markdown'},
    picture: {className: 'icon-file-image-o'},
    sourceCode: {className: 'icon-code', action: 'sourceCode'},
    table: {className: 'icon-table'},
    undo: {className: 'icon-undo', action: 'undo'},
    redo: {className: 'icon-repeat', action: 'redo'},
    fullscreen: {className: 'icon-fullscreen', action: 'fullscreen'}
  },

  selects: {
    fontName: {className: 'font-select'},
    fontSize: {className: ''},
    element: {className: ''},
  }

}

let toolbar = JSON.parse(JSON.stringify(defaultToolbar));

export default {
  resetToolbar () {
    toolbar = JSON.parse(JSON.stringify(defaultToolbar));
  },
  modifyToolbar (name, element) {
    if(element.type === 'button'){
      toolbar.btns[name] = {
        className: element.className
      }
      element.action && (toolbar.btns[name].action = element.action);
    }else{
      toolbar.selects[name] = {
        className: element.className
      }
    }
  },
  getToolbar () {
    return toolbar;
  }
}