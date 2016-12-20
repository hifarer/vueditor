Vueditor
======
A wysiwyg editor written in Vue.js and Vuex.js, only support Vue.js 2.x.x or higher version.

Browser compatibility: IE 9+, Chrome, Firefox.

Online [demo](http://hifarer.github.io/Vueditor/)

![vueditor](./vueditor.gif)

## How to use
```javascript
  import Vue from 'vue'
  import Vuex from 'vuex'
  import Vueditor, {createEditor} from 'path/to/vueditor.min.js';

  // your config here
  let config = {
    toolbar: [
      'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
      'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
      'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
      'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
    ],
    lang: 'en', // default is Chinese, to set to English, fill this with 'en'
    mode: 'default', // options: default | iframe
    iframePath: '',    // fill this if 'mode: iframe'
    fileuploadUrl: '' // your file upload url, the return result must be a string refer to the uploaded image, leave it empty will end up with local preview
  };
```

### 1. Only one editor required in a page, use it like this:
```javascript
  Vue.use(Vuex);
  Vue.use(Vueditor, config);
  new Vue({
      el: '#editor1'
  });
```

then in your vue template somewhere:
```html
  <template>
    <div>
      ...
      <Vueditor></Vueditor>
    </div>
  </template>
```

### 2. Multiple editors required, call createEditor and pass specific config as parameter respectively:
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

Note that the second usage will replace the element been initial with, in this case you can add classList or id to the config for adding styles, the rendered element will have these attributes. createEditor returns a Vueditor instance, you can set and get content with it:
```javascript
var inst = createEditor(...);
inst.setContent('your content here');
inst.getContent();
```