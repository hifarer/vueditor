
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
  while (container.firstChild) {
    node = container.firstChild
    fragment.appendChild(node)
  }
  range.insertNode(fragment)
  range.setStartAfter(node)
  range.collapse(true)
}

export default insertHTML