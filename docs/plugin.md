
1. write plugin

See the `src/plugins/emoji.vue` file, everything is as usual as writing an normal vue component. if you need use an icon in toolbar, define the style inside the component. An example below;
```css
/*icon for toolbar button*/
.icon-smile-o {
  background: url("../images/icon-smile-o.png") no-repeat;
}
```

Some useful api:

```javascript

...
computed: {
  // get the toolbar element's rect which trigger an click event.
  rect: function () {
    return this.$store.state.rect;
  },
  // decide whether the popup menu is show or not.
  showPopup: function () {
    return this.$store.state.toolbar.emoji.showPopup;
  }
},
methods: {
  xxx: function () {
    ...
    // insert html to editor
    this.$store.dispatch('execCommand', {name: 'insertHTML', value: 'some html'});
  }
}
```

2. use plugin

Add an attibute `plugins` in the config for initialize.

```javascript
plugins: {
  emoji: {
    type: 'btn',    // decide the toolbar element type, options: 'btn', 'select'
    // language
    lang: {
      title: 'Insert Emoji'
    },
    // the toolbar element
    // this will produce: '<a href="javascript:;" title="Insert Emoji" unselectable="on"><i class="icon-smile-o"></i></a>',
    element: {
      title: 'Insert emoji',
      className: 'icon-smile-o'
    },
    // the real component object
    component: emoji
  }
}
```