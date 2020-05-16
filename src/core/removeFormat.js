
/**
 * 格式化内容
 * @param {any} container
 */
export default function removeFormat(container) {
  if (container.nodeType === 3) return
  let nodeList = Array.prototype.slice.call(container.getElementsByTagName('span'))
  for (let i = 0; i < nodeList.length; i++) {
    let node = nodeList[i]
    // node has element child, depth first
    if (node.children.length !== 0) {
      removeFormat(node)
    }
    // check again
    if (node.children.length === 0) {
      // style is the only attribute
      if (node.attributes.length === 1 && node.attributes[0].nodeName === 'style') {
        // replace the node with it's text content
        let parentNode = node.parentNode
        if (parentNode) {
          parentNode.replaceChild(document.createTextNode(node.innerText), node)
          parentNode.normalize()
        }
      } else {
        node.removeAttribute('style')
      }
    }
  }
}