export default {
  props: ['tagName'],
  computed: {
    // rect belong to the clicked toolbar element
    rect: function () {
      return this.$store.state.rect;
    },
    style: function () {
      if(!this.showPopup){
        return {left: 0, top: 0}
      }
      let {left, top, width, height} = this.rect;
      let offsetLeft = left;
      if(this.$el){
        this.$el.style.display = 'block';
        // > 0 means the popover menu's right part is not totally visible
        if(left + this.$el.offsetWidth - document.documentElement.clientWidth > 0){
          offsetLeft = left - this.$el.offsetWidth + width;
          if(offsetLeft < 0){
            offsetLeft = left + width / 2 - this.$el.offsetWidth / 2;
          }
        }
        this.$el.style.display = 'none';
      }
      return {left: offsetLeft + 'px', top: (top + height) + 'px'}
    }
  },
}
