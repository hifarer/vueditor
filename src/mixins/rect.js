
export default {
  computed: {
    show () {
      return this.activeComponent === this.$options.name
    },
    position () {
      if (!this.activeComponent || this.activeComponent !== this.$options.name || !this.$refs.popup) {
        return {left: 0, top: 0}
      }
      this.$refs.popup.style.display = 'block'
      let {parentLeft, left, top, width, height} = this.rect
      let offsetWidth = this.$refs.popup.offsetWidth
      let offsetLeft = left
      // by default, the popup menu's left edge is intend to align with the the clicked toolbar element's left edge
      // > 0 means the popup menu's right edge is not totally visible, so we try to align the popup menu's right edge with the clicked toolbar element's right edge
      if (parentLeft + offsetWidth - document.documentElement.clientWidth > 0) {
        offsetLeft = width - offsetWidth
        // check if the popup menu's left edge is totally visible or not
        if (parentLeft + offsetLeft < 0) {
          // align center
          offsetLeft = (width - offsetWidth) / 2
        }
      }
      let position = {left: offsetLeft + 'px', top: (top + height) + 'px'}
      if (this.$options.name === 'emoji' || this.$options.name === 'link') {
        let marginLeft = 0
        let arrowLeft = offsetWidth / 2
        if (parentLeft + offsetLeft - (offsetWidth - width) / 2 < 0) {
          marginLeft = -(parentLeft + offsetLeft)
          arrowLeft = Math.abs(marginLeft) + width / 2
        } else if (offsetLeft === width - offsetWidth) {
          arrowLeft = Math.abs(offsetLeft) + width / 2
        } else {
          marginLeft = -(offsetWidth - width) / 2
        }
        position.popLeft = marginLeft + 'px'
        position.arrowLeft = arrowLeft + 'px'
      }
      return position
    }
  },
  methods: {
    togglePopup (event) {
      if (this.view !== 'design' && this.$options.name !== 'codeSnippet') {
        return
      }
      let obj = event.currentTarget
      this.rect = {
        parentLeft: obj.parentNode.offsetLeft,
        left: obj.offsetLeft,
        top: obj.offsetTop,
        width: obj.offsetWidth,
        height: obj.offsetHeight + parseInt(window.getComputedStyle(obj).marginBottom)
      }
      if (this.activeComponent !== this.$options.name) {
        this.eventHub.$emit('set-active-component', this.$options.name)
      } else {
        this.eventHub.$emit('set-active-component')
      }
    }
  }
}
