
import { getToolbar } from '../config/toolbar.js'
import { getConfig } from '../config/index.js'

export default function () {
  let json = {}
  let {btns, selects} = getToolbar()
  let config = getConfig('toolbar')

  config.forEach(function (name) {
    if (name !== 'divider' && name !== '|') {
      json[name] = {}
      if (name in selects) {
        json[name].value = ''
        json[name].showPopup = false
      } else {
        if (btns[name] && btns[name].action === undefined) {
          json[name].showPopup = false
        }
      }
      json[name].status = '' // default disabled actived
    }
  })

  return {
    ...json,
    view: 'design',
    content: '',
    fullscreen: false,
    rect: {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    },
    command: {
      name: '',
      value: ''
    },
    callee: {
      name: '',
      params: ''
    }
  }
}
