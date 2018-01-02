Vueditor
===

[![vueditor](https://img.shields.io/npm/v/vueditor.svg)](https://www.npmjs.com/package/vueditor)
[![vueditor](https://img.shields.io/npm/l/vueditor.svg)](https://www.npmjs.com/package/vueditor)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[中文文档](./docs/chinese.md)

A wysiwyg editor written in Vue.js and Vuex.js, require Vue.js 2.0.0, Vuex.js 2.0.0 and above.

Browser compatibility: Chrome, Firefox, Safari, IE 9+.

Online [DEMO](http://hifarer.github.io/vueditor/)

## Screenshot

![vueditor](./vueditor.gif)

## Features

- Customizable
- Light weighted, very few dependencies
- Plugin support

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
import Vuex from 'vuex'
import Vueditor from 'vueditor'

import 'vueditor/dist/style/vueditor.min.css'

// your config here
let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  uploadUrl: ''
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
  import Vuex from 'vuex'
  import { createEditor } from 'vueditor'

  import 'vueditor/dist/style/vueditor.min.css'
  
  Vue.use(Vuex);

  createEditor('#editorContainer', {
    toolbar: [
      'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 
    ],
    uploadUrl: '',
    id: '',
    classList: []
  });
```

The initialized element will be replaced in this case, you can add classList or id to the config for adding styles, the rendered element will have these attributes. `createEditor` returns a vueditor instance, you can set and get content with it:

```javascript
let inst = createEditor(...);
inst.setContent('your content here');
inst.getContent();
```

#### File upload

You can set `uploadUrl` attribute in config when you initialize an editor, all the upload stuffs will be handled automatically. If you perfer do it yourself or has some authrization to do before uploading, just add a function `upload` to the instance returned by `createEditor`. When an upload action triggered, vueditor will call this function instead of the build-in function. The upload function has two arguments: `obj` refer to the file input element, `callback` requires the uploaded file url as argument for inserting content to the editor, See the example below: 
```javascript
editor.upload = function (obj, callback) {
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
bring the language object in, then make it an attribute of the config for initialize. See the example below:
```javascript
Vue.use(Vueditor, {
  ...
  lang: languageObject,
});
```

## Options for configuration:

|          Name         |    Type    |                                                         Description                                                         |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| spellcheck            | `Boolean`  | Check spell or not, default is false |
| lang                  | `Object`   | Interface language, default is English |
| toolbar               | `Array`   | Buttons on the toolbar, use `|` or `divider` as separator for grouping |
| fontName              | `Array`   | The font-family select's options, `val` refer to the actual css value, `abbr` refer to the option's text, `abbr` is optional when equals to `val` |
| fontSize              | `Array`    | The font-size select's options |
| uploadUrl         | `String`   | File upload url, the return result of this must be a string refer to the uploaded file url, leave it empty will end up with local preview |
| id                    | `String`   | id for the rendered editor element |
| classList             | `Array`    | className for the rendered editor element |
| plugins             | `Array`    | plugins for editor |


Default value of the above fields:

```javascript
{
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
  ],
  uploadUrl: ''
  id: '',
  classList: []
};
```

## Change log

See [change log](./docs/changelog.md)

## Bug confirmed

## TODO

- [x] Markdown support
- [x] Full screen and fixed toolbar features
- [x] Popup menu position auto adjust
- [ ] Advanced table options
- [ ] Code highlight
- [ ] Plugin support
- [ ] XSS prevention
- [ ] Test

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 hifarer