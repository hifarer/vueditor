
export default {
  computed: {
    show () {
      return this.mstates.activeComponent === this.$options.name
    },
    position () {
      if (!this.mstates.activeComponent || this.mstates.activeComponent !== this.$options.name) {
        return {left: 0, top: 0}
      }
      let {left, top, width, height} = this.rect
      let offsetLeft = left
      if (this.$refs.popup) {
        // by default, the popup menu's left edge is intend to align with the the clicked toolbar element's left edge
        // > 0 means the popup menu's right edge is not totally visible, so we try to align the popup menu's right edge with the clicked toolbar element's right edge
        if (left + this.$el.offsetWidth - document.documentElement.clientWidth > 0) {
          offsetLeft = left + width - this.$el.offsetWidth
          // check if the popup menu's left edge is totally visible or not
          if (offsetLeft < 0) {
            // align center
            offsetLeft = left + width / 2 - this.$el.offsetWidth / 2
          }
        }
      }
      return {left: offsetLeft + 'px', top: (top + height) + 'px'}
    }
  },
  methods: {
    togglePopup (event) {
      let obj = event.currentTarget
      this.rect = {
        left: obj.offsetLeft,
        top: obj.offsetTop,
        width: obj.offsetWidth,
        height: obj.offsetHeight + parseInt(window.getComputedStyle(obj).marginBottom)
      }
      if (this.mstates.activeComponent !== this.$options.name) {
        this.setActiveComponent(this.$options.name)
      } else {
        this.setActiveComponent()
      }
    }
  }
}
