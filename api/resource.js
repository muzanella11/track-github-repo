import axios from 'axios'
import handler from './handler'

function createResource () {
  const instance = axios.create({
    baseURL: '//api.github.com/',
    headers: {
      // eslint-disable-next-line quote-props
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.request.use(config => {
    // for intercept request or header request
    return config
  }, error => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => {
    return Promise.resolve(response)
  }, error => {
    return handler(error)
  })

  return instance
}

export default createResource()
