# Vueditor
a wysiwyg editor based on vue and vuex.

browser compatibility: IE 9+, Chrome, Firefox

online [demo](http://script.duapp.com/projects/vueditor/index.html)

## How to use

#### To use it in browser

* write your config file, you can use "|" or "divider" as the divider in toolbar config, below is a example:
```
var VueditorConfig = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
    'links', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
  ],
  mode: 'iframe', // default or iframe
  iframePath: './iframe/page.html',  // specify iframePath if mode is iframe
  assetsPath: '/dist', // need to be an absolute path
  fileuploadUrl: ''
};
```

* add the following listed stylesheets and scripts to you page, then set width and height to the container that you want to initial Vueditor with.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vueditor</title>
  <link rel="stylesheet" type="text/css" href="../dist/css/vueditor.min.css">
</head>
<body>

  <div id="vueditor" style="height: 200px;"></div>

  <script type="text/javascript" src="path/vue.min.js"></script>
  <script type="text/javascript" src="path/vuex.min.js"></script>
  <script type="text/javascript" src="path/config.js"></script>
  <script type="text/javascript" src="path/vueditor.min.js"></script>
  <script>
    var inst = new Vueditor('#vueditor');
    inst.setContent('fill your content here');
    inst.getContent();
  </script>
</body>
</html>
```

#### To use it as a library
```
import Vueditor from 'path/vueditor.min.js';

var inst = new Vueditor('#vueditor');
inst.setContent('fill your content here');
inst.getContent();
```

## Notice

#### Each Vueditor instance can has it's own config

```
var inst = new Vueditor('#vueditor', {
    ...
});
```

if no config is specified both in global variable and arguments when creating a new Vueditor instance, the default config will working.

config priority: arguments config > global config > default config