require('dotenv').config()

const express = require('express')
const cors = require('cors')

const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')

const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Job Tracker API is running!')
})

app.use('/api/jobs', jobsRouter)
app.use('/api/auth', authRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `Server is running on port ${PORT}`
  )
})