import endpoint from '../endpoint'
import resource from '../resource'
import axios from 'axios'

const AxiosCancelToken = axios.CancelToken
const NAMESPACE = 'REPOSITORY'

export default {
  find (username, param) {
    const CANCEL_TOKEN = `${NAMESPACE}_FETCH_REPOSITORY`

    if (window[CANCEL_TOKEN]) {
      window[CANCEL_TOKEN]()
    }

    let cancel
    const request = resource.get(`${endpoint.repository.find}/${username}/repos?${param}`, { // {?type,page,per_page,sort}
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  getFile (username, id, fileName) {
    const CANCEL_TOKEN = `${NAMESPACE}_FETCH_REPOSITORY_FILE`

    if (window[CANCEL_TOKEN]) {
      window[CANCEL_TOKEN]()
    }

    let cancel
    const request = resource.get(`${endpoint.repository.index}/${username}/${id}/${fileName}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  }
}
