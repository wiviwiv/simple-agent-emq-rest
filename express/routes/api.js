const express = require('express')
const config = require('../config')
const router = express.Router()

const Http = require('../lib/api')

router.post('/', function(req, res, next) {
  const data = req.body
  if (!data.auth || !data.auth.username || !data.auth.password) {
    res.status(401)
    return res.json({
      message: '认证信息不完整'
    })
  }
  if (!data.url) {
    res.status(500)
    return res.json({
      message: '主机地址不完整'
    })
  }
  new Http(data.auth)[data.method.toLowerCase() || 'get'](data.url, data.payload)
    .then((response) => {
    console.log(1111)
      res.status(response.status || 200)
      res.json(response.data)
    })
    .catch((error) => {
      console.log(2222)
      res.status(error.response.status || 500)
      res.json({
        message: error.toString(),
        data: error.response.data || {}
      })
    })
})

module.exports = router
