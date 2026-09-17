function validateAuth(req, res, next) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    })
  }

  const normalizedEmail = email.trim().toLowerCase()

  if (!normalizedEmail.includes('@')) {
    return res.status(400).json({
      message: 'Invalid email',
    })
  }

  if (password.length < 6) {
    return res.status(400).json({
      message:
        'Password must be at least 6 characters',
    })
  }

  req.body.email = normalizedEmail

  next()
}

module.exports = validateAuth