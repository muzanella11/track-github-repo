import endpoint from '../endpoint'
import resource from '../resource'
import axios from 'axios'

const AxiosCancelToken = axios.CancelToken
const NAMESPACE = 'USERS'

export default {
  find (username) {
    const CANCEL_TOKEN = `${NAMESPACE}_FETCH_FIND_USERS`

    if (window[CANCEL_TOKEN]) {
      window[CANCEL_TOKEN]()
    }

    let cancel
    const request = resource.get(`${endpoint.users.find}/${username}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  }
}
