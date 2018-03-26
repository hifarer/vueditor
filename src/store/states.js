
import { getConfig } from '../config/index.js'

// 每一个按钮都有一个状态
// 每一个下拉菜单、对话框都有一个显示状态

export default function () {
  let toolbar = {}
  let config = getConfig('toolbar')

  config.forEach(function (name) {
    if (name !== 'divider' && name !== '|') {
      toolbar[name] = '' // default disabled actived
    }
  })

  return {
    toolbar,

    activeComponent: '',
    fullscreen: false,
    content: '',
    view: 'design',

    command: {
      name: '',
      value: ''
    },
    event: {
      name: '',
      params: ''
    }
  }
}
