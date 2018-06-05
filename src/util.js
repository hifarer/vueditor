
export function createNonceStr () {
  let str = '1234567890ABCDEFGHIJKLOMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let name = ''
  for (let i = 0; i < 10; i++) {
    name += str.charAt(Math.round(Math.random() * (str.length - 1)))
  }
  return name
}

export function getBrowser () {
  let browser = ''
  let ua = window.navigator.userAgent
  if (ua.indexOf('Chrome') !== -1) {
    browser = ua.indexOf('Edge') !== -1 ? 'Edge' : 'Chrome'
  } else if (ua.indexOf('MSIE') !== -1) {
    browser = 'IE'
  } else if (ua.indexOf('Firefox') !== -1) {
    browser = 'Firefox'
  }
  return browser
}
