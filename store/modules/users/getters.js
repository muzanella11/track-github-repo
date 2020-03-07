import {
  GET_ENTRIES_FEATURE,
  GET_REPOSITORIES,
  GET_FILTERS,
  GET_FILE
} from './types'

export default {
  [GET_ENTRIES_FEATURE] (state) {
    return state.entries
  },

  [GET_REPOSITORIES] (state) {
    return state.repositories
  },

  [GET_FILTERS] (state) {
    return state.entry.filters
  },

  [GET_FILE] (state) {
    return state.fileSource
  }
}
