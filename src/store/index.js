
import * as actions from './actions'
import mutations from './mutations'
import getState from './states'

export default function () {
  return {
    namespaced: true,
    state: getState(),
    actions,
    mutations
  }
}
