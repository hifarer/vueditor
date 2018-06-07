
export default class Range {
  setIframeWin (obj) {
    this.obj = obj
  }

  getSelection () {
    if (this.obj && this.obj.getSelection) {
      return this.obj.getSelection()
    }
  }

  getRange () {
    let sel = this.getSelection()
    let range
    if (sel && sel.rangeCount !== 0) {
      range = sel.getRangeAt(0)
    }
    return range
  }

  getContainer () {
    let range = this.getRange()
    if (!range) return
    let container = range.commonAncestorContainer
    if (container.nodeType === 3) {
      container = container.parentNode
    }
    return container
  }

  setRange (startContainer, startOffset, endContainer, endOffset) {
    let range = this.getRange()
    if (!range) return
    range.setStart(startContainer, startOffset)
    range.setEnd(endContainer, endOffset)
  }

  setRangeAtNode (node) {
    let range = this.getRange()
    if (!range) return
    range.selectNode(node)
  }

  setRangeAtNodeContent (node) {
    let range = this.getRange()
    if (!range) return
    range.selectNodeContents(node)
  }
}
