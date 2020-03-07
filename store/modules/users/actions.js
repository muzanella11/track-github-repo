import * as TYPES from './types'
import Api from '~/api'

export default {
  [TYPES.FETCH_EXAMPLE_FEATURE] ({ commit }, payload) {
    return 'example'
  },

  [TYPES.FETCH_USERS] ({ commit, state }) {
    return new Promise((resolve, reject) => {
      Api.users.find(state.entry.username)
        .then(response => {
          commit(TYPES.SET_STATE, { accessor: 'entries', value: response.data })
          resolve(response)
        }, error => {
          commit(TYPES.SET_STATE, { accessor: 'entries', value: {} })
          reject(error)
        })
    })
  }
}
