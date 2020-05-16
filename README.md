Vueditor
===

[![vueditor](https://img.shields.io/npm/v/vueditor.svg)](https://www.npmjs.com/package/vueditor)
[![vueditor](https://img.shields.io/npm/l/vueditor.svg)](https://www.npmjs.com/package/vueditor)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[中文文档](./docs/Chinese.md)

A wysiwyg editor written in Vue.js, require Vue.js 2.2.0+.

Browser compatibility: Chrome, Firefox, Safari

Online [DEMO](http://hifarer.github.io/vueditor/)

## Screenshot

![vueditor](./vueditor.gif)

## Features

- Customizable
- Light weighted

## Installation
```javascript
npm install vueditor
```

If you prefer to use it via script tag, download the last release package and add `vueditor.min.js`, `vueditor.min.css` to your page. 

## Usage

### Vue.use(Vueditor, config)

Use it in the following cases:

1. Only one editor required
2. Multiple editors required but shared the same config

```javascript
import Vue from 'vue'
import Vueditor from 'vueditor'

import 'vueditor/dist/vueditor.min.css'

// your config here
let config = {
  toolbar: [
    'removeFormat', 'undoRedo', '|', 'element', 'fontName', 'fontSize', 'color'
  ],
  spellcheck: false,
  paste: {
    noFormat: true,
    upload: true
  },
  upload: {
    url: '',
    fieldName: 'test'
  }
};

Vue.use(Vuex);
Vue.use(Vueditor, config);
// create a root instance
new Vue({
  el: '#editorContainer'
});
```

Then in your vue template somewhere:
```html
<template>
  <div>
    ...
    <Vueditor></Vueditor>
  </div>
</template>
```

To get and set content you need to acquire the Vueditor component, you can use `$children[index]` or `ref` to do that.

```javascript
let parent = new Vue({
  el: '#editor1'
});
let editor = parent.$children[0];
editor.setContent('your content here');
editor.getContent();
```

### createEditor(selector, config)

Call `createEditor` and pass specific config as parameter respectively for multiple editors in a page. 

```javascript

  import Vue from 'vue'
  import { createEditor } from 'vueditor'

  import 'vueditor/dist/vueditor.min.css'
  
  Vue.use(Vuex);

  createEditor('#editorContainer', {
    toolbar: [
      'removeFormat', 'undoRedo', '|', 'elements', 'fontName', 'fontSize', 'color', 
    ]
  });
```

The initialized element will be replaced in this case, but you can still add className or id to it, the rendered element will have these attributes. `createEditor` returns a vueditor instance, you can set and get content with it:

```javascript
let inst = createEditor(...);
inst.setContent('your content here');
inst.getContent();
```

#### File upload

You can set `upload` attribute in config when you initialize an editor, all the upload stuffs will be handled automatically. If you perfer do it yourself or has some authrization to do before uploading, just add a function `upload` to the instance returned by `createEditor`. When an upload action triggered, vueditor will call this function instead of the build-in function. The upload function has two arguments: `obj` refer to the file input element, `callback` requires the uploaded file url as argument for inserting content to the editor, See the example below: 
```javascript
editor.upload = (obj, callback) => {
  let formData = new FormData();
  let xhr = new XMLHttpRequest();
  formData.append('fieldName', obj.files[0]);
  xhr.open('POST', 'upload/url');
  xhr.send(formData);
  xhr.onload = function () {
    callback(xhr.responseText);
  };
  xhr.onerror = function (err) {
    console.log(err);
  }
}
```

### language setting

The editor's default language is English, to set to other language, you will need to translate for your own.
The `dist/language` folder has an full example inside. Adding a script tag or use `import`, `require` to    
bring the language object in, then make it an attribute of the config for initializing. See the example for webpack import(with exports-loader installed) below:
```javascript
import lang from 'exports-loader?lang!vueditor/lang/cn.js'
Vue.use(Vueditor, {
  ...
  lang: lang,
});
```

## Options for configuration:

|          Name         |    Type    |                                                         Description                                                         |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| spellcheck            | `Boolean`  | check spell or not, default is false |
| lang                  | `Object`   | interface language, default is English |
| toolbar               | `Array`   | buttons on the toolbar, use `|` or `divider` as separator for grouping |
| paste                 | `Object`  | paste config |
| paste.noFormat        | `Boolean`  | no format paste, default is true |
| paste.upload          | `Boolean`  | whether to upload clipbord image or not, default is false, will use `upload` as upload config, the server side need to able to handle base 64 string |
| upload                | `Object`   | upload config |
| upload.url            | `String`   | file upload url, the return result of this must be a string refer to the uploaded file url, leave it empty will end up with local preview |
| upload.fieldName      | `String`   | field name for uploading file |


Default value of the above fields:

```javascript
{
  toolbar: [
    'removeFormat', 'undoRedo', '|', 'element', 'fontName', 'fontSize', 'color', 'divider', 'bold', 'italic', 'underline', 'strikeThrough', 'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'table', '|', 'codeSnippet', 'fullscreen'
  ],
  spellcheck: false,
  paste: {
    noFormat: true,
    upload: true
  },
  upload: {
    url: '',
    fieldName: 'test'
  }
};
```

## TODO

- [x] Full screen and fixed toolbar features
- [x] Popup menu position auto adjust
- [ ] Advanced table options
- [ ] Code highlight
- [ ] XSS prevention
- [ ] Test

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-2018 hifarer