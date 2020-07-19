const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser') // no need - it was added back into express again
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const app = express()

console.log('Starting...')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds231460.mlab.com:31460/dror-express-starter`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('🔥 mongoose connected successfully!'))
  .catch((error) => console.error('mongoose connection error', error))

const listener = app.listen(8080, function () {
  console.log('🦻 listening on port ' + listener.address().port)
})

module.exports = app
