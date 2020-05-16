// @ts-nocheck

import {
  ELEMENT_NODE,
  TEXT_NODE
} from './consts'

/**
 * @param {any} node
 * @param {number} offset
 * @param {string} size
 */
function handleStartTextNode(node, offset, size) {
  // skip
  if (node.nodeValue.trim() === '') {
    return node
  }
  let eleNode = document.createElement('span')
  eleNode.style.fontSize = size
  // if true replace the whole text node with element node
  if (offset === 0) {
    eleNode.appendChild(document.createTextNode(node.nodeValue))
    node.parentNode.replaceChild(eleNode, node)
  } else {
    // insert the new element node after text node
    eleNode.appendChild(document.createTextNode(node.nodeValue.substr(offset)))
    // if node.nextSibling is null, this equals appendChild
    node.parentNode.insertBefore(eleNode, node.nextSibling)
    node.nodeValue = node.nodeValue.substr(0, offset)
  }
  return eleNode
}

/**
 * @param {Range} range
 * @param {any} size
 */
function traverseStartToContainer(range, size) {
  let container = range.commonAncestorContainer
  let start = range.startContainer
  let startOffset = range.startOffset
  let level = 0
  let bottomLevelStart = start
  let shouldSetStyle = true
  
  while (start.parentNode !== container) {
    // 文本节点可以出现在任意一级上
    if (start.nodeType === TEXT_NODE) {
      // 当光标定在文本节点的父级节点的第一个节点的开始时，不需要创建新元素来包裹文本节点
      // 除了最底层，其他层文本节点也满足startOffset === 0这个条件，但不可能满足start === start.parentNode.firstChild
      if (start === start.parentNode.firstChild && startOffset === 0) {
        // 向上跳一级，因为本级没有修改样式，那么上一级就需要修改
        shouldSetStyle = true
        start = start.parentNode
        level++
        continue
      }
      // 不向上跳，在本层处理文字节点样式
      // 只有出现在最底下那一层的文本节点，才有可能被光标截断；除了最下面一层，其他层的第一个被循环到的节点不可能是文本节点。
      start = handleStartTextNode(start, startOffset, size)
      if (level === 0) {
        bottomLevelStart = start
      }
    } else {
      // 只有下层的所有节点的所有内容都包裹在range中才会向上跳，此时shouldSetStyle为true，即样式应该设置在父级上
      // 会尝试一直向上跳，但遇到某一层的父级不是第一个元素的情况，这时说明左边有不在range中的兄弟节点，样式也就不应该再向上设置到父级节点了
      // shouldSetStyle在这里有两种情况：1. 从前一个sibling指过来的 2. 下层跳上来的
      if (shouldSetStyle) {
        if (start == start.parentNode.firstChild) {
          start = start.parentNode
          level++
          continue
        } else {
          start.style.fontSize = size
          clearChildStyle(start)
        }
      }
    }
    // 如果是往右，即下一个要处理的是兄弟节点，那么需要设置样式；如果是往上，因为下面一级都已经处理过样式，则不需要处理样式
    shouldSetStyle = start.nextSibling !== null
    start = shouldSetStyle ? start.nextSibling : start.parentNode
    !shouldSetStyle && level++
    // 在其他层如果右边兄弟节点是文本节点都是完整的被包裹在range中，把offset设置为0
    startOffset = 0
  }
  // 如果遍历到container的直接子元素还是需要设置样式（continue跳上来的元素节点或者一开始就是container的直接子元素）
  if (shouldSetStyle) {
    if (start.nodeType === ELEMENT_NODE) {
      start.style.fontSize = size
      clearChildStyle(start)
    } else if (start.nodeType === TEXT_NODE) {
      start = handleStartTextNode(start, startOffset, size)
      if (level === 0) {
        bottomLevelStart = start
      }
    }
  }
  return {
    topLevel: start,
    bottomLevel: bottomLevelStart
  }
}
/**
 * @param {Node} node
 * @param {number} offset
 * @param {string} size
 */
function handleEndTextNode(node, offset, size) {
  // skip
  if (node.nodeValue.trim() === '') {
    return node
  }
  let eleNode = document.createElement('span')
  eleNode.style.fontSize = size
  // if true replace the whole text node with element node
  if (offset === node.nodeValue.length) {
    eleNode.appendChild(document.createTextNode(node.nodeValue))
    node.parentNode.replaceChild(eleNode, node)
  } else {
    // insert the new element node before text node
    eleNode.appendChild(document.createTextNode(node.nodeValue.substr(0, offset)))
    node.parentNode.insertBefore(eleNode, node)
    node.nodeValue = node.nodeValue.substr(offset)
  }
  return eleNode
}

/**
 * @param {Range} range
 * @param {string} size
 */
function traverseEndToContainer(range, size) {
  let container = range.commonAncestorContainer
  let end = range.endContainer
  let endOffset = range.endOffset
  let level = 0
  let bottomLevelEnd = end
  let shouldSetStyle = true
  // 向上跳考虑文本和元素两种类型即可。
  while (end.parentNode !== container) {
    // 文本节点可以出现在任意一级上
    if (end.nodeType === TEXT_NODE) {
      // 当光标定在文本节点的父级节点的最后一个节点的结束时，不需要创建新元素来包裹文本节点
      // 除了最底层，其他层文本节点也可能恰好满足endOffset === end.nodeValue.length这个条件，但不可能满足end === end.parentNode.lastChild
      if (end === end.parentNode.lastChild && endOffset === end.nodeValue.length) {
        // 向上跳一层
        end = end.parentNode
        shouldSetStyle = true
        level++
        continue
      }
      // 不向上跳，在本层处理文字节点样式
      // 只有出现在最底下那一层的文本节点，才有可能被光标截断；除了最下面一层，其他层的第一个被循环到的节点不可能是文本节点
      end = handleEndTextNode(end, endOffset, size)
      if (level === 0) {
        bottomLevelEnd = end
      }
    } else {
      // 只有下层的所有节点的所有内容都包裹在range中才会向上跳，此时shouldSetStyle为true，即样式应该设置在父级上
      // 会尝试一直向上跳，但遇到某一层的父级不是最后一个元素的情况，这时说明右边有不在range中的兄弟节点，样式也就不应该再向上设置到父级节点了
      // shouldSetStyle在这里有两种情况：1. 从后一个sibling指过来的 2. 下层跳上来的
      if (shouldSetStyle) {
        if (end == end.parentNode.lastChild) {
          end = end.parentNode
          level++
          continue
        } else {
          end.style.fontSize = size
          clearChildStyle(end)
        }
      }
    }
    // 如果是往左，即下一个要处理的是兄弟节点，那么需要设置样式；如果是往上，因为下面一级都已经处理过样式，则不需要处理样式
    shouldSetStyle = end.previousSibling !== null
    end = shouldSetStyle ? end.previousSibling : end.parentNode
    !shouldSetStyle && level++
    // 在其他层如果左边兄弟节点是文本节点都是完整的被包裹在range中，把offset设置为它的整个文本长度
    end.nodeType === TEXT_NODE && (endOffset = end.nodeValue.length)
  }
  // 如果遍历到container的直接子元素还是需要设置样式（continue跳上来的元素节点或者一开始就是container的直接子元素）
  if (shouldSetStyle) {
    if (end.nodeType === ELEMENT_NODE) {
      end.style.fontSize = size
      clearChildStyle(end)
    } else if (end.nodeType === TEXT_NODE) {
      end = handleEndTextNode(end, endOffset, size)
      bottomLevelEnd = end
    }
  }
  return {
    topLevel: end,
    bottomLevel: bottomLevelEnd
  }
}

/**
 * @param {any} start
 * @param {any} end
 * @param {string} size
 */
function traverseTopLevelSibling(start, end, size) {
  while ((start = start.nextSibling) !== end) {
    if (start.nodeType === TEXT_NODE) {
      // 跳过换行符等空节点
      if (start.nodeValue.trim() === '') continue
      // 文本节点替换为元素节点并加上样式
      let ele = document.createElement('span')
      ele.style.fontSize = size
      ele.appendChild(document.createTextNode(start.nodeValue))
      start.parentNode.replaceChild(ele, start)
      start = ele
    } else if (start.nodeType === ELEMENT_NODE) {
      start.style.fontSize = size
      clearChildStyle(start)
    }
  }
}

/**
 * 清除已有元素节点的子节点的样式，如果是新创建的元素则无需清除
 * @param {Node} node
 */
function clearChildStyle(node) {
  let children = Array.prototype.slice.call(node.children)    // 因为元素节点会变成文本节点，children会动态变化，这里需要存一下   
  for (let i = 0; i < children.length; i++) {
    // 深度优先
    if (children[i].children.length > 0) {
      clearChildStyle(children[i])
    }
    if (children[i].style.fontSize !== '') {
      children[i].style.fontSize = ''
      // 如果只是个存粹的包裹元素，把它变成文本节点
      if (children[i].children.length === 0
        && children[i].attributes.length === 1 
        && children[i].attributes[0].name === 'style'
        && children[i].getAttribute('style') === '') {
        let textNode = document.createTextNode(children[i].innerText)
        children[i].parentNode.replaceChild(textNode, children[i])
        // 最后一个，把文本节点合并。此处设定一个延时，等到重建range后再调用，避免重建range找不到文本节点的问题
        if (i === children.length - 1) {
          setTimeout(() => {
            textNode.parentNode.normalize()
          }, 2000)
        }
      }
    }
  }
}

// 无论嵌套多复杂，都可以分成三种情况
// ... target</ele></ele>
// <ele><ele>target</ele></ele>
// <ele><ele>target ...
/**
 * @param {Range} range
 * @param {string} size
 */
function setFontSize(range, size) {
  // 如果返回null，代表不需要重建range
  let resultRange = null

  if (!range || range.collapsed) {
    return resultRange
  }

  // 考虑start.parentNode或者start.parentNode已经大于container的情况，即start === container，会出现遍历到htmlbug
  let container = range.commonAncestorContainer
  let start = range.startContainer
  let end = range.endContainer
  if (start === end && start === container) {
    if (start.nodeType === TEXT_NODE) {
      if (range.startOffset !== 0 || range.endOffset !== end.nodeValue.length) {
        // 把光标后面的替换成元素节点
        let ele = document.createElement('span')
        ele.style.fontSize = size
        ele.appendChild(document.createTextNode(start.nodeValue.substr(range.startOffset, range.endOffset)))
        // 修改原文本节点
        let textEnd = document.createTextNode(start.nodeValue.substr(range.endOffset))
        start.parentNode.insertBefore(textEnd, start.nextSibling)
        start.parentNode.insertBefore(ele, textEnd)
        start.nodeValue = start.nodeValue.substr(0, range.startOffset)
        resultRange = {
          start: start,
          startOffset: 0,
          end: textEnd,
          endOffset: textEnd.nodeValue.length
        }
      } else {
        start.parentNode.style.fontSize = size
        clearChildStyle(start.parentNode)
      }
    } else {
      start.style.fontSize = size
      clearChildStyle(start)
    }
    return resultRange
  }

  let { topLevel: topLevelStart, bottomLevel: bottomLevelStart } = traverseStartToContainer(range, size)
  let { topLevel: topLevelEnd, bottomLevel: bottomLevelEnd }  = traverseEndToContainer(range, size)
  traverseTopLevelSibling(topLevelStart, topLevelEnd, size)

  return {
    start: bottomLevelStart,
    startOffset: 0,
    end: bottomLevelEnd,
    endOffset: bottomLevelEnd.nodeType === ELEMENT_NODE ? bottomLevelEnd.innerText.length : bottomLevelEnd.nodeValue.length
  }

}

export default setFontSize
