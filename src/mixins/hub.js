
import getEventHub from '../eventhub.js'

export default {
  inject: ['range', 'nonceStr'],
  created () {
    this.eventHub = getEventHub(this.nonceStr)
  }
}
