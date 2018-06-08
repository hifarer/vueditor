
// ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)
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

export function createNonceStr () {
  let str = '1234567890ABCDEFGHIJKLOMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let nonceStr = ''
  for (let i = 0; i < 10; i++) {
    nonceStr += str.charAt(Math.round(Math.random() * (str.length - 1)))
  }
  return nonceStr
}
