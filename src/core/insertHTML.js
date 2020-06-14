
/**
 * @param {Range} range
 * @param {string} html
 */
function insertHTML(range, html) {
  range.deleteContents()
  let node = null
  let fragment = document.createDocumentFragment()
  let container = document.createElement('div')
  container.innerHTML = html
  node = container.firstChild
  while (container.firstChild) {
    fragment.appendChild(container.firstChild)
  }
  range.insertNode(fragment)
  range.detach && range.detach()
  while (node.firstChild) {
    node = node.firstChild
  }
  if (node.nodeType === 1) {
    return { start: node, startOffset: undefined, end: node, endOffset: undefined }
  } else {
    return { start: node, startOffset: node.nodeValue.length, end: node, endOffset: node.nodeValue.length }
  }
}

export default insertHTML