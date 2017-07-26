
### Use plugin

Add an attibute `plugins` in the config for initialize plugins. Each plugin item must has the following attributes:
1. `name`
plugin's name.
2. `element`
`element` decides the plugin trigger element in toolbar. The `type` decides the type, available options are `button` and `select`. The `lang` decides the language, it should has `title` attribute if `type` is `button`. `className` value will be the class names. If hope to directly do something when the toolbar element triggered a click event, add `action: actionName` to `element`, the editor will dispatch an action and the component will receive it.
3. `component`
`component` is the actual component object that a `.vue` file export.

An example below:
```javascript
plugins: [
  {
    name: 'emoji',
    // the toolbar element, will produce: '<a href="javascript:;" title="Insert Emoji" unselectable="on"><i class="icon-smile-o"></i></a>',
    element: {
      type: 'button',
      lang: {
        title: 'Insert Emoji'
      },
      className: 'icon-smile-o'
    },
    // the component object
    component: emoji
  }
]
```

Another exmple for `select` type:
```javascript
plugins: [
  {
    name: 'fontSize',
    // the toolbar element, will produce: '<a href="javascript:;" unselectable="on" class="ve-select font-select"><span></span><i class="ve-triangle-down"></i></a>',
    element: {
      type: 'select',
      className: 'font-select'
    },
    // the component object
    component: fontSize
  }
]
```

### Write plugin

To write a plugin for Vueditor, everything is as usual as writing an normal vue component. There two kinds of plugins supported which distinguish by the element in toolbar: `button` and `select`.
A toolbar element is used to trigger action to do certain stuff, when an click event triggered in a toolbar element, the plugin component needs to know it so that it can react.
If the reaction is do something directly, add a watcher and computed method for `callee`, and call certain function if the callee's value matches the requirement. `callee` will be `{name: actionName}`, and `actionName` is the `action` value when initializes plugin. A example below:

```javascript
computed: {
  callee: function () {
    return this.$store.state.callee;
  }
},
watch: {
  'callee': function (val) {
    val.name == 'xxx' && this.xxx();
  }
}
```

If the reaction is just show a popup menu, add computed methods for `rect` and `showPopup`, then bind them to the popup menu'style. `rect` is the toolbar element's rect info that triggered a click event, `showPopup` decides whether the popup menu should show or not:

```javascript
computed: {
  rect: function () {
    return this.$store.state.rect;
  },
  showPopup: function () {
    return this.$store.state.toolbar.xxx.showPopup;
  }
}
```

The toolbar Element's style can be define inside the component:
```css
/*icon for toolbar button*/
.icon-smile-o {
  background: url("../images/icon-smile-o.png") no-repeat;
}
```

Some other useful APIs:
```javascript
methods: {
  xxx: function () {
    ...
    // insert html to editor
    this.$store.dispatch('execCommand', {name: 'insertHTML', value: 'some html'});
  }
}
```

For more detail, see the `src/plugins/emoji.vue` file.