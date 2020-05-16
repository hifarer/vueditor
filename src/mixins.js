
export default {
  computed: {
    show() {
      return this.activeComponent === this.$options.name
    }
  },
  methods: {
    toggleMenu(event) {
      let name = this.$options.name
      if (this.view !== 'design' && !(this.view === 'code' && name === 'code')) return
      if (this.activeComponent === name) {
        this.eventHub.$emit('set-active-component') // hide the popup menu
        return
      }
      this.$refs.popup.style.display = 'block' // show popup menu and get it's offsetWidth
      let obj = event.currentTarget.parentNode
      let rect = obj.getBoundingClientRect()
      let popWidth = this.$refs.popup.offsetWidth
      let fnName = ['link'].indexOf(name) !== -1 ? 'getPositionForPopup' : 'getPositionForDropdown'
      this.position = this[fnName]({
        popWidth,
        btnWidth: rect.width,
        btnHeight: rect.height,
        rectLeft: rect.left,
        offsetLeft: obj.offsetLeft
      })
      this.eventHub.$emit('set-active-component', name)
    },
    getPositionForDropdown(data) {
      let { popWidth, btnWidth, btnHeight, rectLeft, offsetLeft } = data
      let posLeft = offsetLeft // by default, the popup menu is intend to align with the the clicked toolbar button's left edge
      // true means the right part is not fully visible
      if (rectLeft + offsetLeft + popWidth - document.documentElement.clientWidth > 0) {
        // true means the left part is not fully visible
        if (rectLeft + offsetLeft + btnWidth - popWidth < 0) {
          posLeft = offsetLeft + (btnWidth - popWidth) / 2 // align center
        } else {
          posLeft = offsetLeft + btnWidth - popWidth // align with the right edge
        }
      }
      return { left: posLeft + 'px', top: btnHeight + 'px' }
    },
    getPositionForPopup(data) {
      let { popWidth, btnWidth, btnHeight, rectLeft, offsetLeft } = data
      let posLeft = offsetLeft + btnWidth / 2 - popWidth / 2
      // true means the left part is not fully visible
      if (rectLeft + posLeft < 0) {
        posLeft = -rectLeft
      }
      // true means the right part is not fully visible
      if (rectLeft + posLeft + popWidth > document.documentElement.clientWidth) {
        posLeft = document.documentElement.clientWidth - (rectLeft + offsetLeft) - popWidth
      }
      return { left: posLeft + 'px', top: btnHeight + 'px', arrowLeft: Math.abs(posLeft) + btnWidth / 2 + 'px' }
    }
  }
}
