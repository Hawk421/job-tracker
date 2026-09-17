const express = require('express')

const {
  register,
  login,
} = require('../controllers/authController')

const validateAuth = require('../middleware/validateAuth')

const router = express.Router()

router.post(
  '/register',
  validateAuth,
  register
)

router.post(
  '/login',
  validateAuth,
  login
)

module.exports = router