require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const { errors } = require('celebrate')
const router = require('./routes')
const handleErrors = require('./middlewares/errorHandler')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const corsOption = require('./middlewares/cors')

const { PORT = 3000 } = process.env
const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})

app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/mestodb')

app.use(requestLogger)

app.use(cors(corsOption))

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт')
  }, 0)
})

app.use(router)

app.use(errorLogger)

app.use(errors())

app.use(handleErrors)

app.listen(PORT, () => {
  console.log(`Vse rabotaet na porte ${PORT}`)
})
