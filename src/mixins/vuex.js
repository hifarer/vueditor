
export default {
  beforeCreate () {
    let name = this.$parent.namespace || this.$parent.$parent.namespace
    this.mstates = name ? this.$store.state[name] : this.$store.state
    this.mpath = name ? name + '/' : ''
  }
}
