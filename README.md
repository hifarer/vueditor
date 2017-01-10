Vueditor
======
A wysiwyg editor written in Vue.js and Vuex.js, only support Vue.js 2.x.x

No jQuery or Bootstrap needed. 

Browser compatibility: Chrome, Firefox, Safari, IE 9+.

Online [demo](http://hifarer.github.io/Vueditor/)

![vueditor](./vueditor.gif)

## Installation
```javascript
npm install vueditor
```

If you prefer to use it via script tag, just add "vueditor.min.js", "vueditor.min.css" to your page. 

## Usage
```javascript
  import Vue from 'vue'
  import Vuex from 'vuex'
  import Vueditor, {createEditor} from 'vueditor'

  import "vueditor/dist/css/vueditor.min.css"

  // your config here
  let config = {
    
    // buttons on the toolbar, you can use '|' or 'divider' as the separator
    toolbar: [
      'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
      'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
      'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
      'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
    ],

    // the font-family select's options, "val" refer to the actual css value, "abbr" refer to the option's text
    // "abbr" is optional when equals to "val";
    fontName: [
      {val: "", abbr: ""}
      {val: "arial black"}, {val: "times new roman"}, {val: "Courier New"}
    ],

    // the font-size select's options
    fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],

    // the emoji list, you can get full list here: http://unicode.org/emoji/charts/full-emoji-list.html
    emoji: ["1f600", "1f601", "1f602", "1f923", "1f603"],

    // default is Chinese, to set to English use lang: 'en'
    lang: 'en',

    // mode options: default | iframe
    mode: 'default',

    // if mode is set to 'iframe', specify a HTML file path here
    iframePath: '',

     // your file upload url, the return result must be a string refer to the uploaded image, leave it empty will end up with local preview
    fileuploadUrl: ''
  };
```

#### 1. Only one editor required or multiple editors required but shared the same config, use it like this:
```javascript
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

#### 2. Multiple editors required, call `createEditor` and pass specific config as parameter respectively:
```javascript
  createEditor('#editor2', {
    toolbar: [
        'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 
    ],
    lang: 'en',
    mode: 'default',
    iframePath: '',
    fileuploadUrl: '',
    classList: [],
    id: ''
  });
```

Note that the second usage will replace the element been initial with, in this case you can add classList or id to the config for adding styles, the rendered element will have these attributes. `createEditor` returns a Vueditor instance, you can set and get content with it:
```javascript
let inst = createEditor(...);
inst.setContent('your content here');
inst.getContent();
```