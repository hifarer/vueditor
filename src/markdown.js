
import marked from 'marked'

let renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  return `<h${level}>${text}</h${level}>`
}
renderer.paragraph = function (text) {
  let div = document.createElement('div')
  div.innerHTML = text
  if (div.children.length === 0) {
    return '<p>' + text + '</p>\n'
  }
  return text + '\n'
}

marked.setOptions({
  renderer: renderer,
  gfm: false
})

export default marked
