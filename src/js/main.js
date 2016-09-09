import app from "../components/app.vue";

function Vueditor(el) {
  app.el = el;
  return new Vue(app);
}

window.Vueditor = Vueditor;