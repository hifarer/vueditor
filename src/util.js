
export function createNonceStr () {
  let str = '1234567890ABCDEFGHIJKLOMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let name = ''
  for (let i = 0; i < 10; i++) {
    name += str.charAt(Math.round(Math.random() * (str.length - 1)))
  }
  return name
}
