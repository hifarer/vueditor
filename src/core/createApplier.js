
function replaceFontWithSpan(element, attrName) {
  if (element.nodeType !== 1) return
  let span = document.createElement('span')
  Array.prototype.forEach.call(element.attributes, attr => {
    attr.nodeName !== attrName && span.setAttribute(attr.nodeName, attr.nodeValue)
  })
  while (element.firstChild) {
    span.appendChild(element.firstChild)
  }
  span.normalize()
  element.parentNode.replaceChild(span, element)
  return span
}

export default function createApplier(attrName, styleName) {
  return function(range, value) {
    let container = range.commonAncestorContainer
    container.nodeType === 3 && (container = container.parentNode)
    container = container.parentNode
    let fontList = [].slice.call(container.getElementsByTagName('font'))
    let spanList = [].slice.call(container.getElementsByTagName('span'))
    // for new range
    let startNode, endNode
    if (fontList.length !== 0) {
      fontList.forEach((font, index) => {
        let span = replaceFontWithSpan(font, attrName)
        span.style[styleName] = value
        index === 0 && (startNode = span)
        endNode = span
      })
    }
    if (spanList.length !== 0) {
      spanList.forEach(span => {
        if (span.getAttribute(attrName) !== null) {
          span.removeAttribute(attrName)
          span.style[styleName] = value
          !startNode && (startNode = span)
          endNode = span
        }
      })
    }
    return {
      start: startNode,
      startOffset: undefined,
      end: endNode,
      endOffset: undefined
    }
  }
}
