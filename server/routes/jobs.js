const express = require('express')

const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobsController')

const validateJob = require('../middleware/validateJob')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

router.get('/', getJobs)
router.get('/:id', getJob)
router.post('/', validateJob, createJob)
router.put('/:id', validateJob, updateJob)
router.delete('/:id', deleteJob)

module.exports = router