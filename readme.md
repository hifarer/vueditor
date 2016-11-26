# Vueditor
a wysiwyg editor based on vue and vuex.

browser compatibility: IE 9+, Chrome, Firefox

online [demo](http://script.duapp.com/projects/vueditor/index.html)

## How to use

```
import Vueditor from 'path/vueditor.min.js';

Vue.use(Vueditor, {
  // your config here
});

```

then in your vue template somewhere:
```
  <template>
    <div>
      ...
      <Vueditor></Vueditor>
    </div>
  </template>
```