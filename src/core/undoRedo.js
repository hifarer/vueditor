
export default class UndoRedo {
  constructor() {
    /** @type {string[]} */
    this.stack = []
    this.index = -1
  }
  reset() {
    this.stack = []
    this.index = -1
  }
  canUndo() {
    return this.index > 0
  }
  canRedo() {
    return this.index < this.stack.length - 1
  }
  undo() {
    if (!this.canUndo()) return
    this.index--
    return this.stack[this.index] || ''
  }
  redo() {
    if (!this.canRedo()) return
    this.index++
    return this.stack[this.index] || ''
  }
  /**
   * @param {string} content
   */
  push(content) {
    if (content !== this.stack[this.index]) {
      this.stack = this.stack.slice(0, this.index + 1)
      this.stack.push(content)
      this.index++
    }
  }
}