# vueditor
a wysiwyg editor based on vue and vuex.

#### online [demo](http://script.duapp.com/projects/vueditor/index.html)


#### How to use

1.write your config file, you can use "|" or "divider" as the divider, below is the full config:
```
var toolbarConfig = [
  'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
  'link', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
  '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'table1', '|', 'view'
];
```

2.add the following stylesheets and scripts to you page, remember to add width and height to the container.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vueditor</title>
  <!--codemirror-pkg.min.css, codemirror-pkg.min.js and beautify-html.min.js is only neccessy when you need to switch to the source code,-->
  <!--don't add "view" to your toolbarConfig if not-->
  <link rel="stylesheet" type="text/css" href="../dist/plugins/codemirror/codemirror-pkg.min.css">
  <link rel="stylesheet" type="text/css" href="../dist/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="../dist/css/vueditor.min.css">
</head>
<body>

  <div id="vueditor" style="height: 200px;"></div>
   
  <script type="text/javascript" src="../dist/plugins/codemirror/codemirror-pkg.min.js"></script>
  <script type="text/javascript" src="../dist/plugins/beautify-html.min.js"></script>
  <script type="text/javascript" src="../dist/js/config.js"></script>
  <script type="text/javascript" src="../dist/js/vue.min.js"></script>
  <script type="text/javascript" src="../dist/js/vuex.min.js"></script>
  <script type="text/javascript" src="../dist/js/vueditor.min.js"></script>
  <script>
    var inst = new Vueditor('#vueditor');
    inst.setContent('asdfasdfasdf');
    inst.getContent();
  </script>
</body>
</html>
```