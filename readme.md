# Vueditor
a wysiwyg editor based on vue and vuex.

only support vue 2.x.x version.

browser compatibility: Ami to compatible with IE 9+, Chrome, Firefox, only Chrome tested.

online [demo](http://hifarer.github.io/Vueditor/)

## How to use
```
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
    lang: 'en', // default is Chinese, to set English, fill this with 'en'.
    mode: 'default', // options: default | iframe
    iframePath: '',    // fill this if 'mode: iframe'
    fileuploadUrl: '' // your file upload url, leave it empty will result in local preview for your images.
  };
```
### if only one editor required in a page, use it like this:
```  
  Vue.use(Vuex);
  Vue.use(Vueditor, config);
  new Vue({
      el: '#editor1'
  });
```
### then in your vue template somewhere:
```
  <template>
    <div>
      ...
      <Vueditor></Vueditor>
    </div>
  </template>
```

### if multiple editor required, call createEditor and pass specific config as parameter respectively:
```
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
### note that the second usage will replace the element been initial with, in this case, you can add classList or id or both to the config
### for adding styles, the render result element will have these attributes. createEditor returns an instance, you can set and get content use it:
```
var inst = createEditor(...);
inst.setContent('your content here');
inst.getContent();
```