
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
