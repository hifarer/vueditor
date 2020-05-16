// @ts-nocheck

import setFontSize from './setFontSize'
import setFontName from './setFontName'
import { setColor, setBackgroundColor } from './setColor'
import insertHTML from './insertHTML'
import removeFormat from './removeFormat'
import RangeUtil from './rangeUtil'
import UndoRedo from './undoRedo'

import { getBrowser } from './util.js'

const browser = getBrowser()

class Editor {

  constructor(eventHub) {
    this.eventHub = eventHub
    this.content = ''
    this._inited = false
  }

  /**
   * @param {Window} window
   * @param {Document} document
   * @param {Body} body
   */
  init(window, document, body) {
    this.rangeUtil = new RangeUtil(window)
    this.undoRedo = new UndoRedo()
    this.document = document
    this._syncContent = (type) => {
      type === 0 ? this.content = body.innerHTML : body.innerHTML = this.content
    }
    this._inited = true
    try {
      document.execCommand('styleWithCSS', false, true)
    } catch (err) {
      try {
        // use false to use CSS, true to use HTML
        document.execCommand('useCSS', false, false)
      } catch (err) {}
    }
  }

  getContent() {
    return this.content
  }

  setContent(value) {
    if (typeof value === 'undefined') {
      this._syncContent(0)
      this.undoRedo.push(this.content)
    } else {
      if (this.content !== value) {
        this.content = value
        this._syncContent(1)
        this.undoRedo.push(value)
      }
    }
    this.dispatch('history')
  }

  canUndo() {
    if (!this._inited) return false
    return this.undoRedo.canUndo()
  }
  canRedo() {
    if (!this._inited) return false
    return this.undoRedo.canRedo()
  }
  undo() {
    if (!this.canUndo()) return
    this.setContent(this.undoRedo.undo())
  }
  redo() {
    if (!this.canRedo()) return
    this.setContent(this.undoRedo.redo()) 
  }
  resetUndoRedo() {
    this.undoRedo.reset()
    this.undoRedo.push(this.content)
  }

  getRange() {
    return this.rangeUtil.getRange()
  }

  subscrible(type, listener) {
    console.log('subscrible: ', type)
    this.eventHub.$on(type, listener)
  }

  dispatch(type, args) {
    console.log('dispatch: ', type)
    this.eventHub.$emit(type, args)
  }

  triggerEvent(eventName) {
    let doc = this.document
    let event = doc.createEvent('Event')
    // args: string type, boolean bubbles, boolean cancelable
    event.initEvent(eventName, false, true)
    doc.dispatchEvent(event)
  }

  execCommand(name, value) {
    this.document.execCommand(name, false, value)
    this.triggerEvent('selectionchange')
    this.setContent()
  }
  /**
   * @param {string} value
   */
  setFontSize(value) {
    let range = this.rangeUtil.getRange()
    if (!range || range.collapsed) return
    let resultRange = setFontSize(range, value)
    if (resultRange) {
      let { start, startOffset, end, endOffset } = resultRange
      this.rangeUtil.setRange(start, end, startOffset, endOffset)
    }
  }
  setFontName(value) {
    if (browser !== 'Edge') {
      this.document.execCommand('fontName', false, value)
    } else {
      let range = this.rangeUtil.getRange()
      if (!range || range.collapsed) return
      let container = range.commonAncestorContainer
      // if range container has only one child
      // if we replace font element with span element, after we run execCommand again, ie will create another font element instead of using the span element
      if (container.childNodes.length === 1 
          && container.childNodes.nodeType === 1
          && container.tagName.toLowerCase() === 'span') {
          container.childNodes[0].style.fontFamily = value
      } else {
        this.document.execCommand('fontName', false, value)
        let resultRange = setFontName(range, value)
        if (resultRange) {
          let { start, startOffset, end, endOffset } = resultRange
          this.rangeUtil.setRange(start, end, startOffset, endOffset)
        }
      }
    }
  }
  setColor(name, value) {
    if (browser !== 'Edge') {
      this.document.execCommand(name, false, value)
    } else {
      let range = this.rangeUtil.getRange()
      if (!range || range.collapsed) return
      let container = range.commonAncestorContainer
      // if range container has only one child
      // if we replace font element with span element, after we run execCommand again, ie will create another font element instead of using the span element
      if (container.childNodes.length === 1 
          && container.childNodes.nodeType === 1
          && container.tagName.toLowerCase() === 'span') {
          container.childNodes[0].style[name === 'foreColor' ? 'color' : 'backgroundColor'] = value
      } else {
        this.document.execCommand(name, false, value)
        let resultRange = name === 'foreColor' ? setColor(range, value) : setBackgroundColor(range, value)
        if (resultRange) {
          let { start, startOffset, end, endOffset } = resultRange
          this.rangeUtil.setRange(start, end, startOffset, endOffset)
        }
      }
    }
  }
  /**
   * @param {string} html
   */
  insertHTML(html) {
    let range = this.rangeUtil.getRange()
    if (!range || !html) return
    insertHTML(range, html)
  }
  insertCodeBlock (attrName, attrValue, codeLang) {
    let range = this.rangeUtil.getRange()
    if (!range) return
    let container = range.commonAncestorContainer
    container.nodeType === 3 && (container = container.parentNode)
    // if the range is inside code element
    if (container.tagName.toLowerCase() === 'code') {
      container.setAttribute(attrName, codeLang)
    } else {
      let tempDiv = document.createElement('div')
      let html = ('<pre><code ' + attrName + '="' + attrValue + '"><br></code></pre>').replace(/#lang#/igm, codeLang)
      tempDiv.innerHTML = html
      // if the range is inside pre element
      if (container.tagName.toLowerCase() === 'pre') {
        this.insertHTML(tempDiv.children[0].outerHTML)
      } else {
        this.insertHTML(html)
      }
    }
  }
  /**
   * @param {number} rows
   * @param {number} cols
   */
  insertTable(rows, cols) {
    let table = document.createElement('table')
    let tbody = document.createElement('tbody')
    table.style.cssText = 'border-collapse: collapse; width: ' + cols * 50 + 'px'
    table.setAttribute('border', '1')
    table.appendChild(tbody)
    for (let i = 0; i < rows; i++) {
      let tr = document.createElement('tr')
      for (let j = 0; j < cols; j++) {
        let td = document.createElement('td')
        td.innerHTML = '<br>'
        tr.appendChild(td)
      }
      tbody.appendChild(tr)
    }
    this.insertHTML(table.outerHTML)
  }

  /**
   * change element
   * @param {string} value tagName
   */
  formatBlock(value) {
    this.document.execCommand('formatblock', false, value)
  }

  /**
   * 清除格式
   */
  removeFormat() {
    // 返回一个 Boolean，如果是 false 则表示操作不被支持或未被启用。
    this.document.execCommand('removeFormat', false, null)
    let range = this.rangeUtil.getRange()
    if (!range || range.collapsed) return
    removeFormat(range.commonAncestorContainer)
  }

  /**
   * 包裹文本节点
   * @param {any} range
   * @param {any} tagName
   */
  wrapTextNode (range, tagName) {
    let offset = range.startOffset
    let obj = this.document.createElement(tagName)
    obj.appendChild(this.document.createTextNode(range.startContainer.nodeValue))
    range.startContainer.parentNode.replaceChild(obj, range.startContainer)
    range.setStart(obj.childNodes[0], offset)
    range.collapse(true)
  }

  /**
   * 添加超链接
   * @param {string} href 
   */
  addLink(href) {
    href.match(/^https?:\/\//igm) === null && (href = 'http://' + href)
    this.document.execCommand('createlink', false, href)
  }

  /**
   * 取消超链接
   */
  clearLink() {
    let range = this.rangeUtil.getRange()
    if (!range) return
    let container = range.commonAncestorContainer
    container.nodeType === 3 && (container = container.parentNode)
    while (container.tagName && container.tagName.toLowerCase() !== 'a') {
      container = container.parentNode
    }
    if (container.tagName && container.tagName.toLowerCase() === 'a') {
      this.rangeUtil.setRangeAtNode(container)
      this.document.execCommand('unlink', false, null)
    }
  }
}

export default Editor
