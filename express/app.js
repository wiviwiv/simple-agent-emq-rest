const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const CrosSupport = require('./middleware/CorsSupport')
const config = require('./config')

const apis = require('./routes/api')


const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

process.on('unhandledRejection', error => {
  console.log('error')
})

// middleware
app.use(CrosSupport)
app.use(path.join(config.url_pix || '/api', '*'), apis)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json(err || { message: '未知错误' })
})

module.exports = app
