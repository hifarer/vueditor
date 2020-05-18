
let browser = ''

export function getBrowser() {
  if (browser !== '') return browser
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('chrome') !== -1) {
    // Edge/18.18362
    browser = /edge\/1\d/.test(ua) ? 'Edge' : 'Chrome'
  } else if (ua.indexOf('msie') !== -1  || ua.indexOf('trident') !== -1) {
    browser = 'IE'
  } else if (ua.indexOf('firefox') !== -1) {
    browser = 'Firefox'
  }
  return browser
}

export function createNonceStr() {
  let str = '1234567890ABCDEFGHIJKLOMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let nonceStr = ''
  for (let i = 0; i < 10; i++) {
    nonceStr += str.charAt(Math.round(Math.random() * (str.length - 1)))
  }
  return nonceStr
}

/**
 * @param {string} val
 * @returns {boolean}
 */
export function checkColor(val) {
  let color = val.replace(/\s+/g, '')
  let hsl3 = /^#[0-9a-f]{3}$/i
  let hsl6 = /^#[0-9a-f]{6}$/i
  let rgb = /^rgb\(((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]),){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\)$/
  if (hsl3.test(color) || hsl6.test(color) || rgb.test(color)) {
    return true
  }
  return false
}

/**
 * @param {function} fn
 * @param {number} delay
 */
export function debounce(fn, delay) {
  let timer = null
  return () => {
    if (timer !== null) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

/**
 * @param {function} fn
 * @param {number} delay
 */
export function throttle(fn, delay) {
  let flag = false
  return () => {
    if (flag) return
    setTimeout(() => {
      fn()
      flag = false
    }, delay)
  }
}