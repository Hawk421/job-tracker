require('dotenv').config()

const express = require('express')
const cors = require('cors')
const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/jobs', jobsRouter)
app.use('/api/auth', authRouter)

app.use(notFound)
app.use(errorHandler)

const PORT = 3000

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  )
})