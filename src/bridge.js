
const eventBus = {}

function addListener (event, func) {
  if (typeof event !== 'string' || typeof func !== 'function') {
    return
  }
  if (!eventBus[event]) {
    eventBus[event] = []
  }
  eventBus[event].push(func)
}

function clearListeners (event) {
  if (typeof event !== 'string') {
    return
  }
  if (eventBus[event]) {
    eventBus[event] = []
  }
}

function emit (event, data) {
  if (typeof event !== 'string') {
    return
  }
  if (eventBus[event]) {
    eventBus[event].forEach(fn => {
      fn(data)
    })
  }
}

export default {
  addListener,
  clearListeners,
  emit
}
