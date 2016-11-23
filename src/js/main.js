import app from "../components/app.vue";
import createStore from '../vuex/store';
import defaultConfig from './config';
import globalConfig from 'config';

export default class Vueditor {
  constructor (el, opts) {
    let config = opts || globalConfig || defaultConfig;
    this.obj = document.querySelector(el);
    this.obj.innerHTML = '<app></app>';
    this.vue = new Vue({
      el: this.obj,
      data: {
        config: config
      },
      store: createStore(config),
      components: {
        app
      },
      methods: {
        getContent () {
          return this.$store.state.content;
        },
        setContent (content) {
          this.$store.dispatch('updateContent', content);
        }
      }
    });
  }
  setContent (content) {
    this.vue.setContent(content);
  }
  getContent () {
    return this.vue.getContent();
  }
}

// TODO 安全，图片上传