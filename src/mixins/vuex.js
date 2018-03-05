export default {
  computed: {
    editorState: function () {
      let name = this.$parent.moduleName
      return name ? this.$store.state[name] : this.$store.state
    }
  },
  methods: {
    getActionPath (str) {
      return str
      // let name = this.$parent.moduleName
      // return name ? name + '/' + str : str
    }
  }
}
