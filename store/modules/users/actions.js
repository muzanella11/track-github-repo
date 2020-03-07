import * as TYPES from './types'
import Api from '~/api'
import QueryString from 'query-string'

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
  },

  [TYPES.FETCH_REPOSITORIES] ({ commit, state }) {
    return new Promise((resolve, reject) => {
      const filters = QueryString.stringify(state.entry.filters)
      Api.repository.find(state.entry.username, filters)
        .then(response => {
          let data = state.repositories

          if (state.repositories.length > 0) {
            data = [].concat(data, response.data)
          } else {
            data = response.data
          }

          commit(TYPES.SET_STATE, { accessor: 'repositories', value: data })
          resolve(response)
        }, error => {
          commit(TYPES.SET_STATE, { accessor: 'repositories', value: [] })
          reject(error)
        })
    })
  },

  [TYPES.FETCH_FILE] ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      Api.repository.getFile(state.entry.username, payload.repoName, payload.fileName)
        .then(response => {
          commit(TYPES.SET_STATE, { accessor: 'fileSource', value: { fileContent: JSON.stringify(response.data.content) } })
          resolve(response)
        }, error => {
          commit(TYPES.SET_STATE, { accessor: 'fileSource', value: {} })
          reject(error)
        })
    })
  }
}
