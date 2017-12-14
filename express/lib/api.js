const axios = require('axios')

class Http {
  constructor(option) {
    if (typeof option !== 'object') {
      throw new Error('配置错误')
    }
    if (!option.username || !option.password) {
      throw new Error('请填写认证信息')
    }
    this.option = option
    this.axios = axios.create({
      baseURL: this.option.url,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
      },
      auth: this.option,
    })
    this.get = this.httpGet
    this.post = this.httpPost
    this.put = this.httpPut
    this.delete = this.httpDelete
    this.error = this.httpError
  }

  httpGet(url, data) {
    return this.axios.get(url)
      .then(res => res)
      .catch(this.httpError)
  }

  httpPost(url, data) {
    this.axios.post(url, data)
      .then(res => res)
      .catch(this.httpError)
  }

  httpPut(url, data) {
    this.axios.put(url, data)
      .then(res => res)
      .catch(this.httpError)
  }

  httpDelete(url, data) {
    this.axios.post(url, data)
      .then(res => res)
      .catch(this.httpError)
  }

  httpError(error) {
    return Promise.reject(error)
  }
}

module.exports = Http
