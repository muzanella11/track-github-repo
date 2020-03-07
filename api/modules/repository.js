import endpoint from '../endpoint'
import resource from '../resource'
import axios from 'axios'

const AxiosCancelToken = axios.CancelToken
const NAMESPACE = 'REPOSITORY'

export default {
  find (username, param) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_FETCH_REPOSITORY`
    const request = resource.get(`${endpoint.users.find}/${username}/repos?${param}`, { // {?type,page,per_page,sort}
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  }
}
