const bcrypt = require('bcryptjs')
const pool = require('../db/pool')
const jwt = require('jsonwebtoken')

async function register(req, res) {
    const { email, password } = req.body

  const existingUser = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  )

  if (existingUser.rows.length > 0) {
    return res.status(409).json({
      message: 'User already exists',
    })
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  )

  const result = await pool.query(
    `INSERT INTO users (email, password)
     VALUES ($1, $2)
     RETURNING id, email, created_at`,
    [email, hashedPassword]
  )

  res.status(201).json(result.rows[0])
}

async function login(req, res) {
  const { email, password } = req.body

  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  )

  if (result.rows.length === 0) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  const user = result.rows[0]

  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  )

  if (!passwordMatches) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({
    token,
  })
}

module.exports = {
  register,
  login,
}