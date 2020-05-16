
export default class RangeUtil {
  /**
   * @param {Window} win
   */
  constructor(win) {
    if (win && win.getSelection) {
      this.nativeGetSelection = win.getSelection.bind(win)
    } else {
      this.nativeGetSelection = () => null
    }
  }

  getSelection() {
    return (this.sel = this.nativeGetSelection())
  }

  getRange() {
    let sel = this.getSelection()
    if (sel && sel.rangeCount !== 0) {
      return sel.getRangeAt(0)
    }
  }

  /**
   * @param {Node} startContainer
   * @param {Node} endContainer
   * @param {number} startOffset
   * @param {number} endOffset
   */
  setRange(startContainer, endContainer, startOffset, endOffset) {
    let range = this.getRange()
    if (!range) return
    if (typeof startOffset === 'undefined') {
      range.setStartBefore(startContainer)
    } else {
      range.setStart(startContainer, startOffset)
    }
    if (typeof endOffset === 'undefined') {
      range.setEndAfter(endContainer)
    } else {
      range.setEnd(endContainer, endOffset)
    }
    // 获取range的时候，就已经获取了sel，此处this.sel必然存在
    this.sel.removeAllRanges()
    this.sel.addRange(range)
  }

  /**
   * @param {Node} node
   */
  setRangeAtNode(node) {
    let range = this.getRange()
    if (!range) return
    range.selectNode(node)
    this.sel.removeAllRanges()
    this.sel.addRange(range)
  }

  /**
   * @param {any} node
   */
  setRangeAtNodeContent(node) {
    let range = this.getRange()
    if (!range) return
    range.selectNodeContents(node)
    this.sel.removeAllRanges()
    this.sel.addRange(range)
  }

  /**
   * @param {Range} range
   * @param {Node} node
   */
  isNodeInRange(range, node) {
    let nodeRange = node.ownerDocument.createRange()
    let temp = node
    // 找到最内层的firstChild，文本节点
    let firstChild = null
    while ((firstChild = temp.firstChild) && firstChild.nodeType === 1) {
      temp = firstChild
    }
    temp = node
    // 找到最内层的lastChild，文本节点
    let lastChild = null
    while ((lastChild = temp.lastChild) && lastChild.nodeType === 1) {
      temp = lastChild
    }
    if (firstChild && lastChild) {
      nodeRange.setStart(firstChild, 0)
      nodeRange.setEnd(lastChild, lastChild.nodeValue.length)
    } else {
      nodeRange.selectNodeContents(node)
    }
    return range.compareBoundaryPoints(range.START_TO_START, nodeRange) <= 0
      && range.compareBoundaryPoints(range.END_TO_END, nodeRange) >= 0
  }
}
