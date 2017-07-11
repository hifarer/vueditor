
Vueditor
===

[![vueditor](https://img.shields.io/npm/v/vueditor.svg)](https://www.npmjs.com/package/vueditor)
[![vueditor](https://img.shields.io/npm/l/vueditor.svg)](https://www.npmjs.com/package/vueditor)

[English DOC](../README.md)

基于 Vue.js 和 Vuex.js 实现的富文本编辑器, 只支持 Vue.js 2.x.x

浏览器兼容性: Chrome, Firefox, Safari, IE 9+.

在线 [DEMO](http://hifarer.github.io/vueditor/)

## 截图

![vueditor](./vueditor.gif)

## 特性

- 轻量级, 无其他依赖
- 插件支持

## 安装
```javascript
npm install vueditor
```

如果期望通过 script 标签引用, 只需添加 `vueditor.min.js`, `vueditor.min.css` 到相关页面即可. 

## 用法

### Vue.use(Vueditor, config)

适用于一下场景:

1. 只需一个编辑器的情况
2. 一个页面有多个编辑器但配置相同

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import Vueditor from 'vueditor'

import 'vueditor/dist/css/vueditor.min.css'

// 编辑器配置
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
// 创建根实例
new Vue({
  el: '#editorContainer'
});
```

然后在*.vue的template某一处:
```html
<template>
  <div>
    ...
    <Vueditor></Vueditor>
  </div>
</template>
```

获取和设置内容需要先拿到上一步`<Vueditor></Vueditor>`生成的组件，可以通过`$children[index]` 和 `ref`获取到。

```javascript
let parent = new Vue({
  el: '#editorContainer'
});
let inst = parent.$children[0];
inst.setContent('your content here');
inst.getContent();
```

### createEditor(selector, config)

`createEditor`适用于多个Vueditor实例，分别传参。

```javascript

  import Vue from 'vue'
  import Vuex from 'vuex'
  import {createEditor} from 'vueditor'

  import 'vueditor/dist/css/vueditor.min.css'
  
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
注意这种用法会替换掉被初始化的那个元素，如果要添加样式到该元素可以在config里面加上`classList` 或 `id`来实现；`createEditor`返回一个Vueditor实例，通过该实例可以获取和设置内容:

```javascript
let inst = createEditor(...);
inst.setContent('your content here');
inst.getContent();
```

## 可配置参数:

|          名称         |    类型    |                                                         描述                                                         |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| toolbar               | `Array`   | 工具栏的按钮, 可用`|` or `divider` 做为分隔符 |
| fontName              | `Object`   | font-family 选项, `val` 为实际css值, `abbr` 为select-option显示的内容, `abbr` 等于 `val` 时可省略 |
| fontSize              | `Array`    | font-size 选项 |
| lang                  | `String`   | 界面语言, 默认英文, 使用中文查看 |
| uploadUrl         | `String`   | 文件上传接口，返回值必须为字符串路径, 留空只进行本地预览 |
| id                    | `String`   | 容器id |
| classList             | `Array`    | 容器className |


以上可配置项的默认值

```javascript
{
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
  ],
  fontName: [
    {val: 'arial black'}, 
    {val: 'times new roman'}, 
    {val: 'Courier New'}
  ],
  fontSize: [
    '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'
  ],
  lang: 'cn',
  uploadUrl: ''
  id: '',
  classList: []
};
```

## 更新记录

查看 [这里](./docs/changelog.md)

## TODO

- [x] Markdown 支持
- [x] 全屏及工具栏固定选项
- [x] 弹出菜单位置自适应
- [ ] 表格高级设置
- [ ] 代码高亮
- [ ] 插件支持
- [ ] XSS 预防
- [ ] 测试

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 hifarer