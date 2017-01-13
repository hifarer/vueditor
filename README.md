Vueditor
===

[![vueditor](https://img.shields.io/npm/v/vueditor.svg)](https://www.npmjs.com/package/vueditor)
[![vueditor](https://img.shields.io/npm/l/vueditor.svg)](https://www.npmjs.com/package/vueditor)

A wysiwyg editor written in Vue.js and Vuex.js, only support Vue.js 2.x.x

Browser compatibility: Chrome, Firefox, Safari, IE 9+.

Online [demo](http://hifarer.github.io/Vueditor/)

## Screenshot

![vueditor](./vueditor.gif)

## Features

- No jQuery, Bootstrap or any other font file needed
- Light weighted, 55kb for js and 50kb for css
- Using .vue file development mode
- Based on npm + webpack + babel, using ES2015

## Installation
```javascript
npm install vueditor
```

If you prefer to use it via script tag, just add "vueditor.min.js", "vueditor.min.css" to your page. 

## Usage

### Vue.use(Vueditor, config)

Use it in the following cases:

1. Only one editor required
2. Multiple editors required but shared the same config

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import Vueditor from 'vueditor'

import "vueditor/dist/css/vueditor.min.css"

// your config here
let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor'
  ],
  fontName: [
    {val: "arial black"}, {val: "times new roman"}, {val: "Courier New"}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  emoji: ["1f600", "1f601", "1f602", "1f923", "1f603"],
  lang: 'en',
  mode: 'default',
  iframePath: '',
  fileuploadUrl: ''
};

Vue.use(Vuex);
Vue.use(Vueditor, config);
// create a root instance
new Vue({
    el: '#editor1'
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
let inst = parent.$children[0];
inst.setContent('your content here');
inst.getContent();
```

### createEditor(selector, config)

Call `createEditor` and pass specific config as parameter respectively for multiple editors in a page. 

```javascript

  import Vue from 'vue'
  import Vuex from 'vuex'
  import {createEditor} from 'vueditor'

  import "vueditor/dist/css/vueditor.min.css"
  
  Vue.use(Vuex);

  createEditor('#editor2', {
    toolbar: [
        'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 
    ],
    lang: 'en',
    mode: 'default',
    iframePath: '',
    fileuploadUrl: '',
    id: '',
    classList: []
  });
```

The initialized element will be replaced in this case, you can add classList or id to the config for adding styles, the rendered element will have these attributes. `createEditor` returns a Vueditor instance, you can set and get content with it:

```javascript
let inst = createEditor(...);
inst.setContent('your content here');
inst.getContent();
```

Options for configuration:

|          Name         |    Type    |                                                         Description                                                         |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| toolbar               | `Object`   | Buttons on the toolbar, use `|` or `divider` as the separator for grouping |
| fontName              | `Object`   | The font-family select's options, `val` refer to the actual css value, `abbr` refer to the option's text, `abbr` is optional when equals to `val` |
| fontSize              | `Array`    | The font-size select's options |
| emoji                 | `Array`    | The emoji list, you can get full list [here](http://unicode.org/emoji/charts/full-emoji-list.html) |
| lang                  | `String`   | Interface language, default is Chinese, to set to English use `lang: 'en'` |
| mode                  | `String`   | Mode options:  `default`, `iframe` |
| iframePath            | `String`   | If `mode` is set to `iframe`, specify a HTML file path here |
| fileUploadUrl         | `String`   | File upload url, the return result must be a string refer to the uploaded image, leave it empty will end up with local preview |
| id                    | `String`   | id for the rendered editor element |
| classList             | `Array`    | className for the rendered editor element |


Default value of the above fields:

```javascript
export default {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: "宋体, SimSun", abbr: "宋体"}, {val: "黑体, SimHei", abbr: "黑体"},
    {val: "楷体, SimKai", abbr: "楷体"}, {val: "微软雅黑, 'Microsoft YaHei'", abbr: "微软雅黑"},
    {val: "arial black"}, {val: "times new roman"}, {val: "Courier New"}
  ],
  fontSize: [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
  ],
  emoji: [
    "1f600", "1f601", "1f602", "1f923", "1f603", "1f604", "1f605", "1f606", "1f609", "1f60a", "1f60b",
    "1f60e", "1f60d", "1f618", "1f617", "1f619", "1f61a", "263a", "1f642", "1f917", "1f914", "1f610",
    "1f611", "1f636", "1f644", "1f60f", "1f623", "1f625", "1f62e", "1f910", "1f62f", "1f62a", "1f62b",
    "1f634", "1f60c", "1f913", "1f61b", "1f61c", "1f61d", "1f924", "1f612", "1f613", "1f614", "1f615",
    "1f643", "1f911", "1f632", "2639", "1f641", "1f616", "1f61e", "1f61f", "1f624", "1f622", "1f62d",
    "1f626", "1f627", "1f628", "1f629", "1f62c", "1f630", "1f631", "1f633", "1f635", "1f621", "1f620",
    "1f607", "1f920", "1f921", "1f925", "1f637", "1f912", "1f915", "1f922", "1f927"
  ],
  lang: 'cn',
  mode: 'default',
  iframePath: '',
  fileuploadUrl: ''
  id: '',
  classList: []
};
```

## TODO

- [ ] Popup menu position auto adjust
- [ ] Full screen and fixed toolbar feature
- [ ] Advanced table options
- [ ] Code highlight
- [ ] Markdown support
- [ ] Plugin support
- [ ] XSS prevention

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 hifarer
