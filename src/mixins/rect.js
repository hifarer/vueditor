export default {
  props: ['tagName'],
  computed: {
    // rect belong to the clicked toolbar element
    rect () {
      return this.mstates.rect
    },
    style () {
      if (!this.showPopup) {
        return {left: 0, top: 0}
      }
      let {left, top, width, height} = this.rect
      let offsetLeft = left
      if (this.$el) {
        this.$el.style.display = 'block'
        // by default, the popover menu's left edge is intend to align with the the clicked toolbar element's left edge
        // > 0 means the popover menu's right edge is not totally visible, so we try to align the popover menu's right edge with the clicked toolbar element's right edge
        if (left + this.$el.offsetWidth - document.documentElement.clientWidth > 0) {
          offsetLeft = left + width - this.$el.offsetWidth
          // check if the popover menu's left edge is totally visible or not
          if (offsetLeft < 0) {
            // align center
            offsetLeft = left + width / 2 - this.$el.offsetWidth / 2
          }
        }
        this.$el.style.display = 'none'
      }
      return {left: offsetLeft + 'px', top: (top + height) + 'px'}
    }
  }
}
