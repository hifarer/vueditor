
export default class Range {
  setIframeWin (obj) {
    this.iframeWin = obj
  }

  getSelection () {
    if (this.iframeWin && this.iframeWin.getSelection) {
      return this.iframeWin.getSelection()
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

  /**
   * range container
   * @param {Boolean} bool should return original node
   */
  getContainer (bool) {
    let range = this.getRange()
    if (!range) return
    let container = range.commonAncestorContainer
    if (bool) return container
    if (container.nodeType === 3) {
      container = container.parentNode
    }
    return container
  }

  setRange (range) {
    let sel = this.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }

  setRangeAtOffset (startContainer, startOffset, endContainer, endOffset) {
    let range = this.getRange()
    if (!range) return
    range.setStart(startContainer, startOffset)
    range.setEnd(endContainer, endOffset)
    this.setRange(range)
  }

  setRangeAtNode (node) {
    let range = this.getRange()
    if (!range) return
    range.selectNode(node)
    this.setRange(range)
  }

  setRangeAtNodeContent (node) {
    let range = this.getRange()
    if (!range) return
    range.selectNodeContents(node)
    this.setRange(range)
  }

  isNodeInRange (range, node) {
    let nodeRange = node.ownerDocument.createRange()
    let lastTextChild = null
    while ((lastTextChild = node.lastChild) && lastTextChild.nodeType === 1) {
      node = lastTextChild
    }
    if (node.firstChild && lastTextChild) {
      nodeRange.setStart(node.firstChild, 0)
      nodeRange.setEnd(lastTextChild, lastTextChild.nodeValue.length)
    } else {
      nodeRange.selectNodeContents(node)
    }
    return range.compareBoundaryPoints(range.START_TO_START, nodeRange) <= 0 
      && range.compareBoundaryPoints(range.END_TO_END, nodeRange) >= 0
  }
}
