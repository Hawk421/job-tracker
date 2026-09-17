const pool = require('../db/pool')

async function getJobs(req, res) {
  const result = await pool.query(
    'SELECT * FROM jobs WHERE user_id = $1',
    [req.user.userId]
  )

  res.json(result.rows)
}

async function getJob(req, res) {
  const result = await pool.query(
    `SELECT * FROM jobs
     WHERE id = $1 AND user_id = $2`,
    [
      req.params.id,
      req.user.userId,
    ]
  )

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: 'Job not found',
    })
  }

  res.json(result.rows[0])
}

async function createJob(req, res) {
  const {
    company,
    position,
    status,
  } = req.body

  const result = await pool.query(
    `INSERT INTO jobs (
       company,
       position,
       status,
       user_id
     )
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [
      company,
      position,
      status,
      req.user.userId,
    ]
  )

  res.status(201).json(result.rows[0])
}

async function updateJob(req, res) {
  const {
    company,
    position,
    status,
  } = req.body

  const result = await pool.query(
    `UPDATE jobs
     SET company = $1,
         position = $2,
         status = $3
     WHERE id = $4 AND user_id = $5
     RETURNING *`,
    [
      company,
      position,
      status,
      req.params.id,
      req.user.userId,
    ]
  )

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: 'Job not found',
    })
  }

  res.json(result.rows[0])
}

async function deleteJob(req, res) {
  const result = await pool.query(
    `DELETE FROM jobs
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [
      req.params.id,
      req.user.userId,
    ]
  )

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: 'Job not found',
    })
  }

  res.json(result.rows[0])
}

module.exports = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
}